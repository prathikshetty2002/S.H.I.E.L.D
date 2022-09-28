import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import { useMap, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import marker from '/public/MarkerIcons/community.png'
import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import { safeHouse } from './SafeHouse';
import SafeSpots from './SafeSpots';
import NaturalDisasters from './NaturalDisasters';
import UserReports from './UserReports';
import { mymarker } from './MyMarker';

const { MapContainer } = ReactLeaflet;
const DEFAULT_CENTER = [77.07695,
    28.83979]
    

const bounds = [
  [51.49, -0.08],
  [51.5, -0.06],
]
const myIcon = new L.Icon({
  iconUrl: "/MarkerIcons/community.png",
  iconRetinaUrl: "/MarkerIcons/community.png",
  popupAnchor:  [-0, -0],
  iconSize: [32,45],     
});

interface IMap extends ReactLeaflet.MapContainerProps {
  children: React.ReactNode,
  className: string
}

const Map:React.FC<IMap> = ({ children, className, ...rest }) => {
  let mapClassName = styles.map;
  
  const [geoLocation, setGeoLocation] = useState<any>(null)

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          setGeoLocation([position.coords.latitude, position.coords.longitude])
          // console.log("geoLocation: ", geoLocation)
      });
  }, [])
  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {

  },[])

  // function GetIcon(_iconSize){
  //   return L.icon(Option:{
  //     iconUrl:require("www.shield.com\public\MarkerIcons\community.png"),
  //     iconSize: [_iconSize]
  //   })
  //   }
  function MyComponent() {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
  }
  

    
  useEffect(() => {
    (async function init() {
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      // L.map('Map_map__xIdpF', { zoomControl: false });
      L.marker([51.543, -0.12], {
        icon: myIcon,
      });
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);


  return (
    <MapContainer className={mapClassName} {...rest}>
        {/* <MapConsumer>
        {(map: any) => children(ReactLeaflet, map)}
      </MapConsumer> */}
      {children}
      <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              
              <SafeSpots />
              <NaturalDisasters />
              <UserReports />
              {geoLocation && <Marker  position={[geoLocation[0], geoLocation[1]]}>
                <Popup>
                  You are here
                </Popup>
              </Marker>}
              

      <MyComponent />
    </MapContainer>
  )
}

export default Map;