// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard Types
export interface DashboardData {
  summary: TestSummary;
  recentRuns: TestSuite[];
  analytics: TestAnalytics;
  alerts: Alert[];
}

export interface TestSummary {
  totalTests: number;
  successRate: number;
  averageDuration: number;
  lastRunTime: Date;
  trend: 'up' | 'down' | 'stable';
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
