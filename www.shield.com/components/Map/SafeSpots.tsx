import { safeHouse } from "./SafeHouse"
import { Marker, Popup } from 'react-leaflet';
import { Box, Button, Text } from "@chakra-ui/react";
import {PhoneIcon} from "@chakra-ui/icons"


const SafeSpots: React.FC = () => {

    return (
        <>

        {
            data.map(d => (
<Marker key={d.UID} icon={safeHouse} position={[d.Lattitude, d.Longitude]}>
                <Popup>
                <Box>
                    <Text fontSize={"lg"} as="b" >{d.Name}</Text> <br />
                    <Text fontSize={"md"} as="i" >{d.Type}</Text>
                    <Text fontSize={"sm"} >{d.Address}
                    <br />
                    {d.POC}
                    <br />
                    {d.Contact}
                    </Text>
                    <a href={`https://www.google.com/maps/dir/?api=1&origin=48.819141912303,2.2297863639837&destination=${d.Lattitude},${d.Longitude}`} > <Button size={"sm"} >Go Here</Button> </a>
                    <a href={`tel:${d.Contact}`}> 
                    <Button size="sm" >
                        <PhoneIcon />
                    </Button>
                    </a>
                </Box>
                </Popup>
              </Marker>
            )) 
        }

        
        </>
    )
}

export default SafeSpots

const data = [
    {
      "UID": "S101",
      "Name": "Aadarsh Mahila Kalyan Samiti - NGO",
      "Type": "Women Safety",
      "Address": "G-61, Jai Vihar Extn. Baprola, Najafgarh, New Delhi-110043",
      "POC": "MS Kusum Lata",
      "Contact": 9953574650,
      "State/UT": "New delhi",
      "City": "New delhi",
      "Lattitude": 28.63902,
      "Longitude": 76.96103,
      "": "",
      "__1": ""
    },
    {
      "UID": "S102",
      "Name": "Animal Protection And Human Welfare Trust - NGO",
      "Type": "Animal Safety",
      "Address": "KHANDAKPAR, NEAR DEVI ASTHAN, BIHARSHARIF, DISTT.- NALANDA, PIN NO.- 803 101, BIHAR, INDIA",
      "POC": "Mr Ashok Kumar",
      "Contact": 9708338445,
      "State/UT": "Bihar",
      "City": "Nalanda",
      "Lattitude": 25.19729,
      "Longitude": 85.52374,
      "": "",
      "__1": ""
    },
    {
      "UID": "S103",
      "Name": "THE YOUNGCITIZEN OF INDIA CHERITABLE TRUST - NGO",
      "Type": "Welfare",
      "Address": "16,VITTHAL PARK SOCIATY-2 OPP-URBANBANK MALGODOWN ROAD MEHSANA-2",
      "POC": "MS SONAL A MEHTA",
      "Contact": 9825438606,
      "State/UT": "Gujrat",
      "City": "Mehsana",
      "Lattitude": 23.60222,
      "Longitude": 72.39799,
      "": "",
      "__1": ""
    },
    {
      "UID": "S104",
      "Name": "The We Foundation",
      "Type": "Flood Relief",
      "Address": "2A, Regent Tower,121/1, NSC Bose Road,Tollygunge, Kolkata-700 040",
      "POC": "Ms Nabanita Banerjee",
      "Contact": 7439786398,
      "State/UT": "Kolkata",
      "City": "Tollygunge",
      "Lattitude": 22.54954,
      "Longitude": 88.36216,
      "": "",
      "__1": ""
    },
    {
      "UID": "S105",
      "Name": "The Smile Foundation",
      "Type": "Disaster support",
      "Address": "101, First Floor Gladdiola Above Kotak Bank, Hanuman Road,\nVille Parle East, Mumbai - 400 057",
      "POC": "MS Unnati Baranwal",
      "Contact": 8076057177,
      "State/UT": "Maharashtra",
      "City": "Mumbai",
      "Lattitude": 19.10146,
      "Longitude": 72.8489,
      "": "",
      "__1": ""
    },
    {
      "UID": "S106",
      "Name": "The Smile Foundation",
      "Type": "Disaster support",
      "Address": "H. No. 12-13-1143, Near Narayana High School Lane\nSecunderabad - 500017",
      "POC": "MS Unnati Baranwal",
      "Contact": 8076057178,
      "State/UT": "Andhra Pradesh",
      "City": "Hyderabad",
      "Lattitude": 3.11642,
      "Longitude": 101.6458,
      "": "",
      "__1": ""
    },
    {
      "UID": "S107",
      "Name": "The Smile Foundation",
      "Type": "Disaster support",
      "Address": "4/44, first floor,\nSai Gokul Villa, Kutty Street, Nungambakkam, Chennai - 600034",
      "POC": "MS Unnati Baranwal",
      "Contact": 8076057179,
      "State/UT": "Tamil Nadu",
      "City": "Chennai",
      "Lattitude": 13.06221,
      "Longitude": 80.23956,
      "": "",
      "__1": ""
    },
    {
      "UID": "S108",
      "Name": "The Smile Foundation",
      "Type": "Disaster support",
      "Address": "NO.14, Buddha Vihar Road, Sinnou Elegance Apartment, Flat No.103,\nFrazer Town, Banglore - 560005",
      "POC": "MS Unnati Baranwal",
      "Contact": 8076057180,
      "State/UT": "Karnataka",
      "City": "Bangalore",
      "Lattitude": 26.815004,
      "Longitude": 87.270232,
      "": "",
      "__1": 0
    },
    {
      "UID": "S109",
      "Name": "THE CAF INDIA",
      "Type": "Relief Management",
      "Address": "Plot / Site No.2, First Floor,Sector C (OFC Pocket),Nelson Mandela Marg,Vasant Kunj,New Delhi - 110070",
      "POC": "Mr Anil Kumar",
      "Contact": 9564788709,
      "State/UT": "New delhi",
      "City": "New delhi",
      "Lattitude": 28.53308,
      "Longitude": 77.1507,
      "": "",
      "__1": ""
    },
    {
      "UID": "S110",
      "Name": "Rapid Response",
      "Type": "Relief Management",
      "Address": "Vysial Street,Heritage Town,Pondicherry",
      "POC": "Mr. Farukh",
      "Contact": 9884802017,
      "State/UT": "Pondicherry",
      "City": "Pondicherry",
      "Lattitude": 11.93758,
      "Longitude": 79.83483,
      "": "",
      "__1": ""
    },
    {
      "UID": "S111",
      "Name": "Hind Rise",
      "Type": "Food & Shelter",
      "Address": "B-78, Block B, Sector 60, Noida, Uttar Pradesh",
      "POC": "Mr Jayesh Kumar",
      "Contact": 9876988765,
      "State/UT": "Uttarpradesh",
      "City": "Noida",
      "Lattitude": 28.60609,
      "Longitude": 77.3625,
      "": "",
      "__1": ""
    },
    {
      "UID": "S112",
      "Name": "Swasth Foundation",
      "Type": "Health Relief",
      "Address": "Mastermind 1, Royal Palms Estate,Aarey Colony, Goregaon (East),Mumbai 400 065",
      "POC": "Mr Ashutosh Pandey",
      "Contact": 9870985049,
      "State/UT": "Maharashtra",
      "City": "Mumbai",
      "Lattitude": 19.15053,
      "Longitude": 72.88976,
      "": "",
      "__1": ""
    },
    {
      "UID": "S113",
      "Name": "Our Help Foundation",
      "Type": "Disaster Relief",
      "Address": "11th street, Near post office, Bhopal, Madhya Pradesh",
      "POC": "Ms Shruti Mishra",
      "Contact": 8977654092,
      "State/UT": "Madhya Pradesh",
      "City": "Bhopal",
      "Lattitude": 23.252319,
      "Longitude": 77.431091,
      "": "",
      "__1": ""
    },
    {
      "UID": "S114",
      "Name": "Goonj Foundation",
      "Type": "Relief Cares",
      "Address": "J-93, Sarita colony,Vizag 110076",
      "POC": "Mr Hrishikesh Reddygaru",
      "Contact": 9870954378,
      "State/UT": "Telangana",
      "City": "Vizag",
      "Lattitude": 17.686815,
      "Longitude": 83.218483,
      "": "",
      "__1": ""
    },
    {
      "UID": "S115",
      "Name": "Genosisx Reliefs",
      "Type": "Welfare",
      "Address": "Office 13A, Atria city mall, Mangalore, Karnataka",
      "POC": "Mr Prathik Shetty",
      "Contact": 9326344675,
      "State/UT": "Karnataka",
      "City": "Mangalore",
      "Lattitude": 12.914142,
      "Longitude": 74.855957,
      "": "",
      "__1": ""
    }
  ]