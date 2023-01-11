import { expect, it, describe } from "@jest/globals";
import { getTimeIndex } from "../util/getTimeIndex";

const testCases = [
  { input: "8:00", expected: 0 },
  { input: "12:00", expected: 8 },
  { input: "17:20", expected: 18 },
];

describe("Tests for getTimeIndex", () => {
  it("returns the correct index", () => {
    for (const i of testCases) {
      const result = getTimeIndex(i.input);
      expect(result).toBe(i.expected);
    }
  });
});
