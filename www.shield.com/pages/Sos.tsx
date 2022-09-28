import type { NextPage } from 'next'
import { Box, Button, Select, Text, VStack } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { ArrowRightIcon} from '@chakra-ui/icons'


const Sos: NextPage = () => {
    const[inputval,setinputval] = useState("")
    const [ info,setinfo] = useState<string[]>()

    const handleSubmit = ()=>{
        let arr = []
        if(inputval == '1'){
            console.log("yess")
            arr = [
               "Cover your nose and mouth Your room, or your home, will start filling up with smoke very quickly, and chances are, you’re going to have to pass through it in order to get out. Breathing in too much smoke can cause you to pass out. But you can fight back by wetting a cloth and holding it over your nose and mouth." ,
               "Stay low to the ground Covering your nose and mouth might only buy you a few extra minutes, but in life and death, every second counts.",
                " Check every door In a house fire, a closed door can either save you or stop you in your tracks. As you pass from one room to another, remember to close doors behind you to help prevent the fire from spreading any faster. Fires need oxygen to survive, so by closing doors, you’re cutting off the free flow of oxygen between rooms." ,  
                " Stop, drop, and roll It’s the moment you’ve been waiting for. Yes, firefighters still stand by this mantra. If your clothes ever catch fire, rolling back and forth will smother the flames, so you can get back on track." 
         ]
        }
        else  if(inputval == '2'){
            arr = ["Seek medical care imediately after a car accident, The longer you wait to seek medical care, the higher risk you have of injuries worsening and requiring a more extensive recovery period. Left untreated, accident injuries like whiplash and herniated spinal discs may lead to chronic pain in the future.", "Avoid slips and falls, Repair damage to flooring that could cause someone to trip and keep hallways clear of clutter. Outside, ensure all walkways are shoveled and salted immediately after snow falls. ", "Be aware of electrical hazards, If you have several items plugged in at desks, make sure you invest in an Uninterruptible Power Supply to protect computers and keep the power from spiking. If renovations are being done that involve electrical systems, move staff to a safe work area. ", "Promote fire safety, Identify potential fire hazards in your office and train staff how to use fire extinguishers.", "Keep a well-stocked first aid kit in plain sight If you have a large office, place several kits throughout the area and make sure someone on staff is trained in first aid."]
        }
        else if(inputval == '3'){
            arr = ["In case of bleeding, Uncover bleeding wound. Stop bleeding by direct pressure on the wound with thick pad of bandage or cloth.", "Bleeding limbs should be elevated to prevent bleeding. Do not remove foreign objects from bleeding wound.", "In case of Restoring breath, Turn the victim onto the back and start mouth-to-mouth resuscitation immediately.Tilt head back, support jaw, keep your fingers clear of throat; With good mouth to mouth seal and your cheek sealing the victim's nose, blow into the mouth until the chest rises", "In case of Clearing Airway, Put the victim on ground very gently and cautiously without vigorous handling to prevent further injury. Turn the victim to one side. Loosen clothing at neck, chest and waist. Tilt the head back, point the face slightly down so the tongue can fall forward allowing blood and vomit to drain out."]
        }
        else if(inputval == '4'){
            arr = ["Don't look like an easy target.  Robbers want someone who will provide the least resistance. If you look like you know where you are going, walk with your head up and eyes alert, you will most likely be left alone. ", "Show confidence.  Walk at a steady pace, keep your head up and avoid carrying lots of packages…It can make you look defenseless.", "Be aware of your surroundings. If you think you are being followed, go to a crowded area.", "Walk in well-lit areas. If possible, do not walk alone.", "Be observant."]
        }
        else{
            arr = [" Protecting health facilities from mob violence, for example, by implementing an acceptance strategy to reduce the likelihood of your facility and staff becoming targets, and increasing the security of your facility.", "Putting in place measures to prepare the facility and staff in the event of an emergency, for example, emergency contacts, first aid kits and evacuation routes to support staff with responding to an incident of mob violence."]
        }
        setinfo(arr)

    }
    return (
        <Box p={4} >
            <Navbar />
            <Box mt="14vh" >
            <Text as="b" mb={"2vw"}  display={"block"} fontSize={"3xl"}>Save Our Souls</Text>
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
                <VStack mt="2vh">
                {
                    info && 
                    info.map((i:any,key:any)=>{
                        return(
                            <Box w="90%" key={key}>
                                <Box >
                                
                                <Text><ArrowRightIcon /> {i}</Text>
                                </Box>
                                <br />
                            </Box>
                        )
                    })
                }
                </VStack>
            </Box>



        </Box>
    )
}

export default Sos
