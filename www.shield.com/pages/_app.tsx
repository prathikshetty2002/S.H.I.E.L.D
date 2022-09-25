import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, position } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { auth, firestore } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [geoLocation, setGeoLocation] = useState<any>([])

  useEffect(() => {
if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            getLocation()
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            console.log(result.state);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  },[])

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setGeoLocation([position.coords.latitude, position.coords.longitude])
      console.log("geoLocation: ", geoLocation)
    });
  }

  function setupLandbot() {
    // @ts-ignore
    new Landbot.Livechat({
      configUrl: "https://storage.googleapis.com/landbot.online/v3/H-1375501-J64G5MJIRVVAU5CN/index.json"
    });
  }

  // useEffect(()=> {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //     setGeoLocation([position.coords.latitude, position.coords.longitude])
  //     console.log("geoLocation: ", geoLocation)
  //   });
  
  // }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const lat: number = geoLocation[0]
      const lng: number = geoLocation[1]
      if(user && lat && lng) {
        updateDoc(doc(firestore, "users", user.uid), {
          latitude: lat,
          longitude: lng
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
      <Script
  strategy="lazyOnload"
  src="https://static.landbot.io/landbot-3/landbot-3.0.0.js"
  onLoad={setupLandbot}
/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
