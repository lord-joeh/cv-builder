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
  metadataBase: new URL("https://cv-builder.dev-joseph.me"),
  title: {
    default: "Styles CV Builder - Create Premium Resumes with AI",
    template: "%s | Styles CV Builder",
  },
  description:
    "A powerful, AI-driven website to generate your premium, beautifully formatted CV in just a few minutes. Upload your old resume and let Gemini AI rebuild it instantly.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "CV Builder",
    "Resume Builder",
    "Free CV builder",
    "Styles CV",
    "AI Resume generator",
    "Gemini AI Resume",
    "PDF Resume generator",
    "NextJS CV App",
  ],
  authors: [{ name: "Joseph Mensah", url: "https://cv-builder.dev-joseph.me" }],
  creator: "Joseph Mensah",
  publisher: "Joseph Mensah",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cv-builder.dev-joseph.me",
    siteName: "Styles CV Builder",
    title: "Styles CV Builder - Create Premium Resumes with AI",
    description:
      "A powerful, AI-driven website to generate your premium, beautifully formatted CV in just a few minutes. Upload your old resume and let Gemini AI rebuild it instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Styles CV Builder Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Styles CV Builder - Create Premium Resumes with AI",
    description:
      "Generate your premium, beautifully formatted CV in just a few minutes using AI.",
    images: ["/og-image.png"],
  },
};

import { Toaster } from "@/components/ui/sonner";

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
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
