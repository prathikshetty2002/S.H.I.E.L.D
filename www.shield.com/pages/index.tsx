import { Box, Button, Container, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import Map from '../components/Map';
import { useEffect, useState } from 'react';

// const DEFAULT_CENTER = [21.6983,
//   79.9585]

const Home: NextPage = () => {
  const [geoLocation, setGeoLocation] = useState<any>(null)

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          setGeoLocation([position.coords.latitude, position.coords.longitude])
          // console.log("geoLocation: ", geoLocation)
      });
  }, [])
  return (
    <Box>
      <Navbar />

      <Box zIndex="base" position={"fixed"} >
      {geoLocation && <Map className="homeMap" center={[geoLocation[0], geoLocation[1]]} zoom={12} ><></></Map>}
              {/* <Map /> */}
      </Box >
      <Box bottom="5" width="100%" display={"flex"} justifyContent={"space-around"} zIndex="docked" position={"fixed"} >
        <Button>Report Incident</Button>
        <Button>SoS Emergency</Button>
      </Box>
    </Box>
  )
}

export default Home
