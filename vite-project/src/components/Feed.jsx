import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Usercard from "./Usercard";


const Feed=()=>{

 const dispatch=useDispatch();
 const feed=useSelector(store=>store.feed);
 console.log(feed);


   const userFeed=async()=>{
  try{
    if(feed) return;
const res=await axios.get(BASE_URL + '/feed',{

    withCredentials:true
  })
  
  dispatch(addFeed(res.data))
   
   }catch(err){
   
  }
 }
   useEffect(()=>{
   userFeed()
   },[])

   if(!feed) return;

   if(feed.length<=0) return <div className="flex justify-center">No users found</div>

    return (
    
      feed && (
      <div className="my-15">
      <Usercard user={feed[0]}/>
        </div>
    )
    )
}
export default Feed;