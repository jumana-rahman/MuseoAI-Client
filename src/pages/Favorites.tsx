import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MUSEUMS } from "../data/museums";
import MuseumCard from "../components/MuseumCard";
import { motion } from "framer-motion";

export default function Favorites() {
  const { user, favorites } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-[#D8B892] mx-auto mb-4" />
          <h2 className="font-display text-2xl text-[#4E342E] font-bold mb-2">Sign in to see your favorites</h2>
          <p className="text-[#8B857C] mb-6">Save museums you love and access them anytime.</p>
          <Link to="/login" className="bg-[#4E342E] text-[#F8F5F0] px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#A65E2E] transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const favoriteMuseums = MUSEUMS.filter((m) => favorites.includes(m.id));

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-20">
      <div className="bg-[#4E342E] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-4xl sm:text-5xl text-[#F8F5F0] font-bold mb-2">My Favorites</h1>
        <p className="text-[#8B857C]">{favoriteMuseums.length} saved museum{favoriteMuseums.length !== 1 ? "s" : ""}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        {favoriteMuseums.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 text-[#D8B892] mx-auto mb-4" />
            <h3 className="font-display text-[#4E342E] text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-[#8B857C] mb-6">Explore our museum directory and save the ones you love.</p>
            <Link to="/museums" className="bg-[#4E342E] text-[#F8F5F0] px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#A65E2E] transition-colors">
              Explore Museums
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteMuseums.map((m) => <MuseumCard key={m.id} museum={m} />)}
          </div>
        )}
      </motion.div>
    </div>
  );
}
