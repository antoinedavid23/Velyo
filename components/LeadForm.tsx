"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocale } from "@/components/LocaleController";
import { translate } from "@/lib/i18n";

const leadFormSchema = z.object({
  name: z.string().trim().min(1, "Indiquez votre prénom.").max(80),
  surname: z.string().trim().min(1, "Indiquez votre nom.").max(80),
  email: z.string().trim().email("Saisissez une adresse e-mail valide.").max(160),
  phone: z.string().trim().max(40).optional(),
  profile: z.string().min(1, "Sélectionnez votre profil."),
  subject: z.string().min(1, "Sélectionnez l’objet de votre demande."),
  city: z.string().optional(),
  propertyType: z.string().optional(),
  propertyCount: z.string().optional(),
  timeline: z.string().optional(),
  type: z.string().optional(),
  area: z.string().optional(),
  bedrooms: z.string().optional(),
  objective: z.string().optional(),
  message: z.string().trim().min(10, "Décrivez votre besoin en quelques mots.").max(2000),
  website: z.string().max(0).optional(),
  consent: z.boolean().refine(Boolean, "Votre accord est nécessaire pour être recontacté."),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

function FieldError({ message }: { message?: string }) {
  return message ? <p className="field-error" role="alert">{message}</p> : null;
}

export function LeadForm() {
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  const { locale } = useLocale();
  const tr = (text: string) => translate(text, locale);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { consent: false, website: "" },
  });

  const submit = handleSubmit(async (data) => {
    setFailed(false);
    setStatus(tr("Envoi en cours…"));
    let response: Response;
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      setFailed(true);
      setStatus(tr("La connexion a été interrompue. Réessayez dans un instant."));
      return;
    }
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      setFailed(true);
      setStatus(tr(result?.code === "invalid_payload" ? "Les informations transmises sont incomplètes." : "L’envoi n’a pas abouti. Réessayez dans un instant."));
      return;
    }
    setStatus(tr("Demande bien enregistrée."));
    reset();
    router.refresh();
  });

  return (
    <form onSubmit={submit} noValidate>
      <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("website")} />
      <div className="field-row">
        <label>Prénom<input autoComplete="given-name" maxLength={80} aria-invalid={Boolean(errors.name)} {...register("name")} /><FieldError message={errors.name?.message} /></label>
        <label>Nom<input autoComplete="family-name" maxLength={80} aria-invalid={Boolean(errors.surname)} {...register("surname")} /><FieldError message={errors.surname?.message} /></label>
      </div>
      <div className="field-row">
        <label>E-mail<input type="email" autoComplete="email" maxLength={160} aria-invalid={Boolean(errors.email)} {...register("email")} /><FieldError message={errors.email?.message} /></label>
        <label>Téléphone <small>(facultatif)</small><input type="tel" autoComplete="tel" maxLength={40} {...register("phone")} /></label>
      </div>

      <>
        <div className="field-row">
          <label>Vous êtes<select aria-invalid={Boolean(errors.profile)} {...register("profile")}><option value="">Sélectionner</option><option>Propriétaire</option><option>Investisseur</option><option>Voyageur</option><option>Partenaire</option></select><FieldError message={errors.profile?.message} /></label>
          <label>Objet de la demande<select aria-invalid={Boolean(errors.subject)} {...register("subject")}><option value="">Sélectionner</option><option>Mettre un bien en gestion</option><option>Obtenir une estimation</option><option>Demander un service</option><option>Proposer un partenariat</option></select><FieldError message={errors.subject?.message} /></label>
        </div>
        <div className="field-row">
          <label>Localisation du bien<input placeholder="Gênes, Portofino…" {...register("city")} /></label>
          <label>Type de bien<select {...register("propertyType")}><option>Non concerné</option><option>Appartement</option><option>Attique</option><option>Villa</option><option>Logement indépendant</option></select></label>
        </div>
        <div className="field-row">
          <label>Nombre de biens<input type="number" min="1" {...register("propertyCount")} /></label>
          <label>Délai souhaité<select {...register("timeline")}><option>Dès que possible</option><option>Sous 1 à 3 mois</option><option>Sous 3 à 6 mois</option><option>Je me renseigne</option></select></label>
        </div>
      </>

      <label>Décrivez votre besoin<textarea maxLength={2000} placeholder="Parlez-nous du bien, de sa situation actuelle et de votre objectif." aria-invalid={Boolean(errors.message)} {...register("message")} /><FieldError message={errors.message?.message} /></label>
      <label><span><input type="checkbox" aria-invalid={Boolean(errors.consent)} {...register("consent")} /> J’accepte que mes données soient utilisées afin d’être recontacté au sujet de ma demande.</span><FieldError message={errors.consent?.message} /></label>
      <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? tr("Envoi en cours…") : "Envoyer le message"}</button>
      <div role={failed ? "alert" : "status"} aria-live="polite" className="form-status">{status && <span className={!failed && status === tr("Demande bien enregistrée.") ? "form-success" : undefined}>{status}</span>}</div>
    </form>
  );
}
