import type { Metadata } from "next";
import { Russo_One, JetBrains_Mono } from "next/font/google";
import { Header } from "@/widgets/header/ui/Header";
import { Footer } from "@/widgets/footer/ui/Footer";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { JsonLd } from "@/shared/ui/json-ld/JsonLd";
import { getLocalBusinessJsonLd } from "@/shared/lib/structuredData";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
} from "@/shared/lib/site";
import "./globals.css";

const fontPrimary = Russo_One({
  weight: ["400"],
  variable: "--font-primary",
  subsets: ["latin", "cyrillic"],
});

const fontSecondary = Russo_One({
  weight: ["400"],
  variable: "--font-secondary",
  subsets: ["latin", "cyrillic"],
});

const fontAccent = JetBrains_Mono({
  weight: ["400", "700", "800"],
  variable: "--font-accent",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Воздушная гимнастика в г. Московский`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo_200x200px.svg",
    apple: "/logo_200x200px.svg",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Воздушная гимнастика в г. Московский`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Воздушная гимнастика в г. Московский`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
    lang="ru"
     className="dark" 
     suppressHydrationWarning>
      <body
        className={`${fontPrimary.variable} ${fontSecondary.variable} ${fontAccent.variable} layout-root`}
      >
        <JsonLd data={getLocalBusinessJsonLd()} />
        <ThemeProvider>
          <Header />
          <main className="layout-main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
