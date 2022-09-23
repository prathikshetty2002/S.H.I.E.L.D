import firebase from "firebase"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useToast,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  Box
} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber, PhoneAuthProvider } from "firebase/auth"
import { useEffect, useState } from 'react'
import { auth } from '../firebase'
interface ILogin {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
}

const LoginModal: React.FC<ILogin> = ({ isOpen, onClose, onOpen }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [otp, setotp] = useState('')
  const [stepnum, setstepnum] = useState<number>(1)
  const toast = useToast()
  const [number, setnumber] = useState('')
  const handleback = () => {
    setstepnum(1)
  }

  const handleClick = async () => { 
    if (!number) {
      toast({
        title: 'Empty field',
        description: "Number length mismatch",
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      return
    }

    if (number.length != 10) {
      toast({
        title: 'Invalid Number',
        description: "Number length mismatch",
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      return
    }

  
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, number, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });

    setstepnum(2)
  }
  useEffect(() => {
    setstepnum(1)
  }, [])
  const handleverify = async () => {
    window.confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const credential = PhoneAuthProvider.credential(window.confirmationResult.verificationId, otp)
      signInWithCredential(credential)
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  useEffect(() => {
    // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{}, auth)

    // window.recaptchaVerifier.render().then(widgetId => {
    //   window.recaptchaWidgetId = widgetId
    // })
  }, [])  



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            stepnum == 1
              ?
              <FormControl isRequired>
                <FormLabel>Phone number</FormLabel>
                <Input required id="phone" value={number} onChange={(e) => setnumber(e.target.value)} type='number' placeholder="Enter phone number" />
                <FormHelperText>We'll never share your phone number</FormHelperText>
                <div id="recaptcha-container"></div>
              </FormControl>
              :
              <FormControl isRequired>
                <FormLabel>Enter otp</FormLabel>
                <Input required id="otp" value={otp} onChange={(e) => setotp(e.target.value)} type='number' placeholder="Enter otp" />
                <FormHelperText>Never share your otp with anyone</FormHelperText>
                {/* <div id="recaptcha-container"></div> */}
              </FormControl>

          }
        </ModalBody>


        <ModalFooter display={"flex"} justifyContent="space-around">
          {
            stepnum == 2
              ?
              <Button float={"left"} onClick={handleback}>Back</Button>
              :

              <Button float={"left"} visibility="hidden" >Back</Button>



          }



          <Button variant={"ghost"} onClick={onClose}>
            Close
          </Button>
          {
            stepnum
              ?
              <Button colorScheme={"blue"} isLoading={loading} onClick={handleClick}>Submit</Button>
              :
              <Button colorScheme={"blue"} onClick={handleverify}>verify</Button>

          }


        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LoginModal