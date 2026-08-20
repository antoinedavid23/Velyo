"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, LogIn, Menu, X } from "lucide-react";
import { CTA } from "@/components/PageHero";
import { LanguageOptions } from "@/components/LocaleController";

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

  useEffect(() => {
    const frame = requestAnimationFrame(() => setCookies(!localStorage.getItem("velyo-cookie")));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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

  function saveCookieChoice(choice: "accepted" | "refused") {
    localStorage.setItem("velyo-cookie", choice);
    setCookies(false);
  }

  if (isAdministration) return <main>{children}</main>;

  const email = process.env.NEXT_PUBLIC_EMAIL || "contact@velyo.pm";
  const phone = process.env.NEXT_PUBLIC_PHONE?.trim();

  return (
    <>
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
        <div className="footer-grid">
          <div className="footer-brand"><b>VELYO</b><p><span>Votre bien, bien entouré.</span><span>Vos voyageurs, bien accueillis.</span></p><small>Conciergerie locale à Genova.</small></div>
          <div><b>Explorer</b>{nav.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}</div>
          <div><b>Propriétaires</b><Link href="/proprietari">Comment nous gérons</Link><Link href="/simulatore">Estimer mes revenus</Link><Link href="/valutazione">Confier un bien</Link><Link href="/faq">Questions fréquentes</Link></div>
          <div className="footer-contact"><b>Contact</b><a href={`mailto:${email}`}>{email}</a>{phone && <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>}<span>Genova, Italie</span><p>Chaque demande reçoit une réponse claire et personnalisée.</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Velyo Property Manager</span><Link href="/mentions-legales">Mentions légales</Link><Link href="/privacy">Confidentialité</Link><Link href="/cookie-policy">Cookies</Link><Link href="/termini">Conditions d’utilisation</Link></div>
      </footer>

      <Link className="sticky-cta" href="/valutazione">Confier mon bien <ArrowRight size={16} /></Link>

      {cookies && (
        <div className="cookie velyo-cookie" role="dialog" aria-label="Information relative aux cookies">
          <div className="cookie-mark">V</div>
          <div className="cookie-copy"><strong>Uniquement les cookies nécessaires.</strong><p>Ils permettent au site de fonctionner correctement. Velyo n’utilise aucun profilage publicitaire.</p><Link href="/cookie-policy">Voir la politique cookies</Link></div>
          <div className="cookie-actions"><button className="cookie-secondary" onClick={() => saveCookieChoice("refused")}>Refuser</button><button className="cookie-primary" onClick={() => saveCookieChoice("accepted")}>J’ai compris</button></div>
        </div>
      )}
    </>
  );
}
