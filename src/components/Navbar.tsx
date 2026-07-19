import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Heart, LayoutDashboard, LogOut, User, BookOpen, ChevronDown, Landmark, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  const navBg = isHome && !scrolled
    ? "bg-transparent"
    : "bg-[#4E342E] shadow-warm-lg";

  const textColor = isHome && !scrolled ? "text-white" : "text-[#F8F5F0]";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#D8B892] rounded-lg flex items-center justify-center">
              <Landmark className="w-4 h-4 text-[#4E342E]" />
            </div>
            <span className={`font-display text-xl font-bold tracking-wide ${textColor}`}>
              MuseoAI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" label="Home" textColor={textColor} />
            <NavLink to="/museums" label="Explore Museums" textColor={textColor} />
            {user && <NavLink to="/favorites" label="Favorites" textColor={textColor} />}
            <NavLink to="/recommendations" label="AI Picks" textColor={textColor} />
            {user && <NavLink to="/dashboard" label="Dashboard" textColor={textColor} />}
            <NavLink to="/about" label="About" textColor={textColor} />
            <NavLink to="/contact" label="Contact" textColor={textColor} />
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 ${textColor} hover:opacity-80 transition-opacity`}
                >
                  <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full object-cover border-2 border-[#D8B892]" />
                  <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#F8F5F0] rounded-2xl shadow-warm-lg border border-[#EDD9BC] overflow-hidden">
                    <Link to="/dashboard/my-guides" className="flex items-center gap-2 px-4 py-3 text-sm text-[#4E342E] hover:bg-[#EDD9BC] transition-colors" onClick={() => setProfileOpen(false)}>
                      <BookOpen className="w-4 h-4" /> My Guides
                    </Link>
                    <Link to="/dashboard/profile" className="flex items-center gap-2 px-4 py-3 text-sm text-[#4E342E] hover:bg-[#EDD9BC] transition-colors" onClick={() => setProfileOpen(false)}>
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#A65E2E] hover:bg-[#EDD9BC] transition-colors border-t border-[#EDD9BC]">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className={`text-sm font-medium ${textColor} hover:opacity-80 transition-opacity`}>
                  Login
                </Link>
                <Link to="/register" className="bg-[#D8B892] text-[#4E342E] px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-[#c9a67d] transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className={`md:hidden ${textColor}`} onClick={() => setMobileOpen(!mobileOpen)}>
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
              <X className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#4E342E] border-t border-[#6D4C41]"
          >
            <div className="px-4 py-4 space-y-1">
              <MobileLink to="/" label="Home" />
              <MobileLink to="/museums" label="Explore Museums" />
              {user && <MobileLink to="/favorites" label="Favorites" icon={<Heart className="w-4 h-4" />} />}
              <MobileLink to="/recommendations" label="AI Picks" icon={<Sparkles className="w-4 h-4" />} />
              {user && <MobileLink to="/dashboard" label="Dashboard" icon={<LayoutDashboard className="w-4 h-4" />} />}
              <MobileLink to="/about" label="About" />
              <MobileLink to="/contact" label="Contact" />
              <div className="pt-3 border-t border-[#6D4C41]">
                {user ? (
                  <button onClick={handleLogout} className="flex items-center gap-2 text-[#D8B892] text-sm py-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <Link to="/login" className="text-[#D8B892] text-sm font-medium py-2">Login</Link>
                    <Link to="/register" className="bg-[#D8B892] text-[#4E342E] px-4 py-2 rounded-2xl text-sm font-semibold">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ to, label, textColor }: { to: string; label: string; textColor: string }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`nav-link text-sm font-medium ${textColor} hover:text-white ${active ? "nav-link-active" : ""}`}
    >
      {label}
    </Link>
  );
}

function MobileLink({ to, label, icon }: { to: string; label: string; icon?: React.ReactNode }) {
  return (
    <Link to={to} className="flex items-center gap-2 text-[#F8F5F0] text-sm font-medium py-2.5 hover:text-[#D8B892] transition-colors">
      {icon}{label}
    </Link>
  );
}
