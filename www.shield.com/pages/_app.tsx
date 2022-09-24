import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, position } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { auth, firestore } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [geoLocation, setGeoLocation] = useState<any>([])

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setGeoLocation([position.coords.latitude, position.coords.longitude])
      console.log("geoLocation: ", geoLocation)
    });
  
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const lat: number = geoLocation[0]
      const lng: number = geoLocation[1]
      if(user && lat && lng) {
        updateDoc(doc(firestore, "users", user.uid), {
          lat: lat,
          lng: lng
        }).then(() => {
          console.log("update location done")
        }).catch((e) => {
          console.log("error updating location, ", e)
        })
      }
    })
  },[geoLocation])
  

  return (
    <ChakraProvider>
      
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
