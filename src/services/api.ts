import type { IStatusType } from "@/types";
import {
  mockCandidatesSmall,
  mockCandidatesLarge,
  updateMockStatusInDataset,
} from "./mockData";

interface FetchCandidatesParams {
  verdict: string;
  search: string;
  page: number;
  limit: number;
  isLargeMode: boolean;
}

export const candidatesApi = {
  // Имитация GET /api/candidates
  fetchCandidates: async ({
    verdict,
    search,
    page,
    limit,
    isLargeMode,
  }: FetchCandidatesParams) => {
    // Сетевая задержка сервера 400мс
    await new Promise((resolve) => setTimeout(resolve, 400));

    const dataSource = isLargeMode ? mockCandidatesLarge : mockCandidatesSmall;

    // 1. Фильтрация
    const filtered = dataSource.filter((c) => {
      const matchesVerdict = verdict === "Все" || c.verdict === verdict;
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchesVerdict && matchesSearch;
    });

    const totalCount = filtered.length;

    // 2. Пагинация
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      candidates: paginated,
      totalCount,
    };
  },

  // Имитация GET /api/candidates/:id
  fetchCandidateById: async (id: string, isLargeMode: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const dataSource = isLargeMode ? mockCandidatesLarge : mockCandidatesSmall;
    const candidate = dataSource.find((c) => c.id === id) || null;

    if (!candidate) throw new Error("Кандидат не найден (404)");
    return candidate;
  },

  // Имитация PATCH /api/candidates/:id/status (Задание 3)
  updateCandidateStatus: async (
    id: string,
    newStatus: IStatusType,
    isLargeMode: boolean,
  ) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Имитируем случайный сбой сервера в 15% случаев для проверки Rollback
        if (Math.random() < 0.15) {
          reject(new Error("Internal Server Error (500)"));
        } else {
          resolve(true);
        }
      }, 1000);
    });

    // Если всё ок — фиксируем изменения в нашей mock-базе данных
    updateMockStatusInDataset(id, newStatus, isLargeMode);
    return true;
  },
};
