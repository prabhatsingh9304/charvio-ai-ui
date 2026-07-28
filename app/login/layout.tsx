import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Sim City",
  description: "Sign in to explore characters and scenes",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
