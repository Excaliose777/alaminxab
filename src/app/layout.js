import ClientWrapper from "@/utils/ClientWrapper/ClientWrapper";
import "./globals.scss";
import ReactLenis from "lenis/react";
import Head from "next/head";

export const metadata = {
  title: "Creative Web Developer - AlaminxAb",
  description: "Frontend Developer Portfolio",
  openGraph: {
    type: "website",
    url: "https://alaminxab.vercel.app",
    title: "Creative Web Developer - AlaminxAb",
    description: "Frontend Developer Portfolio",
    images: ["/images/favicon.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://alaminxab.vercel.app/",
    title: "Creative Web Developer - AlaminxAb",
    description: "Frontend Developer Portfolio",
    images: ["/images/favicon.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/images/favicon.jpeg" />
        <meta prefix="og: http://ogp.me/ns#" />
      </Head>

      <ReactLenis root>
        <body>
          <ClientWrapper>{children}</ClientWrapper>
        </body>
      </ReactLenis>
    </html>
  );
}
