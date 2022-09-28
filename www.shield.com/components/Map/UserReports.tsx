import { Text } from '@chakra-ui/layout';
import { collection, getDocs } from '@firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
// import { Popup } from 'react-leaflet/Popup';
import { firestore } from '../../firebase';

const UserReports: React.FC = () => {

    const [data, setData] = useState<any[]>()

    useEffect(() => {

        const fetchData = async () => {

            const docs = await getDocs(collection(firestore, "reportincident"))

            let data: any[] = [] 
            docs.forEach(d => {
                data.push({
                    id: d.id,
                    ...d.data()
                })
            })
            console.log(data)
            setData(data)
        }

        fetchData()
    },[])

    return (
        <>
            {data?.map(d => (
                <CircleMarker key={d.id} center={[d.latitude, d.longitude]} pathOptions={{ color: 'red' }} radius={20}>
                    <Popup>
                        <img src={d.imgurl}  style={{objectFit: "contain"}}  />
                        <Text fontSize={"xl"} >{d.description}</Text>
                        <Text fontSize={"lg"}>{d.types}</Text>
                    </Popup>
                </CircleMarker>
            ))}
        </>
    )
}

export default UserReports


// const data = [{ "lat": 23.59, "lng": 85.56 }, { "lat": 9.19, "lng": 92.77 }, { "lat": -4.18, "lng": 37.83 }, { "lat": 4.73, "lng": 11.1 }, { "lat": 5.49, "lng": 10.85 }, { "lat": 1.4, "lng": 9.51 }, { "lat": -10.61, "lng": 29.3 }, { "lat": -9.27, "lng": 35.04 }, { "lat": -6.22, "lng": 30.59 }, { "lat": 1.5, "lng": 30.03 }, { "lat": 1.17, "lng": 28.76 }, { "lat": 1.71, "lng": 15.95 }, { "lat": 2.2, "lng": 22.61 }, { "lat": 0.679, "lng": 34.77 }]
