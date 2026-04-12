import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";

const fontSans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Journal Management System | Scientific Monolith",
  description: "Institutional Repository and Research Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className={`${fontSans.className} min-h-full flex flex-col font-sans`}>
        <Providers>
          <CommandPalette />
          <Navbar />
          <main className="flex-1 flex flex-col items-stretch">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
