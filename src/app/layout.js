import ClientWrapper from "@/utils/ClientWrapper/ClientWrapper";
import "lenis/dist/lenis.css";
import "./globals.scss";

const title = "Creative Web Developer - AlaminxAb";
const description = "Frontend Developer Portfolio";
const url = "https://alaminxab.vercel.app";

export const metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: { icon: "/images/favicon.jpeg" },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: ["/images/favicon.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/favicon.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/BebasNeue/BebasNeue-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
