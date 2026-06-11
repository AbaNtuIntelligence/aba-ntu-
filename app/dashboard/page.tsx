"use client";

import Link from "next/link";
import DashboardLayout from "@/app/components/ui/DashboardLayout";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-2xl p-6 md:p-8 mb-6 md:mb-8 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, {profile?.full_name?.split(' ')[0] || "Explorer"}! 👋
        </h1>
        <p className="text-purple-200 text-sm md:text-base">
          Continue your journey of self-mastery through Psychology, Astrology, and Etymology.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl md:text-3xl">🧠</span>
            <span className="text-xs text-purple-600 font-medium px-2 py-1 bg-purple-50 rounded-full">Psychology</span>
          </div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Assessment Score</h3>
          <p className="text-2xl md:text-3xl font-bold text-purple-600 mt-2">
            {profile?.assessment_score || 0}/500
          </p>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all"
              style={{ width: `${Math.min((profile?.assessment_score || 0) / 5, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl md:text-3xl">✨</span>
            <span className="text-xs text-purple-600 font-medium px-2 py-1 bg-purple-50 rounded-full">Astrology</span>
          </div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Your Sign</h3>
          <p className="text-2xl md:text-3xl font-bold text-purple-600 mt-2">
            {profile?.zodiac_sign || "Not set"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl md:text-3xl">📖</span>
            <span className="text-xs text-purple-600 font-medium px-2 py-1 bg-purple-50 rounded-full">Etymology</span>
          </div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Journal Practice</h3>
          <Link href="/journal" className="text-purple-600 text-sm md:text-base mt-2 inline-block hover:underline">
            Write your reflection →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Link href="/assessment" className="group">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-xl transition-all border border-purple-100">
            <div className="text-3xl md:text-4xl mb-2 md:mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Take Assessment</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Discover your Self-Mastery Index™</p>
          </div>
        </Link>

        <Link href="/profile" className="group">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-xl transition-all border border-purple-100">
            <div className="text-3xl md:text-4xl mb-2 md:mb-3">👤</div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Update Profile</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Complete your astrological data</p>
          </div>
        </Link>

        <Link href="/journal" className="group">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-xl transition-all border border-purple-100">
            <div className="text-3xl md:text-4xl mb-2 md:mb-3">📓</div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Daily Journal</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Track your growth journey</p>
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
}