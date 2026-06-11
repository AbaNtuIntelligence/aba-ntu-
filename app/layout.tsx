// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

// Remove viewport from metadata
export const metadata = {
  title: "AbaNtu Intelligence",
  description: "Personal Development through Psychology, Astrology, and Etymology",
  // No viewport here
};

// Add separate viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}