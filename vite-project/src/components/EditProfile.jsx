

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
        <div className="flex justify-center my-10">
        <div className='flex justify-center mx-10'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Edit Profile</legend>

  <label className="label">First Name</label>
  <input 
  type="text" 
  value={firstName}
  onChange={(e)=>setFirstname(e.target.value)}
  className="input" 
  />

  <label className="label">Last Name</label>
  <input 
  type="text"
  value={lastName}
  onChange={(e)=>setLastName(e.target.value)}
   className="input" 
   />
     <label className="label">PhotoUrl</label>
  <input 
  type="text"
  value={photoUrl}
  onChange={(e)=>setPhotoUrl(e.target.value)}
   className="input" 
   />
     <label className="label">Gender</label>

    <input 
  type="text"
  value={gender}
  onChange={(e)=>setGender(e.target.value)}
   className="input" 
   />
     <label className="label">Age</label>

    <input 
  type="text"
  value={age}
  onChange={(e)=>setAge(e.target.value)}
   className="input" 
   />
   <p className="text-red-500">{error}</p>

  <button className="btn btn-neutral mt-4" onClick={saveProfile}>Edit Profile</button>
</fieldset>
        </div>

        <Usercard user={{firstName,lastName,age,gender,photoUrl}}/>
      {showToast &&  <div className="toast toast-top toast-center font-blue">
  <div className="alert alert-success">
    <span>Profile saved succesfullly</span>
  </div>
</div>}
        </div>
    )
}

export default EditProfile;