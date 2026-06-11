"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function CoursesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserAndProfile();
  }, []);

  const fetchUserAndProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUser(user);
    
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    setProfile(profile);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  const courses = [
    {
      id: 1,
      title: "Know Thyself: Foundations of Self-Awareness",
      path: "Know Thyself",
      lens: "Psychology",
      icon: "🧠",
      level: "Beginner",
      duration: "4 weeks",
      lessons: 12,
      description: "Discover your personality patterns, emotional triggers, and core values.",
      modules: ["Personality Archetypes", "Emotional Intelligence", "Values Clarification"]
    },
    {
      id: 2,
      title: "Master Thyself: Discipline & Habits",
      path: "Master Thyself",
      lens: "Psychology",
      icon: "⚡",
      level: "Intermediate",
      duration: "6 weeks",
      lessons: 18,
      description: "Build sustainable habits, master your time, and develop unwavering discipline.",
      modules: ["Habit Formation", "Time Mastery", "Willpower Training"]
    },
    {
      id: 3,
      title: "The Cosmic Blueprint: Astrology for Self-Knowledge",
      path: "Know Thyself",
      lens: "Astrology",
      icon: "✨",
      level: "Beginner",
      duration: "8 weeks",
      lessons: 24,
      description: "Understand your birth chart and align with your cosmic nature.",
      modules: ["Planets & Signs", "Houses & Aspects", "Transits & Timing"]
    },
    {
      id: 4,
      title: "Align Thyself: Purpose & Relationships",
      path: "Align Thyself",
      lens: "Astrology",
      icon: "🎯",
      level: "Advanced",
      duration: "6 weeks",
      lessons: 16,
      description: "Align your career, relationships, and life direction with your true nature.",
      modules: ["Career Alignment", "Relationship Dynamics", "Life Purpose"]
    },
    {
      id: 5,
      title: "The Power of Words: Etymology & Reality",
      path: "Master Thyself",
      lens: "Etymology",
      icon: "📖",
      level: "Intermediate",
      duration: "5 weeks",
      lessons: 15,
      description: "Master the language that shapes your reality and transforms your life.",
      modules: ["Word Origins", "Narrative Reframing", "Conscious Communication"]
    },
    {
      id: 6,
      title: "Build Thyself: Leadership & Legacy",
      path: "Build Thyself",
      lens: "All Three",
      icon: "🏛️",
      level: "Advanced",
      duration: "10 weeks",
      lessons: 30,
      description: "Create lasting impact and contribute your unique gifts to the world.",
      modules: ["Authentic Leadership", "Legacy Planning", "Community Building"]
    }
  ];

  const getPathColor = (path: string) => {
    switch(path) {
      case "Know Thyself": return "from-blue-500 to-cyan-500";
      case "Master Thyself": return "from-purple-500 to-indigo-500";
      case "Align Thyself": return "from-emerald-500 to-teal-500";
      case "Build Thyself": return "from-amber-500 to-orange-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const completedCourses = profile?.completed_courses || [];
  const progress = (completedCourses.length / courses.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Courses</h1>
              <p className="text-purple-200 mt-1">Master the Four Paths of Personal Development</p>
            </div>
            <Link href="/dashboard" className="text-white hover:text-purple-200">← Back to Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Your Learning Journey</h2>
              <p className="text-gray-600 text-sm mt-1">{completedCourses.length} of {courses.length} courses completed</p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">{Math.round(progress)}%</p>
              <p className="text-xs text-gray-500">Overall Progress</p>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-purple-100 overflow-hidden group">
              <div className={`bg-gradient-to-r ${getPathColor(course.path)} p-4`}>
                <div className="flex justify-between items-start">
                  <span className="text-4xl">{course.icon}</span>
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-white">
                    {course.level}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-purple-600 font-medium">{course.lens}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{course.path}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">⏱️ {course.duration}</span>
                  <span className="flex items-center gap-1">📚 {course.lessons} lessons</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.modules.slice(0, 2).map((module, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">📖 {module}</span>
                  ))}
                  {course.modules.length > 2 && (
                    <span className="text-xs text-gray-400">+{course.modules.length - 2} more</span>
                  )}
                </div>
                
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all">
                  {completedCourses.includes(course.id) ? "Review Course" : "Start Learning →"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certification Path */}
        <div className="mt-12 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Become a Certified AbaNtu Practitioner</h2>
          <p className="text-purple-200 mb-6">Complete all courses and earn your official certification</p>
          <Link href="/certification" className="inline-block px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:shadow-lg transition">
            View Certification Path →
          </Link>
        </div>
      </div>
    </div>
  );
}