"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { getZodiacSign, getPersonalizedInsights } from "@/lib/astrology";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [personalizedInsights, setPersonalizedInsights] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchUserAndProfile();
  }, []);

  const fetchUserAndProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setLoading(false);
      return;
    }
    
    setUser(user);
    
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    setProfile(profile);
    
    // Generate personalized insights
    const zodiac = profile?.birth_date ? getZodiacSign(profile.birth_date) : null;
    const insights = getPersonalizedInsights(zodiac, profile, profile?.assessment_score || 0);
    setPersonalizedInsights(insights);
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Not logged in - Show marketing page
  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">AbaNtu Intelligence</h1>
            <p className="text-xl text-purple-200 mb-8">Know Thyself. Master Thyself. Align Thyself. Build Thyself.</p>
            <div className="flex gap-4 justify-center">
              <a href="/login" className="px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:shadow-lg">Login</a>
              <a href="/signup" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  const zodiac = profile?.birth_date ? getZodiacSign(profile.birth_date) : null;
  const sidebarWidth = sidebarCollapsed ? "w-20" : "w-64";
  const mainMargin = sidebarCollapsed ? "lg:ml-20" : "lg:ml-64";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - same as before */}
      <aside className={`fixed top-0 left-0 z-50 h-full bg-white shadow-xl transition-all duration-300 ${sidebarWidth} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Sidebar content */}
        <div className="h-full flex flex-col">
          <div className={`p-4 border-b border-purple-100 ${sidebarCollapsed ? 'text-center' : ''}`}>
            {!sidebarCollapsed && <span className="text-xl font-bold text-purple-900">AbaNtu</span>}
            {sidebarCollapsed && <span className="text-xl font-bold text-purple-900">✨</span>}
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:block float-right">
              {sidebarCollapsed ? "→" : "←"}
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50">
              <span>🏠</span>{!sidebarCollapsed && <span>Dashboard</span>}
            </Link>
            <Link href="/assessment" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50">
              <span>📊</span>{!sidebarCollapsed && <span>Assessment</span>}
            </Link>
            <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50">
              <span>👤</span>{!sidebarCollapsed && <span>Profile</span>}
            </Link>
            <Link href="/journal" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50">
              <span>📓</span>{!sidebarCollapsed && <span>Journal</span>}
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 text-red-600">
              <span>🚪</span>{!sidebarCollapsed && <span>Logout</span>}
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${mainMargin} transition-all duration-300`}>
        {/* Navbar */}
        <nav className="bg-white border-b fixed top-0 right-0 left-0 lg:left-auto z-30 shadow-sm">
          <div className="px-4 py-3 flex justify-between items-center">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2">☰</button>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm hidden sm:block">{user?.email}</span>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </nav>

        {/* Content with top padding */}
        <div className="pt-16 p-6">
          {/* Welcome Section with Personalization */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{zodiac?.emoji || "✨"}</div>
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome, {profile?.full_name?.split(' ')[0] || 'Explorer'}! 👋
                </h1>
                <p className="text-purple-200">
                  {zodiac ? `${zodiac.name} ${zodiac.symbol} · ${zodiac.element} Sign · Ruled by ${zodiac.ruling}` : "Complete your profile to discover your cosmic blueprint"}
                </p>
              </div>
            </div>
          </div>

          {/* Personalized Insights Card */}
          {personalizedInsights && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-8 border-purple-500">
              <h2 className="text-lg font-bold text-purple-900 mb-3">✨ Your Personalized Insights</h2>
              <p className="text-gray-700 mb-3">{personalizedInsights.zodiacInsight}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-purple-600 font-semibold">CAREER AFFINITY</p>
                  <p className="text-sm text-gray-600">{personalizedInsights.careerPath}</p>
                </div>
                <div>
                  <p className="text-xs text-purple-600 font-semibold">GROWTH EDGE</p>
                  <p className="text-sm text-gray-600">{personalizedInsights.growthFocus}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-semibold">Psychology Score</h3>
              <p className="text-2xl font-bold text-purple-600">{profile?.assessment_score || 0}/500</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(profile?.assessment_score || 0) / 5}%` }} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold">Astrology Sign</h3>
              <p className="text-2xl font-bold text-purple-600">{zodiac?.name || "Not set"}</p>
              <p className="text-xs text-gray-500 mt-1">{zodiac?.element} · {zodiac?.quality}</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-2">📖</div>
              <h3 className="font-semibold">Etymology Practice</h3>
              <Link href="/journal" className="text-purple-600 text-sm mt-2 inline-block hover:underline">
                Write your reflection →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/assessment" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold">Take Assessment</h3>
              <p className="text-sm text-gray-500">Measure your Self-Mastery Index™</p>
            </Link>
            <Link href="/profile" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">👤</div>
              <h3 className="font-semibold">Complete Profile</h3>
              <p className="text-sm text-gray-500">Add your birth details for full insights</p>
            </Link>
            <Link href="/journal" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">📓</div>
              <h3 className="font-semibold">Daily Journal</h3>
              <p className="text-sm text-gray-500">Track your language and growth</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}