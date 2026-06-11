"use client";

import { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <h1 className="font-bold text-lg mb-4">
          AbaNtu Intelligence
        </h1>

        <nav className="space-y-2 text-sm">
          <a href="/" className="block hover:underline">Home</a>
          <a href="/assessment" className="block hover:underline">Assessment</a>
          <a href="/dashboard" className="block hover:underline">Dashboard</a>
          <a href="/login" className="block hover:underline">Login</a>
          <a href="/signup" className="block hover:underline">Signup</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}