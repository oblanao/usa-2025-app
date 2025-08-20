"use client";

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        {!isHomePage && <Header title="USA 2025" />}
        <main className={true ? "pt-16 pb-36 max-w-md mx-auto" : ""}>
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
