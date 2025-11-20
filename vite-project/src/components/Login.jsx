import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";



const Login=()=>{

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("")
    const [error,setError]=useState("")
    const [isLoggedIn,setIsLogged]=useState(true)

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

    const handleSignup=async()=>{
      const res=await axios.post(BASE_URL+'/signup',{firstName,lastName,email,password},{withCredentials:true});
       dispatch(addUser(res.data.data))
        navigate('/profile')
    }

    return (
        <div className='flex justify-center'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">{isLoggedIn?"Login":"Sign up"}</legend>

{ !isLoggedIn && 
 <>
  <label className="label">First Name</label>
  <input 
  type="text" 
  value={firstName}
  onChange={(e)=>setFirstName(e.target.value)}
  className="input" 
  />

 <label className="label">Last Name</label>
  <input 
  type="text" 
  value={lastName}
  onChange={(e)=>setLastName(e.target.value)}
  className="input" 
  />
 </>
}
  <label className="label">Email</label>
  <input 
  type="email" 
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  className="input" 
  />

  <label className="label">Password</label>
  <input 
  type="password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
   className="input" 
    />
  <p className="text-red-500">{error}</p>
  <button className="btn btn-neutral mt-4" onClick={isLoggedIn?handleLogin:handleSignup}>{isLoggedIn?"Login" : "Sign up"}</button>
     <p className="m-auto cursor-pointer"  onClick={()=>setIsLogged(value=>!value)}>{isLoggedIn?"New user?Sign up to continue":"Existing User?Login to continue"}</p>

</fieldset>

        </div>
    )
}

export default Login;