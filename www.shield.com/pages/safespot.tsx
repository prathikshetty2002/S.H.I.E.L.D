import { Box, Button, HStack, Input, useDisclosure, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { firestore } from '../firebase'




const Home: NextPage = () => {

    const [name, setname] = useState("")
    const [type, settype] = useState("")
    const [address, setaddress] = useState("")
    const [poc, setpoc] = useState("")
    const [contact, setcontact] = useState("")
    const [state, setstate] = useState("")
    const [city, setcity] = useState("")
    const [latitude, setlatitude] = useState("")
    const [longitude, setlongitude] = useState("")

    const[loading,setloading] = useState(false)

    const handleSubmit = async () => {
        setloading(true)
        try {
            const data = {
                name,
                type,
                address,
                poc,
                contact,
                state,
                city,
                latitude,
                longitude
            }

            const dbRef = collection(firestore, "safespots");
            addDoc(dbRef, data)
                .then(docRef => {
                    onClose()
                setloading(false)
                })
                .catch(error => {
                    console.log(error);
                })
                
        } catch (err) {
            console.log(err)
            onClose()
                setloading(false)
        }
        
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
            <Navbar />
            <Box mt="12vh">
                <Box display={"flex"} p={3} justifyContent="right">
                    <Button bg="blue" textColor={"white"} onClick={onOpen}>Add Safe spot</Button>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>SafeSPot (Only for organization)</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={"1.5vh"}>
                                <FormControl>
                                    <FormLabel>Name: </FormLabel>
                                    <Input onChange={(e) => setname(e.target.value)} placeholder='Enter name here' type='text' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Type: </FormLabel>
                                    <Input placeholder='Enter type here' onChange={(e) => settype(e.target.value)} type='text' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Address: </FormLabel>
                                    <Input onChange={(e) => setaddress(e.target.value)} placeholder='Enter address here' type='text' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>POC: </FormLabel>
                                    <Input onChange={(e) => setpoc(e.target.value)} placeholder='Enter POC here' type='text' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Contact: </FormLabel>
                                    <Input onChange={(e) => setcontact(e.target.value)} placeholder='Enter contact number here here' type='number' />
                                </FormControl>
                                <HStack>
                                    <FormControl>
                                        <FormLabel>State: </FormLabel>
                                        <Input onChange={(e) => setstate(e.target.value)} placeholder='Enter state ' type='text' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>City: </FormLabel>
                                        <Input placeholder='Enter city ' type='text' />
                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <FormControl>
                                        <FormLabel>Latitude: </FormLabel>
                                        <Input onChange={(e) => setlatitude(e.target.value)} placeholder='Enter latitude' type='text' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Longitude: </FormLabel>
                                        <Input onChange={(e) => setlongitude(e.target.value)} placeholder='Enter longitude ' type='text' />
                                    </FormControl>
                                </HStack>

                            </VStack>
                        </ModalBody>

                        <ModalFooter>
                            <Box w="full" display={"flex"} justifyContent="right">
                                <Box w="60%" display={"flex"} justifyContent="space-around">
                                    <Button bg="gray.200" onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button isLoading={loading} colorScheme='blue' mr={3} onClick={handleSubmit}>Submit</Button>
                                </Box>
                            </Box>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    )
}

export default Home
