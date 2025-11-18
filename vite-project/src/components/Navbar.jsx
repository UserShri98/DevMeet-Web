import axios from "axios";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";



const Navbar=()=>{

    const user=useSelector(store=>store.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogout=async()=>{
      await axios.post(BASE_URL + '/logout',{},{
        withCredentials:true
      })
      dispatch(removeUser());
      navigate('/login');
    }

    return (
        <div>
       <div className="navbar  bg-accent">
  <div className="flex-1">
    <Link to='/' className="btn btn-ghost text-xl">DevMeet</Link>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
  {user && (
  <div className="dropdown dropdown-end flex items-center gap-3 mr-4">
    {/* Welcome text */}
    <p className="text-white font-medium">Welcome, {user.firstName}</p>

    {/* Avatar and dropdown */}
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full overflow-hidden">
        <img
          alt="user photo"
          src={user.photoUrl}
        />
      </div>
    </div>

    <ul
      tabIndex="-1"
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
    >
      <li>
        <Link to='/profile' className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      <li><Link to='/connections'>Connections</Link></li>
      <li><a onClick={handleLogout}>Logout</a></li>
    </ul>
  </div>
)}

  </div>
</div>
        </div>
    )
}

export default Navbar;