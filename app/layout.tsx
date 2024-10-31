import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Persistent components
import Header from '../components/Header'

const ClashGrotesk = localFont({
  src: "./fonts/ClashGrotesk-Regular.otf",
  variable: "--font-clashGrotesk",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ClashGrotesk.variable} antialiased`} >
        
        <Header />
        {children}
      </body>
    </html>
  );
}
