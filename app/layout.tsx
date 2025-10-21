import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AxomPrep — AI-Powered English Learning Platform",
    template: "%s | AxomPrep"
  },
  description:
    "Master English communication skills through AI-powered interview practice. Build confidence and fluency for academic and professional success with our conversational AI platform.",
  keywords: [
    "English learning", 
    "AI interview practice", 
    "conversational AI", 
    "interview preparation", 
    "language learning", 
    "AI tutor", 
    "English fluency"
  ],
  authors: [{ name: "AxomPrep Team" }],
  creator: "AxomPrep",
  publisher: "AxomPrep",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.axomprep.in",
    title: "AxomPrep — AI-Powered English Learning Platform",
    description: "Master English communication skills through AI-powered interview practice. Build confidence and fluency for academic and professional success.",
    siteName: "AxomPrep",
  },
  twitter: {
    card: "summary_large_image",
    title: "AxomPrep — AI-Powered English Learning Platform",
    description: "Master English communication skills through AI-powered interview practice.",
  },
  verification: {
    google: "", // Add your Google Search Console verification code here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
      <html lang="en">
        <body
          className={`${bricolage.variable} antialiased flex flex-col min-h-screen`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}