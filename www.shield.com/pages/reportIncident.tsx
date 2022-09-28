import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import { Box, Button, Img, Input, Select, Textarea, VStack, useToast, useDisclosure, Text, Heading } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { auth, firestore, storage } from '../firebase'
import { addDoc, collection, query, where, getDocs, doc, getDoc, updateDoc } from '@firebase/firestore'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import LoginModal from '../components/LoginModal'
import { onAuthStateChanged } from '@firebase/auth'


const ReportIncident: NextPage = () => {
    const { isOpen: isOpenmodal, onOpen: onOpenmodal, onClose: onClosemodal } = useDisclosure()


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                onOpenmodal()
            }
        });
    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)

    const toast = useToast()
    const [imgurl, setimgurl] = useState("")
    const [disp, setdisp] = useState("none")
    const [loading, setLoading] = useState(false)
    const hiddenFileInput = useRef<HTMLInputElement>(null)
    const [submitloading, setsubmitloading] = useState(false)
    const handleClick = () => {
        if(hiddenFileInput.current !== null) hiddenFileInput.current.click();
    }
    const [type, settype] = useState("")
    const [description, setdescription] = useState("")

    const router = useRouter()

    const [geoLocation, setGeoLocation] = useState<any>([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setGeoLocation([position.coords.latitude, position.coords.longitude])
            console.log("geoLocation: ", geoLocation)
        });
    }, [])



    const handleChange:ChangeEventHandler<HTMLInputElement> | undefined = async (event) => {
        if(event.target.files) {
        setLoading(true)
        const fileUploaded = event.target.files[0];
        try {
            const imgname = fileUploaded.name + v4()
            const imageref = ref(storage, `reportimages/${imgname}`)
            await uploadBytes(imageref, fileUploaded)
            const link = await getDownloadURL(imageref)
            setimgurl(link)
            setdisp("block")
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    }

    const submithandler = async () => {
        if (!auth.currentUser) {
            toast({
                title: "Sign in to continue",
                description: "You must sign in to get your rewards for reporting",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            onOpenmodal()
            return
        }

        if (!type || !description) {
            toast({
                title: 'Error',
                description: "Description and type is necessary",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            return
        }
        setsubmitloading(true)
        const dbRef = collection(firestore, "reportincident");
        const data = {
            type: type,
            description: description,
            imgurl: imgurl,
            latitude: geoLocation[0] as number,
            longitude: geoLocation[1] as number
        };
        await addDoc(dbRef, data)
            .then(docRef => {
                setsubmitloading(false)
                onOpen()
            })
            .catch(error => {
                console.log(error);
                setsubmitloading(false)
            })
        console.log("report added in database")

        // credits assign
        const uid = auth.currentUser.uid
        const docRef = doc(firestore, "users", uid);
        const docSnap =  (await getDoc(docRef)).data();
        let dataobj = {}
        if (docSnap && docSnap["credits"]) {
            dataobj = {
                credits: docSnap.data()["credits"] + 5
            }
        }
        else {
            dataobj = {
                credits: 5
            }
        }

        updateDoc(docRef, dataobj)
            .then(docRef => {
                console.log("done")
            })
            .catch(error => {
                console.log(error);
            })

        console.log("credits assigned")

        const usersRef = collection(firestore, "users")
        const lowerLatitude = await getDocs(query(usersRef, where("latitude", '>', geoLocation[0] - 0.02)))
        const upperLatitude = await getDocs(query(usersRef, where("latitude", '<', geoLocation[0] + 0.02)))
        const lowerLongitude = await getDocs(query(usersRef, where("latitude", '>', geoLocation[1] - 0.02)))
        const upperLongitude = await getDocs(query(usersRef, where("latitude", '<', geoLocation[1] + 0.02)))
        // console.log("lower latitude, ",lowerLatitude )
        // console.log("upper latitude, ", upperLatitude)
        console.log("users queried")
        const usersData = new Set()
        lowerLatitude.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            usersData.add({
                id: doc.id,
                ...doc.data()
            })
        });
        upperLatitude.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            usersData.add({
                id: doc.id,
                ...doc.data()
            })
        });
        lowerLongitude.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            usersData.add({
                id: doc.id,
                ...doc.data()
            })
        });
        upperLongitude.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            usersData.add({
                id: doc.id,
                ...doc.data()
            })
        });
        const phoneList = new Set()
        usersData.forEach((p: any) => {
            phoneList.add(p.number)
            if (p.number1) phoneList.add(p.number1)
            if (p.number2) phoneList.add(p.number2)
            if (p.number3) phoneList.add(p.number3)
        })
        phoneList.forEach(p => {
            if (p == auth.currentUser!.phoneNumber) {
                usersData.delete(p)
            }
        })

        console.log("phone number list ready: ", phoneList)
        phoneList.forEach(async p => {
            await addDoc(collection(firestore, "alertUsers"), {
                to: p,
                body:
                    `ALERT! ALERT!! ALERT!!!
                ${type}
                ${description}
                ${auth.currentUser?.displayName ? `Reported By: ${auth.currentUser.displayName} ` : ""}

                SENT BY SHIELD, CO
                Here for you, always.
                Be safe & take care 
                `,
                from: "+1 574 347 4780"
            })
        })
        console.log("all sms have been sent")
        setsubmitloading(false)
    }

    const handleClose = () => {
        router.push("/")
        onClose()
    }


    return (
        <Box>
            <LoginModal isOpen={isOpenmodal} onClose={onClosemodal} onOpen={onOpenmodal} />

            <Navbar />
            <Box mt={"20vw"} p={"4"}>
                <Text as="b" mt={"4vw"} display={"block"} fontSize={"3xl"}>Report Incident</Text>
                <VStack mt={"2vh"}>
                    <FormControl w="90%">
                        <FormLabel>Select type</FormLabel>
                        <Select onChange={(e) => settype(e.target.value)} placeholder='Select option'>
                            <option value='Fire'>Fire</option>
                            <option value='Accident'>Accident</option>
                            <option value='Medical Emergency'>Medical Emergency</option>
                            <option value='Crime'>Crime</option>
                        </Select>
                    </FormControl>

                    <FormControl w="90%">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder='Enter description'
                            size='sm'
                            resize={"none"}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                    </FormControl>

                    <FormControl w="90%" >
                        <FormLabel>Select Image (optional):</FormLabel>
                        <Button isLoading={loading} w="full" _hover={{ bg: "green" }} onClick={handleClick} bg="green" mt="2vh" textColor={"white"} cursor="pointer" borderRadius={"10px"} fontSize={"16px"} textAlign={"center"} >
                            Upload Images
                            <Input onChange={handleChange} ref={hiddenFileInput} display={"none"} id="inp" type="file" />
                        </Button>
                    </FormControl>

                    <Box w="90%" h="30vh" p={2} display={disp}>
                        <Img borderRadius={"10px"} h="full" w="full" src={imgurl} />
                    </Box>

                    <Box mt="2vh" w="90%">
                        <Button isLoading={submitloading} onClick={submithandler} borderRadius={"10px"} w="full" bg="blue" textColor={"white"}>Submit Details</Button>
                    </Box>

                </VStack>
            </Box>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Report Submitted</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading>You earn 5 credits</Heading>
                        <Text>Your report is submitted , thank you for reporting. We will take an imediate action on this problem and you will receive reward for your work in near future!</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleClose}>
                            Okay
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>

    )


}
export default ReportIncident
