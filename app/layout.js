import { Sansation } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import ResponsiveSplashCursor from "@/components/ResponsiveSplashCursor";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AutoScrollToTop from "@/components/AutoScrollToTop";

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
    <html lang="en" data-scroll-behavior="smooth">
      <body className={sansation.className}>
        {/* Cursor effect */}
       <ResponsiveSplashCursor />


        {/* Website Navbar */}
        <Navbar />

        {/* All page content */}
        <main>{children}</main>
        <AutoScrollToTop />
<WhatsAppWidget/>
        {/* Website Footer */}
        <Footer />
      </body>
    </html>
  );
}