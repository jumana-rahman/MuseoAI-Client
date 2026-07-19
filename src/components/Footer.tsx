import { useState } from "react";
import { Link } from "react-router-dom";
import { Landmark, Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = useMutation({
    mutationFn: (e: React.FormEvent) => {
      e.preventDefault();
      return apiRequest("/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: (data: any) => {
      toast.success(data?.message || "Subscribed!");
      setEmail("");
    },
    onError: () => {
      toast.error("Failed to subscribe. Try again.");
    },
  });

  return (
    <footer className="bg-[#3A2420] text-[#EDD9BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#D8B892] rounded-lg flex items-center justify-center">
                <Landmark className="w-4 h-4 text-[#4E342E]" />
              </div>
              <span className="font-display text-xl font-bold text-[#F8F5F0]">MuseoAI</span>
            </Link>
            <p className="text-sm text-[#8B857C] leading-relaxed mb-6">
              Discover the world's greatest museums with the help of AI. Plan unforgettable cultural journeys powered by community knowledge.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-[#4E342E] rounded-lg flex items-center justify-center text-[#8B857C] hover:text-[#D8B892] hover:bg-[#6D4C41] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.228.415.56.217.96.477 1.38.896.42.42.679.819.896 1.381.164.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.217.56-.477.96-.896 1.381-.42.42-.82.679-1.38.896-.423.164-1.058.36-2.228.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.228-.413-.56-.217-.96-.477-1.38-.896-.42-.42-.679-.82-.896-1.38-.164-.423-.36-1.058-.413-2.228-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.413-2.227.217-.56.477-.96.896-1.381.42-.42.82-.679 1.38-.896.423-.166 1.058-.361 2.228-.415 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.058 1.277.261 2.15.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.763.297 1.636.5 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.338 1.384-2.126.297-.763.5-1.636.558-2.913.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.32 1.347 20.651.935 19.86.63c-.763-.297-1.636-.5-2.913-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-8 h-8 bg-[#4E342E] rounded-lg flex items-center justify-center text-[#8B857C] hover:text-[#D8B892] hover:bg-[#6D4C41] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 bg-[#4E342E] rounded-lg flex items-center justify-center text-[#8B857C] hover:text-[#D8B892] hover:bg-[#6D4C41] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 bg-[#4E342E] rounded-lg flex items-center justify-center text-[#8B857C] hover:text-[#D8B892] hover:bg-[#6D4C41] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[#F8F5F0] font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/museums" label="Browse Museums" />
              <FooterLink to="/museums?category=Art" label="Art Museums" />
              <FooterLink to="/museums?category=History" label="History Museums" />
              <FooterLink to="/museums?category=Science" label="Science Museums" />
              <FooterLink to="/museums?category=Archaeology" label="Archaeology" />
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[#F8F5F0] font-semibold mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/about" label="About MuseoAI" />
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/register" label="Create Account" />
              <FooterLink to="/dashboard" label="Dashboard" />
              <FooterLink to="/items/add" label="Write a Guide" />
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[#F8F5F0] font-semibold mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-[#8B857C]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D8B892]" />
                hello@museoai.com
              </li>
              <li className="mt-4">
                <p className="text-xs text-[#6D4C41] mb-2">Newsletter</p>
                <form onSubmit={(e) => subscribe.mutate(e)} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="flex-1 bg-[#4E342E] border border-[#6D4C41] rounded-xl px-3 py-2 text-xs text-[#F8F5F0] placeholder-[#6D4C41] focus:outline-none focus:border-[#D8B892]"
                  />
                  <button type="submit" disabled={subscribe.isPending} className="bg-[#D8B892] text-[#4E342E] px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#c9a67d] transition-colors whitespace-nowrap disabled:opacity-60">
                    {subscribe.isPending ? "..." : "Subscribe"}
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#4E342E] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6D4C41]">
            &copy; {new Date().getFullYear()} MuseoAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-[#6D4C41] hover:text-[#D8B892] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-[#6D4C41] hover:text-[#D8B892] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link to={to} className="text-sm text-[#8B857C] hover:text-[#D8B892] transition-colors">
        {label}
      </Link>
    </li>
  );
}
