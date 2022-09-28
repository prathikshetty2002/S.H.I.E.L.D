import L from 'leaflet';

const mymarker = new L.Icon({
    iconUrl: '/MarkerIcons/marker.png',
    // iconAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-icon-mymarker'
});

export { mymarker };
