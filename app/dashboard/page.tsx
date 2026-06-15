"use client";

import React from "react";
import Link from "next/link";
import DashboardLayout from "@/app/components/ui/DashboardLayout";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import {
  Brain, Sparkles, BookOpen, Target, Activity,
  TrendingUp, Award, Compass, Layers, Briefcase,
  Calendar, Star, PenTool, User, BarChart3,
  ArrowRight, CheckCircle, Clock, AlertCircle,
  Zap, Heart, Shield, Eye, Feather, Crown,
  LineChart, PieChart, Percent
} from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        setAssessmentResults(data?.assessment_results || {});
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
        </div>
      </DashboardLayout>
    );
  }

  // Extract or compute dimensions (mock if not available)
  const dimensions = {
    selfAwareness: assessmentResults?.selfAwareness || 68,
    selfDiscipline: assessmentResults?.selfDiscipline || 45,
    emotionalRegulation: assessmentResults?.emotionalRegulation || 72,
    purposeAlignment: assessmentResults?.purposeAlignment || 38,
    communication: assessmentResults?.communication || 55,
    responsibility: assessmentResults?.responsibility || 62,
  };

  // Three Lenses composite (average of related dimensions)
  const psychologyScore = Math.round((dimensions.selfAwareness + dimensions.selfDiscipline + dimensions.emotionalRegulation) / 3);
  const astrologyScore = Math.round((dimensions.purposeAlignment + dimensions.selfAwareness) / 2); // placeholder mapping
  const etymologyScore = Math.round((dimensions.communication + dimensions.responsibility) / 2);

  // Archetype based on overall score (mock – replace with real logic)
  const totalScore = Object.values(dimensions).reduce((a, b) => a + b, 0);
  const averageScore = totalScore / 6;
  let archetype = "The Seeker";
  let archetypeIcon = Eye;
  let archetypeDesc = "Beginning the journey of self‑discovery.";
  if (averageScore >= 80) { archetype = "The Builder"; archetypeIcon = Crown; archetypeDesc = "Creating transformation for self and others."; }
  else if (averageScore >= 65) { archetype = "The Sage"; archetypeIcon = Brain; archetypeDesc = "Deep understanding and integration."; }
  else if (averageScore >= 50) { archetype = "The Guardian"; archetypeIcon = Shield; archetypeDesc = "Protecting your growth and supporting others."; }
  else if (averageScore >= 35) { archetype = "The Visionary"; archetypeIcon = Eye; archetypeDesc = "Seeing new possibilities for your life."; }
  else { archetype = "The Seeker"; archetypeIcon = Compass; archetypeDesc = "Curious, open, and ready to explore."; }

  // Star sign and trait
  const zodiacSign = profile?.zodiac_sign;
  const zodiacTraits: Record<string, string> = {
    Aries: "Courageous & Determined", Taurus: "Reliable & Patient", Gemini: "Adaptable & Curious",
    Cancer: "Loyal & Empathetic", Leo: "Confident & Generous", Virgo: "Analytical & Helpful",
    Libra: "Diplomatic & Social", Scorpio: "Passionate & Resourceful", Sagittarius: "Adventurous & Optimistic",
    Capricorn: "Disciplined & Ambitious", Aquarius: "Innovative & Humanitarian", Pisces: "Intuitive & Artistic"
  };
  const trait = zodiacSign ? zodiacTraits[zodiacSign] : null;

  // Modules for the Four Paths (to complete)
  const modules = [
    { path: "Know Thyself", name: "Discover Your Core Values", completed: true, link: "/assessment" },
    { path: "Know Thyself", name: "Personality & Temperament", completed: true, link: "/assessment" },
    { path: "Master Thyself", name: "Habit Formation", completed: false, link: "/courses" },
    { path: "Master Thyself", name: "Emotional Regulation Techniques", completed: false, link: "/courses" },
    { path: "Align Thyself", name: "Purpose & Career Alignment", completed: false, link: "/courses" },
    { path: "Align Thyself", name: "Astrological Birth Chart Reading", completed: false, link: "/profile" },
    { path: "Build Thyself", name: "Leadership Lab", completed: false, link: "/courses" },
    { path: "Build Thyself", name: "Community Contribution Project", completed: false, link: "/courses" },
  ];
  const completedCount = modules.filter(m => m.completed).length;
  const totalModules = modules.length;
  const journeyProgress = (completedCount / totalModules) * 100;

  // Determine weakest dimension for focus
  const weakestDimension = Object.entries(dimensions).reduce((a, b) => (a[1] < b[1] ? a : b));
  const focusArea = weakestDimension[0].replace(/([A-Z])/g, ' $1').trim();

  return (
    <DashboardLayout>
      {/* Hero Section with Archetype & Star Sign */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {React.createElement(archetypeIcon, { className: "w-8 h-8 text-purple-300" })}
              <span className="text-purple-200 text-sm font-medium">{archetype}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || "Explorer"}
            </h1>
            <p className="text-purple-200 text-sm md:text-base max-w-xl">
              {archetypeDesc} Your Self‑Mastery Index™ score is <strong>{Math.round(averageScore)}%</strong>.
            </p>
          </div>
          {zodiacSign && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-200" />
              <div>
                <div className="text-sm font-medium">{zodiacSign}</div>
                <div className="text-xs text-purple-200">{trait}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Three Lenses Dashboard */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-600" /> Your Three Lenses™
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <Brain className="w-8 h-8 text-purple-600" />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Psychology</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{psychologyScore}%</div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: `${psychologyScore}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Behavioral understanding & habits</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Astrology</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{astrologyScore}%</div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: `${astrologyScore}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Alignment with your cosmic nature</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Etymology</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{etymologyScore}%</div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: `${etymologyScore}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Conscious language & narrative</p>
          </div>
        </div>
      </div>

      {/* Six Dimensions Grid */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" /> Core Dimensions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Self-Awareness", value: dimensions.selfAwareness, icon: Eye, color: "blue" },
            { name: "Self-Discipline", value: dimensions.selfDiscipline, icon: Zap, color: "purple" },
            { name: "Emotional Regulation", value: dimensions.emotionalRegulation, icon: Heart, color: "pink" },
            { name: "Purpose Alignment", value: dimensions.purposeAlignment, icon: Compass, color: "green" },
            { name: "Communication", value: dimensions.communication, icon: Feather, color: "orange" },
            { name: "Responsibility", value: dimensions.responsibility, icon: Shield, color: "indigo" },
          ].map((dim) => (
            <div key={dim.name} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <dim.icon className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-800">{dim.name}</span>
                </div>
                <span className="text-sm font-bold text-purple-700">{dim.value}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full`} style={{ width: `${dim.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey Progress & Focus Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Journey Completion */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600" /> Your Self‑Mastery Journey
          </h3>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progress through the Four Paths</span>
            <span>{completedCount}/{totalModules} modules</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" style={{ width: `${journeyProgress}%` }} />
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {modules.map((mod, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  {mod.completed ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-gray-300" />}
                  <span className={`text-sm ${mod.completed ? 'text-gray-500' : 'text-gray-700'}`}>{mod.name}</span>
                </div>
                {!mod.completed && (
                  <Link href={mod.link} className="text-xs text-purple-600 hover:underline">Start →</Link>
                )}
              </div>
            ))}
          </div>
          <Link href="/courses" className="inline-flex items-center gap-1 text-sm text-purple-600 mt-3 font-medium hover:gap-2 transition-all">
            Explore all courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Focus Area (Weakest Dimension) */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-md p-6 border border-amber-100">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-600" /> Your Next Growth Edge
          </h3>
          <p className="text-gray-700 mb-3">
            Your lowest score is in <strong className="text-amber-800">{focusArea}</strong>.
            Strengthening this dimension will accelerate your self‑mastery.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-lg text-amber-700 font-medium hover:bg-amber-100 transition"
          >
            Start focused module <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Archetype Details and Recommended Path */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
              {React.createElement(archetypeIcon, { className: "w-10 h-10 text-purple-700" })}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{archetype}</h3>
            <p className="text-gray-600 mb-3">{archetypeDesc}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/assessment" className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                Retake Assessment
              </Link>
              <Link href="/courses" className="px-4 py-2 bg-white border border-purple-200 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-50 transition">
                View Recommended Path
              </Link>
            </div>
          </div>
          {zodiacSign && (
            <div className="text-center bg-purple-50 rounded-xl p-3 min-w-[120px]">
              <Star className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="text-sm font-semibold text-gray-800">{zodiacSign}</div>
              <div className="text-xs text-gray-500">Star Sign</div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}