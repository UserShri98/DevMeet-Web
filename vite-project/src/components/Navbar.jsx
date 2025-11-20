import axios from "axios";
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
        <header className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-8 md:px-10">
      <div className="glass-panel flex flex-col gap-4 rounded-3xl border border-white/5 px-6 py-4 shadow-2xl lg:flex-row lg:items-center lg:gap-8">
        <div className="flex items-center justify-between gap-4">
          <Link to='/' className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-2xl font-semibold">
              D
            </div>
            <div>
              <p className="text-base font-medium uppercase tracking-[0.3em] text-slate-300">DevMeet</p>
              <p className="text-sm text-slate-400">Connect · Collaborate · Create</p>
            </div>
          </Link>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 md:hidden">
            {user?.firstName && <>Hi, <span className="text-white">{user.firstName}</span></>}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 shadow-inner focus-within:border-sky-400/60">
            <span className="text-slate-400">⌕</span>
            <input
              type="text"
              placeholder="Search developers, roles, technologies..."
              className="flex-1 border-none bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-200">
            <Link to='/' className="rounded-full px-4 py-1.5 text-slate-200 transition hover:bg-white/10">Feed</Link>
            <Link to='/connections' className="rounded-full px-4 py-1.5 text-slate-200 transition hover:bg-white/10">Connections</Link>
            <Link to='/requests' className="rounded-full px-4 py-1.5 text-slate-200 transition hover:bg-white/10">Requests</Link>
            <Link to='/profile' className="rounded-full px-4 py-1.5 text-slate-200 transition hover:bg-white/10">Profile</Link>
          </nav>
        </div>

        {user && (
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 shadow-inner">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Logged in as</p>
              <p className="text-lg font-semibold text-white">{user.firstName} {user.lastName}</p>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-sky-400/40">
                <div className="w-12 rounded-full">
                  <img alt="user photo" src={user.photoUrl}/>
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content glass-panel rounded-2xl bg-slate-900/95 text-slate-100 shadow-2xl">
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/connections'>Connections</Link></li>
                <li><Link to='/requests'>Requests</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        )}
      </div>
        </header>
    )
}

export default Navbar;