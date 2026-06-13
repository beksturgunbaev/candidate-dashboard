import { describe, it, expect } from "vitest";
import { getVerdictClass } from "../src/helpers";

describe("Проверка функции цвета вердикта", () => {
  it("Если вердикт ПОДХОДИТ — должен возвращаться зеленый класс", () => {
    const result = getVerdictClass("ПОДХОДИТ");
    // Ожидаем (expect), что результат содержит (toContain) нужное слово
    expect(result).toContain("verdict-green");
  });

  it("Если вердикт НЕ ПОДХОДИТ — должен возвращаться красный класс", () => {
    const result = getVerdictClass("НЕ ПОДХОДИТ");
    expect(result).toContain("verdict-red");
  });
});
