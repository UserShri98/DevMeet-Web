import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";


const Usercard=({user})=>{

const {_id,firstName,lastName,age,gender,skills,about,photoUrl}=user;
const dispatch=useDispatch();

 const handleSendRequest=async(status,userId)=>{
  try{
  const res=await axios.post(BASE_URL + '/send/request/' + status + '/' + userId, {},{withCredentials:true});
  dispatch(removeFeed(userId))
  }catch(err){

  }
 }


    return (
        <div className="flex justify-center">
<div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="user photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    { age && gender && <p>{gender},{age}</p>}
    {skills}
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
    </div>
  </div>
</div>
        </div>
    )
}

export default Usercard;