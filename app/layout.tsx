import type { Metadata } from "next";
import { Inter, Lexend_Zetta } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "Mark - Portfolio",
  description: "Welcome to my portfolio",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lexend = Lexend_Zetta({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lexend.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
