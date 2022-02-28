import axios from "axios";
import Router from "next/router"
import { useNavigate } from "react-router-dom";


export const loginCall = async (userCredential:any ) => {
  try{
    const res = await axios.post("http://localhost:8800/api/auth/login", userCredential);
    localStorage.setItem("user", JSON.stringify(res.data))
    console.log("login ok :", res.data)
    Router.reload();
  }catch(err){
    console.log("login failed")
  }
}


export const signupCall = async (user:any ) => {
  try{
    const res = await axios.post("http://localhost:8800/api/auth/signup", user)
    localStorage.setItem("user", JSON.stringify(res.data))
    console.log("signup ok :", res.data)
    Router.reload();
  } catch(err){
    console.log(err)
  }
}