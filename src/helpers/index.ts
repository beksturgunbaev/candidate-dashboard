export const getVerdictClass = (v: string) => {
  switch (v) {
    case "ПОДХОДИТ":
      return "bg-green-50 text-green-700 border-green-200";
    case "ЧАСТИЧНО":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "НЕ ПОДХОДИТ":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};
