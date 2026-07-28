import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scenes - Sim City",
  description: "Explore immersive scenes in the interactive world",
};

export default function ScenesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
