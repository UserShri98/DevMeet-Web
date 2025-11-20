import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import Usercard from "./Usercard";


const Feed=()=>{

 const dispatch=useDispatch();
 const feed=useSelector(store=>store.feed);
 const [activeIndex,setActiveIndex]=useState(0);
 const [dragStart,setDragStart]=useState(null);
 const [isDragging,setIsDragging]=useState(false);


   const userFeed=useCallback(async()=>{
  try{
    if(feed && feed.length>0) return;
const res=await axios.get(BASE_URL + '/feed',{

    withCredentials:true
  })
  const payload = Array.isArray(res.data) ? res.data : res?.data?.data || [];
  dispatch(addFeed(payload))
   
   }catch(err){
   console.log("Failed to load feed",err)
  }
 },[feed,dispatch])
   useEffect(()=>{
   userFeed()
   },[userFeed])

   useEffect(()=>{
    if(feed?.length>0){
      setActiveIndex((prev)=> Math.min(prev, feed.length-1));
    }
   },[feed]);

   const currentProfile = useMemo(()=>feed ? feed[activeIndex] : null,[feed,activeIndex]);

   const handleNext=useCallback(()=>{
    if(!feed || feed.length===0) return;
    setActiveIndex((idx)=>(idx + 1) % feed.length);
   },[feed]);

   const handlePrev=useCallback(()=>{
    if(!feed || feed.length===0) return;
    setActiveIndex((idx)=> (idx - 1 + feed.length) % feed.length);
   },[feed]);

   const handleDragStart=(clientX)=>{
    setDragStart(clientX);
    setIsDragging(true);
   };

   const handleDragEnd=(clientX)=>{
    if(dragStart===null){
      setIsDragging(false);
      return;
    }
    const delta = clientX - dragStart;
    const threshold = 60;
    if(delta > threshold){
      handlePrev();
    }else if(delta < -threshold){
      handleNext();
    }
    setDragStart(null);
    setIsDragging(false);
   };

   const touchStart=(e)=>{
    if(e.target.closest("button")) return;
    handleDragStart(e.touches[0].clientX);
   };

   const touchEnd=(e)=>{
    handleDragEnd(e.changedTouches[0].clientX);
   };

   const mouseStart=(e)=>{
    if(e.target.closest("button")) return;
    handleDragStart(e.clientX);
   };

   const mouseEnd=(e)=>{
    if(!isDragging) return;
    handleDragEnd(e.clientX);
   };

   if(!feed) return <div className="flex justify-center text-lg text-slate-300">Loading feed…</div>;

   if(feed.length<=0) return <div className="flex justify-center text-lg text-slate-300">No users found</div>

   if(!currentProfile) return <div className="flex justify-center text-lg text-slate-300">No users found</div>;

    return (
      feed && (
      <section className="flex min-h-[calc(100vh-200px)] flex-col items-center gap-8">
        <div className="text-center space-y-3 px-4">
          <p className="text-xs uppercase tracking-[0.6em] text-slate-400">DevMeet swipe</p>
          <h1 className="text-3xl font-semibold text-white md:text-5xl">Discover one builder at a time</h1>
          <p className="text-sm text-slate-300 md:text-base">Swipe on the card or tap the buttons below to skip or connect. Queue length: {feed.length}</p>
        </div>

        <div className="flex w-full flex-1 items-center justify-center px-2">
          <div
            className={`swipe-stage relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[3/4] select-none rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-2 shadow-2xl transition-transform duration-200 ${isDragging ? "scale-[0.98]" : "scale-100"}`}
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
            onMouseDown={mouseStart}
            onMouseUp={mouseEnd}
            onMouseLeave={mouseEnd}
          >
            <div className="absolute inset-0 rounded-[28px] bg-white/5 backdrop-blur-xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[28px]">
              <Usercard user={currentProfile}/>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            {feed.map((profile,idx)=>(
              <span
                key={profile._id}
                className={`h-2 w-8 rounded-full transition ${idx===activeIndex ? "bg-sky-400" : "bg-white/15"}`}
              />
            ))}
          </div>
          <div className="flex w-full max-w-md items-center justify-between gap-4">
            <button className="btn rounded-full border-none bg-rose-500/80 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-rose-500" onClick={handlePrev}>
              ⟵ Back
            </button>
            <button className="btn rounded-full border-none bg-emerald-500/80 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-emerald-500" onClick={handleNext}>
              Next ⟶
            </button>
          </div>
        </div>
      </section>
    )
    )
}
export default Feed;