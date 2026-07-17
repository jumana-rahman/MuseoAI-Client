import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, Map, Heart, Award, Globe, BookOpen } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-16">
      {/* Hero */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#4E342E] text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative">
          <p className="text-[#D8B892] text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F8F5F0] font-bold mb-4">About MuseoAI</h1>
          <p className="text-[#8B857C] text-lg max-w-2xl mx-auto leading-relaxed">
            We believe that cultural heritage belongs to everyone. MuseoAI was built to make the world's museums more accessible, discoverable, and meaningful for every kind of traveler.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#A65E2E] text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="font-display text-3xl text-[#4E342E] font-bold mb-5 leading-tight">
              Connecting people to the world's cultural heritage
            </h2>
            <p className="text-[#5D4037] leading-relaxed mb-4">
              Museums hold humanity's stories — in paintings, artifacts, manuscripts, and scientific discoveries. Too often, these stories remain inaccessible: buried under confusing websites, locked behind language barriers, or simply unknown.
            </p>
            <p className="text-[#5D4037] leading-relaxed">
              MuseoAI changes that. By combining a professionally curated museum directory with the power of AI and community knowledge, we help you discover, plan, and deeply experience museums anywhere in the world.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-warm-lg h-72">
              <img src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=700&h=500&fit=crop&auto=format" alt="Museum gallery" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#D8B892] rounded-2xl px-4 py-3 shadow-warm-lg">
              <p className="font-display text-[#4E342E] font-bold text-2xl">20+</p>
              <p className="text-[#5D4037] text-xs">Curated museums</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#4E342E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D8B892] text-sm font-semibold uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="font-display text-3xl text-[#F8F5F0] font-bold">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <Globe className="w-6 h-6" />, title: "Accessibility", desc: "Cultural knowledge should be freely available to everyone, regardless of language, location, or background." },
              { icon: <Award className="w-6 h-6" />, title: "Curation Quality", desc: "Every museum in our directory is carefully vetted to ensure accurate, useful, and up-to-date information." },
              { icon: <BookOpen className="w-6 h-6" />, title: "Community First", desc: "Real visitor insights from real people make museum experiences richer than any official guide could provide." },
            ].map((v) => (
              <div key={v.title} className="bg-[#3A2420] rounded-2xl p-6 border border-[#6D4C41]">
                <div className="w-12 h-12 bg-[#D8B892]/20 rounded-xl flex items-center justify-center text-[#D8B892] mb-4">{v.icon}</div>
                <h3 className="font-display text-[#F8F5F0] font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-[#8B857C] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#A65E2E] text-sm font-semibold uppercase tracking-widest mb-2">Platform</p>
          <h2 className="font-display text-3xl text-[#4E342E] font-bold">What MuseoAI Offers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { icon: <MessageCircle className="w-5 h-5" />, title: "AI Museum Guide", desc: "Contextual chat assistant on every museum page. Ask anything — get accurate, curator-quality answers." },
            { icon: <Sparkles className="w-5 h-5" />, title: "AI Guide Writer", desc: "Generate structured, editable museum visit guides tailored to your audience and duration." },
            { icon: <Map className="w-5 h-5" />, title: "Smart Recommendations", desc: "Tell us your interests and travel style, get curated museum matches with AI reasoning." },
            { icon: <Heart className="w-5 h-5" />, title: "Save & Organize", desc: "Build your personal museum wishlist and track cultural experiences you want to have." },
          ].map((f) => (
            <div key={f.title} className="flex gap-4 bg-white rounded-2xl p-5 border border-[#EDD9BC] shadow-warm">
              <div className="w-10 h-10 bg-[#EDD9BC] rounded-xl flex items-center justify-center text-[#A65E2E] flex-shrink-0">{f.icon}</div>
              <div>
                <h3 className="font-semibold text-[#4E342E] mb-1">{f.title}</h3>
                <p className="text-[#5D4037] text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#EDD9BC] text-center px-4">
        <h2 className="font-display text-3xl text-[#4E342E] font-bold mb-3">Ready to start exploring?</h2>
        <p className="text-[#5D4037] mb-8">Discover curated museums and plan your next cultural journey.</p>
        <div className="flex justify-center gap-3">
          <Link to="/museums" className="bg-[#4E342E] text-[#F8F5F0] px-6 py-3 rounded-2xl font-semibold hover:bg-[#A65E2E] transition-colors text-sm">
            Explore Museums
          </Link>
          <Link to="/register" className="bg-white border border-[#D8B892] text-[#4E342E] px-6 py-3 rounded-2xl font-semibold hover:bg-[#F8F5F0] transition-colors text-sm">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}
