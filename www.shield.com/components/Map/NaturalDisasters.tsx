import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';


const NaturalDisasters:React.FC = () => {
    const [data, setData] = useState<any>([])
    useEffect(() => {
        console.log("process.env.PREDICTHQACCESSTOKEN: ", process.env.PREDICTHQACCESSTOKEN)
        fetch("https://api.predicthq.com/v1/events/?category=terror%2Csevere-weather%2Cdisasters&country=IN&offset=10", {
            headers: {
                "Authorization": `Bearer ${'B45S2sJiPOTw9f81Id4PEC172eK9rJQT_Bypa1QP'}`,
                "Accept": "application/json"
            },
}).then((res) => res.json()).then(data => {
    console.log("natural disaster daaata",data)
    setData(data.results)
})
// console.log("natural disaster daaata", daaata)

},[])

    return (
        <>
        {
            data?.map((d:any) => (
                <CircleMarker key={d.id} center={[d.location[1], d.location[0]]} pathOptions={{ color: 'red' }}  radius={25}>
              <Popup>
                <Box>
                    <Text fontSize={"lg"} as="b" >{d.title}</Text> <br />
                    <Text fontSize={"md"} as="i" >{d.labels.join(", ")}</Text>
                    <Text fontSize={"sm"} noOfLines={10} >{d.description}</Text>
                </Box>
              </Popup>
              </CircleMarker>
            ))
        }
        </>
    )
}

export default NaturalDisasters

const dataaa =[
    {"relevance": 0,
          "id": "GWHR3KWL6GqXyXwFsz",
          "title": "Fire in built environment - Asia - India",
          "description": "A fire broke out at a footwear manufacturing factory in the Narela area of the national capital on Friday, a fire department official said. The official informed that they received a call about the fire incident at 8.37 a.m. in the said factory at C 358, Narela Industrial Area, near MSC mall in northern Delhi after which as many as eight fire tenders were immediately pressed into the service. The official was unable to furnish any details regarding any injury or casualty in the incident. As per latest reports, the firefighting operation is currently underway.",
          "category": "disasters",
          "labels": [
            "disaster",
            "fire"
          ],
          "rank": 21,
          "local_rank": null,
          "aviation_rank": null,
          "phq_attendance": null,
          "entities": [],
          "duration": 0,
          "start": "2022-09-23T10:03:03Z",
          "end": "2022-09-23T10:03:03Z",
          "updated": "2022-09-23T10:10:50Z",
          "first_seen": "2022-09-23T10:10:38Z",
          "timezone": "Asia/Kolkata",
          "location": [
            77.07695,
            28.83979
          ],
          "geo": {
            "geometry": {
              "type": "Point",
              "coordinates": [
                77.07695,
                28.83979
              ]
            }
          },
          "scope": "locality",
          "country": "IN",
          "place_hierarchies": [
            [
              "6295630",
              "6255147",
              "1269750",
              "1273293",
              "8335427",
              "10261428"
            ]
          ],
          "state": "active",
          "brand_safe": true,
          "private": false
        },
    {
          "relevance": 0,
          "id": "FGcerAbbNZqpZ8ctvx",
          "title": "Storm - Asia - India",
          "description": "This is the detail for a severe weather event that has occurred. The original alert for this event is listed below. \n\nDetails of the original alert: \n\n Speed: 43m/s (83knots); Direction: NNE",
          "category": "severe-weather",
          "labels": [
            "storm",
            "weather"
          ],
          "rank": 21,
          "local_rank": null,
          "aviation_rank": null,
          "phq_attendance": null,
          "entities": [],
          "duration": 0,
          "start": "2022-09-23T09:00:00Z",
          "end": "2022-09-23T09:00:00Z",
          "updated": "2022-09-23T09:42:05Z",
          "first_seen": "2022-09-16T09:40:35Z",
          "timezone": "Asia/Kolkata",
          "location": [
            80.16,
            24.71
          ],
          "geo": {
            "geometry": {
              "type": "Point",
              "coordinates": [
                80.16,
                24.71
              ]
            }
          },
          "impact_patterns": [
            {
              "vertical": "retail",
              "impact_type": "phq_rank",
              "impacts": [
                {
                  "date_local": "2022-09-23",
                  "value": 21,
                  "position": "event_day"
                }
              ]
            }
          ],
          "scope": "region",
          "country": "IN",
          "place_hierarchies": [
            [
              "6295630",
              "6255147",
              "1269750",
              "1264542"
            ]
          ],
          "state": "active",
          "brand_safe": true,
          "private": false
        },
    {
          "relevance": 0,
          "id": "F5Ef9nahGJb4cV2BzU",
          "title": "Landslide - Asia - India",
          "description": "A landslide in Uttarakhand's Rudraprayag blocked National Highway-109 on Thursday as a part of a hill came crashing down near the Tarsali village. The road blockage led to a long queue of vehicles on both sides of the road. No casualty was reported as the passengers were warned by the locals before the debris fell. The highway is now being reopened and the movement of vehicles will resume, District Magistrate (DM) Mayur Dixit told news agency ANI. \"The passengers were stopped at safe places. The highway is being opened. Once the debris is cleared, safe vehicular movement will resume,\" he said. While the pilgrims going towards Kedarnath were stopped at Rudraprayag, Tilwara, Agastyamuni, and Guptkashi, those returning from Sonprayag were stopped at safe places in Sonprayag and Sitapur.",
          "category": "disasters",
          "labels": [
            "disaster",
            "landslide"
          ],
          "rank": 21,
          "local_rank": null,
          "aviation_rank": null,
          "phq_attendance": null,
          "entities": [],
          "duration": 0,
          "start": "2022-09-22T11:11:00Z",
          "end": "2022-09-22T11:11:00Z",
          "updated": "2022-09-22T11:15:55Z",
          "first_seen": "2022-09-22T11:15:40Z",
          "timezone": "Asia/Kolkata",
          "location": [
            79.01099,
            30.6171
          ],
          "geo": {
            "geometry": {
              "type": "Point",
              "coordinates": [
                79.01099,
                30.6171
              ]
            }
          },
          "scope": "locality",
          "country": "IN",
          "place_hierarchies": [
            [
              "6295630",
              "6255147",
              "1269750",
              "1444366",
              "8739870",
              "1254186"
            ]
          ],
          "state": "active",
          "brand_safe": true,
          "private": false
        },
    ]