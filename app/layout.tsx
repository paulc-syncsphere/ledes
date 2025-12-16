import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEDES API Standards",
  description: "Legal Electronic Data Exchange Standard - Parser, Validator, and Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

