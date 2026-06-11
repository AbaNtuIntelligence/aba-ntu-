"use client";

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600">
      <div className="bg-white p-8 rounded-xl">
        <h1 className="text-2xl font-bold text-purple-900">TEST PAGE - VERSION 3.0</h1>
        <p className="mt-2 text-gray-600">If you can see this, cache is cleared!</p>
        <p className="text-sm text-gray-500 mt-4">Time: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}