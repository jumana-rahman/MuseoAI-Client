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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-[#4E342E] rounded-lg flex items-center justify-center text-[#8B857C] hover:text-[#D8B892] hover:bg-[#6D4C41] transition-colors text-xs font-bold">Ig</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 bg-[#4E342E] rounded-lg flex items-center justify-center text-[#8B857C] hover:text-[#D8B892] hover:bg-[#6D4C41] transition-colors text-xs font-bold">X</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 bg-[#4E342E] rounded-lg flex items-center justify-center text-[#8B857C] hover:text-[#D8B892] hover:bg-[#6D4C41] transition-colors text-xs font-bold">Fb</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 bg-[#4E342E] rounded-lg flex items-center justify-center text-[#8B857C] hover:text-[#D8B892] hover:bg-[#6D4C41] transition-colors text-xs font-bold">Yt</a>
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
