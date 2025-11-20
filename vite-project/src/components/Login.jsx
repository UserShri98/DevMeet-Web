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
        <section className='relative z-10 flex min-h-[70vh] items-center justify-center px-4 py-10'>
      <div className="grid w-full max-w-5xl gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{isLoggedIn?"Welcome back":"Create account"}</p>
          <h2 className="text-4xl font-semibold text-white leading-tight">
            {isLoggedIn ? "Log in to continue building meaningful connections." : "Sign up to join a curated network of DevMeet builders."}
          </h2>
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-slate-300">
            <p className="text-sm uppercase tracking-[0.4em] text-sky-300">Why DevMeet</p>
            <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate-200">
              <li>• Curated matches based on skills and goals</li>
              <li>• Direct access to product builders worldwide</li>
              <li>• Powerful dashboard to manage requests</li>
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-inner">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-white">{isLoggedIn?"Login":"Sign up"}</h3>
            <button
              className="text-sm font-semibold text-sky-300 underline-offset-4 hover:underline"
              onClick={()=>setIsLogged(value=>!value)}
            >
              {isLoggedIn?"Create account":"Have an account?"}
            </button>
          </div>
          <div className="mt-6 space-y-5">
            {!isLoggedIn && (
              <>
                <div>
                  <label className="text-sm uppercase tracking-[0.4em] text-slate-400">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
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
              </>
            )}
            <div>
              <label className="text-sm uppercase tracking-[0.4em] text-slate-400">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" 
              />
            </div>
            <div>
              <label className="text-sm uppercase tracking-[0.4em] text-slate-400">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                 className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" 
                  />
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
          <button className="btn action-primary mt-6 w-full rounded-2xl border-none px-6 py-3 text-base font-semibold" onClick={isLoggedIn?handleLogin:handleSignup}>{isLoggedIn?"Login" : "Sign up"}</button>
          <p className="mt-4 text-center text-sm text-slate-400">
            {isLoggedIn?"New here? ":"Already with us? "}
            <span className="cursor-pointer text-sky-300 underline-offset-4 hover:underline" onClick={()=>setIsLogged(value=>!value)}>
              {isLoggedIn?"Sign up to continue":"Login to continue"}
            </span>
          </p>
        </div>
      </div>
        </section>
    )
}

export default Login;