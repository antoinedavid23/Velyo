const value = (name: string) => process.env[name]?.trim() || "";

export const legalIdentity = {
  tradeName: "Velyo Property Manager",
  legalName: value("LEGAL_NAME"),
  legalForm: value("LEGAL_FORM"),
  registeredOffice: value("LEGAL_REGISTERED_OFFICE"),
  businessRegister: value("LEGAL_BUSINESS_REGISTER") || "Registro delle Imprese di Genova",
  registrationNumber: value("LEGAL_REGISTRATION_NUMBER"),
  reaNumber: value("LEGAL_REA_NUMBER"),
  vatNumber: value("LEGAL_VAT_NUMBER"),
  taxCode: value("LEGAL_TAX_CODE"),
  shareCapital: value("LEGAL_SHARE_CAPITAL"),
  legalRepresentative: value("LEGAL_REPRESENTATIVE"),
  pec: value("LEGAL_PEC"),
  email: process.env.NEXT_PUBLIC_EMAIL?.trim() || "contatto@velyo.com",
  phone: process.env.NEXT_PUBLIC_PHONE?.trim() || "",
  hostName: value("LEGAL_HOST_NAME") || "Cloudflare, Inc.",
  hostAddress: value("LEGAL_HOST_ADDRESS") || "101 Townsend Street, San Francisco, CA 94107, États-Unis",
  hostWebsite: value("LEGAL_HOST_WEBSITE") || "https://www.cloudflare.com/",
  retentionMonths: Math.max(1, Number(process.env.LEAD_RETENTION_MONTHS || 12)),
  lastUpdated: "28 août 2026",
  lastUpdatedISO: "2026-08-28",
};

export const missingLegalIdentity = [
  ["dénomination légale", "LEGAL_NAME", legalIdentity.legalName],
  ["forme juridique", "LEGAL_FORM", legalIdentity.legalForm],
  ["siège social", "LEGAL_REGISTERED_OFFICE", legalIdentity.registeredOffice],
  ["numéro d’immatriculation", "LEGAL_REGISTRATION_NUMBER", legalIdentity.registrationNumber],
  ["numéro REA", "LEGAL_REA_NUMBER", legalIdentity.reaNumber],
  ["Partita IVA", "LEGAL_VAT_NUMBER", legalIdentity.vatNumber],
  ["représentant légal", "LEGAL_REPRESENTATIVE", legalIdentity.legalRepresentative],
].filter(([, , configured]) => !configured) as Array<[string, string, string]>;

export const leadEmailConfiguration = {
  apiKey: Boolean(value("RESEND_API_KEY")),
  recipient: Boolean(value("CONTACT_RECIPIENT")),
  sender: Boolean(value("CONTACT_FROM")),
};

export const missingLeadEmailConfiguration = [
  ["clé d’envoi Resend", "RESEND_API_KEY", leadEmailConfiguration.apiKey],
  ["adresse de réception", "CONTACT_RECIPIENT", leadEmailConfiguration.recipient],
  ["expéditeur vérifié", "CONTACT_FROM", leadEmailConfiguration.sender],
].filter(([, , configured]) => !configured) as Array<[string, string, boolean]>;

export const legalIdentityComplete = missingLegalIdentity.length === 0;
export const leadEmailReady = missingLeadEmailConfiguration.length === 0;
export const commercialLaunchReady = legalIdentityComplete && leadEmailReady;
