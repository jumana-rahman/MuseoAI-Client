import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import MuseumCard from "../components/MuseumCard";
import { useMuseums } from "../hooks/useMuseums";
import { motion } from "framer-motion";

const COUNTRIES = ["All", "Bangladesh", "Egypt", "France", "Germany", "Greece", "India", "Italy", "Japan", "Netherlands", "Russia", "Spain", "Sweden", "Taiwan", "United Kingdom", "USA"];
const CATEGORIES = ["All", "Art", "History", "Archaeology", "Science", "Military", "Technology", "Children's Museum", "Natural History"];
const TICKET_TYPES = ["All", "Free", "Paid", "Premium"];
const SORT_OPTIONS = [
  { value: "rating_desc", label: "Highest Rated" },
  { value: "price_asc", label: "Lowest Price" },
  { value: "name_asc", label: "Alphabetical" },
];

export default function Museums() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";
  const country = searchParams.get("country") || "All";
  const category = searchParams.get("category") || "All";
  const ticketType = searchParams.get("ticketType") || "All";
  const sort = searchParams.get("sort") || "rating_desc";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const filtersOpen = searchParams.get("filters") === "1";

  const updateParams = (updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, val]) => {
        if (val === "" || val === "All" || val === "rating_desc" || val === "1" && key === "page") {
          next.delete(key);
        } else {
          next.set(key, val);
        }
      });
      if (updates.page === undefined && (updates.q !== undefined || updates.country !== undefined || updates.category !== undefined || updates.ticketType !== undefined || updates.sort !== undefined)) {
        next.delete("page");
      }
      return next;
    });
  };

  const debouncedSearch = useMemo(() => search, [search]);

  const { data, isLoading } = useMuseums({
    search: debouncedSearch || undefined,
    country: country !== "All" ? country : undefined,
    category: category !== "All" ? category : undefined,
    ticketType: ticketType !== "All" ? ticketType : undefined,
    sort,
    page,
    limit: 8,
  });

  const museums = data?.museums || [];
  const totalResults = data?.total || 0;
  const totalPages = data?.totalPages || 0;

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters = search || country !== "All" || category !== "All" || ticketType !== "All";

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-20">
      <div className="relative bg-[#4E342E] py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-[#F8F5F0] font-bold mb-3">Explore Museums</h1>
          <p className="text-[#8B857C] text-lg mb-8">Discover curated museums from around the world</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B857C]" />
            <input
              value={search}
              onChange={(e) => updateParams({ q: e.target.value })}
              placeholder="Search museums by name or city..."
              className="w-full bg-[#F8F5F0] rounded-2xl pl-12 pr-4 py-3.5 text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:ring-2 focus:ring-[#D8B892] text-sm"
            />
            {search && (
              <button onClick={() => updateParams({ q: "" })} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B857C] hover:text-[#4E342E]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => updateParams({ filters: filtersOpen ? "" : "1" })}
              className="flex items-center gap-2 bg-white border border-[#EDD9BC] rounded-xl px-4 py-2 text-sm text-[#4E342E] font-medium hover:border-[#D8B892] transition-colors shadow-warm"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {hasFilters && <span className="w-2 h-2 bg-[#A65E2E] rounded-full" />}
            </button>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-[#A65E2E] hover:text-[#7A4420]">
                <X className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#8B857C]">{totalResults} results</span>
            <select
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="bg-white border border-[#EDD9BC] rounded-xl px-3 py-2 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892] shadow-warm cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {filtersOpen && (
          <div className="bg-white border border-[#EDD9BC] rounded-2xl p-5 mb-6 shadow-warm grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-2">Country</label>
              <select
                value={country}
                onChange={(e) => updateParams({ country: e.target.value })}
                className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]"
              >
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => updateParams({ category: e.target.value })}
                className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-2">Ticket Type</label>
              <select
                value={ticketType}
                onChange={(e) => updateParams({ ticketType: e.target.value })}
                className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]"
              >
                {TICKET_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-warm border border-[#EDD9BC] animate-pulse">
                <div className="h-48 bg-[#EDD9BC]" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-[#EDD9BC] rounded w-3/4" />
                  <div className="h-3 bg-[#EDD9BC] rounded w-1/2" />
                  <div className="h-3 bg-[#EDD9BC] rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : museums.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">&#x1F3DB;&#xFE0F;</div>
            <h3 className="font-display text-[#4E342E] text-xl font-semibold mb-2">No museums found</h3>
            <p className="text-[#8B857C] mb-6">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="bg-[#4E342E] text-[#F8F5F0] px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#A65E2E] transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {museums.map((m) => <MuseumCard key={m.id} museum={m} />)}
          </div>
        )}

        {totalPages > 1 && !isLoading && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => updateParams({ page: String(Math.max(1, page - 1)) })}
              disabled={page === 1}
              className="w-9 h-9 rounded-xl bg-white border border-[#EDD9BC] flex items-center justify-center text-[#4E342E] disabled:opacity-40 hover:border-[#D8B892] hover:bg-[#EDD9BC]/50 hover:scale-105 active:scale-95 transition-all duration-200 ease-out shadow-warm cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => updateParams({ page: String(p) })}
                className={`w-9 h-9 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ease-out shadow-warm ${
                  p === page
                    ? "bg-[#4E342E] text-[#F8F5F0] scale-105 shadow-warm-lg"
                    : "bg-white border border-[#EDD9BC] text-[#4E342E] hover:border-[#D8B892] hover:bg-[#EDD9BC]/50 hover:scale-105 active:scale-95"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => updateParams({ page: String(Math.min(totalPages, page + 1)) })}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-xl bg-white border border-[#EDD9BC] flex items-center justify-center text-[#4E342E] disabled:opacity-40 hover:border-[#D8B892] hover:bg-[#EDD9BC]/50 hover:scale-105 active:scale-95 transition-all duration-200 ease-out shadow-warm cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
