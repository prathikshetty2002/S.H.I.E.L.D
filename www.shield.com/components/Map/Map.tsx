import { useEffect } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import { SVGOverlay } from 'react-leaflet/SVGOverlay';

import { CircleMarker } from 'react-leaflet/CircleMarker';

import 'leaflet/dist/leaflet.css';
import marker from '/public/MarkerIcons/community.png'
import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const { MapContainer, MapConsumer } = ReactLeaflet;
const DEFAULT_CENTER = [51.54, -0.12]

const data = [{"lat": 23.59, "lng": 85.56}, {"lat": 9.19, "lng": 92.77}, {"lat": -4.18, "lng": 37.83}, {"lat": 4.73, "lng": 11.1},{"lat": 5.49, "lng": 10.85}, {"lat": 1.4, "lng": 9.51}, {"lat": -10.61, "lng": 29.3}, {"lat": -9.27, "lng": 35.04}, {"lat": -6.22, "lng": 30.59}, {"lat": 1.5, "lng": 30.03}, {"lat": 1.17, "lng": 28.76}, {"lat": 1.71, "lng": 15.95}, {"lat": 2.2, "lng": 22.61}, {"lat": 0.679, "lng": 34.77}]
const redOptions = { color: 'red' }

const bounds = [
  [51.49, -0.08],
  [51.5, -0.06],
]
const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor:  [-0, -0],
  iconSize: [32,45],     
});
const Map = ({ children, className, ...rest }) => {
  let mapClassName = styles.map;
  

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
    const map = useMap({
      zoomControl: false
    })
    console.log('map center:', map.getCenter())
    return null
  }
  

    
  useEffect(() => {
    (async function init() {
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
              
              <Marker position={DEFAULT_CENTER}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              {data.map(d => (
              <CircleMarker center={[d.lat, d.lng]} pathOptions={redOptions} radius={20}>
              <Popup>Popup in CircleMarker</Popup>
              </CircleMarker>

              ))}
             <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
              <>
             <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

</>
             </SVGOverlay>
      <MyComponent />
    </MapContainer>
  )
}

export default Map;