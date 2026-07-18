import { apiRequest } from "./api";

export interface Museum {
  id: string;
  title: string;
  country: string;
  city: string;
  category: string;
  description: string;
  history: string;
  ticketPrice: number;
  ticketType: "Free" | "Paid" | "Premium";
  openingHours: string;
  rating: number;
  reviewCount: number;
  coverImage: string;
  gallery: string[];
  coordinates: { lat: number; lng: number };
  facilities: string[];
  visitorTips: string[];
  featured: boolean;
}

export interface PaginatedMuseums {
  museums: Museum[];
  total: number;
  page: number;
  totalPages: number;
}

export interface MuseumFilters {
  search?: string;
  country?: string;
  category?: string;
  ticketType?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const museumService = {
  list: (filters: MuseumFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== "" && val !== null) {
        params.set(key, String(val));
      }
    });
    const qs = params.toString();
    return apiRequest<PaginatedMuseums>(`/museums${qs ? `?${qs}` : ""}`);
  },

  featured: () => apiRequest<Museum[]>("/museums/featured"),

  getById: (id: string) => apiRequest<Museum>(`/museums/${id}`),

  related: (id: string) => apiRequest<Museum[]>(`/museums/${id}/related`),

  statsByCategory: () =>
    apiRequest<{ category: string; count: number }[]>("/museums/stats/by-category"),

  statsByCountry: () =>
    apiRequest<{ country: string; count: number }[]>("/museums/stats/by-country"),

  platformStats: () =>
    apiRequest<{ museums: number; guides: number; aiConversations: number }>("/stats"),
};
