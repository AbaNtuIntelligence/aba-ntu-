"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function MembershipPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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

  const currentTier = profile?.membership_tier || "free";

  const plans = [
    {
      id: "free",
      name: "Seeker",
      price: "$0",
      period: "forever",
      icon: "🌱",
      color: "from-gray-500 to-gray-600",
      features: [
        "Self-Mastery Assessment",
        "Basic Dashboard",
        "Weekly Insights",
        "Journaling Tools",
        "Community Access"
      ],
      notIncluded: [
        "Full Course Access",
        "Personalized Coaching",
        "Birth Chart Reading",
        "Priority Support"
      ]
    },
    {
      id: "monthly",
      name: "Practitioner",
      price: "$29",
      period: "per month",
      icon: "✨",
      color: "from-purple-600 to-indigo-600",
      popular: true,
      features: [
        "Everything in Seeker",
        "All 6 Courses",
        "Monthly Group Coaching",
        "Birth Chart Report",
        "Language Pattern Analysis",
        "Priority Support",
        "Downloadable Resources"
      ]
    },
    {
      id: "yearly",
      name: "Master",
      price: "$249",
      period: "per year",
      icon: "👑",
      color: "from-amber-500 to-orange-500",
      features: [
        "Everything in Practitioner",
        "1-on-1 Monthly Coaching",
        "Full Astrological Report",
        "Certification Program",
        "Private Community",
        "Early Access to New Content",
        "Save $99 vs monthly"
      ],
      savings: "Save $99"
    }
  ];

  const handleUpgrade = async (planId: string) => {
    setSelectedPlan(planId);
    // In production, integrate with Stripe or payment provider
    alert(`Upgrading to ${planId} plan... Payment integration coming soon!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Membership</h1>
              <p className="text-purple-200 mt-1">Choose the path that aligns with your journey</p>
            </div>
            <Link href="/dashboard" className="text-white hover:text-purple-200">← Back to Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Current Plan Banner */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-3xl">
                {plans.find(p => p.id === currentTier)?.icon || "🌱"}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Current Plan</h2>
                <p className="text-2xl font-bold text-purple-600">
                  {plans.find(p => p.id === currentTier)?.name || "Seeker"}
                </p>
              </div>
            </div>
            {currentTier === "free" && (
              <Link href="#plans" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Upgrade Now →
              </Link>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div id="plans" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-105 ${
                plan.popular ? 'ring-2 ring-purple-500 shadow-2xl' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-bl-2xl text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                <div className="text-5xl mb-3">{plan.icon}</div>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm opacity-90">/{plan.period}</span>
                </div>
                {plan.savings && (
                  <span className="inline-block mt-2 text-xs bg-white/20 rounded-full px-2 py-1">
                    {plan.savings}
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500 text-lg">✓</span> {feature}
                    </li>
                  ))}
                  {plan.notIncluded?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-gray-400 text-lg">○</span> {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={currentTier === plan.id}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    currentTier === plan.id
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {currentTier === plan.id ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-purple-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">✨ Membership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-semibold mb-1">Psychology Insights</h3>
              <p className="text-sm text-gray-500">Deep behavioral analysis</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-semibold mb-1">Astrology Reports</h3>
              <p className="text-sm text-gray-500">Personalized cosmic guidance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="font-semibold mb-1">Etymology Tools</h3>
              <p className="text-sm text-gray-500">Language pattern analysis</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-semibold mb-1">Community Access</h3>
              <p className="text-sm text-gray-500">Connect with fellow seekers</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            Questions about membership? <a href="/contact" className="text-purple-600 hover:underline">Contact us</a>
          </p>
          <p className="text-xs text-gray-400 mt-4">
            Cancel anytime. All plans include a 14-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}