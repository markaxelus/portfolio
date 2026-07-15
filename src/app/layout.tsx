import type { Metadata } from "next";
import "./portfolio.css";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%23DDDBD4'/%3E%3Cellipse cx='8' cy='12.2' rx='5.4' ry='2.2' fill='%2316150F'/%3E%3Cellipse cx='8' cy='8.6' rx='3.9' ry='1.9' fill='%2316150F'/%3E%3Cellipse cx='8' cy='5.4' rx='2.5' ry='1.6' fill='%232A2AF0'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: "Mark Axelus — My Desk",
  description:
    "Mark Axelus is a one-person practice, from my desk. Code, design & interfaces that hold their nerve.",
  keywords: [
    "Mark Axelus",
    "Portfolio",
    "Web Developer",
    "React Developer",
    "Node.js",
    "Full Stack Developer",
    "Canada",
    "Victoria",
    "British Columbia",
  ],
  authors: [{ name: "Mark Axelus", url: "https://markaxelus.com" }],
  creator: "Mark Axelus",
  publisher: "Mark Axelus",
  robots: "index, follow",
  icons: { icon: FAVICON },
  openGraph: {
    title: "Mark Axelus — My Desk",
    description:
      "Mark Axelus is a one-person practice, from my desk. Code, design & interfaces that hold their nerve.",
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
    // suppressHydrationWarning: the pre-paint hold script (below) stamps
    // `mr-hold` on <html> before React hydrates — an intentional mismatch
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* THE PRE-PAINT HOLD: the make-ready booth must be UP before first
            paint on first visits — the React reveal lands hydration-late, so
            the sheet used to flash before the loader covered it. This blocking
            script mirrors willLoaderRun() exactly (first visit each session or
            ?loader replay; never reduced / ?still) and raises `html.mr-hold`;
            use-loader lowers it the moment it takes over, and a CSS guard
            animation lowers it even if the engine never arrives. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var q=location.search;if(/[?&]still(\\b|=)/.test(q))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(/[?&]loader(\\b|=)/.test(q)||sessionStorage.getItem('ma-press-check')==null)document.documentElement.classList.add('mr-hold');}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        {/* Fraunces (display), Space Mono, Caveat + Zeyada (the two pens) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1&family=Space+Mono:wght@400;700&family=Zeyada&display=swap"
          rel="stylesheet"
        />
        {/* Author (headline words) + Excon (uppercase lockup) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=author@400,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=excon@400,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
