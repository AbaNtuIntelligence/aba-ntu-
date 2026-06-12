import Link from "next/link";
import {
  Brain, Sparkles, BookOpen, Compass, Target, Layers, Briefcase,
  Eye, Heart, TrendingUp, Feather, Users, Lightbulb, Crown,
  Gem, Infinity, Award, ArrowRight, CheckCircle
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">The AbaNtu Method</h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            A personal development methodology integrating Psychology, Astrology, and Etymology
            to help you discover, align, and express your true nature.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* Foundational Statement */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Foundational Statement</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            AbaNtu Intelligence is a Personal Development methodology dedicated to helping individuals understand themselves,
            master themselves, align with their nature, and contribute meaningfully to society.
            The methodology integrates three disciplines — Psychology, Astrology, and Etymology — into a unified framework
            for human flourishing.
          </p>
        </section>

        {/* The Ntu Principle */}
        <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
          <div className="text-center">
            <Gem className="w-12 h-12 text-purple-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">The AbaNtu Principle™</h2>
            <p className="text-lg text-gray-700 italic">Ntu – the underlying essence, nature, or being from which human experience emerges.</p>
            <p className="mt-4 text-gray-600">The purpose of personal development is not merely to acquire knowledge, but to discover, understand, align with, and express one's Ntu.</p>
          </div>
        </section>

        {/* The Three Lenses (detailed) */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Three Lenses™</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l-4 border-purple-500 pl-4">
              <Brain className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="text-xl font-bold">Psychology Lens</h3>
              <p className="text-gray-600 mt-1">What behavior is occurring?</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-500">
                <li>• Thought patterns & habits</li>
                <li>• Emotions & conditioning</li>
                <li className="font-medium text-purple-600 mt-2">→ Behavioral Understanding</li>
              </ul>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4">
              <Sparkles className="w-8 h-8 text-indigo-600 mb-2" />
              <h3 className="text-xl font-bold">Astrology Lens</h3>
              <p className="text-gray-600 mt-1">What nature is being expressed?</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-500">
                <li>• Archetypes & tendencies</li>
                <li>• Potentials & cycles</li>
                <li className="font-medium text-purple-600 mt-2">→ Self-Knowledge & Alignment</li>
              </ul>
            </div>
            <div className="border-l-4 border-amber-500 pl-4">
              <BookOpen className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="text-xl font-bold">Etymology Lens</h3>
              <p className="text-gray-600 mt-1">What language is constructing this reality?</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-500">
                <li>• Meaning & definitions</li>
                <li>• Vocabulary & internal narratives</li>
                <li className="font-medium text-purple-600 mt-2">→ Conscious Communication</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The Four Paths (detailed) */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Four Paths of Development™</h2>
          <div className="space-y-6">
            {[
              { icon: Compass, title: "Know Thyself", question: "Who am I?", focus: "Identity, personality, temperament, strengths & weaknesses", tools: "Psychology, Astrology, Reflection", outcome: "Self-Knowledge" },
              { icon: Target, title: "Master Thyself", question: "Can I govern myself?", focus: "Habits, discipline, emotional regulation, decision-making", tools: "Behavioral Psychology, Cognitive Training, Journaling", outcome: "Self-Mastery" },
              { icon: Layers, title: "Align Thyself", question: "Am I living according to my nature?", focus: "Purpose, relationships, work, environment, timing", tools: "Astrology, Strategic Reflection, Planning", outcome: "Alignment" },
              { icon: Briefcase, title: "Build Thyself", question: "What contribution shall I make?", focus: "Leadership, service, enterprise, legacy, community", tools: "Mentorship, Teaching, Leadership Practice", outcome: "Contribution" }
            ].map((path) => (
              <div key={path.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <path.icon className="w-10 h-10 text-purple-700 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
                    <p className="text-gray-600 italic">“{path.question}”</p>
                    <p className="mt-2 text-gray-700"><span className="font-semibold">Focus:</span> {path.focus}</p>
                    <p className="text-sm text-gray-500"><span className="font-semibold">Tools:</span> {path.tools}</p>
                    <p className="mt-2 text-sm font-semibold text-purple-600 uppercase tracking-wide">Outcome: {path.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The AbaNtu Equation */}
        <section className="text-center bg-white border border-purple-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">The AbaNtu Equation™</h2>
          <p className="text-xl text-purple-700 font-mono mb-2">Identity + Discipline + Alignment = Development</p>
          <p className="text-gray-600">K (Know Thyself) + M (Master Thyself) + A (Align Thyself) = D (Development)</p>
        </section>

        {/* Development Cycle */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The AbaNtu Development Cycle™</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {["Awareness", "Understanding", "Acceptance", "Alignment", "Action", "Transformation"].map((step, idx) => (
              <div key={step} className="relative">
                <div className="bg-purple-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-700 font-bold">{idx + 1}</span>
                </div>
                <p className="font-medium text-gray-800">{step}</p>
                {idx < 5 && <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-purple-200" style={{ left: '50%', width: 'calc(100% - 3rem)' }} />}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">A repeating cycle: Awareness → Understanding → Acceptance → Alignment → Action → Transformation → Repeat</p>
        </section>

        {/* The Seven Intelligences (list) */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Seven Intelligences™</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Self Intelligence – Understanding oneself",
              "Emotional Intelligence – Understanding emotions",
              "Behavioral Intelligence – Understanding actions",
              "Linguistic Intelligence – Understanding language",
              "Relational Intelligence – Understanding others",
              "Strategic Intelligence – Understanding direction",
              "Spiritual Intelligence – Understanding purpose"
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Core Products Mapping */}
        <section className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Core Products Derived from IP</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div><span className="font-bold">Assessment</span><br/><span className="text-sm text-gray-500">Know Thyself</span></div>
            <div><span className="font-bold">Journal</span><br/><span className="text-sm text-gray-500">Master Thyself</span></div>
            <div><span className="font-bold">AI Coach</span><br/><span className="text-sm text-gray-500">Three Lenses</span></div>
            <div><span className="font-bold">Courses</span><br/><span className="text-sm text-gray-500">Four Paths</span></div>
            <div><span className="font-bold">Membership</span><br/><span className="text-sm text-gray-500">Development Cycle</span></div>
            <div><span className="font-bold">Certification</span><br/><span className="text-sm text-gray-500">AbaNtu Method</span></div>
            <div><span className="font-bold">Corporate Training</span><br/><span className="text-sm text-gray-500">Seven Intelligences</span></div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="text-center border-t border-gray-200 pt-12">
          <Award className="w-12 h-12 text-purple-700 mx-auto mb-4" />
          <p className="text-xl text-gray-700 max-w-2xl mx-auto italic">
            “To help individuals discover their nature, master their behavior, align their lives, and contribute their gifts through the integration of Psychology, Astrology, and Etymology.”
          </p>
          <p className="mt-6 text-gray-500">— AbaNtu Intelligence Mission</p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link href="/" className="text-sm hover:text-white transition">← Back to Home</Link>
          <p className="text-xs mt-4">© {new Date().getFullYear()} AbaNtu Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}