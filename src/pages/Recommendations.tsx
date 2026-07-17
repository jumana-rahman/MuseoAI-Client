import { useState } from "react";
import { Sparkles, RefreshCw, Star, MapPin, Ticket, ThumbsUp, ThumbsDown } from "lucide-react";
import { Link } from "react-router-dom";
import { MUSEUMS } from "../data/museums";
import { motion } from "framer-motion";


const INTERESTS = ["Art & Painting", "Ancient History", "Science & Technology", "Natural History", "Military History", "Architecture", "World Cultures", "Modern Art"];
const COUNTRIES = ["Any", "France", "Italy", "Egypt", "Japan", "USA", "United Kingdom", "Germany", "Spain"];
const TRAVEL_TYPES = ["Solo", "Couple", "Family", "Friends"];
const BUDGETS = ["Free only", "Budget (under $15)", "Mid-range ($15-$25)", "Premium (any)"];
const DURATIONS = ["Half-day", "Full day", "Weekend", "Week+"];

type Recommendation = {
  museum: (typeof MUSEUMS)[0];
  reason: string;
};

function getRecommendations(interests: string[], country: string, budget: string, travelType: string, _duration: string): Recommendation[] {
  let candidates = [...MUSEUMS];

  if (country !== "Any") candidates = candidates.filter((m) => m.country === country);

  if (budget === "Free only") candidates = candidates.filter((m) => m.ticketType === "Free");
  else if (budget === "Budget (under $15)") candidates = candidates.filter((m) => m.ticketPrice < 15);

  if (travelType === "Family") candidates = candidates.filter((m) => !["Military"].includes(m.category));

  candidates.sort((a, b) => b.rating - a.rating);

  return candidates.slice(0, 5).map((museum) => {
    const categoryInterestMap: Record<string, string[]> = {
      "Art": ["Art & Painting", "Modern Art", "Architecture"],
      "History": ["Ancient History", "World Cultures"],
      "Archaeology": ["Ancient History", "World Cultures"],
      "Science": ["Science & Technology"],
      "Military": ["Military History"],
      "Natural History": ["Natural History"],
    };

    const matchedInterests = (categoryInterestMap[museum.category] || []).filter((i) => interests.includes(i));
    const reason = matchedInterests.length > 0
      ? `Matches your interest in ${matchedInterests.join(" and ")}. Rated ${museum.rating}/5 with ${museum.reviewCount.toLocaleString()} reviews — one of the top ${museum.category.toLowerCase()} museums in ${museum.country}.`
      : `Highly rated at ${museum.rating}/5. A world-class ${museum.category.toLowerCase()} destination in ${museum.city} with exceptional visitor experience for ${travelType.toLowerCase()} travelers.`;

    return { museum, reason };
  });
}

export default function Recommendations() {
  const [form, setForm] = useState({
    interests: [] as string[],
    country: "Any",
    budget: "Mid-range ($15-$25)",
    travelType: "Solo",
    duration: "Full day",
  });
  const [results, setResults] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, "up" | "down">>({});

  const toggleInterest = (i: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(i) ? f.interests.filter((x) => x !== i) : [...f.interests, i],
    }));
  };

  const generate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setResults(getRecommendations(form.interests, form.country, form.budget, form.travelType, form.duration));
    setLoading(false);
    setGenerated(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-20">
      <div className="bg-[#4E342E] py-14 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#D8B892]/20 border border-[#D8B892]/30 text-[#D8B892] text-sm px-3 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" /> AI-Powered
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F8F5F0] font-bold mb-3">Smart Museum Recommendations</h1>
        <p className="text-[#8B857C] max-w-md mx-auto">Tell us about your preferences and our AI will match you with museums from our curated directory.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        {/* Input form */}
        <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-6 mb-8">
          <h2 className="font-display text-[#4E342E] font-semibold text-lg mb-5">Your Preferences</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`text-sm px-3 py-1.5 rounded-xl border transition-colors ${form.interests.includes(i) ? "bg-[#4E342E] text-[#F8F5F0] border-[#4E342E]" : "border-[#EDD9BC] text-[#5D4037] hover:border-[#D8B892]"}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Country", key: "country", options: COUNTRIES },
                { label: "Budget", key: "budget", options: BUDGETS },
                { label: "Travel Type", key: "travelType", options: TRAVEL_TYPES },
                { label: "Duration", key: "duration", options: DURATIONS },
              ].map(({ label, key, options }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-1.5">{label}</label>
                  <select
                    value={(form as any)[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]"
                  >
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={generate}
                disabled={loading}
                className="flex items-center gap-2 bg-[#4E342E] text-[#F8F5F0] px-6 py-2.5 rounded-2xl font-semibold hover:bg-[#A65E2E] transition-colors disabled:opacity-60 text-sm"
              >
                {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Finding matches...</> : <><Sparkles className="w-4 h-4" /> Get Recommendations</>}
              </button>
              {generated && (
                <button onClick={generate} disabled={loading} className="flex items-center gap-2 border border-[#EDD9BC] text-[#4E342E] px-4 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#EDD9BC] transition-colors">
                  <RefreshCw className="w-4 h-4" /> Regenerate
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-[#4E342E] font-semibold text-xl">Your Matches</h2>
            {results.map(({ museum, reason }, i) => (
              <div key={museum.id} className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-5 flex gap-4">
                <div className="flex-shrink-0 text-2xl font-display font-bold text-[#EDD9BC] w-8">{i + 1}</div>
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#EDD9BC] flex-shrink-0">
                  <img src={museum.coverImage} alt={museum.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-[#4E342E] font-semibold leading-tight">{museum.title}</h3>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => setFeedback((f) => ({ ...f, [museum.id]: "up" }))}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${feedback[museum.id] === "up" ? "bg-green-100 text-green-600" : "bg-[#EDD9BC] text-[#8B857C] hover:text-green-600"}`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setFeedback((f) => ({ ...f, [museum.id]: "down" }))}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${feedback[museum.id] === "down" ? "bg-red-100 text-red-500" : "bg-[#EDD9BC] text-[#8B857C] hover:text-red-500"}`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8B857C] my-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{museum.city}, {museum.country}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[#D8B892] fill-[#D8B892]" />{museum.rating}</span>
                    <span className="flex items-center gap-1"><Ticket className="w-3 h-3" />{museum.ticketType === "Free" ? "Free" : `$${museum.ticketPrice}`}</span>
                  </div>
                  <p className="text-[#5D4037] text-xs leading-relaxed mb-2 italic">
                    <span className="text-[#A65E2E] font-medium not-italic">Because:</span> {reason}
                  </p>
                  <Link to={`/museums/${museum.id}`} className="text-xs font-medium text-[#A65E2E] hover:underline">
                    View museum details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
