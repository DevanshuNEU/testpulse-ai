// Analytics Types
export interface TestAnalytics {
  totalTests: number;
  successRate: number;
  averageDuration: number;
  flakiness: number;
  trendsOverTime: TimeSeriesData[];
  topFailures: FailurePattern[];
  performanceInsights: PerformanceInsight[];
}

export interface TimeSeriesData {
  timestamp: Date;
  passed: number;
  failed: number;
  duration: number;
  successRate: number;
}

export interface FailurePattern {
  id: string;
  pattern: string;
  count: number;
  tests: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  aiSummary?: string;
  suggestedFix?: string;
}

export interface PerformanceInsight {
  type: 'slow_test' | 'timeout' | 'memory_leak' | 'network_issue';
  testName: string;
  description: string;
  impact: number;
  recommendation: string;
}
