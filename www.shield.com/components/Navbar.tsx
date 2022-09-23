import { Box, Button, Container, Heading, Input, ModalBody, ModalFooter, ModalHeader, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import { auth } from '../firebase'
import { useRouter } from "next/router"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useToast
} from '@chakra-ui/react'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import React, { useState } from "react"

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

const Navbar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenmodal, onOpen: onOpenmodal, onClose: onClosemodal } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast()
    const [number, setnumber] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [stepnum, setstepnum] = useState<number>(1)
    const [otp,setotp] = useState('')
    const router = useRouter()


    const handleClick = async () => {
        if(!number){
            toast({
                title: 'Empty field',
                description: "Number length mismatch",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            return
        }

        if (number.length != 10) {
            toast({
                title: 'Invalid Number',
                description: "Number length mismatch",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            return
        }

        // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        //     'size': 'normal',
        //     'callback': (response) => {
        //         onSigninSubmit()
        //     }
        // }, auth);

        setstepnum(2)
    }

    const handleverify = async()=>{

    }

    // function onSigninSubmit() {
    //     const phoneNumber = "+91" + number;
    //     const appVerifier = window.recaptchaVerifier;
    //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //         .then((confirmationResult) => {
    //             // SMS sent. Prompt user to type the code f
                
    //             rom the message, then sign the
    //             // user in with confirmationResult.confirm(code).
    //             window.confirmationResult = confirmationResult;
    //             alert("otp sended")
    //             // ...
    //         }).catch((error) => {
    //             // Error; SMS not sent

    //         });
    // }


    // function verifyotp() {
    //     window.confirmationResult.confirm(otp).then((result) => {
    //         // User signed in successfully.
    //         const user = result.user;
    //         // ...
    //     }).catch((error) => {
    //         // User couldn't sign in (bad verification code?)
    //         // ...
    //     });

    // }

    const handleCommunity = ()=>{
            router.push('/community')
    }

    return (
        <>
            <Box p={3} alignItems="center" w="full" bg={"aqua"} display="flex" justifyContent={"space-between"} >
                <Box>
                    <Heading fontSize={"20px"}>S.H.I.E.L.D</Heading>
                </Box>
                <Button bg="aqua" onClick={onOpen} ref={btnRef} display={"flex"}>
                    <HamburgerIcon h={7} w={7} />
                </Button>

            </Box>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>S.H.I.E.L.D</DrawerHeader>

                    <DrawerBody>
                        <VStack w="full" >
                            <Box w="full" p={2}><Text fontSize={"18px"}>Home</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"}>Profile</Text></Box>
                            <Box w="full" p={2} onClick={handleCommunity}><Text fontSize={"18px"}>Community</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"}>Explore Safe spot</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"}>Donation</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"}>Reedem</Text></Box>

                        </VStack>
                    </DrawerBody>
                    {/* home ,profile , community ,explore safe spot , donation, redeem */}
                    <DrawerFooter>
                        <Button onClick={(e) => {
                            onOpenmodal();
                           setstepnum(1) }} bg="blue" color={"white"} w="full" fontSize={"18px"}>Login</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Modal maxW="90%" isOpen={isOpenmodal} onClose={onClosemodal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            stepnum == 1
                                ?
                                <FormControl  isRequired>
                                    <FormLabel>Phone number</FormLabel>
                                    <Input required id="phone" value={number} onChange={(e) => setnumber(e.target.value)} type='number' placeholder="Enter phone number" />
                                    <FormHelperText>We'll never share your phone number</FormHelperText>
                                    <div id="recaptcha-container"></div>
                                </FormControl>
                                :
                                <FormControl isRequired>
                                    <FormLabel>Enter otp</FormLabel>
                                    <Input required id="otp" value={otp} onChange={(e) => setotp(e.target.value)} type='number' placeholder="Enter otp" />
                                    <FormHelperText>Never share your otp with anyone</FormHelperText>
                                    <div id="recaptcha-container"></div>
                                </FormControl>

                        }
                        </ModalBody>


                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}   onClick={onClosemodal}>
                            Close
                        </Button>
                        {
                            stepnum
                            ?
                            <Button variant='ghost' isLoading={loading} onClick={handleClick}>Submit</Button>
                            :
                            <Button variant='ghost'  onClick={handleverify}>verify</Button>

                        }

                        
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Navbar