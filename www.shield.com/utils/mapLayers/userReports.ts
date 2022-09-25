import { collection, getDocs } from "firebase/firestore"
import { firestore } from "../../firebase"
import {ScatterplotLayer} from '@deck.gl/layers/typed';

const UserReports = async () => {
    const docs = await getDocs(collection(firestore, "reportincident"))

    let data: any[] = [] 
    docs.forEach(d => {
        data.push({
            id: d.id,
            ...d.data()
        })
    })
    const layer = new ScatterplotLayer({
        id:"userReports-layer",
        data,
        pickable: true,
        filled: true,
        opacity: 0.6,
        stroked: false,
        radiusScale: 6,
        radiusMinPixels: 1,
        radiusMaxPixels: 500,
        lineWidthMinPixels: 1,
        getPosition: (d) => [ d.longitude, d.latitude],
        getFillColor: d => [255, 140, 0],
        getLineColor: d => [0, 0, 0],
        getRadius: d => 30,


    })

    return layer
}

export default UserReports