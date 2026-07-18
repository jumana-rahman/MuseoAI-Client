import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Heart, BookOpen, Loader2 } from "lucide-react";
import { useGuide, useToggleGuideLike } from "../hooks/useGuides";
import { useAuth } from "../context/AuthContext";

export default function GuideDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: guide, isLoading, error } = useGuide(id || "");
  const toggleLike = useToggleGuideLike();

  const handleLike = () => {
    if (!user || !guide) return;
    toggleLike.mutate(guide._id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#A65E2E] animate-spin" />
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-[#EDD9BC] mx-auto mb-4" />
          <h2 className="font-display text-2xl text-[#4E342E] font-bold mb-2">Guide Not Found</h2>
          <p className="text-[#8B857C] mb-6">The guide you're looking for doesn't exist or has been removed.</p>
          <Link to="/museums" className="bg-[#4E342E] text-[#F8F5F0] px-6 py-3 rounded-2xl font-semibold hover:bg-[#A65E2E] transition-colors text-sm">
            Explore Museums
          </Link>
        </div>
      </div>
    );
  }

  const isLiked = guide.likedBy?.includes(user?.id || "");

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="font-display text-xl text-[#4E342E] font-bold mt-8 mb-3">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={i} className="font-display text-lg text-[#4E342E] font-semibold mt-6 mb-2">{line.replace("### ", "")}</h3>;
      }
      if (line.match(/^\d+\.\s/)) {
        return <p key={i} className="text-[#5D4037] text-sm leading-relaxed ml-4 mb-1">{line}</p>;
      }
      if (line.startsWith("- ")) {
        return <p key={i} className="text-[#5D4037] text-sm leading-relaxed ml-4 mb-1">• {line.replace("- ", "")}</p>;
      }
      if (line.trim() === "") {
        return <div key={i} className="h-3" />;
      }
      return <p key={i} className="text-[#5D4037] text-sm leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-20">
      {/* Cover */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={guide.coverImage}
          alt={guide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2420]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-3xl mx-auto">
          <Link to={`/museums/${guide.museumId}`} className="inline-flex items-center gap-1.5 text-[#D8B892] text-sm font-medium mb-3 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Museum
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl text-white font-bold mb-2">{guide.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#EDD9BC]">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{guide.museumName}{guide.museumCountry ? `, ${guide.museumCountry}` : ""}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{guide.targetAudience}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{guide.visitDuration}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-6 sm:p-8">
          {guide.shortDescription && (
            <p className="text-[#8B857C] text-sm italic mb-6 pb-6 border-b border-[#EDD9BC]">
              {guide.shortDescription}
            </p>
          )}

          <div className="prose-museum">
            {renderContent(guide.guideContent)}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#EDD9BC] flex items-center justify-between">
            <div className="text-sm text-[#8B857C]">
              Published {new Date(guide.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <button
              onClick={handleLike}
              disabled={!user || toggleLike.isPending}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isLiked
                  ? "bg-red-50 text-red-500 border border-red-200"
                  : "bg-[#F8F5F0] text-[#5D4037] border border-[#EDD9BC] hover:bg-[#EDD9BC]"
              } disabled:opacity-50`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              {guide.likes}
            </button>
          </div>
        </div>

        {/* Museum CTA */}
        <div className="mt-6 bg-white rounded-2xl border border-[#EDD9BC] shadow-warm p-5 flex items-center justify-between">
          <div>
            <p className="text-[#8B857C] text-xs uppercase tracking-wide mb-1">Museum</p>
            <p className="font-display text-[#4E342E] font-semibold">{guide.museumName}</p>
          </div>
          <Link
            to={`/museums/${guide.museumId}`}
            className="bg-[#4E342E] text-[#F8F5F0] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#A65E2E] transition-colors"
          >
            View Museum
          </Link>
        </div>
      </div>
    </div>
  );
}
