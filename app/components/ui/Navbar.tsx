"use client";

import Link from "next/link";
import { Menu, LogOut, Gem } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
  onLogout: () => void;
  user: any;
  profile: any;
}

export default function Navbar({ onMenuClick, onLogout, user, profile }: NavbarProps) {
  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-transparent backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="px-4 py-3 flex justify-between items-center">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Logo (desktop) */}
        <Link href="/" className="hidden lg:flex items-center gap-2">
          <Gem className="w-6 h-6 text-purple-600" />
          <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
            AbaNtu
          </span>
        </Link>

        {/* Right side: user info, avatar, logout */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-gray-500">{profile?.archetype || "The Seeker"}</p>
          </div>

          {/* Avatar or fallback initials */}
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}