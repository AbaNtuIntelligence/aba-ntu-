"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-110"
      aria-label="Home"
    >
      <Home className="w-5 h-5" />
    </Link>
  );
}