import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Landmark, Eye, EyeOff, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loginDemo, loginGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate(from, { replace: true });
    else setError("Invalid email or password. Please try again.");
  };

  const handleDemo = () => {
    loginDemo();
    navigate(from, { replace: true });
  };

  const handleGoogle = () => {
    loginGoogle();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex">
      {/* Left: image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1509228468518-180d2b1f5b00?w=900&h=1200&fit=crop&auto=format"
          alt="Museum interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#3A2420]/60" />
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#D8B892] rounded-lg flex items-center justify-center">
              <Landmark className="w-4 h-4 text-[#4E342E]" />
            </div>
            <span className="font-display text-xl font-bold text-white">MuseoAI</span>
          </div>
          <h2 className="font-display text-4xl text-white font-bold leading-tight mb-4">
            Discover Culture,<br />
            <span className="text-[#D8B892]">Guided by AI.</span>
          </h2>
          <p className="text-[#EDD9BC] leading-relaxed">
            Join thousands of cultural explorers using MuseoAI to plan extraordinary museum journeys around the world.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#D8B892] rounded-lg flex items-center justify-center">
              <Landmark className="w-4 h-4 text-[#4E342E]" />
            </div>
            <span className="font-display text-xl font-bold text-[#4E342E]">MuseoAI</span>
          </div>

          <h1 className="font-display text-3xl text-[#4E342E] font-bold mb-1">Welcome back</h1>
          <p className="text-[#8B857C] text-sm mb-8">Sign in to your account to continue</p>

          {/* Demo login */}
          <button
            onClick={handleDemo}
            className="w-full flex items-center justify-center gap-2 bg-[#EDD9BC] text-[#4E342E] font-semibold py-3 rounded-2xl hover:bg-[#D8B892] transition-colors mb-4 text-sm"
          >
            <Sparkles className="w-4 h-4 text-[#A65E2E]" /> Try Demo Account
          </button>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2 bg-white border border-[#EDD9BC] text-[#4E342E] font-medium py-3 rounded-2xl hover:bg-[#F8F5F0] transition-colors mb-6 text-sm shadow-warm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#EDD9BC]" />
            <span className="text-[#8B857C] text-xs">or sign in with email</span>
            <div className="flex-1 h-px bg-[#EDD9BC]" />
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-white border border-[#EDD9BC] rounded-xl px-4 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892] shadow-warm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#EDD9BC] rounded-xl px-4 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892] shadow-warm pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B857C] hover:text-[#4E342E]">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4E342E] text-[#F8F5F0] font-semibold py-3 rounded-2xl hover:bg-[#A65E2E] transition-colors disabled:opacity-60 text-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[#8B857C] text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#A65E2E] font-medium hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
