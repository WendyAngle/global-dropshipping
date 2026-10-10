import { createServerFn } from "@tanstack/react-start";
import { quoteSchema } from "./quote-schema";

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    // Intentionally public: permits only creation of a validated inquiry, never reads.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("quote_requests").insert(data);
    if (error) return { ok: false };
    return { ok: true };
  });