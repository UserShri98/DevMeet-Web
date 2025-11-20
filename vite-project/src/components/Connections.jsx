import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";


const Connections=()=>{

    const dispatch=useDispatch();
    const connections=useSelector(store=>store.connection)

    const fetchConnections=async()=>{
        try{
const res=await axios.get(BASE_URL + '/user/connections',{withCredentials:true});
                 dispatch(addConnection(res?.data?.data))

        }catch(err){
        }
    }

   useEffect(()=>{
   fetchConnections();
    },[])

  

    if(!connections) return;
   if(connections.length===0) return <div className="text-center text-slate-300">No users found</div>

    return (
       <section className="space-y-8">
  <div className="section-card text-center text-slate-100">
    <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Your network</p>
    <h2 className="mt-3 text-4xl font-semibold">Connections</h2>
    <p className="mt-2 text-base text-slate-300">Keep track of your active collaborators and mentorship circle.</p>
  </div>

  <div className="grid gap-6 md:grid-cols-2">
    { connections.map((connection) => {
  const {_id,firstName,lastName,gender,about,age,photoUrl}=connection

 return ( 
 <div key={_id} className="glass-panel flex flex-col gap-4 rounded-3xl border border-white/10 p-5 text-left text-slate-100 shadow-xl">
    <div className="flex items-center gap-4">
      <img alt="photo" src={photoUrl} className="h-20 w-20 rounded-2xl object-cover"/>
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{gender || 'Creator'}</p>
        <h3 className="text-2xl font-semibold">{firstName} {lastName}</h3>
        {age && <p className="text-slate-300">{age} yrs · {gender}</p>}
      </div>
    </div>
    <p className="text-sm text-slate-200 leading-relaxed">{about || "An active collaborator excited to build and scale new ideas."}</p>
    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
      <span>Active collaborator</span>
      <span>Since · recent</span>
    </div>
 </div>
)
})}
  </div>
</section>

    )
}

export default Connections;