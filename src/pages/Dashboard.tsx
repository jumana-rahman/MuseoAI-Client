import { useState } from "react";
import { Link, useNavigate, Routes, Route, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, PlusCircle, Heart, User, Menu, X,
  Trash2, Eye, Sparkles, ChevronRight, Star, MapPin, RefreshCw
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MUSEUMS } from "../data/museums";
import { GUIDES } from "../data/guides";
import { motion } from "framer-motion";

const AUDIENCES = ["Families", "Students", "Tourists", "Researchers", "Art Lovers"];
const INTERESTS = ["Paintings", "Sculptures", "Ancient History", "Modern Art", "Architecture", "Science", "Culture", "War History"];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { path: "/dashboard/add-guide", label: "Add Guide", icon: <PlusCircle className="w-4 h-4" /> },
    { path: "/dashboard/my-guides", label: "My Guides", icon: <BookOpen className="w-4 h-4" /> },
    { path: "/favorites", label: "Favorites", icon: <Heart className="w-4 h-4" /> },
    { path: "/dashboard/profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-4 sticky top-24">
              <div className="flex items-center gap-3 p-3 mb-4 border-b border-[#EDD9BC]">
                <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="font-semibold text-[#4E342E] text-sm truncate">{user.name}</p>
                  <p className="text-[#8B857C] text-xs truncate">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === item.path ? "bg-[#4E342E] text-[#F8F5F0]" : "text-[#5D4037] hover:bg-[#EDD9BC]"}`}
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile sidebar toggle */}
          <div className="lg:hidden fixed bottom-6 left-4 z-40">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-[#4E342E] text-[#F8F5F0] w-12 h-12 rounded-full flex items-center justify-center shadow-warm-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setSidebarOpen(false)}>
              <div className="bg-white w-64 h-full p-4 shadow-warm-lg" onClick={(e) => e.stopPropagation()}>
                <nav className="space-y-1 mt-16">
                  {navItems.map((item) => (
                    <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === item.path ? "bg-[#4E342E] text-[#F8F5F0]" : "text-[#5D4037] hover:bg-[#EDD9BC]"}`}
                    >
                      {item.icon} {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 min-w-0"
          >
            <Routes>
              <Route index element={<Overview />} />
              <Route path="add-guide" element={<AddGuide />} />
              <Route path="my-guides" element={<MyGuides />} />
              <Route path="profile" element={<ProfileSettings />} />
            </Routes>
          </motion.main>
        </div>
      </div>
    </div>
  );
}

function Overview() {
  const { user, favorites, aiConversationCount } = useAuth();
  const userGuides = GUIDES.filter((g) => g.authorId === "u_demo" || g.authorId === user?.id);

  return (
    <div>
      <h1 className="font-display text-2xl text-[#4E342E] font-bold mb-6">Welcome back, {user?.name.split(" ")[0]}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Published Guides" value={userGuides.length} icon={<BookOpen className="w-5 h-5" />} color="bg-[#EDD9BC]" textColor="text-[#A65E2E]" />
        <StatCard label="Favorite Museums" value={favorites.length} icon={<Heart className="w-5 h-5" />} color="bg-[#EDD9BC]" textColor="text-[#A65E2E]" />
        <StatCard label="AI Conversations" value={aiConversationCount} icon={<Sparkles className="w-5 h-5" />} color="bg-[#EDD9BC]" textColor="text-[#A65E2E]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-[#4E342E] font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {[
              { action: "Favorited", target: "The Louvre Museum", time: "2 hours ago", icon: <Heart className="w-4 h-4 text-[#A65E2E]" /> },
              { action: "Published guide", target: "A Perfect Half-Day at the Louvre", time: "Yesterday", icon: <BookOpen className="w-4 h-4 text-[#A65E2E]" /> },
              { action: "Reviewed", target: "Uffizi Gallery", time: "3 days ago", icon: <Star className="w-4 h-4 text-[#A65E2E]" /> },
              { action: "AI chat with", target: "Tokyo National Museum", time: "1 week ago", icon: <Sparkles className="w-4 h-4 text-[#A65E2E]" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 bg-[#EDD9BC] rounded-lg flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <span className="text-[#8B857C]">{item.action} </span>
                  <span className="font-medium text-[#4E342E]">{item.target}</span>
                </div>
                <span className="text-[#8B857C] text-xs flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-[#4E342E] font-semibold">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            {[
              { label: "Write a new guide", to: "/dashboard/add-guide", icon: <PlusCircle className="w-4 h-4" /> },
              { label: "Browse museums", to: "/museums", icon: <MapPin className="w-4 h-4" /> },
              { label: "View my favorites", to: "/favorites", icon: <Heart className="w-4 h-4" /> },
              { label: "Update profile", to: "/dashboard/profile", icon: <User className="w-4 h-4" /> },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="flex items-center justify-between px-4 py-3 bg-[#F8F5F0] rounded-xl hover:bg-[#EDD9BC] transition-colors">
                <div className="flex items-center gap-2 text-sm font-medium text-[#4E342E]">
                  <span className="text-[#A65E2E]">{item.icon}</span>
                  {item.label}
                </div>
                <ChevronRight className="w-4 h-4 text-[#8B857C]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, textColor }: { label: string; value: number; icon: React.ReactNode; color: string; textColor: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-5">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center ${textColor} mb-3`}>{icon}</div>
      <p className="font-display text-3xl font-bold text-[#4E342E]">{value}</p>
      <p className="text-[#8B857C] text-sm mt-0.5">{label}</p>
    </div>
  );
}

function AddGuide() {
  useAuth();
  const [form, setForm] = useState({
    title: "", museumId: "", targetAudience: "", visitDuration: "", shortDescription: "", guideContent: "", coverImage: "",
  });
  const [aiMode, setAiMode] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [outputLength, setOutputLength] = useState("medium");
  const [submitted, setSubmitted] = useState(false);

  const generateAI = async () => {
    if (!form.museumId || !form.targetAudience || !form.visitDuration) return;
    setAiGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    const museum = MUSEUMS.find((m) => m.id === form.museumId);
    setForm((f) => ({
      ...f,
      title: `A ${f.visitDuration} Guide to ${museum?.title} for ${f.targetAudience}`,
      shortDescription: `A curated ${f.visitDuration} itinerary at ${museum?.title} tailored for ${f.targetAudience.toLowerCase()}, focusing on ${interests.join(", ") || "the highlights"}.`,
      guideContent: `## Getting Started\n\nArrive at ${museum?.title} when it opens to get the best experience. ${museum?.visitorTips[0] || ""}\n\n## Must-See Areas\n\n${museum?.description}\n\n## Suggested Route\n\nBegin at the main entrance and collect a museum map. Follow the recommended route for ${f.targetAudience.toLowerCase()} visitors. ${museum?.visitorTips[1] || ""}\n\n## Visitor Tips\n\n${museum?.visitorTips.slice(0, 3).map((t, i) => `${i + 1}. ${t}`).join("\n")}\n\n## Estimated Time\n\nTotal duration: ${f.visitDuration}`,
    }));
    setAiGenerating(false);
    setAiMode(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-display text-2xl text-[#4E342E] font-bold mb-2">Guide Published!</h2>
        <p className="text-[#8B857C] mb-6">Your museum guide is now live for the community to discover.</p>
        <div className="flex justify-center gap-3">
          <Link to="/dashboard/my-guides" className="bg-[#4E342E] text-[#F8F5F0] px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#A65E2E] transition-colors">View My Guides</Link>
          <button onClick={() => { setSubmitted(false); setForm({ title: "", museumId: "", targetAudience: "", visitDuration: "", shortDescription: "", guideContent: "", coverImage: "" }); }} className="border border-[#EDD9BC] text-[#4E342E] px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#EDD9BC] transition-colors">
            Write Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-[#4E342E] font-bold">Add Museum Guide</h1>
        <button
          onClick={() => setAiMode(!aiMode)}
          className="flex items-center gap-2 bg-[#4E342E] text-[#F8F5F0] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#A65E2E] transition-colors"
        >
          <Sparkles className="w-4 h-4" /> AI Guide Writer
        </button>
      </div>

      {/* AI Panel */}
      {aiMode && (
        <div className="bg-gradient-to-br from-[#4E342E] to-[#3A2420] rounded-2xl p-5 mb-6 text-[#F8F5F0]">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#D8B892]" />
            <span className="font-display font-semibold">AI Guide Writer</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-[#8B857C] mb-1">Target Audience *</label>
              <select
                value={form.targetAudience}
                onChange={(e) => setForm((f) => ({ ...f, targetAudience: e.target.value }))}
                className="w-full bg-[#3A2420] border border-[#6D4C41] rounded-xl px-3 py-2 text-sm text-[#F8F5F0] focus:outline-none focus:border-[#D8B892]"
              >
                <option value="">Select audience</option>
                {AUDIENCES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#8B857C] mb-1">Visit Duration *</label>
              <input
                value={form.visitDuration}
                onChange={(e) => setForm((f) => ({ ...f, visitDuration: e.target.value }))}
                placeholder="e.g. 3 hours, Half-day"
                className="w-full bg-[#3A2420] border border-[#6D4C41] rounded-xl px-3 py-2 text-sm text-[#F8F5F0] placeholder-[#6D4C41] focus:outline-none focus:border-[#D8B892]"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs text-[#8B857C] mb-2">Interests (optional)</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => setInterests((prev) => prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest])}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${interests.includes(interest) ? "bg-[#D8B892] text-[#4E342E] border-[#D8B892]" : "border-[#6D4C41] text-[#8B857C] hover:border-[#D8B892]"}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {["short", "medium", "long"].map((len) => (
                <button key={len} type="button" onClick={() => setOutputLength(len)}
                  className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors ${outputLength === len ? "bg-[#D8B892] text-[#4E342E]" : "border border-[#6D4C41] text-[#8B857C] hover:border-[#D8B892]"}`}
                >
                  {len}
                </button>
              ))}
            </div>
            <button
              onClick={generateAI}
              disabled={!form.museumId || !form.targetAudience || !form.visitDuration || aiGenerating}
              className="flex items-center gap-2 bg-[#D8B892] text-[#4E342E] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#c9a67d] transition-colors disabled:opacity-50"
            >
              {aiGenerating ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate</>}
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-6 space-y-4">
        <FormField label="Guide Title *" required>
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="A compelling title for your guide" className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892]" required />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Museum *" required>
            <select value={form.museumId} onChange={(e) => setForm((f) => ({ ...f, museumId: e.target.value }))} className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]" required>
              <option value="">Select a museum</option>
              {MUSEUMS.map((m) => <option key={m.id} value={m.id}>{m.title}</option>)}
            </select>
          </FormField>
          <FormField label="Target Audience *" required>
            <select value={form.targetAudience} onChange={(e) => setForm((f) => ({ ...f, targetAudience: e.target.value }))} className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]" required>
              <option value="">Select audience</option>
              {AUDIENCES.map((a) => <option key={a}>{a}</option>)}
            </select>
          </FormField>
          <FormField label="Visit Duration *" required>
            <input value={form.visitDuration} onChange={(e) => setForm((f) => ({ ...f, visitDuration: e.target.value }))} placeholder="e.g. 3 hours, Half-day" className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892]" required />
          </FormField>
          <FormField label="Cover Image URL">
            <input value={form.coverImage} onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))} placeholder="https://..." className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892]" />
          </FormField>
        </div>

        <FormField label="Short Description *" required>
          <textarea value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} rows={2} maxLength={200} placeholder="A one or two sentence description of your guide" className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892] resize-none" required />
        </FormField>

        <FormField label="Guide Content *" required>
          <textarea value={form.guideContent} onChange={(e) => setForm((f) => ({ ...f, guideContent: e.target.value }))} rows={8} placeholder="Write your detailed museum guide here. Include itinerary, must-see exhibits, tips, and recommended route..." className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892] resize-none" required />
        </FormField>

        <button type="submit" className="w-full bg-[#4E342E] text-[#F8F5F0] py-3 rounded-2xl font-semibold hover:bg-[#A65E2E] transition-colors">
          Publish Guide
        </button>
      </form>
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-1.5">
        {label}{required && " *"}
      </label>
      {children}
    </div>
  );
}

function MyGuides() {
  const { user: currentUser } = useAuth();
  const userGuides = GUIDES.filter((g) => g.authorId === "u_demo" || (currentUser && g.authorId === currentUser.id));
  const [guides, setGuides] = useState(userGuides);

  const deleteGuide = (id: string) => {
    if (confirm("Delete this guide? This cannot be undone.")) {
      setGuides((prev) => prev.filter((g) => g.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-[#4E342E] font-bold">My Guides</h1>
        <Link to="/dashboard/add-guide" className="flex items-center gap-2 bg-[#4E342E] text-[#F8F5F0] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#A65E2E] transition-colors">
          <PlusCircle className="w-4 h-4" /> Add Guide
        </Link>
      </div>

      {guides.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-12 text-center">
          <BookOpen className="w-10 h-10 text-[#D8B892] mx-auto mb-3" />
          <h3 className="font-display text-[#4E342E] text-lg font-semibold mb-2">No guides yet</h3>
          <p className="text-[#8B857C] mb-5">Share your museum knowledge with the community</p>
          <Link to="/dashboard/add-guide" className="bg-[#4E342E] text-[#F8F5F0] px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#A65E2E] transition-colors">
            Write Your First Guide
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-[#EDD9BC]">
              <tr>
                {["Guide Title", "Museum", "Audience", "Created", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#8B857C] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guides.map((guide, i) => (
                <tr key={guide.id} className={`border-b border-[#EDD9BC] last:border-0 ${i % 2 === 0 ? "" : "bg-[#F8F5F0]"}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#4E342E] text-sm line-clamp-1">{guide.title}</p>
                  </td>
                  <td className="px-4 py-3 text-[#5D4037] text-sm">{guide.museumName}</td>
                  <td className="px-4 py-3"><span className="bg-[#EDD9BC] text-[#4E342E] text-xs px-2 py-0.5 rounded-full">{guide.targetAudience}</span></td>
                  <td className="px-4 py-3 text-[#8B857C] text-xs">{guide.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link to={`/museums/${guide.museumId}`} className="w-7 h-7 bg-[#EDD9BC] rounded-lg flex items-center justify-center text-[#4E342E] hover:bg-[#D8B892] transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button onClick={() => deleteGuide(guide.id)} className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ProfileSettings() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    country: user?.country || "",
    photo: user?.photo || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-[#4E342E] font-bold mb-6">Profile Settings</h1>
      <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#EDD9BC]">
          <img src={form.photo || user?.photo} alt="Profile" className="w-16 h-16 rounded-2xl object-cover" />
          <div>
            <p className="font-semibold text-[#4E342E]">{user?.name}</p>
            <p className="text-[#8B857C] text-sm">{user?.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Display Name">
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]" />
            </FormField>
            <FormField label="Country">
              <input value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} placeholder="Your country" className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892]" />
            </FormField>
          </div>
          <FormField label="Photo URL">
            <input value={form.photo} onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))} placeholder="https://..." className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892]" />
          </FormField>
          <FormField label="Bio">
            <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={3} maxLength={200} placeholder="Tell the community about yourself..." className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892] resize-none" />
          </FormField>
          <button type="submit" className="bg-[#4E342E] text-[#F8F5F0] px-6 py-2.5 rounded-2xl text-sm font-semibold hover:bg-[#A65E2E] transition-colors">
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
