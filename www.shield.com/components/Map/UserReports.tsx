import { CircleMarker } from 'react-leaflet/CircleMarker';
import { Popup } from 'react-leaflet/Popup';

const UserReports: React.FC = () => {

    return (
        <>
            {data.map(d => (
                <CircleMarker center={[d.lat, d.lng]} pathOptions={{ color: 'red' }} radius={20}>
                    <Popup>Popup in CircleMarker</Popup>
                </CircleMarker>
            ))}
        </>
    )
}

export default UserReports


const data = [{ "lat": 23.59, "lng": 85.56 }, { "lat": 9.19, "lng": 92.77 }, { "lat": -4.18, "lng": 37.83 }, { "lat": 4.73, "lng": 11.1 }, { "lat": 5.49, "lng": 10.85 }, { "lat": 1.4, "lng": 9.51 }, { "lat": -10.61, "lng": 29.3 }, { "lat": -9.27, "lng": 35.04 }, { "lat": -6.22, "lng": 30.59 }, { "lat": 1.5, "lng": 30.03 }, { "lat": 1.17, "lng": 28.76 }, { "lat": 1.71, "lng": 15.95 }, { "lat": 2.2, "lng": 22.61 }, { "lat": 0.679, "lng": 34.77 }]
