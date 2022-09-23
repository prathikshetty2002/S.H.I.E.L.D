import { useEffect } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';


import 'leaflet/dist/leaflet.css';

import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const { MapContainer, MapConsumer } = ReactLeaflet;
const DEFAULT_CENTER = [38.907132, -77.036546]


const Map = ({ children, className, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {

  },[])


  function MyComponent() {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
  }

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

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
      <MyComponent />
    </MapContainer>
  )
}

export default Map;