import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react/typed";
import { LineLayer } from "@deck.gl/layers/typed";
// import {StaticMap, MapContext, NavigationControl} from "react-map-gl"
import Map, { MapProvider } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import {FlyToInterpolator} from '@deck.gl/core/typed';
import UserReports from "../../utils/mapLayers/userReports";
import {ScatterplotLayer} from '@deck.gl/layers/typed';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
console.log(
  "MAPBOX_ACCESS_TOKEN:",
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
);

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

const MAP_STYLE = "mapbox://styles/mapbox/streets-v11";

// DeckGL react component
function  MyMap() {
  const [geoLocation, setGeoLocation] = useState<any>(null)
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          setGeoLocation([position.coords.latitude, position.coords.longitude])
          // console.log("geoLocation: ", geoLocation)
      });
  }, [])
  const [layers, setLayers] = useState<any[]>()
  useEffect(() => {
    const getLayers = async () => {
      const userReportsLayer = await UserReports()
      setLayers([new LineLayer({ id: "line-layer", data }),  userReportsLayer,]);
    }
    getLayers()
  },[])

  useEffect(() => {
    console.log("layers: ",layers)
  },[layers])

  const [viewState, setViewState] = useState<any>({
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
  pitch: 0,
  bearing: 0,
  });

  const transitionInterpolator= new FlyToInterpolator({speed: 3, maxDuration: 3000})

  return (
    <>
      <Button onClick={() => {
        setViewState({
          longitude: geoLocation[1],
          latitude: geoLocation[0],
          zoom: 13,
          transitionDuration: "auto",
          transitionInterpolator
        })
      }} zIndex={"docked"} rounded="full" p="3" height="16" width="16" position={"fixed"} bottom={"100"} right="5" >
        
        <Image height="30" width="30"  src="/current-location-icon.svg" />
      </Button>
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
        controller={true}
        layers={layers}
        width="100vw"
        height="100vh"
        // ContextProvider={MapContext.Provider}
      >
        {/* <MapProvider> */}
        <Map mapboxAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle={MAP_STYLE} />
        {/* </MapProvider> */}
      </DeckGL>
    </>
  );
}

export default MyMap;
