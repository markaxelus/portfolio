import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mark Axelus | Portfolio",
  description: "Welcome to my portfolio!",
  keywords: [
    "Mark Axelus",
    "Portfolio",
    "Web Developer",
    "React Developer",
    "Node.js",
    "Full Stack Developer",
    "Canada",
    "Victoria",
    "British Columbia" 
  ],
  authors: [{ name: "Mark Axelus", url: "https://markaxelus.com" }],
  creator: "Mark Axelus",
  publisher: "Mark Axelus",
  robots: "index, follow",
  openGraph: {
    title: "Mark Axelus | Portfolio",
    description: "Welcome to my portfolio!",
    url: "https://markaxelus.com", 
    siteName: "Mark Axelus Portfolio",
    locale: "en_CA",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
