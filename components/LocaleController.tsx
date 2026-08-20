"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { translate, type Locale } from "@/lib/i18n";

const PUBLIC_LOCALES = ["it", "en", "fr"] as const;
const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({ locale: "it", setLocale: () => undefined });
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const translatedAttributes = ["aria-label", "title", "placeholder", "alt"] as const;

function translateTree(root: ParentNode, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let current: Node | null = walker.currentNode;
  while (current) {
    if (current.nodeType === Node.TEXT_NODE) {
      const textNode = current as Text;
      const parent = textNode.parentElement;
      if (parent && !parent.closest("script, style, svg, [data-no-translate]")) {
        const source = originalText.get(textNode) ?? textNode.data;
        if (!originalText.has(textNode)) originalText.set(textNode, source);
        const core = source.trim();
        if (core) {
          const leading = source.match(/^\s*/)?.[0] ?? "";
          const trailing = source.match(/\s*$/)?.[0] ?? "";
          textNode.data = `${leading}${translate(core, locale)}${trailing}`;
        }
      }
    } else if (current.nodeType === Node.ELEMENT_NODE) {
      const element = current as Element;
      if (!element.closest("[data-no-translate]")) {
        let sources = originalAttributes.get(element);
        if (!sources) { sources = new Map(); originalAttributes.set(element, sources); }
        for (const attribute of translatedAttributes) {
          const value = element.getAttribute(attribute);
          if (!value) continue;
          if (!sources.has(attribute)) sources.set(attribute, value);
          element.setAttribute(attribute, translate(sources.get(attribute) ?? value, locale));
        }
      }
    }
    current = walker.nextNode();
  }
}

function translateMetadata(locale: Locale) {
  document.title = translate(document.title, locale);
  document.querySelectorAll<HTMLMetaElement>('meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]').forEach((meta) => {
    const sources = originalAttributes.get(meta) ?? new Map<string, string>();
    if (!originalAttributes.has(meta)) originalAttributes.set(meta, sources);
    const current = meta.content;
    if (!sources.has("content")) sources.set("content", current);
    meta.content = translate(sources.get("content") ?? current, locale);
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
    const initial: Locale = stored === "en" || stored === "fr" ? stored : "it";
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
    const observer = new MutationObserver((mutations) => mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) translateTree(node as ParentNode, locale);
        else if (node.nodeType === Node.TEXT_NODE && node.parentNode) translateTree(node.parentNode, locale);
      });
      if (mutation.type === "characterData") {
        const node = mutation.target as Text;
        const previousSource = originalText.get(node);
        if (previousSource && node.data.trim() !== translate(previousSource.trim(), locale)) originalText.set(node, node.data);
        if (node.parentNode) translateTree(node.parentNode, locale);
      }
      if (mutation.type === "attributes") {
        const element = mutation.target as Element;
        const attribute = mutation.attributeName;
        if (attribute && translatedAttributes.includes(attribute as (typeof translatedAttributes)[number])) {
          const sources = originalAttributes.get(element) ?? new Map<string, string>();
          const value = element.getAttribute(attribute);
          if (value && sources.get(attribute) && value !== translate(sources.get(attribute) ?? value, locale)) sources.set(attribute, value);
          originalAttributes.set(element, sources);
          translateTree(element, locale);
        }
      }
    }));
    observer.observe(document.body, { childList: true, characterData: true, attributes: true, attributeFilter: [...translatedAttributes], subtree: true });
    return () => observer.disconnect();
  }, [locale, pathname, isPublic]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}
