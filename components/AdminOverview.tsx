"use client";

import { useEffect, useState } from "react";
import { Building2, CircleCheck, FileClock, Inbox } from "lucide-react";

type Property = { status?: "draft" | "published" | "archived" };
type Lead = { status?: "new" | "read" | "archived" };

export function AdminOverview() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/properties", { cache: "no-store" }).then((response) => response.ok ? response.json() : []),
      fetch("/api/leads", { cache: "no-store" }).then((response) => response.ok ? response.json() : []),
    ]).then(([nextProperties, nextLeads]) => {
      if (!active) return;
      setProperties(nextProperties);
      setLeads(nextLeads);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  const published = properties.filter((item) => item.status === "published").length;
  const drafts = properties.filter((item) => item.status === "draft").length;
  const unread = leads.filter((item) => item.status === "new").length;

  return (
    <section className="admin-overview" id="vue-ensemble">
      <div className="admin-overview-heading">
        <div>
          <p className="eyebrow">Vue d’ensemble</p>
          <h2>Votre activité, en un regard.</h2>
        </div>
        <p>Les demandes reçues et les biens confiés sont réunis ici. Vous savez immédiatement ce qui attend votre attention.</p>
      </div>
      <div className="admin-kpis">
        <article><Inbox size={22} /><strong>{unread}</strong><span>nouvelles demandes</span></article>
        <article><Building2 size={22} /><strong>{properties.length}</strong><span>biens enregistrés</span></article>
        <article><CircleCheck size={22} /><strong>{published}</strong><span>biens publiés</span></article>
        <article><FileClock size={22} /><strong>{drafts}</strong><span>fiches à terminer</span></article>
      </div>
    </section>
  );
}
