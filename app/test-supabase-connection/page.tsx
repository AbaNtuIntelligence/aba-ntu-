"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestConnection() {
  const [result, setResult] = useState("Click to test");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult("Testing connection...");
    
    try {
      // Test 1: Check if we can reach Supabase
      setResult("Testing network connection...");
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setResult(`❌ Connection failed: ${error.message}`);
      } else {
        setResult(`✅ Supabase is reachable! Session: ${data.session ? "Active" : "None"}`);
      }
    } catch (err: any) {
      setResult(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <button 
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Testing..." : "Test Connection"}
      </button>
      <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
        {result}
      </pre>
    </div>
  );
}