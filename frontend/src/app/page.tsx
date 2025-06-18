import { Activity, BarChart3, Brain, CheckCircle, AlertTriangle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-12 w-12 text-indigo-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">TestPulse AI</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Intelligent test analytics dashboard that transforms your Playwright test results 
          into actionable insights with AI-powered analysis
        </p>
      </header>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Backend API</h3>
              <p className="text-green-600">Ready & Running</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
