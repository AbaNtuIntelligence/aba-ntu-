"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { getZodiacSign } from "@/lib/astrology";
import { Upload, X } from "lucide-react";
import Image from "next/image";

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
    avatarFile: null as File | null,
    avatarPreview: "",
  });

  const goals = [
    "Master my emotions & behavior",
    "Understand my life purpose", 
    "Improve my relationships",
    "Break limiting patterns",
    "Align with my true self",
    "Transform my reality through language"
  ];

  // Handle all text/select inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Image must be less than 2MB");
        return;
      }
      setFormData({
        ...formData,
        avatarFile: file,
        avatarPreview: URL.createObjectURL(file),
      });
      setError("");
    }
  };

  // Upload avatar to Supabase Storage and return public URL
  const uploadAvatar = async (userId: string): Promise<string | null> => {
    if (!formData.avatarFile) return null;
    
    const fileExt = formData.avatarFile.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = fileName;
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, formData.avatarFile, { upsert: true });
    
    if (uploadError) {
      console.error("Avatar upload error:", uploadError);
      return null;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
    
    return publicUrl;
  };

  const handleSignup = async () => {
    if (!formData.email || !formData.password) {
      setError("Email and password required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Calculate zodiac sign
        let zodiacSign = null;
        let zodiacSymbol = null;
        
        if (formData.birthDate) {
          const sign = getZodiacSign(formData.birthDate);
          if (sign) {
            zodiacSign = sign.name;
            zodiacSymbol = sign.symbol;
          }
        }

        // 3. Upload avatar
        let avatarUrl = null;
        if (formData.avatarFile) {
          avatarUrl = await uploadAvatar(authData.user.id);
        }

        // 4. Create/update profile
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
            avatar_url: avatarUrl,
            assessment_results: {},
            assessment_score: 0,
            archetype: "The Seeker",
            journey_stage: "beginner",
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id'
          });

        if (profileError) throw profileError;

        // 5. Auto-login
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
                placeholder="Example: I notice I say 'I cannot' often..."
                value={formData.languagePatterns}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-900">Profile Photo</h2>
            <p className="text-gray-600">Upload a photo to personalize your profile (optional)</p>
            <div className="flex flex-col items-center gap-4">
              {formData.avatarPreview ? (
                <div className="relative">
                  <Image
                    src={formData.avatarPreview}
                    alt="Avatar preview"
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-purple-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.avatarPreview) URL.revokeObjectURL(formData.avatarPreview);
                      setFormData({ ...formData, avatarFile: null, avatarPreview: "" });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-2 p-6 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 transition w-full">
                  <Upload className="w-8 h-8 text-purple-500" />
                  <span className="text-sm text-gray-600">Click to upload (max 2MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
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
          {step < 4 ? (
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