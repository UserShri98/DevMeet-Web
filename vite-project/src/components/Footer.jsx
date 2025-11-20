

const Footer=()=>{

    return (
        <footer className="glass-panel mx-auto mt-16 w-full max-w-6xl rounded-3xl border border-white/10 px-8 py-10 text-slate-100">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">DevMeet</p>
          <p className="mt-3 text-lg font-semibold">Elevating developer connections.</p>
          <p className="mt-2 text-sm text-slate-300">Crafted for engineers, designers, and founders looking to build better, faster.</p>
        </div>
        <div>
          <h6 className="text-sm uppercase tracking-[0.4em] text-slate-400">Product</h6>
          <div className="mt-3 space-y-2 text-slate-300">
            <a className="block hover:text-white">Features</a>
            <a className="block hover:text-white">Enterprise</a>
            <a className="block hover:text-white">Security</a>
            <a className="block hover:text-white">Pricing</a>
          </div>
        </div>
        <div>
          <h6 className="text-sm uppercase tracking-[0.4em] text-slate-400">Company</h6>
          <div className="mt-3 space-y-2 text-slate-300">
            <a className="block hover:text-white">About</a>
            <a className="block hover:text-white">Careers</a>
            <a className="block hover:text-white">Contact</a>
            <a className="block hover:text-white">Press</a>
          </div>
        </div>
        <div>
          <h6 className="text-sm uppercase tracking-[0.4em] text-slate-400">Connect</h6>
          <div className="mt-3 space-y-2 text-slate-300">
            <a className="block hover:text-white">Twitter</a>
            <a className="block hover:text-white">Instagram</a>
            <a className="block hover:text-white">LinkedIn</a>
            <a className="block hover:text-white">GitHub</a>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs uppercase tracking-[0.4em] text-slate-500">© {new Date().getFullYear()} DevMeet — Crafted for builders.</p>
        </footer>
    )
}

export default Footer;