"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import DashboardLayout from "@/app/components/ui/DashboardLayout";
import { Upload, Trash2, User } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({
    full_name: "",
    birth_date: "",
    birth_location: "",
    primary_goal: "",
    language_patterns: "",
    avatar_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUser(user);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile({
        full_name: data.full_name || "",
        birth_date: data.birth_date || "",
        birth_location: data.birth_location || "",
        primary_goal: data.primary_goal || "",
        language_patterns: data.language_patterns || "",
        avatar_url: data.avatar_url || "",
      });
      setAvatarPreview(data.avatar_url || "");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file' });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image must be less than 2MB' });
      return;
    }

    setUploading(true);
    setMessage(null);

    const publicUrl = await uploadAvatar(file);
    if (publicUrl) {
      // Update profile in database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) {
        setMessage({ type: 'error', text: 'Failed to save avatar URL' });
      } else {
        setProfile({ ...profile, avatar_url: publicUrl });
        setAvatarPreview(publicUrl);
        setMessage({ type: 'success', text: 'Avatar updated successfully' });
        router.refresh(); // forces navbar/sidebar to re‑fetch
      }
    } else {
      setMessage({ type: 'error', text: 'Failed to upload avatar' });
    }
    setUploading(false);
  };

  const handleDeleteAvatar = async () => {
    if (!profile.avatar_url) return;

    setUploading(true);
    setMessage(null);

    const urlParts = profile.avatar_url.split('/');
    const fileName = urlParts[urlParts.length - 1];

    // Delete from storage (ignore error if file missing)
    await supabase.storage.from('avatars').remove([fileName]);

    // Remove avatar_url from profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", user.id);

    if (updateError) {
      setMessage({ type: 'error', text: 'Failed to remove avatar' });
    } else {
      setProfile({ ...profile, avatar_url: "" });
      setAvatarPreview("");
      setMessage({ type: 'success', text: 'Avatar removed successfully' });
      router.refresh();
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        birth_date: profile.birth_date,
        birth_location: profile.birth_location,
        primary_goal: profile.primary_goal,
        language_patterns: profile.language_patterns,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    }
    setSaving(false);
    setTimeout(() => setMessage(null), 3000);
  };

  if (!user) {
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

        {message && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Avatar Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-purple-200"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-purple-500" />
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-center">
                {uploading ? "Uploading..." : "Upload New Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              {profile.avatar_url && (
                <button
                  onClick={handleDeleteAvatar}
                  disabled={uploading}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">JPEG, PNG, GIF. Max 2MB.</p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={profile.full_name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
              <input
                type="date"
                name="birth_date"
                value={profile.birth_date}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth Location</label>
              <input
                type="text"
                name="birth_location"
                value={profile.birth_location}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Goal</label>
              <select
                name="primary_goal"
                value={profile.primary_goal}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select your primary goal...</option>
                <option>Master my emotions & behavior</option>
                <option>Understand my life purpose</option>
                <option>Improve my relationships</option>
                <option>Break limiting patterns</option>
                <option>Align with my true self</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language Patterns</label>
              <textarea
                name="language_patterns"
                value={profile.language_patterns}
                onChange={handleChange}
                rows={3}
                placeholder="Example: I notice I say 'I cannot' often..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg disabled:opacity-50 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}