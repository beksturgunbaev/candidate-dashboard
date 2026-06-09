import { lazy } from "react";

// Ленивая загрузка страниц (Lazy Loading) — обязательное требование для Middle+
export const CandidatesPage = lazy(() => import("./CandidatesPage"));
export const CandidateDetailPage = lazy(() => import("./CandidateDetailPage"));
