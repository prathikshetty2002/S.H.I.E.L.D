import { Box, Container, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import Map from '../components/Map';
import { useEffect } from 'react';

const DEFAULT_CENTER = [21.6983,
  79.9585]

const Home: NextPage = () => {

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  })

  return (
    <Box>
      <Navbar />

      <Box zIndex="base" position={"fixed"} >
      <Map className="homeMap" center={DEFAULT_CENTER} zoom={12}>
            <>

            </>

        </Map>          
        {/* <Map /> */}
      </Box>
    </Box>
  )
}

export default Home
