import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Clock, Mail, MessageCircle, Menu, ShoppingBag, X, Layers3, UsersRound, Sprout, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { QuoteDialog } from "@/components/quote-dialog";
import { copy, languageFlags, languages, type Language } from "@/lib/website-copy";
import warehouse from "@/assets/fulfillment-warehouse.jpg";
import heroBanner from "@/assets/hero-banner-clean.jpg";
import logo from "@/assets/vela-symbol-complete.jpg.asset.json";
import sourcingIcon from "@/assets/service-sourcing.png.asset.json";
import qualityIcon from "@/assets/service-quality.png.asset.json";
import packingIcon from "@/assets/service-packing.png.asset.json";
import shippingIcon from "@/assets/service-shipping.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Dropshipping — China Sourcing & Fulfillment | VELA TEAM" },
    { name: "description", content: "Build your brand with VELA TEAM. China product sourcing, quality inspection, packaging and dropshipping fulfillment in one connected ERP workflow." },
    { property: "og:title", content: "Dropshipping made easy — VELA TEAM" },
    { property: "og:description", content: "Your reliable China sourcing and fulfillment partner. You sell. We handle the rest." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const sectionIds = ["services", "process", "why-vela", "faq", "contact"];
const registerUrl = "https://velafulfill.dropshippingerp.com";
const serviceIcons = [sourcingIcon, qualityIcon, packingIcon, shippingIcon];
const benefitIcons = [Layers3, UsersRound, Sprout];

function Index() {
  const [language, setLanguage] = useState<Language>("en");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const t = copy[language];
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const openQuote = () => setQuoteOpen(true);
  return <div className="site-shell">
    <header className="site-header"><div className="header-inner">
      <a href="#" className="brand" aria-label="VELA TEAM home"><img src={logo.url} alt="VELA TEAM — Sail further together" width={630} height={563} /><span className="brand-name">VELA<span>TEAM</span><small>SAIL FURTHER TOGETHER</small></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{t.nav.map((label, i) => <a key={sectionIds[i]} href={`#${sectionIds[i]}`}>{label}{i === 0 && <ChevronDown size={12} />}</a>)}</nav>
      <div className="header-actions"><DropdownMenu><DropdownMenuTrigger asChild><button type="button" className="language-picker" aria-label="Language">{language.toUpperCase()}<ChevronDown size={14}/></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="language-menu">{Object.entries(languages).map(([value,label]) => <DropdownMenuItem key={value} className={value===language ? "is-active" : ""} onSelect={() => setLanguage(value as Language)}><span className="language-flag">{languageFlags[value as Language]}</span>{label}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu><a className="erp-link" href="https://velafulfill.dropshippingerp.com" target="_blank" rel="noopener noreferrer">{t.login}<ArrowUpRight size={14}/></a><Button asChild className="header-quote"><a href={registerUrl} target="_blank" rel="noopener noreferrer">{t.quote}<ArrowUpRight/></a></Button><Button variant="ghost" size="icon" className="mobile-toggle" aria-label={t.menu} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</Button></div>
    </div>{mobileOpen && <nav className="mobile-nav">{t.nav.map((label,i) => <a key={label} href={`#${sectionIds[i]}`} onClick={() => setMobileOpen(false)}>{label}<ArrowUpRight size={16}/></a>)}<a href="https://velafulfill.dropshippingerp.com" target="_blank" rel="noopener noreferrer">{t.login}<ArrowUpRight size={16}/></a></nav>}</header>
    <main>
      <section className="hero"><img className="hero-photo" src={heroBanner} alt="A bright workspace with a laptop, a shipping box of products, an airplane and a globe" width={1920} height={1080}/><div className="hero-wash"/><div className="hero-content content-width"><p className="eyebrow"><span className="small-line"/>{t.eyebrow}</p><h1>Dropshipping.<br/><span>{t.headline}</span></h1><p className="hero-intro">{t.intro}</p><div className="hero-buttons"><Button asChild className="h-12 px-6"><a href={registerUrl} target="_blank" rel="noopener noreferrer">{t.quote}<ArrowUpRight/></a></Button><Button variant="outline" asChild className="h-12 px-5"><a href="#services">{t.explore}<ArrowRight/></a></Button></div><div className="hero-tags">{t.heroTags.map(tag => <span key={tag}><Check size={14}/>{tag}</span>)}</div></div><span className="hero-index">01 / VELA TEAM</span></section>
      <section className="platform-strip content-width"><div><span className="eyebrow">{t.platforms}</span><p>{t.platformNote}</p></div><div className="platform-logos"><span className="shopify"><ShoppingBag/>shopify</span><span className="woo">Woo<span>Commerce</span></span><span className="threepl">3PL<span>Third-Party Logistics</span></span></div></section>
      <section id="services" className="section services-section content-width"><div className="section-top"><div><p className="eyebrow">{t.servicesEye}</p><h2>{t.servicesTitle}</h2></div><p className="section-description">{t.servicesIntro}</p></div><div className="service-grid">{t.services.map((service,i) => { const icon=serviceIcons[i] ?? sourcingIcon; return <article className="service-card" key={service}><div className="service-card-top"><img className="service-reference-icon" src={icon.url} alt="" width={158} height={146} loading="lazy"/><span className="service-number">0{i+1}</span></div><h3>{service}</h3><p>{t.descriptions[i]}</p><Button variant="link" onClick={openQuote} className="service-link">{t.details}<ArrowUpRight/></Button></article>; })}</div></section>
      <section id="process" className="process-section section"><div className="content-width"><div className="center-heading"><p className="eyebrow">{t.processEye}</p><h2>{t.processTitle}</h2></div><div className="process-grid">{t.steps.map((step,i) => <div className="process-step" key={step}><div className="step-top"><span>0{i+1}</span>{i<3 && <ArrowRight size={20}/>}</div><h3>{step}</h3><p>{t.stepText[i]}</p></div>)}</div></div></section>
      <section id="why-vela" className="why-section section content-width"><div className="why-visual"><img src={warehouse} alt="VELA TEAM fulfillment concept: inspecting products before shipping" width={1376} height={768} loading="lazy"/><div className="why-caption"><span>{t.aboutTag}</span><h3>{t.aboutSub}</h3><ArrowUpRight size={28}/></div></div><div className="why-content"><p className="eyebrow">{t.whyEye}</p><h2 className="whitespace-pre-line">{t.whyTitle}</h2><p className="why-intro">{t.whyIntro}</p><div className="benefit-list">{t.benefits.map((benefit,i) => { const Icon=benefitIcons[i] ?? Layers3; return <div key={benefit}><span><Icon size={21}/></span><div><h3>{benefit}</h3><p>{t.benefitText[i]}</p></div></div>; })}</div></div></section>
      <section id="faq" className="faq-section section"><div className="content-width faq-grid"><div><p className="eyebrow">{t.faqEye}</p><h2>{t.faqTitle}</h2></div><div className="faq-list">{t.questions.map((question,i) => <div className="faq-item" key={question}><Button variant="ghost" onClick={() => setFaqOpen(faqOpen===i ? null : i)} aria-expanded={faqOpen===i} aria-controls={`faq-answer-${i}`} className="faq-question">{question}<Plus className={faqOpen===i ? "rotate-45" : ""}/></Button>{faqOpen===i && <p id={`faq-answer-${i}`}>{t.answers[i]}</p>}</div>)}</div></div></section>
      <section id="contact" className="section contact-section"><div className="content-width contact-grid"><div><p className="eyebrow">{t.contactEye}</p><h2>{t.contactTitle}</h2><p className="contact-text">{t.contactText}</p><p className="contact-note"><Clock size={15}/>{t.contactNote}</p></div><div className="contact-cards"><a className="contact-card" href="mailto:yingyue.mi@boohigh.com"><span className="contact-icon"><Mail size={22} /></span><div><small>{t.emailLabel}</small><p>yingyue.mi@boohigh.com</p></div><ArrowUpRight size={18} /></a><a className="contact-card" href="https://wa.me/8618280076669" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><MessageCircle size={22} /></span><div><small>{t.whatsappLabel}</small><p>+86 18280076669</p></div><ArrowUpRight size={18} /></a></div></div></section>
      <section className="cta-section"><div className="content-width"><div><p className="eyebrow">{t.ctaEye}</p><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div><Button asChild variant="secondary" className="h-13 px-7"><a href={registerUrl} target="_blank" rel="noopener noreferrer">{t.quote}<ArrowUpRight/></a></Button></div></section>
    </main>
    <footer className="site-footer content-width"><div className="footer-top"><div><a href="#" className="brand footer-brand"><img src={logo.url} alt="VELA TEAM" width={630} height={563}/><span className="brand-name">VELA<span>TEAM</span><small>SAIL FURTHER TOGETHER</small></span></a><p className="footer-description">{t.footerText}</p></div><div><h4>{t.footerServices}</h4>{t.services.map(service => <a href="#services" key={service}>{service}</a>)}</div><div><h4>{t.footerQuick}</h4><a href={registerUrl} target="_blank" rel="noopener noreferrer">{t.quote}<ArrowUpRight size={14}/></a><a href="https://velafulfill.dropshippingerp.com" target="_blank" rel="noopener noreferrer">{t.login}<ArrowUpRight size={14}/></a><Button variant="link" className="px-0 text-muted-foreground" onClick={() => setPrivacyOpen(true)}>{t.privacy}</Button></div><div><h4>{t.footerContact}</h4><a className="footer-contact-link" href="mailto:yingyue.mi@boohigh.com"><Mail size={15}/>yingyue.mi@boohigh.com</a><a className="footer-contact-link" href="https://wa.me/8618280076669" target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/>+86 18280076669</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VELA TEAM. {t.footerRights}</span><span>Dropshipping <span className="text-primary">/</span> Sail further together.</span></div></footer>
    <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} language={language}/><Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}><DialogContent><DialogTitle>{t.privacy}</DialogTitle><DialogDescription className="leading-relaxed">{t.privacyText}</DialogDescription><Button onClick={() => setPrivacyOpen(false)}>{t.privacyClose}</Button></DialogContent></Dialog>
  </div>;
}
