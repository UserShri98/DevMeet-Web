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
    if(connections.length===0) return <div>No users found</div>

    return (
       <div className="text-center my-10">
  <div className="text-black text-3xl">Connections</div>
  { connections.map((connection) => {
  const {_id,firstName,lastName,gender,about,age,photoUrl}=connection

 return ( 
 <div key={_id} className=" flex m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto">
    <div>    <img alt="photo" src={photoUrl} className="w-50 h-40 rounded-full"/>
</div>
    <div className="text-left mx-4"><h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
    <p>{about}</p></div>
    
 </div>
)
})}

</div>

    )
}

export default Connections;