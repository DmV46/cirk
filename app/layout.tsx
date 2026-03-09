import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Цирковая студия — Подготовка детей к цирковой гимнастике",
  description:
    "Цирковая студия для детей. Обучение акробатике, воздушной гимнастике и цирковому искусству. Развиваем гибкость, силу и уверенность.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} layout-root`}
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
