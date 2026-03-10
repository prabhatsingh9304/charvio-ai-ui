import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/features/navigation";
import { geistSans, geistMono } from "./components";

export const metadata: Metadata = {
  title: "Sim City - Interactive Character World",
  description: "Explore immersive scenes and meet fascinating characters in this interactive world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
