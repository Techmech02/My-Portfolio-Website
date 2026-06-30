import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://sagarbhati.vercel.app"),
  title: {
    default: "Sagar Bhati | AI/ML Engineer",
    template: "%s | Sagar Bhati",
  },
  description: "Results-driven AI/ML Engineering student with hands-on experience designing and deploying machine learning systems, cloud-powered automation tools, and intelligent applications.",
  keywords: ["Sagar Bhati", "AI Engineer", "ML Engineer", "Machine Learning", "Deep Learning", "AWS", "LSTM", "DVC", "Python Developer", "Portfolio"],
  authors: [{ name: "Sagar Bhati" }],
  creator: "Sagar Bhati",
  openGraph: {
    title: "Sagar Bhati | AI/ML Engineer",
    description: "Results-driven AI/ML Engineering student with hands-on experience designing and deploying machine learning systems, cloud-powered automation tools, and intelligent applications.",
    url: "https://sagarbhati.vercel.app",
    siteName: "Sagar Bhati Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagar Bhati | AI/ML Engineer",
    description: "Results-driven AI/ML Engineering student specializing in machine learning systems, cloud automation, and deep learning.",
    creator: "@Techmech02",
  },
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a href="#content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
