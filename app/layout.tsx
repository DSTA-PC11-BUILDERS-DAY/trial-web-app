import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chuckle Fetch",
  description: "A tiny test app: fetch a random dad joke and save your favorites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-slate-800 min-h-screen">{children}</body>
    </html>
  );
}
