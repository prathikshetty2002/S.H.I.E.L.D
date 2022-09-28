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
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from '@firebase/firestore'
import { RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber, PhoneAuthProvider, RecaptchaParameters } from "firebase/auth"
import { useEffect, useState } from 'react'
import { auth, firestore } from '../firebase'
interface ILogin {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
}
// let window.recaptchaVerifier: any
// let confirmationResult: any
// // let recaptchaWidgetId: any

const LoginModal: React.FC<ILogin> = ({ isOpen, onClose, onOpen }) => {


  const [geoLocation, setGeoLocation] = useState<any>([])

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setGeoLocation([position.coords.latitude, position.coords.longitude])
      console.log("geoLocation: ", geoLocation)
    });
  
  }, [])

  const [loading, setLoading] = useState<boolean>(false)
  const [otp, setotp] = useState('')
  const [stepnum, setstepnum] = useState<number>(1)
  const toast = useToast()
  const [number, setnumber] = useState('')

  const handleback = () => {
    window.recaptchaVerifier.render().then(function (widgetId) {
      grecaptcha.reset(widgetId);
    });
    setstepnum(1)
  }

  const handleClick = () => {
    console.log("number: ", number)
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

    // if (number.length != 10) {
    //   toast({
    //     title: 'Invalid Number',
    //     description: "Check your entered phone number",
    //     status: 'error',
    //     duration: 6000,
    //     isClosable: true,
    //   })
    //   return
    // }
    
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response: any) => {
        console.log(response)
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }

    }, auth)


    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+91 " + number, appVerifier)
    // signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("errror in sending otp: ", error)
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
        toast({
          title: 'SMS NOT SENT',
          description: "Check your network and try again",
          status: 'error',
          duration: 6000,
          isClosable: true,
        })
      });

    setstepnum(2)
  }
  useEffect(() => {
    setstepnum(1)
  }, [])
  const handleVerify = () => {
    console.log("verify...")
    window.confirmationResult.confirm(otp).then(async (result) => {
      // User signed in successfully.
      console.log(auth.currentUser)

      // add logic to add user to collection user
      const uid = auth.currentUser!.uid
      const number = auth.currentUser!.phoneNumber

      try {
        

        let flag = await giveflag(uid)

        if (flag == false && uid) {
          const docRef =  doc(firestore, "users", uid.toString());
        const data = {
          uid: uid,
          number: number,
          latitude: geoLocation[0] as number,
          longitude: geoLocation[1] as number
        }
          setDoc(docRef, data)
            .then(docRef => {
              console.log("Data added");
            })
            .catch(error => {
              console.log("couldnt add user to database")
              console.log(error.message);
            })
        }
        else{
          console.log("data already there")
        }

      }
      catch (err) {
        console.log(err)
      }



      // console.log("confirm check...")
      //   console.log("result: ", result)
      //   console.log("confirmation result verificationID: ", window.confirmationResult.verificationId)

      //   const credential = PhoneAuthProvider.credential(window.confirmationResult.verificationId, otp)
      //   signInWithCredential(auth,credential).then(()=>{
      //     console.log("credential done logged in")
      //   }).catch((error) => {
      //     console.log("error in crendential", error)
      //   })
      // ...

      onClose()

    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log("error confirmation, ", error)
      window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
      });
      toast({
        title: "Couldn't Sign in",
        description: "Check your network and try again",
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    });
  }

  // useEffect(() => {
  //   recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{}, auth)

  //   // recaptchaVerifier.render().then(widgetId => {
  //   //   recaptchaWidgetId = widgetId
  //   // })
  // }, [])  

  const giveflag = async (u: string) => {
    const q = doc(firestore, "users",u);
    const querySnapshot = await getDoc(q);
    return querySnapshot.exists()


  }


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <div id="recaptcha-container" className="justify-center flex"></div>

        <ModalBody>
          {
            stepnum == 1
              ?
              <FormControl isRequired>
                <FormLabel>Phone number</FormLabel>
                <Input required id="phone" value={number} onChange={(e) => setnumber(e.target.value)} type='text' placeholder="Enter phone number" />
                <FormHelperText>{"We'll"} never share your phone number</FormHelperText>
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
            stepnum == 1
              ?
              <Button colorScheme={"blue"} isLoading={loading} onClick={handleClick}>Submit</Button>
              :
              <Button colorScheme={"blue"} onClick={handleVerify}>verify</Button>

          }


        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default LoginModal