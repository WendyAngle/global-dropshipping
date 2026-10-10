import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { copy, type Language } from "@/lib/website-copy";
import { quoteSchema } from "@/lib/quote-schema";
import { submitQuote } from "@/lib/quote.functions";

export function QuoteDialog({ open, onOpenChange, language }: { open: boolean; onOpenChange: (open: boolean) => void; language: Language }) {
  const t = copy[language];
  const send = useServerFn(submitQuote);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const result = quoteSchema.safeParse({ name: values.get("name"), email: values.get("email"), store_url: values.get("store_url"), message: values.get("message"), language });
    if (!result.success || values.get("consent") !== "on") { setStatus("error"); return; }
    setStatus("sending");
    try { const response = await send({ data: result.data }); setStatus(response.ok ? "success" : "error"); }
    catch { setStatus("error"); }
  }
  return <Dialog open={open} onOpenChange={value => { onOpenChange(value); if (!value) setStatus("idle"); }}>
    <DialogContent className="quote-dialog">
      {status === "success" ? <div className="py-8 text-center"><CheckCircle2 className="mx-auto mb-5 size-12 text-primary" /><DialogTitle>{t.success}</DialogTitle><DialogDescription className="mt-4 leading-relaxed">{t.successText}</DialogDescription><Button className="mt-7" onClick={() => onOpenChange(false)}>{t.close}</Button></div> : <>
        <div className="eyebrow">VELA TEAM</div><DialogTitle className="text-2xl leading-snug">{t.formTitle}</DialogTitle><DialogDescription>{t.formIntro}</DialogDescription>
        <form onSubmit={onSubmit} className="quote-form">
          <label>{t.fields[0]}<input autoComplete="name" name="name" required maxLength={100} /></label>
          <label>{t.fields[1]}<input autoComplete="email" type="email" name="email" required maxLength={254} /></label>
          <label>{t.fields[2]}<input type="url" name="store_url" placeholder="https://" maxLength={500} /></label>
          <label>{t.fields[3]}<textarea name="message" required maxLength={2000} rows={3} placeholder={t.messagePlaceholder} /></label>
          <label className="consent"><input name="consent" type="checkbox" required /> <span>{t.consent}</span></label>
          {status === "error" && <p role="alert" className="text-sm text-destructive">{t.error}</p>}
          <Button type="submit" disabled={status === "sending"} className="w-full h-12">{status === "sending" ? <><LoaderCircle className="animate-spin" />{t.sending}</> : <>{t.send}<ArrowUpRight /></>}</Button>
        </form>
      </>}
    </DialogContent>
  </Dialog>;
}