import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Styles CV builder",
  description: "A simple website to generate your premium CV in few mintues",
  icons: './icon.svg',
  keywords: ["CV", "Free CV builder", "Styles CV"],
  openGraph: {
    type: "website",
    url: "https://cv-builder.dev-joseph.me",
    siteName: "Styles CV builder",
    images: "./icon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased` }
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
