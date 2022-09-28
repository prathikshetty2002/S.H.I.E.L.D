import type { NextPage } from 'next'
import { Box, Button, HStack, Input, Select, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { auth, firestore } from '../firebase'
import { doc, updateDoc, getDoc } from '@firebase/firestore'
import LoginModal from '../components/LoginModal'
import { onAuthStateChanged } from 'firebase/auth'

// name , age , gender ,  3 contacts
const Home: NextPage = () => {

    const [name, setname] = useState<string>()
    const [age, setage] = useState<number>()
    const [gender, setgender] = useState<string>()
    const [number1, setnumber1] = useState<string>()
    const [number2, setnumber2] = useState<string>()
    const [number3, setnumber3] = useState<string>()
    const toast = useToast()
    const [loading, setloading] = useState(false)
    const { isOpen: isOpenmodal, onOpen: onOpenmodal, onClose: onClosemodal } = useDisclosure()
    const [userData, setUserData] = useState<any>()
    const [credits, setcredits] = useState<number>(0)
    // useEffect(() => {
    //     if (!auth.currentUser) onOpenmodal()
    // }, [])
    // const toast = useToast()
    const loadvalues = async () => {
        if (auth.currentUser) {
            const uid = auth.currentUser!.uid

            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())
            setUserData(docSnap.data())

        }

    }

    useEffect(() => {
        if (!!userData) {
            setname(userData["name"] as string)
            setage(userData["age"] as number)
            setgender(userData["gender"] as string)
            setnumber1(userData["number1"] as string)
            setnumber2(userData["number2"] as string)
            setnumber3(userData["number3"] as string)
            setcredits(userData["credits"])
        }
    }, [userData])

    useEffect(() => {
        // if (auth.currentUser) {
        //     loadvalues()
        // }        
        onAuthStateChanged(auth, user => {
            if (user) loadvalues()
        })
    }, [])

    const handleClick = async () => {

        if (userData) {

            setloading(true)

            try {
                const uid = auth.currentUser!.uid
                const docRef = doc(firestore, "users", uid?.toString());

                let data: any = {}

                if(name) data.name = name
                if(age) data.age = age
                if(number1) data.number1 = "+91"+number1 
                if(number2) data.number2 = "+91"+number2 
                if(number3) data.number3 = "+91"+number3 


                updateDoc(docRef, data)
                    .then(docRef => {
                        console.log("done")
                        toast({
                            title: "Profile updated",
                            status: 'success',
                            duration: 6000,
                            isClosable: true,
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })




            } catch (err) {
                console.log(err)
            }
        } else {
            onOpenmodal()
            toast({
                title: "Sign in to continue",
                description: "profile is for signed in users only",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }

        setloading(false)
    }

    return (
        <Box>
            <LoginModal isOpen={isOpenmodal} onClose={onClosemodal} onOpen={onOpenmodal} />

            <Navbar />
            <Box mt={"10vh"} p={"4"}>
            <Text as="b" mb={"2vw"} mt={"4vw"} display={"block"} fontSize={"3xl"}>Profile</Text>
                
                <VStack spacing={"2.5vh"}>
                    <FormControl>
                        <FormLabel>Name:</FormLabel>
                        <Input value={name} p={"20px"} onChange={(e) => setname(e.target.value)} placeholder='Enter name' type='text' />
                    </FormControl>
                    <HStack>
                        <FormControl>
                            <FormLabel>Age:</FormLabel>
                            <Input value={age} p="10px" onChange={(e) => setage(e.target.value as unknown as number)} placeholder='enter age' type='number' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Gender:</FormLabel>
                            <Select value={gender} onChange={(e) => setgender(e.target.value)} placeholder='Select option'>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </Select>
                        </FormControl>
                    </HStack>
                    <FormControl>
                        <FormLabel>Emergency Contact 1:</FormLabel>
                        <Input value={number1} p="20px" onChange={(e) => setnumber1(e.target.value  as unknown as string)} placeholder='enter first number' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Emergency Contact 2:</FormLabel>
                        <Input value={number2} p="20px" onChange={(e) => setnumber2(e.target.value  as unknown as string)} placeholder='enter second number' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Emergency Contact 3:</FormLabel>
                        <Input value={number3} p="20px" onChange={(e) => setnumber3(e.target.value  as unknown as string)} placeholder='enter third number' />
                    </FormControl>
                    <Box>
                        <Text fontWeight={"semibold"} fontSize="20px"> Your Credits : {credits ? credits + " credits" : "No Credits"}</Text>
                    </Box>
                    <Button isLoading={loading} onClick={handleClick} bg="blackAlpha.800" w="95%" textColor="white">Update Details</Button>
                </VStack>
            </Box>
        </Box>
    )
}

export default Home
