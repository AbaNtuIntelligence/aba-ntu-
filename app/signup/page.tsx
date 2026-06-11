"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { getZodiacSign } from "@/lib/astrology";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
    primaryGoal: "",
    languagePatterns: "",
  });

  const goals = [
    "Master my emotions & behavior",
    "Understand my life purpose", 
    "Improve my relationships",
    "Break limiting patterns",
    "Align with my true self",
    "Transform my reality through language"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// After getting zodiac sign, also capture:
const sign = getZodiacSign(formData.birthDate);
if (sign) {
  await supabase
    .from("profiles")
    .update({
      zodiac_element: sign.element,
      zodiac_quality: sign.quality,
      zodiac_ruling: sign.ruling,
      zodiac_strengths: sign.strengths,
      zodiac_weaknesses: sign.weaknesses,
    })
    .eq("id", authData.user.id);
}

  const handleSignup = async () => {
    if (!formData.email || !formData.password) {
      setError("Email and password required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        let zodiacSign = null;
        let zodiacSymbol = null;
        
        if (formData.birthDate) {
          const sign = getZodiacSign(formData.birthDate);
          if (sign) {
            zodiacSign = sign.name;
            zodiacSymbol = sign.symbol;
          }
        }

        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            id: authData.user.id,
            email: formData.email,
            full_name: formData.fullName || null,
            birth_date: formData.birthDate || null,
            birth_time: formData.birthTime || null,
            birth_location: formData.birthLocation || null,
            zodiac_sign: zodiacSign,
            zodiac_symbol: zodiacSymbol,
            primary_goal: formData.primaryGoal || null,
            language_patterns: formData.languagePatterns || null,
            assessment_results: {},
            assessment_score: 0,
            archetype: "The Seeker",
            journey_stage: "beginner",
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id'
          });

        if (profileError) {
          console.error("Profile error:", profileError);
          setError("Failed to create profile: " + profileError.message);
          setLoading(false);
          return;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          setError("Account created! Please login.");
          router.push("/login");
        } else {
          router.push("/");
          router.refresh();
        }
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-900">Create Account</h2>
            <p className="text-gray-600">Start your self-mastery journey</p>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-900">Astrological Data</h2>
            <p className="text-gray-600">✨ Help us understand your cosmic blueprint</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth Time (optional)</label>
              <input
                type="time"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth Location</label>
              <input
                type="text"
                name="birthLocation"
                placeholder="City, Country"
                value={formData.birthLocation}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-900">Your Path</h2>
            <p className="text-gray-600">🎯 What's your primary goal?</p>
            <select
              name="primaryGoal"
              value={formData.primaryGoal}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select your primary goal...</option>
              {goals.map(goal => (
                <option key={goal} value={goal}>{goal}</option>
              ))}
            </select>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language Patterns</label>
              <textarea
                name="languagePatterns"
                placeholder="Example: I notice I say 'I cannot' often, or I want to understand word origins"
                value={formData.languagePatterns}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {renderStep()}
        
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSignup}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Complete Signup"}
            </button>
          )}
        </div>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-purple-600">Login</a>
        </p>
      </div>
    </div>
  );
}