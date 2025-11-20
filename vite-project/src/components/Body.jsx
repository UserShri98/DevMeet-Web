import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";


const Body=()=>{

 const dispatch=useDispatch()
const navigate=useNavigate()
  

const fetchUser=async()=>{
   try{
 const res=await axios.get(BASE_URL+'/profile/view',{
    withCredentials:true
   })
  dispatch(addUser(res.data))
   }catch(err){
   if(err.status===401){
    navigate('/login')
   }
   console.log(err)
   }
  }

  useEffect(()=>{
  fetchUser()

  },[])


    return (
        <div className="app-shell min-h-screen text-slate-100">
      <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-700/10" />
        <div className="pointer-events-none absolute inset-0 grid-accent opacity-30" />
        <Navbar/>
        <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 pb-8 pt-10 md:px-10">
          <Outlet/>
        </main>
        <div className="relative z-10 px-4 pb-10 md:px-10">
          <Footer/>
        </div>
      </div>
        </div>
    )
}

export default Body;