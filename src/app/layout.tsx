import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Senan Salah — personlig platform",
  description:
    "Personlig platform for Senan Salah med fokus på projekter, spil, CV og AI-værktøjer."
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="da" className="scroll-smooth">
      <body
        className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}
      >
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}


