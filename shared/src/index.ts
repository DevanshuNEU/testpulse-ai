// Re-export all types
export * from './types/test';
export * from './types/analytics';
export * from './types/api';

// Utility functions
export const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'passed': return 'green';
    case 'failed': return 'red';
    case 'skipped': return 'yellow';
    case 'flaky': return 'orange';
    default: return 'gray';
  }
};
