"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import {
  Brain, Sparkles, BookOpen, Target, Zap, Gem,
  ArrowRight, Award, Compass, Layers, Briefcase,
  Eye, Heart, TrendingUp, Feather, Users, Lightbulb, Crown
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      if (user) router.push("/dashboard");
    };
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  if (user) return null; // will redirect

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-purple-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">AbaNtu Intelligence™</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-6">
            Know Thyself.<br />
            Master Thyself.<br />
            Align Thyself.<br />
            Build Thyself.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            The AbaNtu Method integrates Psychology, Astrology, and Etymology to help you discover your nature, master your behavior, align your life, and contribute your gifts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="px-8 py-4 bg-white border-2 border-purple-200 text-purple-800 rounded-2xl font-semibold hover:border-purple-400 transition-all">
              Learn the Method
            </Link>
          </div>
        </div>
      </section>

      {/* The Three Lenses */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Three Lenses of AbaNtu</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Every challenge is examined through three integrative lenses.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Psychology",
                description: "What behavior is occurring?",
                details: "Thought patterns, habits, emotions, conditioning.",
                outcome: "Behavioral Understanding",
                color: "purple"
              },
              {
                icon: Sparkles,
                title: "Astrology",
                description: "What nature is being expressed?",
                details: "Archetypes, tendencies, potentials, cycles.",
                outcome: "Self-Knowledge & Alignment",
                color: "indigo"
              },
              {
                icon: BookOpen,
                title: "Etymology",
                description: "What language is constructing this reality?",
                details: "Meaning, definitions, vocabulary, internal narratives.",
                outcome: "Conscious Communication",
                color: "amber"
              }
            ].map((lens) => (
              <div key={lens.title} className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                  lens.color === 'purple' ? 'from-purple-500 to-indigo-600' :
                  lens.color === 'indigo' ? 'from-indigo-500 to-purple-600' :
                  'from-amber-400 to-orange-500'
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <lens.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{lens.title}</h3>
                <p className="text-gray-700 font-medium">{lens.description}</p>
                <p className="text-gray-500 text-sm mt-2">{lens.details}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">{lens.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Four Paths */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Four Paths of Development™</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">A progressive journey from self-knowledge to contribution.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Compass, title: "Know Thyself", desc: "Identity, personality, natural inclinations, strengths & weaknesses.", outcome: "Self-Knowledge", color: "blue" },
              { icon: Target, title: "Master Thyself", desc: "Habits, discipline, emotional regulation, decision-making, focus.", outcome: "Self-Mastery", color: "purple" },
              { icon: Layers, title: "Align Thyself", desc: "Purpose, relationships, work, environment, timing.", outcome: "Alignment", color: "indigo" },
              { icon: Briefcase, title: "Build Thyself", desc: "Leadership, service, enterprise, legacy, community.", outcome: "Contribution", color: "amber" }
            ].map((path) => (
              <div key={path.title} className="bg-white rounded-xl shadow-md overflow-hidden border-l-8 border-purple-500 hover:shadow-xl transition-all">
                <div className="p-6">
                  <path.icon className="w-10 h-10 text-gray-700 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-gray-600 text-sm">{path.desc}</p>
                  <p className="text-xs font-medium text-purple-600 mt-4 uppercase tracking-wide">{path.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The AbaNtu Equation */}
      <section className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <Gem className="w-12 h-12 mx-auto mb-6 text-purple-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The AbaNtu Equation™</h2>
          <p className="text-xl text-purple-200 mb-4">Identity + Discipline + Alignment = Development</p>
          <p className="text-lg font-mono tracking-wide">K (Know Thyself) + M (Master Thyself) + A (Align Thyself) = D (Development)</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm">Psychology</span>
            <span className="bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm">Astrology</span>
            <span className="bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm">Etymology</span>
          </div>
        </div>
      </section>

      {/* The Seven Intelligences */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Seven Intelligences™</h2>
            <p className="text-xl text-gray-600 mt-2">Beyond IQ – a holistic model of human potential.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Eye, name: "Self Intelligence", desc: "Understanding oneself" },
              { icon: Heart, name: "Emotional Intelligence", desc: "Understanding emotions" },
              { icon: TrendingUp, name: "Behavioral Intelligence", desc: "Understanding actions" },
              { icon: Feather, name: "Linguistic Intelligence", desc: "Understanding language" },
              { icon: Users, name: "Relational Intelligence", desc: "Understanding others" },
              { icon: Compass, name: "Strategic Intelligence", desc: "Understanding direction" },
              { icon: Lightbulb, name: "Spiritual Intelligence", desc: "Understanding purpose" },
              { icon: Crown, name: "AbaNtu Integration", desc: "All dimensions working together" }
            ].map((intel, i) => (
              <div key={i} className="group p-6 bg-gray-50 rounded-xl hover:bg-purple-50 transition-all hover:shadow-md">
                <intel.icon className="w-10 h-10 text-purple-700 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800">{intel.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{intel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-white opacity-5" />
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <Award className="w-14 h-14 mx-auto mb-6 text-white/80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Begin Your AbaNtu Journey</h2>
          <p className="text-xl text-purple-200 mb-8">Join thousands who are discovering their nature, mastering their behavior, and building a legacy.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-800 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            Create Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-purple-200 mt-4">No credit card required. Start with the Self-Mastery Index™ assessment.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-8 mb-6">
            <Link href="/about" className="text-sm hover:text-white transition">About</Link>
            <Link href="/privacy" className="text-sm hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="text-sm hover:text-white transition">Terms</Link>
          </div>
          <p className="text-sm">AbaNtu Intelligence™ – Know Thyself. Master Thyself. Align Thyself. Build Thyself.</p>
          <p className="text-xs mt-4">© {new Date().getFullYear()} AbaNtu Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}