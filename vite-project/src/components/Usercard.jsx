import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";


const Usercard=({user})=>{

const {_id,firstName,lastName,age,gender,skills,about,photoUrl}=user;
const dispatch=useDispatch();

 const handleSendRequest=async(status,userId)=>{
  try{
  await axios.post(BASE_URL + '/send/request/' + status + '/' + userId, {},{withCredentials:true});
  dispatch(removeFeed(userId))
  }catch(err){

  }
 }

 const skillList = Array.isArray(skills)
  ? skills
  : typeof skills === "string"
    ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
    : [];


    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[28px] text-white shadow-2xl">
      <img
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6 md:p-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/80">
          <span className="rounded-full bg-white/20 px-4 py-1 text-[0.6rem]">Featured</span>
          {age && <span>{age} yrs</span>}
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {firstName} {lastName}
            </h2>
            {gender && <p className="text-sm uppercase tracking-[0.4em] text-white/70">{gender}</p>}
          </div>

          <p className="max-h-24 overflow-hidden text-ellipsis text-base leading-relaxed text-white/90">
            {about || "Passionate builder ready to collaborate on modern products across web, mobile, and cloud."}
          </p>

          {skillList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skillList.slice(0,6).map((skill) => (
                <span key={skill} className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl text-white shadow-lg backdrop-blur"
              onClick={()=>handleSendRequest("ignored",_id)}
            >
              ✕
            </button>
            <button
              className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400 text-2xl font-semibold text-slate-900 shadow-2xl"
              onClick={()=>handleSendRequest("interested",_id)}
            >
              ❤
            </button>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Usercard;