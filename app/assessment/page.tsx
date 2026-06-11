"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { assessmentQuestions, getPrimaryArchetype, calculateDimensionScores } from "@/lib/assessmentQuestions";
import { supabase } from "@/lib/supabaseClient";

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [router]);

  const handleChange = (question: string, value: number) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    const totalQuestions = assessmentQuestions.reduce(
      (acc, section) => acc + section.questions.length, 0
    );
    
    if (Object.keys(answers).length < totalQuestions) {
      alert(`Please answer all ${totalQuestions} questions before submitting.`);
      return;
    }

    setLoading(true);

    try {
      const dimensionScores = calculateDimensionScores(answers);
      const totalScore = Object.values(dimensionScores).reduce((a, b) => a + b, 0);
      const averageScore = totalScore / Object.keys(dimensionScores).length;
      const archetype = getPrimaryArchetype(averageScore);

      const { error } = await supabase
        .from("profiles")
        .update({
          assessment_results: answers,
          assessment_score: totalScore,
          archetype: archetype,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      router.push("/dashboard?assessment=complete");
    } catch (error) {
      console.error("Error saving assessment:", error);
      alert("Failed to save assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalSections = assessmentQuestions.length;
  const currentSectionData = assessmentQuestions[currentSection];
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100">
      {/* Royal Header with Back Button */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white shadow-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between">
            {/* Back to Home Button */}
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-800/50 hover:bg-purple-700 transition-all group"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span className="hidden sm:inline text-sm font-medium">Back to Home</span>
              <span className="sm:hidden text-sm font-medium">Home</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold">Self-Mastery Index™</h1>
              <p className="text-purple-200 text-xs md:text-sm hidden sm:block">
                Psychology · Astrology · Etymology
              </p>
            </div>
            
            {/* Empty div for balance */}
            <div className="w-16 md:w-24"></div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="sticky top-[72px] md:top-[88px] z-10 bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-medium text-purple-600">
              Section {currentSection + 1} of {totalSections}
            </span>
            <span className="text-xs md:text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Current Section Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-purple-100">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-4 md:px-8 py-4 md:py-6 border-b border-purple-100">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <span className="text-2xl md:text-3xl">
                {currentSectionData.lens === "Psychology" && "🧠"}
                {currentSectionData.lens === "Astrology" && "✨"}
                {currentSectionData.lens === "Etymology" && "📖"}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-purple-900">
                {currentSectionData.dimension}
              </h2>
            </div>
            <p className="text-purple-600 text-xs md:text-sm">
              {currentSectionData.lens} · {currentSectionData.path}
            </p>
            <p className="text-gray-600 mt-1 md:mt-2 text-xs md:text-sm">
              {currentSectionData.description}
            </p>
          </div>

          {/* Questions */}
          <div className="px-4 md:px-8 py-4 md:py-6 space-y-6 md:space-y-8">
            {currentSectionData.questions.map((question, idx) => (
              <div key={idx} className="group">
                <p className="text-gray-800 font-medium mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                  {idx + 1}. {question}
                </p>
                <div className="grid grid-cols-5 gap-1 md:gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleChange(question, score)}
                      className={`py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-200 text-xs md:text-sm ${
                        answers[question] === score
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
                          : "bg-gray-50 text-gray-700 hover:bg-purple-50 hover:border-purple-300 border border-gray-200"
                      }`}
                    >
                      {score}
                      <span className="hidden md:block text-xs mt-1 opacity-75">
                        {score === 1 && "Strongly Disagree"}
                        {score === 2 && "Disagree"}
                        {score === 3 && "Neutral"}
                        {score === 4 && "Agree"}
                        {score === 5 && "Strongly Agree"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-4 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row gap-3 justify-between border-t border-purple-100">
            <button
              onClick={() => setCurrentSection(prev => prev - 1)}
              disabled={currentSection === 0}
              className={`px-4 md:px-6 py-2 rounded-xl font-medium transition-all ${
                currentSection === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-purple-600 border border-purple-300 hover:bg-purple-50"
              }`}
            >
              ← Previous
            </button>
            
            {currentSection === totalSections - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 md:px-8 py-2 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Assessment →"}
              </button>
            ) : (
              <button
                onClick={() => setCurrentSection(prev => prev + 1)}
                className="px-6 md:px-8 py-2 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all"
              >
                Next Section →
              </button>
            )}
          </div>
        </div>

        {/* Progress Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8 flex-wrap">
          {assessmentQuestions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSection(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSection
                  ? "w-6 md:w-8 bg-purple-600"
                  : idx < currentSection
                  ? "w-2 bg-purple-400"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}