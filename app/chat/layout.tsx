import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat - Sim City",
  description: "Chat with characters in the interactive world",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
