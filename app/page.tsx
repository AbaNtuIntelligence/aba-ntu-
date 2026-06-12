"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import {
  Brain, Sparkles, BookOpen, Target, Zap, Gem,
  ArrowRight, Award, Compass, Layers, Briefcase,
  Eye, Heart, TrendingUp, Feather, Users, Lightbulb, Crown,
  X, MessageSquare
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showMethodModal, setShowMethodModal] = useState(false);

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

  if (user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <Link href="/" className="flex items-center gap-2">
  
  {/* Optional: keep text beside logo */}
  <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
    AbaNtu
  </span>
</Link>
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
<div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
  {/* Centered Logo */}
  <div className="flex justify-center mb-6">
    <img
      src="/images/logo.png"  // or .png
      alt="AbaNtu Intelligence"
      className="h-15 md:h-20 w-auto"
    />
  </div>

  {/* Badge */}
  <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-purple-200 shadow-sm">
    <Sparkles className="w-4 h-4 text-purple-600" />
    <span className="text-sm font-medium text-purple-800">AbaNtu Intelligence™</span>
  </div>

  {/* Headline */}
  <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-6">
    Know Thyself.<br />
    Master Thyself.<br />
    Align Thyself.<br />
    Build Thyself.
  </h1>

  {/* Description */}
  <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
    The AbaNtu Method integrates Psychology, Astrology, and Etymology to help you discover your nature, master your behavior, align your life, and contribute your gifts.
  </p>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
      Start Your Journey
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
    <button
      onClick={() => setShowMethodModal(true)}
      className="px-8 py-4 bg-white border-2 border-purple-200 text-purple-800 rounded-2xl font-semibold hover:border-purple-400 transition-all flex items-center justify-center gap-2"
    >
      <MessageSquare className="w-5 h-5" />
      Learn the Method
    </button>
  </div>
</div>
      </section>

      {/* ... Rest of the sections (Three Lenses, Four Paths, etc.) remain the same as previously ... */}
      {/* (I will include them for completeness but focus on modal) */}

      {/* Method Modal */}
      {showMethodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-purple-100">
            <div className="sticky top-0 bg-white border-b border-purple-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-purple-900">The AbaNtu Method™</h2>
              <button
                onClick={() => setShowMethodModal(false)}
                className="p-2 rounded-full hover:bg-purple-50 transition"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-gray-700 leading-relaxed">
              <p>
                The AbaNtu Method™ is a structured self-mastery and human development framework that combines behavioral science, systems thinking, and digital intelligence to help individuals understand who they are, where they are, and what they need to do next.
              </p>
              <p>
                Through our proprietary <strong className="text-purple-700">Self-Mastery Index™</strong>, participants assess key dimensions of personal effectiveness, leadership capacity, emotional resilience, discipline, purpose, and growth potential.
              </p>
              <p>
                The assessment generates a personalized archetype and development profile, transforming self-awareness into actionable insight.
              </p>
              <p>
                Rather than offering generic advice, the AbaNtu Method™ provides a data-driven roadmap for personal, professional, and community transformation—empowering individuals, teams, schools, organizations, and communities to move from potential to performance with clarity, accountability, and measurable progress.
              </p>
              <div className="mt-6 pt-4 border-t border-purple-100 text-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-md transition"
                >
                  Begin Your Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The Three Lenses */}
      {/* The Three Lenses - Expanded */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Three Lenses™</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">Every challenge within the AbaNtu Method is examined through three integrative lenses.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Lens 1: Psychology */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
          <Brain className="w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold">Psychology Lens</h3>
          <p className="text-purple-100 text-lg mt-1">What behavior is occurring?</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Examines:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span> Thought patterns
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span> Habits
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span> Emotions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span> Conditioning
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-purple-700 mb-1">Core Function:</h4>
            <p className="text-gray-700">Behavioral Understanding</p>
            <p className="text-sm text-gray-500 mt-2">Uncover the patterns that drive your actions and reactions.</p>
          </div>
        </div>
      </div>

      {/* Lens 2: Astrology */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <Sparkles className="w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold">Astrology Lens</h3>
          <p className="text-purple-100 text-lg mt-1">What nature is being expressed?</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Examines:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span> Archetypes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span> Tendencies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span> Potentials
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span> Cycles
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-purple-700 mb-1">Core Function:</h4>
            <p className="text-gray-700">Self-Knowledge and Alignment</p>
            <p className="text-sm text-gray-500 mt-2">Understand your innate nature and align with your cosmic blueprint.</p>
          </div>
        </div>
      </div>

      {/* Lens 3: Etymology */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
          <BookOpen className="w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold">Etymology Lens</h3>
          <p className="text-amber-100 text-lg mt-1">What language is constructing this reality?</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Examines:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span> Meaning
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span> Definitions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span> Vocabulary
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span> Internal narratives
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-purple-700 mb-1">Core Function:</h4>
            <p className="text-gray-700">Conscious Communication</p>
            <p className="text-sm text-gray-500 mt-2">Master the words that shape your internal and external reality.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* The Four Paths */}
      {/* The Four Paths of Development - Expanded */}
<section className="py-24 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Four Paths of Development™</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">The complete developmental journey consists of four progressive stages.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {/* Path 1: Know Thyself */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 text-white">
          <Compass className="w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold">Path 1: Know Thyself</h3>
          <p className="text-blue-100 text-lg mt-1">“Who am I?”</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Focus:</h4>
            <ul className="grid grid-cols-2 gap-1 text-gray-600 text-sm">
              <li>• Identity</li>
              <li>• Personality</li>
              <li>• Temperament</li>
              <li>• Natural inclinations</li>
              <li>• Strengths</li>
              <li>• Weaknesses</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Tools:</h4>
            <ul className="flex flex-wrap gap-2">
              <li className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Psychology</li>
              <li className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Astrology</li>
              <li className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Reflection</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-blue-700 mb-1">Outcome:</h4>
            <p className="text-gray-800 font-medium">Self-Knowledge</p>
            <p className="text-sm text-gray-500 mt-1">Build a foundation of authentic self-understanding.</p>
          </div>
        </div>
      </div>

      {/* Path 2: Master Thyself */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
          <Target className="w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold">Path 2: Master Thyself</h3>
          <p className="text-purple-100 text-lg mt-1">“Can I govern myself?”</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Focus:</h4>
            <ul className="grid grid-cols-2 gap-1 text-gray-600 text-sm">
              <li>• Habits</li>
              <li>• Discipline</li>
              <li>• Emotional regulation</li>
              <li>• Decision-making</li>
              <li>• Focus</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Tools:</h4>
            <ul className="flex flex-wrap gap-2">
              <li className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">Behavioral Psychology</li>
              <li className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">Cognitive Training</li>
              <li className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">Journaling</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-purple-700 mb-1">Outcome:</h4>
            <p className="text-gray-800 font-medium">Self-Mastery</p>
            <p className="text-sm text-gray-500 mt-1">Develop the discipline to act in alignment with your values.</p>
          </div>
        </div>
      </div>

      {/* Path 3: Align Thyself */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <Layers className="w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold">Path 3: Align Thyself</h3>
          <p className="text-indigo-100 text-lg mt-1">“Am I living according to my nature?”</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Focus:</h4>
            <ul className="grid grid-cols-2 gap-1 text-gray-600 text-sm">
              <li>• Purpose</li>
              <li>• Relationships</li>
              <li>• Work</li>
              <li>• Environment</li>
              <li>• Timing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Tools:</h4>
            <ul className="flex flex-wrap gap-2">
              <li className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">Astrology</li>
              <li className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">Strategic Reflection</li>
              <li className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">Personal Planning</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-indigo-700 mb-1">Outcome:</h4>
            <p className="text-gray-800 font-medium">Alignment</p>
            <p className="text-sm text-gray-500 mt-1">Live in harmony with your true nature and cosmic timing.</p>
          </div>
        </div>
      </div>

      {/* Path 4: Build Thyself */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
          <Briefcase className="w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold">Path 4: Build Thyself</h3>
          <p className="text-amber-100 text-lg mt-1">“What contribution shall I make?”</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Focus:</h4>
            <ul className="grid grid-cols-2 gap-1 text-gray-600 text-sm">
              <li>• Leadership</li>
              <li>• Service</li>
              <li>• Enterprise</li>
              <li>• Legacy</li>
              <li>• Community</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Tools:</h4>
            <ul className="flex flex-wrap gap-2">
              <li className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">Mentorship</li>
              <li className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">Teaching</li>
              <li className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">Leadership Practice</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-amber-700 mb-1">Outcome:</h4>
            <p className="text-gray-800 font-medium">Contribution</p>
            <p className="text-sm text-gray-500 mt-1">Create lasting impact and serve the greater good.</p>
          </div>
        </div>
      </div>
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
      <p className="text-xl text-gray-600 mt-2 max-w-2xl mx-auto">
        Beyond IQ – a holistic model of human potential. Each intelligence represents a unique dimension of growth.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: Eye,
          name: "Self Intelligence",
          shortDesc: "Know thyself",
          description: "Awareness of your own patterns, values, and inner world.",
          prompt: "What drives you?"
        },
        {
          icon: Heart,
          name: "Emotional Intelligence",
          shortDesc: "Feel wisely",
          description: "Recognize, understand, and manage emotions – yours and others'.",
          prompt: "How do you respond under pressure?"
        },
        {
          icon: TrendingUp,
          name: "Behavioral Intelligence",
          shortDesc: "Act intentionally",
          description: "Align actions with goals; break unhelpful habits.",
          prompt: "Do your habits serve your future self?"
        },
        {
          icon: Feather,
          name: "Linguistic Intelligence",
          shortDesc: "Speak your reality",
          description: "Master words to shape perception and communication.",
          prompt: "What stories do you tell yourself?"
        },
        {
          icon: Users,
          name: "Relational Intelligence",
          shortDesc: "Connect deeply",
          description: "Build trust, resolve conflict, and collaborate effectively.",
          prompt: "How do you show up for others?"
        },
        {
          icon: Compass,
          name: "Strategic Intelligence",
          shortDesc: "Navigate complexity",
          description: "See the big picture, plan, and adapt to change.",
          prompt: "Where are you going?"
        },
        {
          icon: Lightbulb,
          name: "Spiritual Intelligence",
          shortDesc: "Find meaning",
          description: "Connect to purpose, values, and something greater.",
          prompt: "Why does it matter?"
        },
        {
          icon: Crown,
          name: "AbaNtu Integration",
          shortDesc: "Unify all seven",
          description: "The synergy of every intelligence working together.",
          prompt: "How do you integrate?"
        }
      ].map((intel, i) => (
        <div
          key={i}
          className="group relative bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 hover:border-purple-200"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <intel.icon className="w-10 h-10 text-purple-700 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">{intel.name}</h3>
              <p className="text-sm text-purple-600 font-medium mb-1">{intel.shortDesc}</p>
              <p className="text-sm text-gray-600 mb-2">{intel.description}</p>
              <p className="text-xs text-gray-400 italic">“{intel.prompt}”</p>
            </div>
          </div>
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