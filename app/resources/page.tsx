"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ResourcesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) router.push("/login");
    setLoading(false);
  };

  const resources = [
    { title: "The AbaNtu Method", description: "Learn about the Three Lenses and Four Paths", icon: "📖", link: "#" },
    { title: "Psychology of Self-Mastery", description: "Understanding behavior and habits", icon: "🧠", link: "#" },
    { title: "Astrology Guide", description: "Your cosmic blueprint explained", icon: "✨", link: "#" },
    { title: "Etymology Dictionary", description: "Words that shape your reality", icon: "📚", link: "#" },
    { title: "Meditation Library", description: "Guided practices for alignment", icon: "🧘", link: "#" },
    { title: "Community Forum", description: "Connect with fellow seekers", icon: "👥", link: "#" },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">Resources</h1>
        <p className="text-gray-600 mb-8">Tools and knowledge for your self-mastery journey</p>
 <Link 
    href="/dashboard"
    className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
  >
    <span className="text-xl">←</span>
    Back to Dashboard
  </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <a key={resource.title} href={resource.link} className="group">
              <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all border border-purple-100">
                <div className="text-4xl mb-3">{resource.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-500">{resource.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}