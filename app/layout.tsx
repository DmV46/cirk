import type { Metadata } from "next";
import { Russo_One, JetBrains_Mono } from "next/font/google";
import { Header } from "@/widgets/header/ui/Header";
import { Footer } from "@/widgets/footer/ui/Footer";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
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
  title: "Объединенная цирковая студия — Цирковая гимнастика",
  description:
    "Цирковая студия нового формата. Обучение акробатике, воздушной гимнастике и цирковому искусству.",
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
        <ThemeProvider>
          <Header />
          <main className="layout-main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
