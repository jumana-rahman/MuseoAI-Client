import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from "recharts";
import {
  ChevronDown, Sparkles, MessageCircle, Map, Heart, Star, ArrowRight,
  ChevronLeft, ChevronRight, Plus, Minus
} from "lucide-react";
import { MUSEUMS, CATEGORIES, STATS_BY_CATEGORY, STATS_BY_COUNTRY, POPULAR_COUNTRIES, TESTIMONIALS, FAQS } from "../data/museums";
import { GUIDES } from "../data/guides";
import MuseumCard from "../components/MuseumCard";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const FEATURED = MUSEUMS.filter((m) => m.featured).slice(0, 8);
const COLORS = ["#D8B892", "#A65E2E", "#4E342E", "#8B857C", "#EDD9BC", "#6D4C41", "#C9A67D", "#7A4420"];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById("featured-museums")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#F8F5F0]">
      {/* ── Hero ── */}
      <section ref={heroRef} className="sticky top-0 min-h-[65vh] flex items-center overflow-hidden z-0">
        <div className="absolute inset-0 bg-[#3A2420]">
          <img
            src="https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?w=1600&h=900&fit=crop&auto=format"
            alt=""
            className="hero-slide hero-slide-1"
          />
          <img
            src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1600&h=900&fit=crop&auto=format"
            alt=""
            className="hero-slide hero-slide-2"
          />
          <img
            src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&h=900&fit=crop&auto=format"
            alt=""
            className="hero-slide hero-slide-3"
          />
          <img
            src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600&h=900&fit=crop&auto=format"
            alt=""
            className="hero-slide hero-slide-4"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D8B892]/20 border border-[#D8B892]/30 text-[#D8B892] text-sm px-3 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Museum Discovery
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Explore the World's
                <span className="block text-[#D8B892]">Greatest Museums</span>
              </h1>
              <p className="text-[#EDD9BC] text-lg leading-relaxed mb-8 max-w-lg">
                Discover curated museum experiences, plan personalized itineraries with AI, and connect with a global community of culture enthusiasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/museums"
                  className="bg-[#D8B892] text-[#4E342E] font-semibold px-6 py-3 rounded-2xl hover:bg-[#c9a67d] transition-colors flex items-center gap-2"
                >
                  Explore Museums <ArrowRight className="w-4 h-4" />
                </Link>
                {user ? (
                  <Link
                    to="/items/add"
                    className="bg-transparent border-2 border-[#D8B892] text-[#D8B892] font-semibold px-6 py-3 rounded-2xl hover:bg-[#D8B892]/10 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Try AI Guide Writer
                  </Link>
                ) : (
                  <button
                    onClick={() => navigate("/museums/louvre")}
                    className="bg-transparent border-2 border-[#D8B892] text-[#D8B892] font-semibold px-6 py-3 rounded-2xl hover:bg-[#D8B892]/10 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Try AI Guide
                  </button>
                )}
              </div>
            </div>

            {/* Right: floating illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="animate-float relative">
                <div className="w-72 h-72 bg-[#D8B892]/10 border border-[#D8B892]/20 rounded-3xl backdrop-blur-sm p-6 flex flex-col justify-between">
                  <div className="text-[#D8B892]">
                    <Sparkles className="w-8 h-8 mb-3" />
                    <p className="font-display text-white text-lg font-semibold leading-tight">
                      "What should I visit first at the Louvre?"
                    </p>
                  </div>
                  <div className="bg-[#4E342E]/60 rounded-xl p-4">
                    <p className="text-[#EDD9BC] text-sm leading-relaxed">
                      Start with the Denon Wing — head directly to the Mona Lisa before 10 AM for the best viewing experience, then work backwards through the Italian paintings...
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#D8B892] rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-[#4E342E]" />
                    </div>
                    <span className="text-[#D8B892] text-xs font-medium">MuseoAI Assistant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D8B892] animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </section>

      {/* ── Featured Museums ── */}
      <section id="featured-museums" className="relative z-10 bg-white py-20 px-4 sm:px-6 lg:px-8 rounded-t-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#A65E2E] text-sm font-semibold uppercase tracking-widest mb-2">Curated Collection</p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#4E342E] font-bold">Featured Museums</h2>
            </div>
            <Link to="/museums" className="hidden sm:flex items-center gap-1 text-[#A65E2E] text-sm font-medium hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED.map((m) => (
              <MuseumCard key={m.id} museum={m} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Categories ── */}
      <section className="relative z-10 py-20 bg-[#4E342E]" id="features">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <p className="text-[#D8B892] text-sm font-semibold uppercase tracking-widest mb-2">Browse by Type</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F8F5F0] font-bold">Explore by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/museums?category=${cat.name}`}
                className="group bg-[#3A2420] border border-[#6D4C41] rounded-2xl p-6 text-center hover:bg-[#A65E2E] hover:border-[#A65E2E] transition-all duration-300"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <p className="font-display text-[#F8F5F0] font-semibold text-sm">{cat.name}</p>
                <p className="text-[#8B857C] text-xs mt-1 group-hover:text-[#EDD9BC]">{cat.count} museums</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Why MuseoAI ── */}
      <section className="relative z-10 bg-white py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-14">
            <p className="text-[#A65E2E] text-sm font-semibold uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#4E342E] font-bold">Why Choose MuseoAI</h2>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <MessageCircle className="w-7 h-7" />,
              title: "AI Museum Guide",
              desc: "Chat with an AI assistant that knows each museum's history, exhibits, and tips in depth.",
            },
            {
              icon: <Sparkles className="w-7 h-7" />,
              title: "Smart Recommendations",
              desc: "Get personalized museum recommendations tailored to your interests, budget, and travel style.",
            },
            {
              icon: <Map className="w-7 h-7" />,
              title: "Community Guides",
              desc: "Read and share detailed visit itineraries written by fellow museum enthusiasts worldwide.",
            },
            {
              icon: <Heart className="w-7 h-7" />,
              title: "Save Favorites",
              desc: "Build your personal museum wishlist and track the cultural experiences you want to have.",
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-warm border border-[#EDD9BC] text-center group hover:shadow-warm-lg transition-shadow">
              <div className="w-14 h-14 bg-[#EDD9BC] rounded-2xl flex items-center justify-center text-[#A65E2E] mx-auto mb-4 group-hover:bg-[#A65E2E] group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="font-display text-[#4E342E] font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-[#5D4037] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        </motion.div>
      </section>

      {/* ── Popular Destinations ── */}
      <section className="relative z-10 py-20 bg-[#F0EBE3]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <p className="text-[#A65E2E] text-sm font-semibold uppercase tracking-widest mb-2">Around the World</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#4E342E] font-bold">Popular Destinations</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {POPULAR_COUNTRIES.map((c) => (
              <Link
                key={c.name}
                to={`/museums?country=${c.name}`}
                className="group relative rounded-2xl overflow-hidden shadow-warm aspect-square"
              >
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A2420]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <p className="font-display text-white font-semibold text-sm">{c.name}</p>
                  <p className="text-[#D8B892] text-xs">{c.museums} museum{c.museums > 1 ? "s" : ""}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Stats Charts ── */}
      <section className="relative z-10 bg-white py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <p className="text-[#A65E2E] text-sm font-semibold uppercase tracking-widest mb-2">Museum Insights</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#4E342E] font-bold">Collection at a Glance</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-warm border border-[#EDD9BC]">
              <h3 className="font-display text-[#4E342E] font-semibold text-lg mb-6">Museums by Category</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={STATS_BY_CATEGORY} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: "#8B857C" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#8B857C" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#F8F5F0", border: "1px solid #EDD9BC", borderRadius: 12, fontSize: 12 }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {STATS_BY_CATEGORY.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-warm border border-[#EDD9BC]">
              <h3 className="font-display text-[#4E342E] font-semibold text-lg mb-6">Museums by Country</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={STATS_BY_COUNTRY}
                    dataKey="count"
                    nameKey="country"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {STATS_BY_COUNTRY.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#F8F5F0", border: "1px solid #EDD9BC", borderRadius: 12, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#8B857C" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Community Guides ── */}
      <section className="relative z-10 py-20 bg-[#4E342E]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#D8B892] text-sm font-semibold uppercase tracking-widest mb-2">Community</p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F8F5F0] font-bold">Latest Museum Guides</h2>
            </div>
            <Link to="/museums" className="hidden sm:flex items-center gap-1 text-[#D8B892] text-sm font-medium hover:gap-2 transition-all">
              Browse all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDES.slice(0, 6).map((guide) => (
              <div key={guide.id} className="bg-[#3A2420] rounded-2xl overflow-hidden border border-[#6D4C41] hover:border-[#D8B892] transition-colors">
                <div className="relative h-40 bg-[#6D4C41]">
                  <img src={guide.coverImage} alt={guide.title} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A2420]/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#D8B892] text-[#4E342E] text-xs font-semibold px-2 py-0.5 rounded-full">{guide.targetAudience}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-display text-[#F8F5F0] font-semibold text-sm leading-tight mb-1 line-clamp-2">
                    {guide.title}
                  </h4>
                  <p className="text-[#8B857C] text-xs mb-3">{guide.museumName} · {guide.museumCountry}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={guide.authorAvatar} alt={guide.authorName} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-[#8B857C] text-xs">{guide.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#D8B892] text-xs">
                      <Heart className="w-3.5 h-3.5 fill-[#D8B892]" />
                      {guide.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative z-10 bg-white py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <p className="text-[#A65E2E] text-sm font-semibold uppercase tracking-widest mb-2">Loved by Explorers</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#4E342E] font-bold">What Our Community Says</h2>
          </div>
        <div className="relative">
          <div className="bg-white rounded-2xl p-8 shadow-warm border border-[#EDD9BC] text-center max-w-2xl mx-auto">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-[#D8B892] fill-[#D8B892]" />
              ))}
            </div>
            <p className="font-display text-[#4E342E] text-xl italic leading-relaxed mb-6">
              "{TESTIMONIALS[testimonialIdx].text}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <img
                src={TESTIMONIALS[testimonialIdx].avatar}
                alt={TESTIMONIALS[testimonialIdx].name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-[#4E342E] font-semibold text-sm">{TESTIMONIALS[testimonialIdx].name}</p>
                <p className="text-[#8B857C] text-xs">{TESTIMONIALS[testimonialIdx].location}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            <button onClick={() => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-8 h-8 rounded-full bg-[#EDD9BC] text-[#4E342E] flex items-center justify-center hover:bg-[#D8B892] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === testimonialIdx ? "bg-[#A65E2E]" : "bg-[#EDD9BC]"}`} />
            ))}
            <button onClick={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)} className="w-8 h-8 rounded-full bg-[#EDD9BC] text-[#4E342E] flex items-center justify-center hover:bg-[#D8B892] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 py-20 bg-[#F0EBE3]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <p className="text-[#A65E2E] text-sm font-semibold uppercase tracking-widest mb-2">Questions & Answers</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#4E342E] font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#EDD9BC] overflow-hidden shadow-warm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-[#4E342E] text-sm">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-4 h-4 text-[#A65E2E] flex-shrink-0" /> : <Plus className="w-4 h-4 text-[#8B857C] flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[#5D4037] text-sm leading-relaxed border-t border-[#EDD9BC] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Newsletter ── */}
      <section className="relative z-10 py-20 bg-[#4E342E]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <p className="text-[#D8B892] text-sm font-semibold uppercase tracking-widest mb-3">Stay Connected</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#F8F5F0] font-bold mb-4">
            Get Museum Dispatches
          </h2>
          <p className="text-[#8B857C] leading-relaxed mb-8">
            Weekly curation of new museum guides, AI features, and cultural discoveries from around the world.
          </p>
          {subscribed ? (
            <div className="bg-[#3A2420] border border-[#D8B892] rounded-2xl px-6 py-4 text-[#D8B892] font-medium">
              You're subscribed! Welcome to MuseoAI Dispatches.
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
              className="flex gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-[#3A2420] border border-[#6D4C41] rounded-2xl px-4 py-3 text-[#F8F5F0] placeholder-[#6D4C41] focus:outline-none focus:border-[#D8B892] text-sm"
              />
              <button
                type="submit"
                className="bg-[#D8B892] text-[#4E342E] font-semibold px-6 py-3 rounded-2xl hover:bg-[#c9a67d] transition-colors text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}
