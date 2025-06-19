'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { TestSuitesList } from '@/components/dashboard/test-suites-list';
import { ChartsSection } from '@/components/dashboard/charts-section';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/ui/error-boundary';

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

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const result = await apiClient.getDashboardData();
        
        if (result.success && result.data) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError('Network error loading dashboard');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2">Dashboard Error</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Data Available</h2>
          <p className="text-gray-600">Please ensure your backend is running and database is seeded.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Real-time insights and analytics for your Playwright test suites
          </p>
        </div>

        {/* Stats Overview */}
        <DashboardStats stats={data.summary} />

        {/* Charts Section */}
        <ChartsSection recentSuites={data.recentSuites} />

        {/* Recent Test Suites */}
        <TestSuitesList suites={data.recentSuites} />
      </div>
    </ErrorBoundary>
  );
}
