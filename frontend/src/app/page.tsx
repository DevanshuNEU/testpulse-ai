'use client';

import { useEffect, useState } from 'react';
import { Activity, BarChart3, Brain, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { TestSuitesList } from '@/components/dashboard/test-suites-list';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ApiStatus {
  status: 'loading' | 'connected' | 'error';
  message: string;
}

interface DashboardData {
  summary: {
    totalTests: number;
    totalSuites: number;
    successRate: number;
    averageDuration: number;
    lastRunTime: string | null;
  };
  recentSuites: Array<{
    id: string;
    name: string;
    passed: number;
    failed: number;
    totalTests: number;
    duration: number;
    createdAt: string;
    browser: string;
  }>;
}

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({ 
    status: 'loading', 
    message: 'Checking connection...' 
  });
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const result = await apiClient.healthCheck();
        if (result.success) {
          setApiStatus({ 
            status: 'connected', 
            message: 'Backend Connected' 
          });
          // Fetch dashboard data when connected
          await fetchDashboardData();
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
        setDataLoading(false);
      }
    };

    const fetchDashboardData = async () => {
      try {
        setDataLoading(true);
        const result = await apiClient.getDashboardData();
        if (result.success && result.data) {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    checkApiConnection();
    const interval = setInterval(checkApiConnection, 300000); // Check every 5 minutes instead of 30s
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
    <div className="min-h-screen bg-gray-50">
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
                <p className="text-blue-600">
                  {apiStatus.status === 'connected' ? 'Live Data Ready' : 'Waiting for Connection'}
                </p>
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

        {/* Dashboard Content */}
        {apiStatus.status === 'connected' && (
          <>
            {dataLoading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" />
                <span className="ml-3 text-gray-600">Loading dashboard data...</span>
              </div>
            ) : dashboardData ? (
              <div className="space-y-8">
                {/* Stats */}
                <DashboardStats stats={dashboardData.summary} />
                
                {/* Recent Test Suites */}
                <TestSuitesList suites={dashboardData.recentSuites} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
                <p className="text-gray-600">Please ensure your database is seeded with test data.</p>
              </div>
            )}
          </>
        )}

        {/* Development Progress - only show when no data or error */}
        {(apiStatus.status === 'error' || !dashboardData) && (
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
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Dashboard UI components</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                <span>Interactive charts and visualizations</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                <span>AI-powered analytics</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}