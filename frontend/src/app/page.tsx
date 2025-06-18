'use client';

import { useEffect, useState } from 'react';
import { Activity, BarChart3, Brain, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { apiClient } from '@/lib/api';

interface ApiStatus {
  status: 'loading' | 'connected' | 'error';
  message: string;
}

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({ 
    status: 'loading', 
    message: 'Checking connection...' 
  });

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const result = await apiClient.healthCheck();
        if (result.success) {
          setApiStatus({ 
            status: 'connected', 
            message: 'Backend Connected' 
          });
        } else {
          setApiStatus({ 
            status: 'error', 
            message: result.error || 'Connection failed' 
          });
        }
      } catch (error) {
        setApiStatus({ 
          status: 'error', 
          message: 'Backend offline' 
        });
      }
    };

    checkApiConnection();
    const interval = setInterval(checkApiConnection, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (apiStatus.status) {
      case 'loading':
        return <Clock className="h-8 w-8 text-yellow-500 animate-spin" />;
      case 'connected':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (apiStatus.status) {
      case 'loading':
        return 'border-yellow-500';
      case 'connected':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
    }
  };

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
        <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getStatusColor()}`}>
          <div className="flex items-center">
            {getStatusIcon()}
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">Backend API</h3>
              <p className={`font-medium ${
                apiStatus.status === 'connected' ? 'text-green-600' : 
                apiStatus.status === 'loading' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {apiStatus.message}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Dashboard</h3>
              <p className="text-blue-600">Ready for Data</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-purple-500 mr-3" />  
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
              <p className="text-purple-600">Ready to Analyze</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Development Progress</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <span>Full-stack TypeScript foundation</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <span>Database schema and API endpoints</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <span>Frontend-backend integration</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-yellow-500 mr-3" />
            <span>Database setup and data seeding</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-yellow-500 mr-3" />
            <span>Dashboard UI components</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-yellow-500 mr-3" />
            <span>AI-powered analytics</span>
          </div>
        </div>
      </div>
    </div>
  )
}
