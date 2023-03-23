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
                    <Text>Attention residents of Dhule, heavy flooding is occurring in the area. Please remain in your homes and avoid traveling on flooded roads. If you are in a low-lying area, please move to higher ground. Emergency services are on alert and will provide assistance as needed</Text>
                </Box>
                <Box borderRadius={"14px"} p={3} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} w="90%" >
                    <Text>Attention residents, a wildfire is approaching the area. Please evacuate immediately and follow the designated evacuation routes. Take only essential items with you and leave pets and livestock behind, if necessary. Stay tuned to local news and social media for updates on the fire spread progress.</Text>
                </Box>
                <Box borderRadius={"14px"} p={3} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} w="90%">
                    <Text>This is an earthquake alert for the region. Please drop, cover, and hold on until the shaking stops. If you are outside, move away from buildings and other structures. If you are driving, pull over to a safe area and stay inside your vehicle until the shaking stops.</Text>
                </Box>
                
            </VStack>
        </Box>
     
    </Box>
  )
}

export default announcement
