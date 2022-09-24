import type { NextPage } from 'next'
import { Box, Button, HStack, Input, Select, useToast, VStack } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { useState } from 'react'
import { auth, firestore } from '../firebase'
import { doc, updateDoc } from '@firebase/firestore'

// name , age , gender ,  3 contacts
const Home: NextPage = () => {

    const [name, setname] = useState("")
    const [age, setage] = useState(0)
    const [gender, setgender] = useState("")
    const [number1, setnumber1] = useState(0)
    const [number2, setnumber2] = useState(0)
    const [number3, setnumber3] = useState(0)
    const toast = useToast()
    const[loading,setloading] = useState(false)

    const handleClick = async () => {
        setloading(true)
        if (!name || !age || !gender || !number1 || !number2 || !number3) {
            toast({
                title: 'Error.',
                description: "All fields are compulsory to create profile",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            setloading(false)
            return
        }

        try {
            const uid = auth.currentUser?.uid
            const docRef = doc(firestore, "users", uid?.toString());

            const data = {
                name: name,
                age: age,
                gender: gender,
                number1: number1,
                number2: number2,
                number3: number3
            }

            updateDoc(docRef, data)
                .then(docRef => {
                    console.log("done")
                })
                .catch(error => {
                    console.log(error);
                })




        } catch (err) {
            console.log(err.message)
        }

        setloading(false)
    }

    return (
        <Box>
            <Navbar />
            <Box mt={"12vh"} p={3}>
                <VStack spacing={"2.5vh"}>
                    <FormControl>
                        <FormLabel>Name:</FormLabel>
                        <Input p={"20px"} onChange={(e) => setname(e.target.value)} placeholder='Enter name' type='text' />
                    </FormControl>
                    <HStack>
                        <FormControl>
                            <FormLabel>Age:</FormLabel>
                            <Input p="10px" onChange={(e) => setage(e.target.value)} placeholder='enter age' type='number' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Gender:</FormLabel>
                            <Select onChange={(e) => setgender(e.target.value)} placeholder='Select option'>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </Select>
                        </FormControl>
                    </HStack>
                    <FormControl>
                        <FormLabel>Number 1:</FormLabel>
                        <Input p="20px" onChange={(e) => setnumber1(e.target.value)} placeholder='enter first number' type='number' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Number 2:</FormLabel>
                        <Input p="20px" onChange={(e) => setnumber2(e.target.value)} placeholder='enter second number' type='number' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Number 3:</FormLabel>
                        <Input p="20px" onChange={(e) => setnumber3(e.target.value)} placeholder='enter third number' type='number' />
                    </FormControl>
                    <Button isLoading={loading} onClick={handleClick} bg="blue" w="95%" textColor="white">Submit Details</Button>
                </VStack>
            </Box>
        </Box>
    )
}

export default Home
