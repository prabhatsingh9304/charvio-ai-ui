import { ReactNode } from "react";

export default function CharactersLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
