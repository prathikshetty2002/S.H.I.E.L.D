import {
  Box,
  Button,
  Image,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import { storage, firestore } from "../firebase";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ChangeEventHandler, useRef, useState } from "react";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "@firebase/firestore";
import DisplayPosts from "../components/DisplayPosts";
import { AddIcon } from "@chakra-ui/icons";

const Community: NextPage = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (hiddenFileInput.current !== null) hiddenFileInput.current.click();
  };

  const [loading, setLoading] = useState(false);
  const [imgurl, setimgurl] = useState("");
  const [disp, setdisp] = useState("none");
  const [content, setcontent] = useState("");
  const [postLoading, setpostLoading] = useState(false);

  const toast = useToast();
  const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = async (
    event
  ) => {
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      setLoading(true);
      console.log("yess");

      try {
        const imgname = fileUploaded.name + v4();
        const imageref = ref(storage, `images/${imgname}`);
        await uploadBytes(imageref, fileUploaded);
        const link = await getDownloadURL(imageref);
        setimgurl(link);
        setdisp("block");
      } catch (err) {
        toast({
          title: "Error",
          description: "error",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const handlePost = async () => {
    setpostLoading(true);
    try {
      const dbRef = collection(firestore, "posts");
      const data = {
        link: imgurl,
        content: content,
      };
      addDoc(dbRef, data)
        .then((docRef) => {
          toast({
            title: "Success",
            description: "Post created successfully",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
    setpostLoading(false);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box mt={"12vh"} p={4}>
      <Navbar />
      <Box my={"0vh"}>
        <Text as="b" mb={"2vw"} display={"block"} fontSize={"3xl"}>
          Community
        </Text>

        <Box
          display={"flex"}
          w="full"
          justifyContent={"right"}
          p={2}
          position="fixed"
          bottom={20}
          left={0}
        >
          <Button
            onClick={onOpen}
            w={"40px"}
            h={"40px"}
            colorScheme={"blue"}
            borderRadius={"60%"}
            p={6}
          >
            <AddIcon />
          </Button>
        </Box>

        <Box p={2}>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box w="full" display={"flex"} justifyContent="center">
                  <Button
                    isLoading={loading}
                    _hover={{ bg: "green" }}
                    onClick={handleClick}
                    bg="green"
                    mt="2vh"
                    textColor={"white"}
                    cursor="pointer"
                    borderRadius={"10px"}
                    fontSize={"16px"}
                    textAlign={"center"}
                  >
                    Upload Images
                    <Input
                      onChange={handleChange}
                      ref={hiddenFileInput}
                      display={"none"}
                      id="inp"
                      type="file"
                    />
                  </Button>
                </Box>
                <Box w="full" mt="2vh" h="30vh" p={2} display={disp}>
                  <Image
                    boxShadow={
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }
                    borderRadius={"12px"}
                    w="full"
                    h="full"
                    display={disp}
                    src={imgurl}
                  ></Image>
                </Box>
                <Box mt="2vh">
                  <Input
                    onChange={(e) => setcontent(e.target.value)}
                    placeholder="Enter text"
                  />
                </Box>
              </ModalBody>

              <ModalFooter>
                <Box w="full" display={"flex"} justifyContent="space-around">
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme={"blue"}
                    isLoading={postLoading}
                    onClick={async () => {
                      await handlePost();
                      onClose();
                    }}
                  >
                    Post
                  </Button>
                </Box>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>

      <DisplayPosts />
    </Box>
  );
};

export default Community;
