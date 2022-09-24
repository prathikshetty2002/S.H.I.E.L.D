import type { NextPage } from 'next'
import { Box, Img, Text, VStack } from '@chakra-ui/react'
import { collection, getDocs, query } from '@firebase/firestore';
import { firestore } from '../firebase';
import { useEffect, useState } from 'react';



const DisplayPosts: React.FC = () => {

    const [data, setdata] = useState<any>([])

    const loadPosts = async () => {
        const q = query(collection(firestore, "posts"));
        const querySnapshot = await getDocs(q);

        setdata([])
        querySnapshot.forEach((doc) => {
            let obj = doc.data()
            obj["id"] = doc.id
            setdata((data: any) => [...data,obj])
            console.log(data)
        });
    }

    useEffect(() => {
        loadPosts()
    }, [])

    return (
        <Box p={4}>
            <VStack spacing={'4vh'} >
                {data &&
                    data.map((d: any) => {
                        return (
                            <Box borderRadius={"14px"} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} 
                             w="full" key={d.id}>
                                {
                                    d.link.length == 0
                                        ?
                                        <Box></Box>
                                        :
                                        <Img borderTopRadius={"14px"} w="full" h="20vh" src={d.link} />
                                }

                                <Box p={2}>
                                    <Text fontSize={"16px"}>
                                        {d.content}
                                    </Text>
                                </Box>
                            </Box>
                        )
                    })
                }

            </VStack>
        </Box>
    )
}

export default DisplayPosts
