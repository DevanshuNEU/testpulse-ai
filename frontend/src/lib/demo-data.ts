export interface TestSuite {
  id: string;
  name: string;
  passed: number;
  failed: number;
  totalTests: number;
  duration: number;
  createdAt: string;
  browser: string;
}

export interface DashboardStats {
  totalTests: number;
  totalSuites: number;
  successRate: number;
  averageDuration: number;
  lastRunTime: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

class DemoDataGenerator {
  private baseStats: DashboardStats = {
    totalTests: 698,
    totalSuites: 10,
    successRate: 77.5,
    averageDuration: 15575,
    lastRunTime: new Date().toISOString(),
  };

  private baseSuites: TestSuite[] = [
    {
      id: '1',
      name: 'E-commerce Checkout Flow',
      passed: 45,
      failed: 3,
      totalTests: 48,
      duration: 120000,
      createdAt: new Date().toISOString(),
      browser: 'chrome',
    },
    {
      id: '2', 
      name: 'User Authentication Suite',
      passed: 32,
      failed: 1,
      totalTests: 33,
      duration: 95000,
      createdAt: new Date(Date.now() - 300000).toISOString(),
      browser: 'firefox',
    },
  ];

  generateScenario(scenarioType: string) {
    switch (scenarioType) {
      case 'success-run':
        return this.generateSuccessScenario();
      case 'critical-failure':
        return this.generateFailureScenario();
      case 'performance-issue':
        return this.generatePerformanceScenario();
      case 'recovery':
        return this.generateRecoveryScenario();
      case 'continuous-testing':
        return this.generateContinuousScenario();
      default:
        return this.generateRandomScenario();
    }
  }

  private generateSuccessScenario() {
    const newSuite: TestSuite = {
      id: Date.now().toString(),
      name: `Payment Integration Tests`,
      passed: Math.floor(Math.random() * 20) + 25,
      failed: Math.floor(Math.random() * 2),
      totalTests: 0,
      duration: Math.floor(Math.random() * 30000) + 80000,
      createdAt: new Date().toISOString(),
      browser: ['chrome', 'firefox', 'safari'][Math.floor(Math.random() * 3)],
    };
    newSuite.totalTests = newSuite.passed + newSuite.failed;

    const notification: Notification = {
      id: Date.now().toString(),
      type: 'success',
      title: 'Test Suite Completed',
      message: `${newSuite.name} completed with ${((newSuite.passed / newSuite.totalTests) * 100).toFixed(1)}% success rate`,
      timestamp: new Date(),
    };

    return {
      stats: {
        ...this.baseStats,
        totalTests: this.baseStats.totalTests + newSuite.totalTests,
        successRate: Math.min(95, this.baseStats.successRate + Math.random() * 5),
        lastRunTime: new Date().toISOString(),
      },
      newSuite,
      notification,
    };
  }

  private generateFailureScenario() {
    const newSuite: TestSuite = {
      id: Date.now().toString(),
      name: `API Integration Tests`,
      passed: Math.floor(Math.random() * 10) + 5,
      failed: Math.floor(Math.random() * 15) + 10,
      totalTests: 0,
      duration: Math.floor(Math.random() * 60000) + 120000,
      createdAt: new Date().toISOString(),
      browser: ['chrome', 'firefox', 'safari'][Math.floor(Math.random() * 3)],
    };
    newSuite.totalTests = newSuite.passed + newSuite.failed;

    const notification: Notification = {
      id: Date.now().toString(),
      type: 'error',
      title: 'Critical Test Failures',
      message: `${newSuite.failed} tests failed in ${newSuite.name}. Immediate attention required!`,
      timestamp: new Date(),
    };

    return {
      stats: {
        ...this.baseStats,
        totalTests: this.baseStats.totalTests + newSuite.totalTests,
        successRate: Math.max(45, this.baseStats.successRate - Math.random() * 15),
        lastRunTime: new Date().toISOString(),
      },
      newSuite,
      notification,
    };
  }

  private generatePerformanceScenario() {
    const newSuite: TestSuite = {
      id: Date.now().toString(),
      name: `Performance Test Suite`,
      passed: Math.floor(Math.random() * 15) + 20,
      failed: Math.floor(Math.random() * 5) + 2,
      totalTests: 0,
      duration: Math.floor(Math.random() * 120000) + 180000, // Slower
      createdAt: new Date().toISOString(),
      browser: ['chrome', 'firefox', 'safari'][Math.floor(Math.random() * 3)],
    };
    newSuite.totalTests = newSuite.passed + newSuite.failed;

    const notification: Notification = {
      id: Date.now().toString(),
      type: 'warning',
      title: 'Performance Degradation Detected',
      message: `Tests taking longer than usual. Average duration increased by 45%`,
      timestamp: new Date(),
    };

    return {
      stats: {
        ...this.baseStats,
        totalTests: this.baseStats.totalTests + newSuite.totalTests,
        averageDuration: this.baseStats.averageDuration + Math.random() * 8000,
        lastRunTime: new Date().toISOString(),
      },
      newSuite,
      notification,
    };
  }

  private generateRecoveryScenario() {
    const newSuite: TestSuite = {
      id: Date.now().toString(),
      name: `Recovery Validation Tests`,
      passed: Math.floor(Math.random() * 10) + 28,
      failed: Math.floor(Math.random() * 2),
      totalTests: 0,
      duration: Math.floor(Math.random() * 20000) + 70000,
      createdAt: new Date().toISOString(),
      browser: ['chrome', 'firefox', 'safari'][Math.floor(Math.random() * 3)],
    };
    newSuite.totalTests = newSuite.passed + newSuite.failed;

    const notification: Notification = {
      id: Date.now().toString(),
      type: 'success',
      title: 'System Recovery Confirmed',
      message: `Performance back to normal. Success rate improved to ${((newSuite.passed / newSuite.totalTests) * 100).toFixed(1)}%`,
      timestamp: new Date(),
    };

    return {
      stats: {
        ...this.baseStats,
        totalTests: this.baseStats.totalTests + newSuite.totalTests,
        successRate: Math.min(92, this.baseStats.successRate + Math.random() * 8),
        averageDuration: Math.max(12000, this.baseStats.averageDuration - Math.random() * 4000),
        lastRunTime: new Date().toISOString(),
      },
      newSuite,
      notification,
    };
  }

  private generateContinuousScenario() {
    const scenarios = ['success-run', 'critical-failure', 'performance-issue'];
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    return this.generateScenario(randomScenario);
  }

  private generateRandomScenario() {
    return this.generateSuccessScenario();
  }
}

export const demoDataGenerator = new DemoDataGenerator();
