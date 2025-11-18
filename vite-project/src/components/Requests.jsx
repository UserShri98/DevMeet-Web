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

    if(requests.length===0) return <div>No request found</div>

    return (
        <div>
  <div className="text-center my-10">
  <div className="text-black text-3xl">Request Connections</div>
  { requests.map((request) => {
  const {_id,firstName,lastName,gender,about,age,photoUrl}=request.fromUserId;

 return ( 
 <div key={_id} className=" flex m-4 p-4 rounded-lg bg-base-200 w-2/3 mx-auto items-center ">
    <div>    <img alt="photo" src={photoUrl} className="w-50 h-40 rounded-full"/>
</div>
    <div className="text-left mx-4"><h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
    <p>{about}</p></div>
    <div className="flex flex-end">
        <button className="btn btn-success mx-2" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
    <button className="btn btn-warning mx-2" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>

        </div>

 </div>
)
})}

</div>

        </div>
    )
}

export default Requests;