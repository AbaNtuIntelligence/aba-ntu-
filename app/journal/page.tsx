"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function JournalPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUser(user);
    await fetchEntries(user.id);
    setLoading(false);
  };

  const fetchEntries = async (userId: string) => {
    const { data } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    
    if (data) setEntries(data);
  };

  const saveEntry = async () => {
    if (!content.trim()) return;
    
    setSaving(true);
    const { error } = await supabase
      .from("journal_entries")
      .insert({
        user_id: user.id,
        content: content,
        created_at: new Date().toISOString(),
      });

    if (!error) {
      setContent("");
      await fetchEntries(user.id);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">Self-Mastery Journal</h1>
        <p className="text-gray-600 mb-8">Track your thoughts, reflections, and growth journey</p>

<div className="flex items-center justify-between mb-6">
  <Link 
    href="/dashboard"
    className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
  >
    <span className="text-xl">←</span>
    Back to Dashboard
  </Link>
</div>
        {/* New Entry */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your reflection here... How are you feeling today? What patterns are you noticing?"
            rows={6}
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
          <button
            onClick={saveEntry}
            disabled={saving || !content.trim()}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Entry"}
          </button>
        </div>

        {/* Past Entries */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Past Reflections</h2>
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              No journal entries yet. Start writing your first reflection above!
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
                <p className="text-sm text-gray-400 mt-3">
                  {new Date(entry.created_at).toLocaleDateString()} at{" "}
                  {new Date(entry.created_at).toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}