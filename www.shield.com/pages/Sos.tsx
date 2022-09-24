import type { NextPage } from 'next'
import { Box, Button, Select } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useState } from 'react'


const Sos: NextPage = () => {
    const[inputval,setinputval] = useState("")

    const handleSubmit = ()=>{
        let arr = []
        if(inputval == 1){
            console.log("yess")
            arr = [
               "Cover your nose and mouth Your room, or your home, will start filling up with smoke very quickly, and chances are, you’re going to have to pass through it in order to get out. Breathing in too much smoke can cause you to pass out. But you can fight back by wetting a cloth and holding it over your nose and mouth." ,
               "Stay low to the ground Covering your nose and mouth might only buy you a few extra minutes, but in life and death, every second counts.",
                " Check every door In a house fire, a closed door can either save you or stop you in your tracks. As you pass from one room to another, remember to close doors behind you to help prevent the fire from spreading any faster. Fires need oxygen to survive, so by closing doors, you’re cutting off the free flow of oxygen between rooms." ,  
                " Stop, drop, and roll It’s the moment you’ve been waiting for. Yes, firefighters still stand by this mantra. If your clothes ever catch fire, rolling back and forth will smother the flames, so you can get back on track." 
         ]
        }

    }
    return (
        <Box>
            <Navbar />
            <Box>
            <Box mt={"12vh"} p={2} display="flex" justifyContent={"center"}>
                <Select onChange={(e)=>setinputval(e.target.value)} w="80%" placeholder='Select option'>
                    <option value='1'>Fire</option>
                    <option value='2'>Accident</option>
                    <option value='3'>Medical Emergency</option>
                    <option value='4'>roberry</option>
                    <option value='5'>Mob attack</option>
                </Select>
            </Box>
                <Box display="flex" justifyContent={"center"}>
                    <Button  onClick={handleSubmit} colorScheme="blue" w="80%">Submit</Button>
                </Box>
            </Box>



        </Box>
    )
}

export default Sos
