"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, BarChart3, User, BookOpen, Star, LogOut, X, Gem 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  profile: any;
  onLogout: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Assessment", href: "/assessment", icon: BarChart3 },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Membership", href: "/membership", icon: Star },
];

export default function Sidebar({ isOpen, onClose, user, profile, onLogout }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-purple-100 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Gem className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
                AbaNtu
              </span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* User info with avatar */}
          <div className="p-6 border-b border-purple-100 text-center">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-purple-300 mb-3"
              />
            ) : (
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-3">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <h3 className="font-semibold text-gray-900 truncate">
              {profile?.full_name || user?.email?.split('@')[0]}
            </h3>
            <p className="text-xs text-purple-600 mt-1">
              {profile?.archetype || "The Seeker"}
            </p>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-l-4 border-purple-600"
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-purple-100">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}