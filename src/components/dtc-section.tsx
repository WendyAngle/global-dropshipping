import { ArrowUpRight, Check, ClipboardList, Network, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copy, type Language } from "@/lib/website-copy";
import preparation from "@/assets/dtc-order-preparation.jpg";

const challengeIcons = [Timer, ClipboardList, Network];

export function DtcSection({ language, registerUrl }: { language: Language; registerUrl: string }) {
  const t = copy[language];
  return (
    <section id="dtc" className="section dtc-section" aria-labelledby="dtc-title">
      <div className="content-width">
        <div className="dtc-heading">
          <p className="eyebrow">{t.dtc.eyebrow}</p>
          <h2 id="dtc-title">{t.dtc.title}</h2>
          <p className="dtc-intro">{t.dtc.intro}</p>
        </div>
        <div className="dtc-grid">
          <div className="dtc-challenges">
            <p className="dtc-label">{t.dtc.challengesLabel}</p>
            {t.dtc.challenges.map((challenge, i) => {
              const Icon = challengeIcons[i] ?? Network;
              return <div className="dtc-challenge" key={challenge.title}>
                <span className="dtc-challenge-icon"><Icon size={22} aria-hidden="true" /></span>
                <div><h3>{challenge.title}</h3><p>{challenge.text}</p></div>
              </div>;
            })}
          </div>
          <div className="dtc-solution">
            <img className="dtc-image" src={preparation} alt={t.dtc.imageAlt} width={1536} height={864} loading="lazy" />
            <h3>{t.dtc.solutionTitle}</h3>
            <p className="dtc-solution-text">{t.dtc.solutionText}</p>
            <ul className="dtc-points">{t.dtc.points.map(point => <li key={point.title}><Check size={17} aria-hidden="true" /><p><strong>{point.title}</strong><span>{point.text}</span></p></li>)}</ul>
            <div className="dtc-actions">
              <Button asChild><a href={registerUrl} target="_blank" rel="noopener noreferrer">{t.quote}<ArrowUpRight /></a></Button>
              <Button asChild variant="link"><a href="#contact">{t.dtc.contact}<ArrowUpRight /></a></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}