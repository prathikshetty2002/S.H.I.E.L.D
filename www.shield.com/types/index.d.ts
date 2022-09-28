import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import {ReCaptchaV2} from "@types/grecaptcha"

// declare module 'leaflet';
// declare module 'react-leaflet/*';

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
        confirmationResult: ConfirmationResult
    }
}

// declare var grecaptcha: ReCaptchaV2.ReCaptcha & {
//     enterprise: ReCaptchaV2.ReCaptcha;
//   }; 

export {}