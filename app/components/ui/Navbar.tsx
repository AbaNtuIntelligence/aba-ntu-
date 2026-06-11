"use client";

interface NavbarProps {
  onMenuClick: () => void;
  user: any;
  profile: any;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export default function Navbar({ onMenuClick, user, profile, sidebarCollapsed, onToggleSidebar }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-30 shadow-sm">
      <div className="px-4 py-3 flex justify-between items-center">
        {/* Left section */}
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <button 
            onClick={onMenuClick} 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <span className="text-2xl">☰</span>
          </button>
          
          {/* Desktop collapse toggle */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="hidden lg:flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-all"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <span className="text-xl">{sidebarCollapsed ? "☰" : "◀"}</span>
              <span className="text-sm font-medium">
                {sidebarCollapsed ? "Menu" : "Collapse"}
              </span>
            </button>
          )}
        </div>
        
        {/* Center logo for mobile */}
        <div className="flex-1 text-center lg:hidden">
          <span className="font-bold text-lg bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent">
            AbaNtu
          </span>
        </div>
        
        {/* Right section - User info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-gray-500">{profile?.archetype || "The Seeker"}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
}