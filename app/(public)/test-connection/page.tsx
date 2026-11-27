"use client";

import React, { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { Database, CheckCircle2, XCircle, AlertCircle, RefreshCw, ArrowLeft, ArrowUpRight, Copy, Check, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function SupabaseTestPage() {
  const [loading, setLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    step: string;
    message: string;
    details?: string;
    urlConfigured: boolean;
    anonKeyConfigured: boolean;
    rawResponse?: any;
  } | null>(null);

  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const envAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const isConfigured = isSupabaseConfigured;

  const runConnectionCheck = async () => {
    setLoading(true);
    setTestResult(null);

    // Give a short visual transition delay for a native feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!isConfigured) {
      setTestResult({
        success: false,
        step: "Configuration Verification",
        message: "Environment variables are missing or set to placeholders.",
        details: "Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set correctly in your `.env.local` file inside the root directory. Currently, the site is using fallback local storage mock databases.",
        urlConfigured: !!envUrl && envUrl !== "https://your-project-id.supabase.co" && !envUrl.includes("your-project-id"),
        anonKeyConfigured: !!envAnonKey && envAnonKey !== "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here" && !envAnonKey.includes("your-anon-key-here"),
      });
      setLoading(false);
      return;
    }

    try {
      // 1. Perform client handshake on a dummy table.
      // A 404 relation error is expected, indicating the server handled the request successfully
      const { data, error } = await supabase.from("_supabase_connection_test_").select("*").limit(1);

      // Check if error is specifically missing table relational errors, which confirms communication with PostgreSQL
      const isPostgrestError = error && (
        error.code === 'PGRST116' || 
        error.code === '42P01' || 
        error.code === 'PGRST205' ||
        error.message?.includes('relation') ||
        error.message?.includes('does not exist') ||
        error.message?.includes('schema cache')
      );
      const isSuccess = !error || isPostgrestError;

      setTestResult({
        success: !!isSuccess,
        step: "Supabase Client Verification",
        message: isSuccess 
          ? "Supabase connected successfully" 
          : "Connected to API, but database query failed.",
        details: isSuccess
          ? "The website successfully performed a handshake with the Supabase PostgREST API. The database returned a table-not-found error, which is the expected behavior since no custom tables have been created yet. The connection is working correctly."
          : `API handshake reached the PostgREST server but returned a client error: [Code: ${error?.code || 'empty'}] ${error?.message || 'unknown'}`,
        urlConfigured: true,
        anonKeyConfigured: true,
        rawResponse: error ? { code: error.code, message: error.message, details: error.details } : { status: "Success", data }
      });
    } catch (e: any) {
      console.error(e);
      setTestResult({
        success: false,
        step: "Network/DNS Check",
        message: "Failed to establish a connection to the Supabase endpoint.",
        details: `Error: ${e.message || e}. This error usually occurs when the Supabase URL is invalid, offline, or your system is experiencing connection issues.`,
        urlConfigured: true,
        anonKeyConfigured: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runConnectionCheck();
  }, []);

  const copyToClipboard = (text: string, type: 'url' | 'key') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <div className="leaf-pattern min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cream text-dark-text">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/50 shadow-xl overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-dark-green text-cream px-8 py-10 relative overflow-hidden leaf-pattern-dark">
            <div className="absolute right-0 top-0 w-32 h-32 bg-lime-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center space-x-4 relative z-10">
              <div className="bg-lime-accent/10 p-3 rounded-2xl border border-lime-accent/30 text-lime-accent">
                <Database className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold tracking-tight">Supabase Connection Test</h1>
                <p className="text-sm text-light-sage mt-1 font-sans">
                  Diagnostic dashboard for connecting 12 Star Jam School to Supabase
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Status Section */}
            <div>
              <h2 className="text-lg font-serif font-semibold text-deep-forest mb-4 border-b border-light-sage/40 pb-2">
                Connection Status
              </h2>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                  <RefreshCw className="w-10 h-10 text-fresh-green animate-spin mb-4" />
                  <p className="text-sm font-medium text-slate-500">Checking connection details...</p>
                </div>
              ) : testResult ? (
                <div className={`p-6 rounded-2xl border ${
                  testResult.success 
                    ? "bg-emerald-50/50 border-emerald-100 text-emerald-900" 
                    : "bg-amber-50/50 border-amber-100 text-amber-900"
                }`}>
                  <div className="flex items-start space-x-4">
                    {testResult.success ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-serif font-semibold text-base leading-none">
                        {testResult.message}
                      </h3>
                      <p className="text-sm text-slate-650 font-semibold tracking-wide uppercase">
                        Current Step: {testResult.step}
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {testResult.details}
                      </p>

                      {testResult.rawResponse && (
                        <div className="mt-4 pt-4 border-t border-slate-200/40">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                            Raw Server Response:
                          </p>
                          <pre className="text-xs bg-slate-900/5 text-slate-800 p-3 rounded-lg overflow-x-auto font-mono max-h-40">
                            {JSON.stringify(testResult.rawResponse, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                  <AlertCircle className="w-10 h-10 text-amber-500 mb-4" />
                  <p className="text-sm font-medium text-slate-600">Diagnostics ready</p>
                </div>
              )}
            </div>

            {/* Environment Overview */}
            <div>
              <h2 className="text-lg font-serif font-semibold text-deep-forest mb-4 border-b border-light-sage/40 pb-2">
                Environment Variables configuration
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Supabase URL variable */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 rounded-md text-slate-700 inline-block">
                      NEXT_PUBLIC_SUPABASE_URL
                    </span>
                    <p className="text-xs text-slate-400">
                      The REST API endpoint for your Supabase project. Found in Settings &gt; API.
                    </p>
                    <div className="font-mono text-xs text-slate-600 break-all pt-1">
                      Value: <span className="font-semibold text-dark-green">{envUrl ? `${envUrl.slice(0, 30)}...` : "(Empty)"}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 self-start md:self-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      testResult?.urlConfigured ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    }`}>
                      {testResult?.urlConfigured ? "Configured" : "Missing / Default"}
                    </span>
                    <button
                      onClick={() => copyToClipboard("NEXT_PUBLIC_SUPABASE_URL", 'url')}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition text-slate-500 hover:text-slate-700"
                      title="Copy variable name"
                    >
                      {copiedUrl ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Supabase Anon Key variable */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 rounded-md text-slate-700 inline-block">
                      NEXT_PUBLIC_SUPABASE_ANON_KEY
                    </span>
                    <p className="text-xs text-slate-400">
                      The public browser api-key. Found in Settings &gt; API. Do NOT use Service-role key.
                    </p>
                    <div className="font-mono text-xs text-slate-600 break-all pt-1">
                      Value: <span className="font-semibold text-dark-green">{envAnonKey ? `${envAnonKey.slice(0, 16)}...` : "(Empty)"}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 self-start md:self-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      testResult?.anonKeyConfigured ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    }`}>
                      {testResult?.anonKeyConfigured ? "Configured" : "Missing / Default"}
                    </span>
                    <button
                      onClick={() => copyToClipboard("NEXT_PUBLIC_SUPABASE_ANON_KEY", 'key')}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition text-slate-500 hover:text-slate-700"
                      title="Copy variable name"
                    >
                      {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction Panel */}
            <div className="space-y-4">
              <h2 className="text-lg font-serif font-semibold text-deep-forest border-b border-light-sage/40 pb-2 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-gold" />
                Connection Guide
              </h2>
              <div className="bg-warm-cream/50 rounded-2xl p-5 border border-slate-200/50 text-sm space-y-4">
                <p className="leading-relaxed">
                  To complete the connection, update the values inside the configuration file:
                </p>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-1 relative">
                  <div className="absolute right-2 top-2 text-slate-500 text-[10px] uppercase font-bold">.env.local</div>
                  <p className="text-slate-400"># Set your actual Supabase credentials below:</p>
                  <p>NEXT_PUBLIC_SUPABASE_URL=<span className="text-lime-accent">https://your-project.supabase.co</span></p>
                  <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=<span className="text-lime-accent">eyJhbGciOiJIUzI1Ni...</span></p>
                </div>
                <div className="space-y-2.5">
                  <p className="font-semibold text-deep-forest text-xs uppercase tracking-wide">Steps to retrieve keys:</p>
                  <ul className="list-decimal pl-5 space-y-1.5 text-slate-700">
                    <li>Log in to your <strong>Supabase Dashboard</strong>.</li>
                    <li>Select your school project.</li>
                    <li>Navigate to <strong>Project Settings</strong> (gear icon bottom left) &gt; <strong>API</strong>.</li>
                    <li>Copy the <strong>Project URL</strong> and paste it as <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code>.</li>
                    <li>Copy the <strong>anon public api key</strong> (found in Project API keys block) and paste it as <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.</li>
                    <li>Save the changes, stop the local development server, and restart it using <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">npm run dev</code> for the variables to load.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Test Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={runConnectionCheck}
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-dark-green text-cream rounded-xl text-sm font-semibold shadow-md hover:bg-deep-forest transition-colors duration-200 disabled:opacity-50 shimmer-gold cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Test Connection Again
              </button>

              <div className="text-xs text-slate-400 text-center sm:text-right">
                Client initialization file: <span className="font-mono">lib/supabaseClient.ts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
