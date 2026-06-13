import type { ICandidate, IStatusType } from "@/types";
import candidatesSmallJson from "@/store/mock/candidates.json";
import candidatesLargeJson from "@/store/mock/candidates-large.json";

export const mockCandidatesSmall: ICandidate[] = [
  ...candidatesSmallJson,
] as ICandidate[];
export const mockCandidatesLarge: ICandidate[] = [
  ...candidatesLargeJson,
] as ICandidate[];

export const updateMockStatusInDataset = (
  id: string,
  newStatus: IStatusType,
  isLarge: boolean,
) => {
  const dataset = isLarge ? mockCandidatesLarge : mockCandidatesSmall;
  const index = dataset.findIndex((c) => c.id === id);
  if (index !== -1) {
    dataset[index] = { ...dataset[index], status: newStatus };
  }
};
