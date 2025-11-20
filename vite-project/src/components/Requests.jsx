import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addRequest } from "../utils/requestSlice";



const Requests=()=>{

    const dispatch=useDispatch();
    const requests=useSelector(store=>store.request)

const reviewRequest=async(status,_id)=>{
    const res=await axios.post(BASE_URL + '/send/review/'+ status + "/" + _id ,{},{withCredentials:true} );

}


    const fetchRequests=async()=>{
        try{
const res=await axios.get(BASE_URL + '/user/requests/received',{withCredentials:true});

        dispatch(addRequest(res?.data?.data))
        }catch(err){

        }
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    if(!requests) return ;

    if(requests.length===0) return <div className="text-center text-slate-300">No request found</div>

    return (
        <section className="space-y-8">
  <div className="section-card text-center text-slate-100">
    <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Pending invites</p>
    <h2 className="mt-3 text-4xl font-semibold">Connection Requests</h2>
    <p className="mt-2 text-base text-slate-300">Respond to new collaborators and expand your network intentionally.</p>
  </div>

  <div className="space-y-5">
  { requests.map((request) => {
  const {_id,firstName,lastName,gender,about,age,photoUrl}=request.fromUserId;

 return ( 
 <div key={_id} className="glass-panel flex flex-col gap-4 rounded-3xl border border-white/10 p-6 text-slate-100 shadow-xl md:flex-row md:items-center md:justify-between">
    <div className="flex items-center gap-4">
      <img alt="photo" src={photoUrl} className="h-20 w-20 rounded-2xl object-cover"/>
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{gender || 'Creator'}</p>
        <h3 className="text-2xl font-semibold">{firstName} {lastName}</h3>
        <p className="text-sm text-slate-300">{about || "Ready to collaborate on impactful products."}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-3">
        <button className="btn action-primary rounded-2xl border-none px-6 py-3 text-base font-semibold" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
    <button className="btn action-secondary rounded-2xl px-6 py-3 text-base font-semibold" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>

        </div>

 </div>
)
})}
  </div>

</section>

    )
}

export default Requests;