import { create } from "zustand";
import { candidatesApi } from "@/services/api";
import type { ICandidate, IStatusType } from "@/types";

interface FilterParams {
  verdict: string;
  search: string;
  page: number;
  limit: number;
}

interface CandidatesState {
  candidates: ICandidate[];
  currentCandidate: ICandidate | null;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  isLargeMode: boolean; // Задание 5

  setLargeMode: (isLarge: boolean) => void;
  loadCandidates: (params: FilterParams) => Promise<void>;
  loadCandidateById: (id: string) => Promise<void>;
  changeStatusOptimistic: (
    id: string,
    newStatus: IStatusType,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => Promise<void>;
}

export const useCandidatesStore = create<CandidatesState>((set, get) => ({
  candidates: [],
  currentCandidate: null,
  totalCount: 0,
  isLoading: false,
  error: null,
  isLargeMode: false,

  setLargeMode: (isLarge) => {
    set({ isLargeMode: isLarge, currentCandidate: null });
  },

  loadCandidates: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const { isLargeMode } = get();
      const data = await candidatesApi.fetchCandidates({
        ...params,
        isLargeMode,
      });
      set({
        candidates: data.candidates,
        totalCount: data.totalCount,
        isLoading: false,
      });
    } catch (e: unknown) {
      set({ error: (e as Error).message, isLoading: false });
    }
  },

  loadCandidateById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { isLargeMode } = get();
      const candidate = await candidatesApi.fetchCandidateById(id, isLargeMode);
      set({ currentCandidate: candidate, isLoading: false });
    } catch (e: unknown) {
      set({
        error: (e as Error).message,
        isLoading: false,
        currentCandidate: null,
      });
    }
  },

  changeStatusOptimistic: async (id, newStatus, onSuccess, onError) => {
    const previousCandidates = get().candidates;
    const previousCurrentCandidate = get().currentCandidate;

    // Шаг 1: Оптимистично меняем стейт в UI сразу
    set({
      candidates: previousCandidates.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c,
      ),
      currentCandidate:
        previousCurrentCandidate?.id === id
          ? { ...previousCurrentCandidate, status: newStatus }
          : previousCurrentCandidate,
    });

    if (onSuccess) onSuccess();

    try {
      const { isLargeMode } = get();
      await candidatesApi.updateCandidateStatus(id, newStatus, isLargeMode);
    } catch (err: unknown) {
      set({
        candidates: previousCandidates,
        currentCandidate: previousCurrentCandidate,
      });
      if (onError) onError((err as Error).message || "Ошибка сети");
    }
  },
}));
