"use client";

import Image from "@/components/SiteImage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, LogIn, Menu, X } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CTA } from "@/components/PageHero";
import { LanguageOptions } from "@/components/LocaleController";
import { ScrollRevealController } from "@/components/ScrollRevealController";
import { ItalianContent } from "@/components/ItalianContent";

const nav = [
  ["Accueil", "/"],
  ["Nos services", "/servizi"],
  ["Options voyageurs", "/esperienze"],
  ["Comment nous gérons", "/proprietari"],
  ["Nos biens", "/proprieta"],
  ["Estimer mon bien", "/simulatore"],
  ["À propos de Velyo", "/chi-siamo"],
  ["Nous contacter", "/contatti"],
] as const;

const primaryNav = [
  ["Services", "/servizi"],
  ["Expériences", "/esperienze"],
  ["Propriétaires", "/proprietari"],
  ["Estimation", "/simulatore"],
  ["Biens", "/proprieta"],
  ["À propos", "/chi-siamo"],
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="logo velyo-logo" aria-label="Accueil Velyo Property Manager">
      <Image
        src={light ? "/images/brand/velyo-logo-light.svg" : "/images/brand/velyo-logo-dark.svg"}
        width={430}
        height={120}
        sizes="(min-width: 1181px) 250px, 180px"
        priority
        alt="Velyo Property Manager"
      />
    </Link>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdministration = pathname.startsWith("/administration");
  const showSiteCTA = !pathname.startsWith("/administration") && !pathname.startsWith("/connexion") && pathname !== "/valutazione" && pathname !== "/grazie";
  const [open, setOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [cookies, setCookies] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [stickyHidden, setStickyHidden] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const consent = localStorage.getItem("velyo-analytics-consent");
      setAnalyticsConsent(consent === "granted");
      setCookies(!localStorage.getItem("velyo-cookie-v2") || consent === null);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setOpen(false);
      setHeaderHidden(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const updateHeader = () => {
      const currentY = window.scrollY;
      if (open || currentY < 100) setHeaderHidden(false);
      else if (currentY > lastY + 6) setHeaderHidden(true);
      else if (currentY < lastY - 6) setHeaderHidden(false);
      lastY = currentY;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".site-footer-cta, .velyo-footer"));
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      setStickyHidden(visible.size > 0);
    }, { rootMargin: "0px 0px 48px 0px", threshold: 0 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname, showSiteCTA]);

  function chooseAnalytics(allow: boolean) {
    localStorage.setItem("velyo-analytics-consent", allow ? "granted" : "denied");
    localStorage.setItem("velyo-cookie-v2", "acknowledged");
    setAnalyticsConsent(allow);
    setCookies(false);
  }

  if (isAdministration) return <main>{children}</main>;

  const email = process.env.NEXT_PUBLIC_EMAIL || "contatto@velyo.com";
  const phone = process.env.NEXT_PUBLIC_PHONE?.trim();

  return (
    <ItalianContent>
      <ScrollRevealController />
      <header className={`site-header velyo-header${headerHidden ? " is-hidden" : ""}`}>
        <Logo />
        <nav className="desktop-navigation" aria-label="Navigation principale">
          {primaryNav.map(([name, href]) => (
            <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}>{name}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageOptions dropdown />
          <Link className="header-consultation" href="/valutazione">Confier un bien <ArrowRight size={14} /></Link>
          <Link className="admin-login" href="/connexion" aria-label="Espace propriétaire" title="Espace propriétaire"><LogIn size={17} /></Link>
        </div>
        <button className="menu-btn" aria-label="Ouvrir le menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><span>Menu</span><Menu /></button>
      </header>

      {open && (
        <div className="mobile-menu velyo-mobile-menu" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="mobile-menu-head"><Logo light /><button aria-label="Fermer le menu" onClick={() => setOpen(false)}><span>Fermer</span><X /></button></div>
          <nav aria-label="Navigation mobile">
            {nav.map(([name, href], index) => (
              <Link onClick={() => setOpen(false)} key={href} href={href} aria-current={pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)) ? "page" : undefined}>
                <span>{String(index + 1).padStart(2, "0")}</span>{name}<ArrowRight size={16} />
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <LanguageOptions />
          <Link className="mobile-consultation" onClick={() => setOpen(false)} href="/valutazione">Confier mon bien <ArrowRight size={16} /></Link>
            <Link className="mobile-admin-login" onClick={() => setOpen(false)} href="/connexion"><LogIn size={16} /> Espace propriétaire</Link>
          </div>
        </div>
      )}

      <main>{children}</main>

      {showSiteCTA && <CTA />}

      <footer className="footer-main velyo-footer">
        <div className="container footer-shell">
          <div className="footer-masthead">
            <div className="footer-identity"><Logo light /><span>Conciergerie locale à Genova.</span></div>
            <p className="footer-promise"><span>Votre bien, bien entouré.</span><em>Vos voyageurs, bien accueillis.</em></p>
            <a className="footer-direct-contact" href={`mailto:${email}`}><small>Contact direct</small><strong>{email}</strong><ArrowRight size={17} /></a>
          </div>

          <div className="footer-directory">
            <nav className="footer-column" aria-label="Explorer Velyo"><b>Explorer</b><Link href="/servizi">Nos services</Link><Link href="/esperienze">Options voyageurs</Link><Link href="/proprieta">Nos biens</Link><Link href="/chi-siamo">À propos de Velyo</Link></nav>
            <nav className="footer-column" aria-label="Solutions pour les propriétaires"><b>Propriétaires</b><Link href="/proprietari">Comment nous gérons</Link><Link href="/simulatore">Estimer mon bien</Link><Link href="/valutazione">Confier un bien</Link><Link href="/faq">Questions fréquentes</Link></nav>
            <div className="footer-column footer-contact"><b>Contact</b><a href={`mailto:${email}`}>{email}</a>{phone && <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>}<span>Genova, Italie</span><p>Chaque demande reçoit une réponse claire et personnalisée.</p></div>
          </div>

          <div className="footer-bottom"><span>{`© ${new Date().getFullYear()} Velyo Property Manager`}</span><nav aria-label="Informations légales"><Link href="/mentions-legales">Mentions légales</Link><Link href="/privacy">Confidentialité</Link><Link href="/cookie-policy">Cookies</Link><Link href="/termini">Conditions d’utilisation</Link></nav></div>
        </div>
      </footer>

      <Link className={`sticky-cta${stickyHidden ? " is-hidden" : ""}`} href="/valutazione">Confier mon bien <ArrowRight size={16} /></Link>

      {analyticsConsent ? <Analytics /> : null}
      {analyticsConsent ? <SpeedInsights /> : null}

      {cookies && (
        <div className="cookie velyo-cookie" role="dialog" aria-label="Information relative aux cookies">
          <div className="cookie-mark">V</div>
          <div className="cookie-copy"><strong>Mesure anonyme, sans publicité.</strong><p>Avec votre accord, Velyo utilise Vercel Web Analytics et Speed Insights pour mesurer l’audience agrégée et les performances. Aucun cookie publicitaire ni profilage.</p><Link href="/cookie-policy">Voir le détail des stockages</Link></div>
          <div className="cookie-actions"><button className="cookie-secondary" onClick={() => chooseAnalytics(false)}>Refuser</button><button className="cookie-primary" onClick={() => chooseAnalytics(true)}>Accepter la mesure anonyme</button></div>
        </div>
      )}
    </ItalianContent>
  );
}
