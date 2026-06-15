"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import DashboardLayout from "@/app/components/ui/DashboardLayout";
import { Check, Crown, Sparkles, Star, Zap, Infinity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MembershipPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      const { data } = await supabase
        .from("profiles")
        .select("membership_tier, email")
        .eq("id", user.id)
        .single();
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [router]);

  const currentTier = profile?.membership_tier || "free";

  const plans = [
    {
      id: "free",
      name: "Seeker",
      price: "R0",
      period: "forever",
      icon: Star,
      gradient: "from-gray-500 to-gray-600",
      features: [
        "Self-Mastery Assessment",
        "Basic Dashboard",
        "Weekly Insights",
        "Journaling Tools",
        "Community Access",
      ],
      notIncluded: ["Full Course Access", "Personalized Coaching", "Birth Chart Reading", "Priority Support"],
      cta: "Current Plan",
    },
    {
      id: "monthly",
      name: "Practitioner",
      price: "R29",
      period: "per month",
      icon: Sparkles,
      gradient: "from-purple-600 to-indigo-600",
      popular: true,
      features: [
        "Everything in Seeker",
        "All 6 Courses",
        "Monthly Group Coaching",
        "Birth Chart Report",
        "Language Pattern Analysis",
        "Priority Support",
        "Downloadable Resources",
      ],
      cta: "Upgrade to Practitioner",
    },
    {
      id: "yearly",
      name: "Master",
      price: "R249",
      period: "per year",
      icon: Crown,
      gradient: "from-amber-500 to-orange-500",
      features: [
        "Everything in Practitioner",
        "1-on-1 Monthly Coaching",
        "Full Astrological Report",
        "Certification Program",
        "Private Community",
        "Early Access to New Content",
        "Save R99 vs monthly",
      ],
      savings: "Save R99",
      cta: "Upgrade to Master",
    },
  ];

  const handleUpgrade = (planId: string) => {
    // In production, integrate with Stripe or payment provider
    alert(`Upgrading to ${planId} plan... Payment integration coming soon!`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Membership Plans</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the path that aligns with your journey. Upgrade anytime.
          </p>
        </div>

        {/* Current Plan Badge */}
        {currentTier !== "free" && (
          <div className="mb-8 flex justify-center">
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Check className="w-4 h-4" />
              You are currently on the <strong>{plans.find(p => p.id === currentTier)?.name}</strong> plan
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isCurrent = currentTier === plan.id;
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  plan.popular ? "ring-2 ring-purple-500 shadow-2xl" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-bl-2xl text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Card Header */}
                <div className={`bg-gradient-to-r ${plan.gradient} p-6 text-white`}>
                  <Icon className="w-12 h-12 mb-3 opacity-90" />
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

                {/* Features */}
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">○</div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isCurrent}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      isCurrent
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isCurrent ? "Current Plan" : plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Highlight */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">✨ All Plans Include</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: "Psychology Insights", desc: "Deep behavioral analysis" },
              { icon: Star, title: "Astrology Reports", desc: "Personalized cosmic guidance" },
              { icon: Infinity, title: "Etymology Tools", desc: "Language pattern analysis" },
              { icon: Zap, title: "Community Access", desc: "Connect with fellow seekers" },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <benefit.icon className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                <p className="text-sm text-gray-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ / Contact */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Questions about membership?{" "}
            <Link href="/contact" className="text-purple-600 hover:underline">
              Contact support
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Cancel anytime. All plans include a 14‑day money‑back guarantee.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}