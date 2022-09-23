import { Box, Button, Input, useDisclosure, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import { storage } from '../firebase'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import {v4} from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'




const community: NextPage = () => {
    const hiddenFileInput = useRef(null)
    const handleClick = event => {
        hiddenFileInput.current.click();
    }

    const[loading,setLoading] = useState(false)


    const toast = useToast()
    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];
        setLoading(true)
        console.log("yess")

        try {
            const imgname = fileUploaded.name + v4()
            const imageref = ref(storage, `images/${imgname}`)
            await uploadBytes(imageref, fileUploaded)
            const link = await getDownloadURL(imageref)
            

        } catch (err) {
            toast({
                title: 'Error',
                description: "error",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            setLoading(false)
        }
        setLoading(false)
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
            <Navbar />
            <Box my={"2vh"}>
                <Box display={"flex"} w="full" justifyContent={"right"} p={2}>
                    <Button onClick={onOpen} colorScheme={"blue"}>Add post</Button>
                </Box>

                <Box p={2} >
                    <Modal isOpen={isOpen} onClose={onClose} >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box w="full" display={"flex"} justifyContent="center">
                                    <Button isLoading={loading} _hover={{ bg: "green" }} onClick={handleClick} bg="green" mt="2vh" textColor={"white"} cursor="pointer" borderRadius={"10px"} fontSize={"16px"} textAlign={"center"} htmlFor='inp'>
                                        Upload Images
                                        <Input onChange={handleChange} ref={hiddenFileInput} display={"none"} id="inp" type="file" />
                                    </Button>
                                </Box>

                                <Box mt="2vh">
                                    <Input placeholder='Enter text' />
                                </Box>
                            </ModalBody>

                            <ModalFooter>
                                <Box w="full" display={"flex"} justifyContent="space-around">
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme={"blue"}>Post</Button>
                                </Box>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>

            </Box>
        </Box>
    )
}

export default community