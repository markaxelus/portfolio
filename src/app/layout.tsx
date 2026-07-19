import type { Metadata } from "next";
import "./portfolio.css";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%23DDDBD4'/%3E%3Cellipse cx='8' cy='12.2' rx='5.4' ry='2.2' fill='%2316150F'/%3E%3Cellipse cx='8' cy='8.6' rx='3.9' ry='1.9' fill='%2316150F'/%3E%3Cellipse cx='8' cy='5.4' rx='2.5' ry='1.6' fill='%232A2AF0'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: "Mark Axelus · My Desk",
  description:
    "Mark Axelus is a one-person practice, from my desk. Code, design & interfaces, delivered.",
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
    title: "Mark Axelus · My Desk",
    description:
      "Mark Axelus is a one-person practice, from my desk. Code, design & interfaces, delivered.",
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
            animation lowers it even if the engine never arrives. It ALSO
            stamps `html.js` unconditionally (before the early returns) — the
            CSS keys JS-positioned furniture off it (the line's sheets hide
            until hung; no-JS gets the printed-list fallback). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{document.documentElement.classList.add('js');var q=location.search;if(/[?&]still(\\b|=)/.test(q))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(/[?&]loader(\\b|=)/.test(q)||sessionStorage.getItem('ma-press-check')==null)document.documentElement.classList.add('mr-hold');}catch(e){}})();",
          }}
        />
        {/* THE TYPE CASES are self-hosted (portfolio.css @font-face →
            /public/fonts): no third-party CSS blocks first paint. Preload
            only the faces above the fold — the lockup (Excon 700), the
            display serif (Fraunces roman), the instrument mono. The rest
            (italic, pens, mono 700) load on demand via unicode-range/style
            matching. */}
        <link rel="preload" href="/fonts/excon-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/fraunces-100-900-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-mono-400-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* the make-ready loader iframe (first visit only) still pulls its
            OWN copies from Google/Fontshare — keep its handshakes warm */}
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
      </head>
      <body>{children}</body>
    </html>
  );
}
