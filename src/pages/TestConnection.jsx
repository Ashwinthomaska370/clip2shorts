import { useState } from 'react'
import { supabase, testSupabaseConnection, supabaseConfig } from '../lib/supabase.js'

function TestConnection() {
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const result = await testSupabaseConnection()
      setTestResult(result)
    } catch (error) {
      setTestResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testAuth = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        setTestResult({ success: false, error: error.message })
      } else {
        setTestResult({ success: true, message: 'Auth connection successful', data })
      }
    } catch (error) {
      setTestResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
        
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">Configuration</h2>
            <div className="space-y-2 text-sm">
              <p><strong>URL:</strong> {supabaseConfig.url}</p>
              <p><strong>API Key:</strong> {supabaseConfig.key}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">Test Connection</h2>
            <div className="space-y-4">
              <button
                onClick={testConnection}
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-2 font-semibold text-white shadow-glow transition hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Database Connection'}
              </button>
              
              <button
                onClick={testAuth}
                disabled={loading}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white hover:bg-white/10 transition disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Auth Connection'}
              </button>
            </div>
          </div>

          {testResult && (
            <div className={`rounded-2xl border p-6 backdrop-blur ${
              testResult.success 
                ? 'border-green-500/30 bg-green-500/20' 
                : 'border-red-500/30 bg-red-500/20'
            }`}>
              <h3 className="text-lg font-semibold mb-2">
                {testResult.success ? '✅ Test Passed' : '❌ Test Failed'}
              </h3>
              {testResult.message && (
                <p className="text-sm mb-2">{testResult.message}</p>
              )}
              {testResult.error && (
                <div className="text-sm">
                  <strong>Error:</strong> {testResult.error}
                </div>
              )}
              {testResult.data && (
                <div className="text-sm mt-2">
                  <strong>Data:</strong> <pre className="mt-1 p-2 bg-black/20 rounded text-xs overflow-auto">{JSON.stringify(testResult.data, null, 2)}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestConnection
