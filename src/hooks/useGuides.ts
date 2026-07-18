import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { guideService, type CreateGuidePayload } from "../services/guides";
import { useAuth } from "../context/AuthContext";

export function useLatestGuides() {
  return useQuery({
    queryKey: ["guides", "latest"],
    queryFn: guideService.latest,
  });
}

export function useMuseumGuides(museumId: string) {
  return useQuery({
    queryKey: ["guides", "museum", museumId],
    queryFn: () => guideService.byMuseum(museumId),
    enabled: !!museumId,
  });
}

export function useMyGuides() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["guides", "me"],
    queryFn: guideService.mine,
    enabled: !!user,
  });
}

export function useGuide(id: string) {
  return useQuery({
    queryKey: ["guides", id],
    queryFn: () => guideService.getById(id),
    enabled: !!id,
  });
}

export function useCreateGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateGuidePayload) => guideService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    },
  });
}

export function useDeleteGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => guideService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    },
  });
}

export function useToggleGuideLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => guideService.toggleLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    },
  });
}

export function useAIGuideGenerate() {
  return useMutation({
    mutationFn: (data: {
      museumId: string;
      targetAudience: string;
      visitDuration: string;
      interests?: string[];
      length?: string;
    }) => guideService.aiGenerate(data),
  });
}
