// Test Result Types
export interface TestResult {
  id: string;
  testName: string;
  testFile: string;
  status: 'passed' | 'failed' | 'skipped' | 'flaky';
  duration: number;
  startTime: Date;
  endTime: Date;
  error?: string;
  screenshot?: string;
  retry: number;
  browser: string;
  projectName: string;
  tags: string[];
}

// Test Suite Types  
export interface TestSuite {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  flaky: number;
  duration: number;
  browser: string;
  environment: string;
  commit: string;
  branch: string;
  results: TestResult[];
}
