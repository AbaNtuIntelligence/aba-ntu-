// app/certification/page.tsx
import Link from "next/link";

export default function CertificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Certification Program</h1>
              <p className="text-purple-200 mt-1">Become a Certified AbaNtu Practitioner</p>
            </div>
            <Link href="/dashboard" className="text-white hover:text-purple-200">← Back to Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">AbaNtu Practitioner Certification</h2>
          <p className="text-gray-600">Master the integration of Psychology, Astrology, and Etymology</p>
        </div>

        {/* Certification Levels */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-purple-100">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="text-xl font-bold text-gray-900">Seeker Level</h3>
            <p className="text-gray-600 text-sm mt-2">Complete the Self-Mastery Assessment</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div className="w-0 h-full bg-purple-600 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-purple-100">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-xl font-bold text-gray-900">Practitioner Level</h3>
            <p className="text-gray-600 text-sm mt-2">Complete all 6 courses</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div className="w-0 h-full bg-purple-600 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-purple-100">
            <div className="text-3xl mb-3">👑</div>
            <h3 className="text-xl font-bold text-gray-900">Master Level</h3>
            <p className="text-gray-600 text-sm mt-2">Teach and certify others</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div className="w-0 h-full bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-purple-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Certification Requirements</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span> Complete the Self-Mastery Assessment
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span> Complete all 6 Core Courses
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span> Maintain 30+ journal entries
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span> Pass the final examination
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/membership" className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
            Upgrade to Practitioner →
          </Link>
          <p className="text-xs text-gray-400 mt-4">Certification included with Master Plan</p>
        </div>
      </div>
    </div>
  );
}