

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Usercard from "./Usercard";



const EditProfile=({user})=>{

    const [firstName, setFirstname] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
     const [error,setError]=useState("")
     const [showToast,setShowToast]=useState(false)


  const dispatch=useDispatch();


   const saveProfile=async()=>{
 
     try{
        setError("")
const res=await axios.patch(BASE_URL + "/profile/edit",{firstName,lastName,gender,photoUrl,age},{withCredentials:true});
console.log(res.data.data)
    dispatch(addUser(res?.data?.data));
    setShowToast(true);
    setTimeout(()=>{
  setShowToast(false)
    },3000)
     }catch(err){ 
  setError(err.response?.data?.message || "Failed to update profile")
     }
    
   }

   

    

    return (
        <section className="my-12 space-y-10">
        <div className="grid gap-10 lg:grid-cols-2">
        <div className='rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur'>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Profile</p>
          <h3 className="text-3xl font-semibold text-white">Edit your details</h3>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">Live</span>
      </div>

  <div className="mt-8 space-y-5">
  <div>
    <label className="text-sm uppercase tracking-[0.4em] text-slate-400">First Name</label>
    <input 
  type="text" 
  value={firstName}
  onChange={(e)=>setFirstname(e.target.value)}
  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" 
  />
  </div>

  <div>
    <label className="text-sm uppercase tracking-[0.4em] text-slate-400">Last Name</label>
    <input 
  type="text"
  value={lastName}
  onChange={(e)=>setLastName(e.target.value)}
   className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" 
   />
  </div>

  <div>
    <label className="text-sm uppercase tracking-[0.4em] text-slate-400">Photo Url</label>
        <input 
  type="text"
  value={photoUrl}
  onChange={(e)=>setPhotoUrl(e.target.value)}
   className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" 
   />
  </div>

  <div className="grid gap-5 md:grid-cols-2">
    <div>
      <label className="text-sm uppercase tracking-[0.4em] text-slate-400">Gender</label>
         <input 
  type="text"
  value={gender}
  onChange={(e)=>setGender(e.target.value)}
   className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" 
   />
    </div>
    <div>
      <label className="text-sm uppercase tracking-[0.4em] text-slate-400">Age</label>
         <input 
  type="text"
  value={age}
  onChange={(e)=>setAge(e.target.value)}
   className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" 
   />
    </div>
  </div>
   <p className="text-sm text-rose-400">{error}</p>

  <button className="btn action-primary mt-4 w-full rounded-2xl border-none px-6 py-3 text-base font-semibold" onClick={saveProfile}>Save profile</button>
  </div>
</div>

        <Usercard user={{firstName,lastName,age,gender,photoUrl,skills:user?.skills}}/>
      {showToast &&  <div className="toast toast-top toast-center font-blue">
  <div className="alert alert-success">
    <span>Profile saved succesfullly</span>
  </div>
</div>}
        </div>
        </section>
    )
}

export default EditProfile;