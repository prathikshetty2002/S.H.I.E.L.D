import { Box, Container, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import Map from '../components/Map';

const DEFAULT_CENTER = [51.51, -0.12]

const Home: NextPage = () => {
  return (
    <Box>
      <Navbar />

      <Box zIndex="base" position={"fixed"} >
      <Map className="homeMap" center={DEFAULT_CENTER} zoom={12}>
            <>

            </>

        </Map>          
      </Box>
    </Box>
  )
}

export default Home
