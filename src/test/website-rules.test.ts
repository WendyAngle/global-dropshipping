import { describe, expect, it } from "vitest";
import { languages, copy } from "@/lib/website-copy";
import { quoteSchema } from "@/lib/quote-schema";
describe("Website requirements", () => {
  it("supports the four requested languages", () => {
    expect(Object.keys(languages)).toEqual(["en", "fr", "de", "zh"]);
    expect(Object.keys(copy)).toEqual(["en", "fr", "de", "zh"]);
  });
  it("accepts inquiries in every supported language", () => {
    for (const language of ["en", "fr", "de", "zh"]) expect(quoteSchema.safeParse({ name: "Test", email: "test@example.com", store_url: "", message: "Product sourcing inquiry", language }).success).toBe(true);
  });
  it("rejects invalid email and unsupported languages", () => {
    expect(quoteSchema.safeParse({ name: "Test", email: "invalid", store_url: "", message: "Inquiry", language: "en" }).success).toBe(false);
    expect(quoteSchema.safeParse({ name: "Test", email: "test@example.com", store_url: "", message: "Inquiry", language: "es" }).success).toBe(false);
  });
});