import { useEffect } from "react";
import { useCandidatesStore } from "@/store";
import type { ICriteriaRating } from "@/types";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export const useCandidateDetailModel = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Забираем данные и методы из нашего Zustand-стора
  const { currentCandidate, isLoading, error, loadCandidateById } =
    useCandidatesStore();

  useEffect(() => {
    if (id) {
      loadCandidateById(id);
    }
  }, [id, loadCandidateById]);

  // Возврат назад с сохранением фильтров
  const handleBack = () => {
    // Если мы пришли со страницы списка и в state сохранились query-параметры
    const fallbackSearch = location.state?.from
      ? `?${location.state.from}`
      : "";
    navigate(`/${fallbackSearch}`);
  };

  // Хелпер для маппинга цветов критериев оценки (ok / partial / no)
  const getCriteriaStyles = (rating: ICriteriaRating) => {
    switch (rating) {
      case "ok":
        return {
          bg: "bg-green-50 border-green-200",
          text: "text-green-800",
          badge: "bg-green-500 text-white",
          label: "Соответствует",
          icon: "✓",
        };
      case "partial":
        return {
          bg: "bg-amber-50 border-amber-200",
          text: "text-amber-800",
          badge: "bg-amber-500 text-white",
          label: "Частично",
          icon: "⚠",
        };
      case "no":
        return {
          bg: "bg-red-50 border-red-200",
          text: "text-red-800",
          badge: "bg-red-500 text-white",
          label: "Не соответствует",
          icon: "✕",
        };
    }
  };

  // Хелпер для цвета общего вердикта
  const getVerdictBadgeClass = (verdict: string) => {
    switch (verdict) {
      case "ПОДХОДИТ":
        return "bg-green-100 text-green-800 border-green-300";
      case "ЧАСТИЧНО":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "НЕ ПОДХОДИТ":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return {
    candidate: currentCandidate,
    isLoading,
    error,
    handleBack,
    getCriteriaStyles,
    getVerdictBadgeClass,
  };
};
