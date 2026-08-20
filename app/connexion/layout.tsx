import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace propriétaire",
  description: "Accès privé à l’espace Velyo.",
  robots: { index: false, follow: false },
};

export default function ConnexionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
