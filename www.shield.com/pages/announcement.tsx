import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Navbar from '../components/Navbar'


const announcement: NextPage = () => {


  return (
    <Box>
        <Navbar/>
        <Box mt={"12vh"}>
            <VStack spacing={"2vh"}>
                <Box>
                    <Heading>Important announcements</Heading>
                </Box>
                <Box w="90%" borderRadius={"14px"} p={3} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}>
                    <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum facere error ullam temporibus, omnis voluptatem vel qui, earum amet maxime laboriosam quae inventore placeat beatae quod architecto explicabo unde assumenda?</Text>
                </Box>
                <Box borderRadius={"14px"} p={3} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} w="90%" borderRadius={"14px"} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}>
                    <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum facere error ullam temporibus, omnis voluptatem vel qui, earum amet maxime laboriosam quae inventore placeat beatae quod architecto explicabo unde assumenda?</Text>
                </Box>
                <Box borderRadius={"14px"} p={3} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} w="90%">
                    <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum facere error ullam temporibus, omnis voluptatem vel qui, earum amet maxime laboriosam quae inventore placeat beatae quod architecto explicabo unde assumenda?</Text>
                </Box>
                
            </VStack>
        </Box>
     
    </Box>
  )
}

export default announcement
