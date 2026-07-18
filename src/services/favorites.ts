import { apiRequest } from "./api";
import type { Museum } from "./museums";

export interface FavoriteEntry {
  id: string;
  userId: string;
  museumId: string;
  createdAt: string;
  museum: Museum | null;
}

export const favoriteService = {
  list: () => apiRequest<FavoriteEntry[]>("/favorites"),

  add: (museumId: string) =>
    apiRequest<{ favorited: boolean }>(`/favorites/${museumId}`, {
      method: "POST",
    }),

  remove: (museumId: string) =>
    apiRequest<{ favorited: boolean }>(`/favorites/${museumId}`, {
      method: "DELETE",
    }),
};
