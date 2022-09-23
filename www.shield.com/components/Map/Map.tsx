import { useEffect } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';

import { CircleMarker } from 'react-leaflet/CircleMarker';

import 'leaflet/dist/leaflet.css';

import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const { MapContainer } = ReactLeaflet;
const DEFAULT_CENTER = [51.54, -0.12]

const data = [{"lat": 23.59, "lng": 85.56}, {"lat": 9.19, "lng": 92.77}, {"lat": -4.18, "lng": 37.83}, {"lat": 4.73, "lng": 11.1},{"lat": 5.49, "lng": 10.85}, {"lat": 1.4, "lng": 9.51}, {"lat": -10.61, "lng": 29.3}, {"lat": -9.27, "lng": 35.04}, {"lat": -6.22, "lng": 30.59}, {"lat": 1.5, "lng": 30.03}, {"lat": 1.17, "lng": 28.76}, {"lat": 1.71, "lng": 15.95}, {"lat": 2.2, "lng": 22.61}, {"lat": 0.679, "lng": 34.77}]
const redOptions = { color: 'red' }

const Map = ({ children, className, ...rest }) => {
  let mapClassName = styles.map;
  

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {

  },[])


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
              <CircleMarker center={[d.lat, d.lng]} pathOptions={redOptions}  radius={20}>
              <Popup>Popup in CircleMarker</Popup>
            </CircleMarker>
              ))}


      <MyComponent />
    </MapContainer>
  )
}

export default Map;