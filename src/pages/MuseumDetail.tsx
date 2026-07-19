import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin, Clock, Ticket, Star, Heart, Send, Sparkles,
  MessageCircle, RefreshCw, X, BookOpen, ArrowLeft, Landmark
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useMuseum, useRelatedMuseums, useFavoriteMuseumIds, useToggleFavorite } from "../hooks/useMuseums";
import { useMuseumGuides } from "../hooks/useGuides";
import { useMuseumReviews, useCreateReview } from "../hooks/useReviews";
import { aiService } from "../services/ai";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

const PROMPT_CHIPS = [
  "What should I visit first?",
  "Is it suitable for children?",
  "How long should I spend?",
  "Does it have guided tours?",
  "What are the opening hours?",
  "Any visiting tips?",
];

export default function MuseumDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: museum, isLoading: museumLoading } = useMuseum(id || "");
  const { data: related = [] } = useRelatedMuseums(id || "");
  const { data: guides = [] } = useMuseumGuides(id || "");
  const { data: reviews = [] } = useMuseumReviews(id || "");
  const favoriteIds = useFavoriteMuseumIds();
  const toggleFav = useToggleFavorite();
  const createReview = useCreateReview(id || "");

  const isFav = favoriteIds.has(id || "");

  const [activeTab, setActiveTab] = useState("overview");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getWelcomeMessage = () => museum
    ? `Welcome! I'm your AI guide for ${museum.title}. Ask me anything about the museum — opening hours, highlights, visitor tips, or what to see first.`
    : "";

  const loadConversation = async () => {
    if (!museum) return;
    if (!user) {
      setMessages([{ role: "assistant", content: getWelcomeMessage() }]);
      return;
    }
    try {
      const data = await aiService.getConversation(museum.id);
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        if (data.conversationId) setConversationId(data.conversationId);
        return;
      }
    } catch {
      // ignore
    }
    setMessages([{ role: "assistant", content: getWelcomeMessage() }]);
  };

  const openChat = () => {
    setChatOpen(true);
    loadConversation();
  };

  const resetChat = () => {
    setMessages([{ role: "assistant", content: getWelcomeMessage() }]);
    setConversationId(undefined);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (museumLoading) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#EDD9BC] border-t-[#A65E2E] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8B857C] text-sm">Loading museum details...</p>
        </div>
      </div>
    );
  }

  if (!museum) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Landmark className="w-16 h-16 text-[#EDD9BC] mx-auto mb-4" />
          <h2 className="font-display text-2xl text-[#4E342E] font-bold mb-3">Museum not found</h2>
          <p className="text-[#8B857C] mb-6">The museum you're looking for doesn't exist in our directory.</p>
          <Link to="/museums" className="bg-[#4E342E] text-[#F8F5F0] px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#A65E2E] transition-colors">
            Back to Museums
          </Link>
        </div>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setStreaming(true);

    let fullReply = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    await aiService.museumChatStream({
      museumId: museum.id,
      message: userMsg,
      conversationId,
      onChunk: (text) => {
        fullReply += text;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: fullReply };
          return updated;
        });
      },
      onConversationId: (id) => {
        if (id) setConversationId(id);
      },
      onDone: () => setStreaming(false),
      onError: (err?: Error) => {
        setStreaming(false);
        const msg = err?.message || "Sorry, the AI service is temporarily unavailable. Please try again.";
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: msg };
          return updated;
        });
      },
    });
  };

  const submitReview = async () => {
    if (!user || !reviewText.trim()) return;
    try {
      await createReview.mutateAsync({ rating: reviewRating, review: reviewText });
      setReviewText("");
      setReviewRating(5);
      toast.success("Review submitted!");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleToggleFavorite = () => {
    if (!user) return navigate("/login");
    toggleFav.mutate({ museumId: museum.id, isFavorited: isFav });
  };

  const tabs = ["overview", "history", "facilities", "guides", "reviews"];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-16">
      <div className="relative h-80 sm:h-96 bg-[#3A2420]">
        <img src={museum.coverImage} alt={museum.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2420]/80 via-transparent to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-6 left-4 sm:left-8 flex items-center gap-1 text-white/80 hover:text-white text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#D8B892] text-[#4E342E] text-xs font-semibold px-2.5 py-1 rounded-full">{museum.category}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${museum.ticketType === "Free" ? "bg-green-500 text-white" : "bg-white/90 text-[#4E342E]"}`}>
              {museum.ticketType === "Free" ? "Free Entry" : `$${museum.ticketPrice}`}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white font-bold mb-1">{museum.title}</h1>
          <div className="flex items-center gap-4 text-[#EDD9BC] text-sm">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{museum.city}, {museum.country}</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-[#D8B892] fill-[#D8B892]" />{museum.rating} ({museum.reviewCount.toLocaleString()} reviews)</span>
          </div>
        </div>
        {user && (
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-6 right-4 sm:right-8 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFav ? "bg-[#A65E2E] text-white" : "bg-white/20 text-white hover:bg-[#A65E2E]"}`}
          >
            <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
          </button>
        )}
      </div>

      {museum.gallery.length > 0 && (
        <div className="flex gap-2 px-4 sm:px-8 mt-2">
          {museum.gallery.map((img, i) => (
            <div key={i} className="h-20 w-32 rounded-xl overflow-hidden bg-[#EDD9BC] flex-shrink-0">
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex gap-1 bg-white rounded-2xl p-1 border border-[#EDD9BC] shadow-warm mb-6 overflow-x-auto">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${activeTab === t ? "bg-[#4E342E] text-[#F8F5F0]" : "text-[#8B857C] hover:text-[#4E342E]"}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-warm border border-[#EDD9BC]">
                  <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">About</h2>
                  <p className="text-[#5D4037] leading-relaxed">{museum.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InfoCard icon={<Clock className="w-5 h-5" />} label="Opening Hours" value={museum.openingHours} />
                  <InfoCard icon={<Ticket className="w-5 h-5" />} label="Ticket Price" value={museum.ticketType === "Free" ? "Free Entry" : `$${museum.ticketPrice} per adult`} />
                  <InfoCard icon={<MapPin className="w-5 h-5" />} label="Location" value={`${museum.city}, ${museum.country}`} />
                  <InfoCard icon={<Star className="w-5 h-5" />} label="Rating" value={`${museum.rating}/5 (${museum.reviewCount.toLocaleString()} reviews)`} />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-warm border border-[#EDD9BC]">
                  <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-3">Visitor Tips</h2>
                  <ul className="space-y-2">
                    {museum.visitorTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#5D4037] text-sm">
                        <span className="w-5 h-5 bg-[#EDD9BC] rounded-full flex items-center justify-center text-[#A65E2E] text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="bg-white rounded-2xl p-6 shadow-warm border border-[#EDD9BC]">
                <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-4">History</h2>
                <p className="text-[#5D4037] leading-relaxed">{museum.history}</p>
              </div>
            )}

            {activeTab === "facilities" && (
              <div className="bg-white rounded-2xl p-6 shadow-warm border border-[#EDD9BC]">
                <h2 className="font-display text-[#4E342E] text-xl font-semibold mb-4">Facilities</h2>
                <div className="flex flex-wrap gap-2">
                  {museum.facilities.map((f) => (
                    <span key={f} className="bg-[#EDD9BC] text-[#4E342E] text-sm px-3 py-1.5 rounded-xl font-medium">{f}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "guides" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-[#4E342E] text-xl font-semibold">Community Guides</h2>
                  <button
                    onClick={() => {
                      if (user) navigate(`/items/add?museumId=${museum.id}`);
                      else navigate("/login", { state: { from: `/museums/${museum.id}` } });
                    }}
                    className="bg-[#4E342E] text-[#F8F5F0] text-sm px-4 py-2 rounded-xl hover:bg-[#A65E2E] transition-colors flex items-center gap-1"
                  >
                    <BookOpen className="w-4 h-4" /> Write Guide
                  </button>
                </div>
                {guides.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-[#EDD9BC] shadow-warm">
                    <BookOpen className="w-8 h-8 text-[#D8B892] mx-auto mb-3" />
                    <p className="text-[#8B857C]">No community guides yet for this museum.</p>
                    {user ? (
                      <Link to={`/items/add?museumId=${museum.id}`} className="text-[#A65E2E] text-sm font-medium mt-2 inline-block">Be the first to write one →</Link>
                    ) : (
                      <button onClick={() => navigate("/login", { state: { from: `/museums/${museum.id}` } })} className="text-[#A65E2E] text-sm font-medium mt-2 inline-block hover:underline">Sign in to write a guide →</button>
                    )}
                  </div>
                ) : (
                  guides.map((g) => (
                    <Link key={g.id} to={`/guides/${g.id}`} className="block bg-white rounded-2xl p-5 border border-[#EDD9BC] shadow-warm hover:shadow-warm-lg transition-shadow">
                      <div className="flex gap-2 mb-2">
                        <span className="bg-[#EDD9BC] text-[#4E342E] text-xs px-2 py-0.5 rounded-full">{g.targetAudience}</span>
                        <span className="bg-[#EDD9BC] text-[#4E342E] text-xs px-2 py-0.5 rounded-full">{g.visitDuration}</span>
                      </div>
                      <h3 className="font-display text-[#4E342E] font-semibold mb-1">{g.title}</h3>
                      <p className="text-[#5D4037] text-sm line-clamp-2 mb-3">{g.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8B857C] text-xs">By author</span>
                        <div className="flex items-center gap-1 text-[#D8B892] text-xs">
                          <Heart className="w-3.5 h-3.5 fill-[#D8B892]" />{g.likes}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <h2 className="font-display text-[#4E342E] text-xl font-semibold">Reviews</h2>
                {user && (
                  <div className="bg-white rounded-2xl p-5 border border-[#EDD9BC] shadow-warm">
                    <p className="font-medium text-[#4E342E] text-sm mb-3">Write a Review</p>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setReviewRating(s)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setReviewRating(s); } }}
                      role="radio" aria-checked={s === reviewRating} aria-label={`${s} star${s !== 1 ? "s" : ""}`} tabIndex={0}
                    >
                      <Star className={`w-5 h-5 ${s <= reviewRating ? "text-[#D8B892] fill-[#D8B892]" : "text-[#EDD9BC]"}`} />
                    </button>
                      ))}
                    </div>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience visiting this museum..."
                      maxLength={2000}
                      rows={3}
                      className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892] resize-none mb-3"
                    />
                    <button
                      onClick={submitReview}
                      disabled={!reviewText.trim() || createReview.isPending}
                      className="bg-[#4E342E] text-[#F8F5F0] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#A65E2E] transition-colors disabled:opacity-50"
                    >
                      {createReview.isPending ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                )}
                {reviews.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-[#EDD9BC] shadow-warm">
                    <p className="text-[#8B857C]">No reviews yet. Be the first to share your experience.</p>
                  </div>
                ) : (
                  reviews.map((r) => (
                    <div key={r.id} className="bg-white rounded-2xl p-5 border border-[#EDD9BC] shadow-warm">
                      <div className="flex items-center gap-3 mb-3">
                        {(r as any).userAvatar ? (
                          <img src={(r as any).userAvatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#EDD9BC] flex items-center justify-center text-[#A65E2E] text-sm font-bold">
                            {((r as any).userName ?? "A")[0].toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-[#4E342E] text-sm">{(r as any).userName ?? "Anonymous"}</p>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map((s) => <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "text-[#D8B892] fill-[#D8B892]" : "text-[#EDD9BC]"}`} />)}
                          </div>
                        </div>
                        <span className="ml-auto text-[#8B857C] text-xs">{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[#5D4037] text-sm leading-relaxed">{r.review}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-gradient-to-br from-[#4E342E] to-[#3A2420] rounded-2xl p-5 text-[#F8F5F0] border border-[#D8B892]/30 animate-pulse-slow">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-[#D8B892]" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#D8B892] rounded-full animate-ping" />
                </div>
                <span className="font-display font-semibold">AI Museum Guide</span>
              </div>
              <p className="text-[#8B857C] text-sm mb-4">Chat with an AI that knows this museum inside out — history, exhibits, tips, and more.</p>
              <button
                onClick={openChat}
                className="w-full bg-[#D8B892] text-[#4E342E] font-semibold py-2.5 rounded-xl hover:bg-[#c9a67d] transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" /> Start Conversation
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EDD9BC] shadow-warm space-y-3">
              <h3 className="font-display text-[#4E342E] font-semibold">Quick Info</h3>
              <div className="text-sm text-[#5D4037] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#8B857C]">City</span><span className="font-medium">{museum.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B857C]">Country</span><span className="font-medium">{museum.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B857C]">Category</span><span className="font-medium">{museum.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B857C]">Entry</span>
                  <span className={`font-semibold ${museum.ticketType === "Free" ? "text-green-600" : "text-[#A65E2E]"}`}>
                    {museum.ticketType === "Free" ? "Free" : `$${museum.ticketPrice}`}
                  </span>
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${museum.title}`}
                target="_blank"
                rel="noreferrer"
                className="w-full border border-[#EDD9BC] text-[#4E342E] font-medium py-2 rounded-xl hover:bg-[#EDD9BC] transition-colors flex items-center justify-center gap-1 text-sm mt-2"
              >
                <MapPin className="w-4 h-4" /> View on Map
              </a>
            </div>

            {related.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-[#EDD9BC] shadow-warm">
                <h3 className="font-display text-[#4E342E] font-semibold mb-3">Related Museums</h3>
                <div className="space-y-3">
                  {related.map((m) => (
                    <Link key={m.id} to={`/museums/${m.id}`} className="flex gap-3 group">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#EDD9BC] flex-shrink-0">
                        <img src={m.coverImage} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#4E342E] text-xs leading-tight line-clamp-2 group-hover:text-[#A65E2E] transition-colors">{m.title}</p>
                        <p className="text-[#8B857C] text-xs mt-0.5">{m.country}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="w-3 h-3 text-[#D8B892] fill-[#D8B892]" />
                          <span className="text-xs text-[#8B857C]">{m.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end bg-black/40">
          <div className="bg-[#F8F5F0] w-full sm:w-96 sm:h-[90vh] sm:mr-4 rounded-t-3xl sm:rounded-3xl flex flex-col shadow-warm-lg overflow-hidden">
            <div className="bg-[#4E342E] px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#D8B892] rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#4E342E]" />
                </div>
                <div>
                  <p className="text-[#F8F5F0] text-sm font-semibold">AI Museum Guide</p>
                  <p className="text-[#8B857C] text-xs">{museum.title}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={resetChat} className="text-[#8B857C] hover:text-[#D8B892]">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button onClick={() => setChatOpen(false)} className="text-[#8B857C] hover:text-[#D8B892]">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 bg-[#D8B892] rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <Sparkles className="w-3 h-3 text-[#4E342E]" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed whitespace-pre-line ${msg.role === "user" ? "bg-[#4E342E] text-[#F8F5F0] rounded-br-sm" : "bg-white text-[#4E342E] rounded-bl-sm border border-[#EDD9BC] shadow-warm"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {streaming && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 bg-[#D8B892] rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-[#4E342E]" />
                  </div>
                  <div className="bg-white border border-[#EDD9BC] rounded-2xl rounded-bl-sm px-3 py-2.5 shadow-warm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#D8B892] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#D8B892] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#D8B892] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
              {PROMPT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setInput(chip)}
                  className="flex-shrink-0 bg-[#EDD9BC] text-[#4E342E] text-xs px-3 py-1.5 rounded-full hover:bg-[#D8B892] transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="px-4 pb-4 pt-2">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Ask about this museum..."
                  className="flex-1 bg-white border border-[#EDD9BC] rounded-2xl px-4 py-2.5 text-sm text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:border-[#D8B892]"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || streaming}
                  className="bg-[#4E342E] text-[#F8F5F0] w-10 h-10 rounded-2xl flex items-center justify-center hover:bg-[#A65E2E] transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#EDD9BC] shadow-warm flex gap-3">
      <div className="text-[#A65E2E] mt-0.5">{icon}</div>
      <div>
        <p className="text-[#8B857C] text-xs font-medium uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-[#4E342E] text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
