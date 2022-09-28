import { Box, Button, Container, Heading, Input, Progress, Text, Textarea, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import StripeCheckout, { Token } from 'react-stripe-checkout';
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
import { addDoc, collection, getDocs, query } from '@firebase/firestore'
import { firestore } from '../firebase'
import { async } from '@firebase/util'


const Donations: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [amount, setamount] = useState<string>("0")
    const toast = useToast()
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState<any>([])

    const loadDonations = async () => {
        const q = query(collection(firestore, "donations"));
        const querySnapshot = await getDocs(q);

        setdata([])
        querySnapshot.forEach((doc) => {
            let obj = doc.data()
            obj["id"] = doc.id
            setdata((data: any) => [...data, obj])
            console.log(data)
        });

    }

    useEffect(() => {
        loadDonations()
    }, [])

    const handleSubmit = async () => {
        setloading(true)
        try {
            const dbRef = collection(firestore, "donations");
            const data = {
                name: name,
                description: description,
                amount: amount
            }
            addDoc(dbRef, data)
                .then(docRef => {
                    toast({
                        title: 'Success',
                        description: "Donation requested!",
                        status: 'success',
                        duration: 6000,
                        isClosable: true,
                    })
                    setloading(false)
                    onClose()
                })
                .catch(error => {
                    console.log(error);
                })

        } catch (err) {
            console.log(err)
        }
    }

    const priceForStripe = 100;
    const publishableKey = 'pk_test_51LlLhwSAMKxu09dqIatxe6iq2o9s6chjt7yn8siJraECP69y8kAreyWg0dKzEw2BtwutAW0jRvaE9TDzAM6lFzBf003M8dE490';

    const onToken = (token: Token) => {
        console.log(token);
        alert('Payment Succesful!');
    };

    return (
        <Box>

            <Navbar />
            <Box p={3} mt="12vh" display={"flex"} justifyContent="right">
                <Button onClick={onOpen} >Ask For donation</Button>

            </Box>

            <VStack>
                {
                    data &&
                    data.map((d: any) => {
                        return (
                            <Box key={d.id} p={3}>
                                <Box borderRadius={"14px"} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} >
                                    <Box p={2} display={"flex"} alignItems="center">
                                        <Box >
                                            <Box w="70%">
                                                <Text fontSize={"19px"}>{d.name}</Text>
                                            </Box>
                                            <Box>
                                                <Text fontSize={"16px"}>{d.description}</Text>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <StripeCheckout
                                                label='Pay'
                                                name='S.H.I.E.L.D'
                                                billingAddress
                                                shippingAddress
                                                image='https://img.favpng.com/6/24/2/payment-computer-icons-money-logo-png-favpng-mb8H8Lt49yNLgQG8QZhQ6SNRv.jpg'
                                                description={`Donation to S.H.I.E.L.D`}
                                                amount={priceForStripe}
                                                panelLabel='Pay'
                                                token={onToken}
                                                stripeKey={publishableKey}
                                            />
                                        </Box>
                                    </Box>
                                    <Box mb="2vh" p={3} display="flex" alignItems={"center"} justifyContent="space-between" >
                                        <Progress borderRadius={"14px"} value={50} size='xs' w="70%" colorScheme='blue' />
                                        <Text>1000/2000</Text>
                                    </Box>
                                </Box>

                            </Box>
                        )
                    })
                }
            </VStack>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Donation Form</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <FormControl>
                                <FormLabel>Name :</FormLabel>
                                <Input onChange={(e) => { setname(e.target.value) }} type='text' placeholder='Enter name' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>description(why you need help) :</FormLabel>
                                <Textarea onChange={(e) => setdescription(e.target.value)} resize={"none"} placeholder='Describe your condition' />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Amount needed(in INR) :</FormLabel>
                                <Input onChange={(e) => setamount(e.target.value)} type='number' placeholder='Enter amount' />
                            </FormControl>

                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Box w="full" display={"flex"} justifyContent="right">
                            <Box w="65%" display={"flex"} justifyContent="space-between">
                                <Button bg="gray.200" onClick={onClose}>
                                    Close
                                </Button>
                                <Button isLoading={loading} colorScheme='blue' onClick={handleSubmit} mr={3}>Submit</Button>
                            </Box>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default Donations
