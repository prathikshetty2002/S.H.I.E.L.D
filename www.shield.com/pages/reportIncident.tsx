import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import { Box, Button, Img, Input, Select, Textarea, VStack, useToast, useDisclosure, Text } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { firestore, storage } from '../firebase'
import { addDoc, collection } from '@firebase/firestore'
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


const reportIncident: NextPage = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

    const toast = useToast()
    const [imgurl, setimgurl] = useState("")
    const [disp, setdisp] = useState("none")
    const [loading, setLoading] = useState(false)
    const hiddenFileInput = useRef(null)
    const[submitloading,setsubmitloading] = useState(false)
    const handleClick = event => {
        hiddenFileInput.current.click();
    }
    const [type, settype] = useState("")
    const [description, setdescription] = useState("")

    const router = useRouter()


    const handleChange = async (event) => {
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
            console.log(err.message)
        }
        setLoading(false)
    }

    const submithandler = async () => {
        setsubmitloading(true)
        const dbRef = collection(firestore, "reportincident");
        const data = {
            type: type,
            description: description,
            imgurl: imgurl
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
    }

    const handleClose = ()=>{
        router.push("/")
        onClose()
    }


    return (
        <Box>
            <Navbar />
            <VStack mt={"12vh"}>
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
                    <FormLabel>Email address</FormLabel>
                    <Textarea
                        placeholder='Enter description'
                        size='sm'
                        resize={"none"}
                        onChange={(e) => setdescription(e.target.value)}
                    />
                </FormControl>

                <FormControl w="90%" >
                    <FormLabel>Select Image (optional):</FormLabel>
                    <Button isLoading={loading} w="full" _hover={{ bg: "green" }} onClick={handleClick} bg="green" mt="2vh" textColor={"white"} cursor="pointer" borderRadius={"10px"} fontSize={"16px"} textAlign={"center"} htmlFor='inp'>
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

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report Submitted</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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

export default reportIncident
