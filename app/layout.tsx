import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRE Flashcards",
  description: "Learn GRE words with interactive flashcards",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GRE Flashcards",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192x192.png",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "GRE Flashcards",
    title: "GRE Flashcards",
    description: "Learn GRE words with interactive flashcards",
  },
  twitter: {
    card: "summary",
    title: "GRE Flashcards",
    description: "Learn GRE words with interactive flashcards",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
