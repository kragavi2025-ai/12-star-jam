import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "12 Star Jam School | Chennai",
  description: "A premium early childhood school in Chennai nurturing curiosity and inspiring growth in a safe, natural, and inspiring environment.",
  icons: {
    icon: "/images/logo/logo.jpeg",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-cream text-dark-text font-sans antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
