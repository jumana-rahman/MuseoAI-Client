import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { MUSEUMS } from "../data/museums";
import MuseumCard from "../components/MuseumCard";

const COUNTRIES = ["All", ...Array.from(new Set(MUSEUMS.map((m) => m.country))).sort()];
const CATEGORIES = ["All", "Art", "History", "Archaeology", "Science", "Military", "Technology", "Children's Museum", "Natural History"];
const TICKET_TYPES = ["All", "Free", "Paid", "Premium"];
const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "price", label: "Lowest Price" },
  { value: "name", label: "Alphabetical" },
];
const PER_PAGE = 8;

export default function Museums() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "All");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [ticketType, setTicketType] = useState("All");
  const [sort, setSort] = useState("rating");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [debouncedSearch, country, category, ticketType, sort, page]);

  const filtered = useMemo(() => {
    let list = [...MUSEUMS];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter((m) => m.title.toLowerCase().includes(q) || m.city.toLowerCase().includes(q) || m.country.toLowerCase().includes(q));
    }
    if (country !== "All") list = list.filter((m) => m.country === country);
    if (category !== "All") list = list.filter((m) => m.category === category);
    if (ticketType !== "All") list = list.filter((m) => m.ticketType === ticketType);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "price") list.sort((a, b) => a.ticketPrice - b.ticketPrice);
    else list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [debouncedSearch, country, category, ticketType, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearFilters = () => {
    setSearch(""); setCountry("All"); setCategory("All"); setTicketType("All"); setSort("rating"); setPage(1);
  };
  const hasFilters = search || country !== "All" || category !== "All" || ticketType !== "All";

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-20">
      {/* Hero banner */}
      <div className="relative bg-[#4E342E] py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-[#F8F5F0] font-bold mb-3">Explore Museums</h1>
          <p className="text-[#8B857C] text-lg mb-8">Discover {MUSEUMS.length} curated museums from around the world</p>
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B857C]" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search museums by name or city..."
              className="w-full bg-[#F8F5F0] rounded-2xl pl-12 pr-4 py-3.5 text-[#4E342E] placeholder-[#8B857C] focus:outline-none focus:ring-2 focus:ring-[#D8B892] text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B857C] hover:text-[#4E342E]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
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
            <span className="text-sm text-[#8B857C]">{filtered.length} results</span>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="bg-white border border-[#EDD9BC] rounded-xl px-3 py-2 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892] shadow-warm cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="bg-white border border-[#EDD9BC] rounded-2xl p-5 mb-6 shadow-warm grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-2">Country</label>
              <select
                value={country}
                onChange={(e) => { setCountry(e.target.value); setPage(1); }}
                className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]"
              >
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B857C] uppercase tracking-wide mb-2">Ticket Type</label>
              <select
                value={ticketType}
                onChange={(e) => { setTicketType(e.target.value); setPage(1); }}
                className="w-full bg-[#F8F5F0] border border-[#EDD9BC] rounded-xl px-3 py-2 text-sm text-[#4E342E] focus:outline-none focus:border-[#D8B892]"
              >
                {TICKET_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <MuseumCard key={i} museum={MUSEUMS[0]} skeleton />)}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="font-display text-[#4E342E] text-xl font-semibold mb-2">No museums found</h3>
            <p className="text-[#8B857C] mb-6">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="bg-[#4E342E] text-[#F8F5F0] px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-[#A65E2E] transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginated.map((m) => <MuseumCard key={m.id} museum={m} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-xl bg-white border border-[#EDD9BC] flex items-center justify-center text-[#4E342E] disabled:opacity-40 hover:border-[#D8B892] transition-colors shadow-warm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors shadow-warm ${p === page ? "bg-[#4E342E] text-[#F8F5F0]" : "bg-white border border-[#EDD9BC] text-[#4E342E] hover:border-[#D8B892]"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-xl bg-white border border-[#EDD9BC] flex items-center justify-center text-[#4E342E] disabled:opacity-40 hover:border-[#D8B892] transition-colors shadow-warm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
