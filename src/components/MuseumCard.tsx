import { Link } from "react-router-dom";
import { Star, MapPin, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFavoriteMuseumIds, useToggleFavorite } from "../hooks/useMuseums";

type Museum = {
  id: string;
  title: string;
  city: string;
  country: string;
  category: string;
  description: string;
  ticketPrice: number;
  ticketType: "Free" | "Paid" | "Premium";
  coverImage: string;
  rating: number;
  reviewCount: number;
};

type Props = {
  museum: Museum;
  skeleton?: boolean;
};

export default function MuseumCard({ museum, skeleton }: Props) {
  const { user } = useAuth();
  const favoriteIds = useFavoriteMuseumIds();
  const toggleFavorite = useToggleFavorite();

  if (skeleton) {
    return (
      <div className="rounded-2xl overflow-hidden bg-white shadow-warm">
        <div className="skeleton h-48 w-full" />
        <div className="p-4 space-y-2">
          <div className="skeleton h-5 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
        </div>
      </div>
    );
  }

  const isFav = favoriteIds.has(museum.id);

  return (
    <div className="museum-card rounded-2xl overflow-hidden bg-white shadow-warm border border-[#EDD9BC] flex flex-col">
      <div className="relative h-48 bg-[#EDD9BC]">
        <img
          src={museum.coverImage}
          alt={museum.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-[#D8B892] text-[#4E342E] text-xs font-semibold px-2.5 py-1 rounded-full">
            {museum.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${museum.ticketType === "Free" ? "bg-green-100 text-green-800" : museum.ticketType === "Premium" ? "bg-[#A65E2E] text-white" : "bg-white/90 text-[#4E342E]"}`}>
            {museum.ticketType === "Free" ? "Free" : museum.ticketType === "Premium" ? `Premium` : `$${museum.ticketPrice}`}
          </span>
        </div>
        {user && (
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite.mutate({ museumId: museum.id, isFavorited: isFav }); }}
            className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFav ? "bg-[#A65E2E] text-white" : "bg-white/90 text-[#8B857C] hover:bg-[#A65E2E] hover:text-white"}`}
          >
            <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-[#4E342E] font-semibold text-base leading-tight mb-1 line-clamp-2">
          {museum.title}
        </h3>
        <div className="flex items-center gap-1 text-[#8B857C] text-xs mb-2">
          <MapPin className="w-3 h-3" />
          {museum.city}, {museum.country}
        </div>
        <p className="text-[#5D4037] text-xs leading-relaxed flex-1 line-clamp-2 mb-3">
          {museum.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#D8B892] fill-[#D8B892]" />
            <span className="text-sm font-semibold text-[#4E342E]">{museum.rating}</span>
            <span className="text-xs text-[#8B857C]">({museum.reviewCount.toLocaleString()})</span>
          </div>
          <Link
            to={`/museums/${museum.id}`}
            className="bg-[#4E342E] text-[#F8F5F0] text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-[#A65E2E] transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
