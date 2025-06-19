import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface TestSuite {
  id: string;
  name: string;
  passed: number;
  failed: number;
  totalTests: number;
  duration: number;
  createdAt: string;
  browser: string;
}

interface TestSuitesListProps {
  suites: TestSuite[];
}

const getBrowserIcon = (browser: string) => {
  const icons: Record<string, string> = {
    chrome: '🟢',
    firefox: '🟠', 
    safari: '🔵',
    edge: '🟣',
  };
  return icons[browser.toLowerCase()] || '🌐';
};

const getStatusColor = (passed: number, total: number) => {
  const rate = (passed / total) * 100;
  if (rate === 100) return 'text-green-600';
  if (rate >= 80) return 'text-yellow-600';
  return 'text-red-600';
};

export function TestSuitesList({ suites }: TestSuitesListProps) {
  const formatDuration = (ms: number) => {
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Recent Test Suites</h2>
        <p className="text-sm text-gray-600 mt-1">Latest test execution results</p>
      </div>
      
      <div className="divide-y">
        {suites.map((suite) => (
          <div key={suite.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getBrowserIcon(suite.browser)}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{suite.name}</h3>
                    <p className="text-sm text-gray-500">{formatDate(suite.createdAt)}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700">{suite.passed}</span>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700">{suite.failed}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {suite.totalTests} total tests
                  </p>
                </div>
                
                <div className="text-right">
                  <p className={`text-sm font-medium ${getStatusColor(suite.passed, suite.totalTests)}`}>
                    {((suite.passed / suite.totalTests) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDuration(suite.duration)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}