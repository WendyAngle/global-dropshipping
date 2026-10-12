import { describe, expect, it } from "vitest";
import { languages, copy } from "@/lib/website-copy";

describe("Website requirements", () => {
  it("supports the four requested languages", () => {
    expect(Object.keys(languages)).toEqual(["en", "fr", "de", "zh"]);
    expect(Object.keys(copy)).toEqual(["en", "fr", "de", "zh"]);
  });
  it("uses the navigation contact wording for the FAQ and service card links", () => {
    for (const language of Object.keys(copy) as (keyof typeof copy)[]) {
      expect(copy[language].contactLink).toBe(copy[language].nav.at(-1));
    }
  });
  it("keeps every contact entry point pointing at email and WhatsApp", () => {
    for (const language of Object.keys(copy) as (keyof typeof copy)[]) {
      const t = copy[language];
      for (const key of ["contactEye", "contactTitle", "contactText", "emailLabel", "whatsappLabel", "contactNote"] as const) {
        expect(t[key].trim().length).toBeGreaterThan(0);
      }
      // The inquiry form was removed, so its copy entries must not come back.
      for (const key of ["formTitle", "fields", "consent", "send", "successText", "details"] as const) {
        expect(key in t).toBe(false);
      }
    }
  });
});
