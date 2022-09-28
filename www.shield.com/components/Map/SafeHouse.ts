import L from 'leaflet';

const safeHouse = new L.Icon({
    iconUrl: '/MarkerIcons/community.png',
    // iconAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(100, 100),
    className: 'leaflet-icon-safehouse'
});

export { safeHouse };
