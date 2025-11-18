import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";



const Login=()=>{

    const [email,setEmail]=useState("jaggu@gmail.com");
    const [password,setPassword]=useState("Jaggu@123");
    const [error,setError]=useState("")

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogin=async()=>{
        try{
const res=await axios.post( BASE_URL + '/login',{
            email,
            password
        },{withCredentials:true})
        dispatch(addUser(res.data))
        navigate('/')
        }catch (err) {
  console.log("Error URL:", err.config?.url);
  console.log("Error data:", err.response?.data);

  const backendError = err.response?.data;
  setError(
    backendError?.error ||    
    backendError?.message ||  
    "Something went wrong"    
  );
}

    }

    return (
        <div className='flex justify-center'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input 
  type="email" 
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  className="input" 
  placeholder="Email" 
  />

  <label className="label">Password</label>
  <input 
  type="password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
   className="input" 
   placeholder="Password" />
  <p className="text-red-500">{error}</p>
  <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
</fieldset>
        </div>
    )
}

export default Login;