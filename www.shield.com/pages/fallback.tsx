import { NextPage } from "next"

const Fallback:NextPage = () => {
    return (<div>
    <h1>{"You're"} device is offline </h1>
    <small>Please connect to a internet network</small>
  </div>)
}
export default Fallback

