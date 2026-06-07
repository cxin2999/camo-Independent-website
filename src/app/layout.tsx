import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyInquiryBar } from "@/components/layout/StickyInquiryBar";
import { site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Camouflage Felt Hook and Loop Fabric Manufacturer",
    template: "%s | TacticalTex Materials"
  },
  description:
    "Factory supply of custom camouflage felt hook and loop fabric material for tactical gear, patches, uniforms, helmet covers, bags, and outdoor equipment.",
  openGraph: {
    title: "Camouflage Felt Hook and Loop Fabric Manufacturer",
    description:
      "Custom camo loop fabric material for tactical gear, patches, uniforms, helmet covers, backpacks, and outdoor equipment.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyInquiryBar />
      </body>
    </html>
  );
}
