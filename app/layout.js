import { Sansation } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import SplashCursor from "../components/SplashCursor";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

// Configure Sansation Google Font
const sansation = Sansation({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-sansation",
});

// Website metadata
export const metadata = {
  title: "TrustPip | Forex Trading Education",
  description:
    "Explore Forex trading education, mentorship, and trading-related services with TrustPip.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sansation.className}>
        {/* Cursor effect */}
        <SplashCursor
          rainbow={false}
          size={1}
          force={1}
          swirl={3}
          trail={1}
          clickSplash
          colorSpeed={1}
          intensity={1}
          momentum={1}
          shading={1}
          glow={0}
          quality="high"
          intro
          contained={false}
        />

        {/* Website Navbar */}
        <Navbar />

        {/* All page content */}
        <main>{children}</main>
<WhatsAppWidget/>
        {/* Website Footer */}
        <Footer />
      </body>
    </html>
  );
}