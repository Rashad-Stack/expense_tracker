import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Armata, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const armata = Armata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-armata",
});

export const metadata: Metadata = {
  title: "Smart | Expense Tracker",
  description: "Track, Thrive, Transform: Your Financial Journey Starts Here.",
  icons: {
    icon: "/assets/png/logo-no-background.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${armata.variable} ${inter.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
