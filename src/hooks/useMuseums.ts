import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { museumService, type MuseumFilters } from "../services/museums";
import { favoriteService } from "../services/favorites";
import { useAuth } from "../context/AuthContext";

export function useMuseums(filters: MuseumFilters) {
  return useQuery({
    queryKey: ["museums", filters],
    queryFn: () => museumService.list(filters),
  });
}

export function useFeaturedMuseums() {
  return useQuery({
    queryKey: ["museums", "featured"],
    queryFn: museumService.featured,
  });
}

export function useMuseum(id: string) {
  return useQuery({
    queryKey: ["museums", id],
    queryFn: () => museumService.getById(id),
    enabled: !!id,
  });
}

export function useRelatedMuseums(id: string) {
  return useQuery({
    queryKey: ["museums", id, "related"],
    queryFn: () => museumService.related(id),
    enabled: !!id,
  });
}

export function useMuseumStats() {
  const categoryQuery = useQuery({
    queryKey: ["museums", "stats", "category"],
    queryFn: museumService.statsByCategory,
  });

  const countryQuery = useQuery({
    queryKey: ["museums", "stats", "country"],
    queryFn: museumService.statsByCountry,
  });

  return { categoryQuery, countryQuery };
}

export function useFavorites() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["favorites"],
    queryFn: favoriteService.list,
    enabled: !!user,
  });
}

export function useFavoriteMuseumIds() {
  const { data: favorites } = useFavorites();
  return new Set(favorites?.map((f) => f.museumId) || []);
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ museumId, isFavorited }: { museumId: string; isFavorited: boolean }) => {
      if (isFavorited) {
        return favoriteService.remove(museumId);
      }
      return favoriteService.add(museumId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    enabled: !!user,
  });
}
