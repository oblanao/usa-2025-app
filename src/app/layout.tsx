import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "USA 2025 Trip Planner",
  description: "A trip planner for USA 2025",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        <Header title="USA 2025" />
        <main className="pt-16 pb-16 max-w-md mx-auto">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
