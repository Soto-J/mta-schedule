import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Testing from "@/components/testing";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MTA Schedule",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark", "system"]}
        >
          <Navbar />
          <main className="max-w-7xl mx-auto mt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
