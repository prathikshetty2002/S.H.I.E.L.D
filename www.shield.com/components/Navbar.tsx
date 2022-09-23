import { Box, Container, Text } from "@chakra-ui/react"

const Navbar:React.FC = () => {

    return (
        <Box w="full" bg={"aqua"} display="flex" justifyContent={"space-between"} >
            <Box>
                S.H.I.E.L.D
            </Box>
            <Box display={"flex"}>
                <Box>
                    <Text>Community</Text>
                </Box>
                <Box>
                    <Text>Text2</Text>
                </Box>
                <Box>
                    <Text>Text3</Text>
                </Box>
            </Box>

        </Box>
    )
}

export default Navbar