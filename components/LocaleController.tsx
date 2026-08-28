"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { translate, type Locale } from "@/lib/i18n";

const PUBLIC_LOCALES = ["it", "en", "fr"] as const;
const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({ locale: "it", setLocale: () => undefined });
type TranslationState = { source: string; rendered: string };
const originalText = new WeakMap<Text, TranslationState>();
const originalAttributes = new WeakMap<Element, Map<string, TranslationState>>();
const translatedAttributes = ["aria-label", "title", "placeholder", "alt"] as const;
let translatedDocumentTitle: TranslationState | undefined;

function sourceFor(current: string, previous?: TranslationState) {
  return !previous || current !== previous.rendered ? current : previous.source;
}

function translateTree(root: ParentNode, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let current: Node | null = walker.currentNode;
  while (current) {
    if (current.nodeType === Node.TEXT_NODE) {
      const textNode = current as Text;
      const parent = textNode.parentElement;
      if (parent && !parent.closest("script, style, svg, [data-no-translate]")) {
        const source = sourceFor(textNode.data, originalText.get(textNode));
        const core = source.trim();
        if (core) {
          const leading = source.match(/^\s*/)?.[0] ?? "";
          const trailing = source.match(/\s*$/)?.[0] ?? "";
          const rendered = `${leading}${translate(core, locale)}${trailing}`;
          if (textNode.data !== rendered) textNode.data = rendered;
          originalText.set(textNode, { source, rendered });
        }
      }
    } else if (current.nodeType === Node.ELEMENT_NODE) {
      const element = current as Element;
      if (!element.closest("[data-no-translate]")) {
        let states = originalAttributes.get(element);
        if (!states) { states = new Map(); originalAttributes.set(element, states); }
        for (const attribute of translatedAttributes) {
          const value = element.getAttribute(attribute);
          if (!value) continue;
          const source = sourceFor(value, states.get(attribute));
          const rendered = translate(source, locale);
          if (value !== rendered) element.setAttribute(attribute, rendered);
          states.set(attribute, { source, rendered });
        }
      }
    }
    current = walker.nextNode();
  }
}

function translateMetadata(locale: Locale) {
  const titleSource = sourceFor(document.title, translatedDocumentTitle);
  const titleRendered = translate(titleSource, locale);
  if (document.title !== titleRendered) document.title = titleRendered;
  translatedDocumentTitle = { source: titleSource, rendered: titleRendered };
  document.querySelectorAll<HTMLMetaElement>('meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]').forEach((meta) => {
    const states = originalAttributes.get(meta) ?? new Map<string, TranslationState>();
    if (!originalAttributes.has(meta)) originalAttributes.set(meta, states);
    const current = meta.content;
    const source = sourceFor(current, states.get("content"));
    const rendered = translate(source, locale);
    if (current !== rendered) meta.content = rendered;
    states.set("content", { source, rendered });
  });
}

export function useLocale() { return useContext(LocaleContext); }

export function LanguageOptions({ onSelect, dropdown = false }: { onSelect?: () => void; dropdown?: boolean }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const picker = useRef<HTMLDivElement>(null);
  const ariaLabel = locale === "it" ? "Scelga la lingua" : locale === "fr" ? "Choisir la langue" : "Choose language";

  useEffect(() => {
    if (!dropdown || !open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event instanceof MouseEvent && picker.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [dropdown, open]);

  if (dropdown) return <div className={`velyo-language-picker${open ? " is-open" : ""}`} ref={picker} data-no-translate>
    <button className="velyo-language-trigger" type="button" aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
      <span>{locale.toUpperCase()}</span>
      <svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg>
    </button>
    {open && <div className="velyo-language-menu" role="listbox" aria-label={ariaLabel}>
      {PUBLIC_LOCALES.map((code) => <button type="button" role="option" key={code} aria-selected={locale === code} onClick={() => { setLocale(code); setOpen(false); onSelect?.(); }}><span>{code.toUpperCase()}</span><small>{{ it: "Italiano", en: "English", fr: "Français" }[code]}</small></button>)}
    </div>}
  </div>;

  return <div className="velyo-language-options" aria-label={ariaLabel}>
    {PUBLIC_LOCALES.map((code) => <button type="button" key={code} aria-current={locale === code ? "true" : undefined} onClick={() => { setLocale(code); onSelect?.(); }}>{code.toUpperCase()}</button>)}
  </div>;
}

export function LocaleController({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>("it");
  const isPublic = !pathname.startsWith("/administration") && !pathname.startsWith("/connexion");
  const setLocale = (nextLocale: Locale) => {
    if (!PUBLIC_LOCALES.includes(nextLocale as "it" | "en" | "fr")) return;
    localStorage.setItem("velyo-locale", nextLocale);
    setLocaleState(nextLocale);
  };

  useEffect(() => {
    if (!isPublic) return;
    const stored = localStorage.getItem("velyo-locale");
    const initial: Locale = stored === "fr" || stored === "en" ? stored : "it";
    const frame = requestAnimationFrame(() => setLocaleState(initial));
    return () => cancelAnimationFrame(frame);
  }, [isPublic]);

  useEffect(() => {
    if (!isPublic) return;
    const frame = requestAnimationFrame(() => {
      document.documentElement.lang = locale;
      translateTree(document.body, locale);
      translateMetadata(locale);
    });
    return () => cancelAnimationFrame(frame);
  }, [locale, pathname, isPublic]);

  useEffect(() => {
    if (!isPublic) return;
    let frame = 0;
    const observer = new MutationObserver((mutations) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        for (const mutation of mutations) {
          if (mutation.type === "characterData") {
            if (mutation.target.parentNode) translateTree(mutation.target.parentNode, locale);
            continue;
          }
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) translateTree(node as Element, locale);
            else if (node.parentNode) translateTree(node.parentNode, locale);
          });
        }
      });
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [locale, isPublic]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}
