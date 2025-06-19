'use client';

import { useState } from 'react';
import { Play, Zap, AlertTriangle, TrendingUp, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';

interface DemoControlsProps {
  onRunScenario: (scenario: string) => void;
  isRunning: boolean;
}

export function DemoControls({ onRunScenario, isRunning }: DemoControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scenarios = [
    {
      id: 'success-run',
      name: 'Success Run',
      icon: <Play className="h-4 w-4" />,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'critical-failure',
      name: 'Critical Failure',
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      id: 'performance-issue',
      name: 'Performance Issue',
      icon: <Zap className="h-4 w-4" />,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      id: 'recovery',
      name: 'System Recovery',
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'continuous-testing',
      name: 'Continuous',
      icon: <RefreshCw className="h-4 w-4" />,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-gray-600 text-white">
        {/* Header - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium text-sm">🎬 Demo Controls</span>
          </div>
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>

        {/* Expandable content */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-2">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => onRunScenario(scenario.id)}
                disabled={isRunning}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-white text-sm font-medium transition-colors ${
                  isRunning ? 'bg-gray-600 cursor-not-allowed' : scenario.color
                }`}
              >
                {isRunning ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  scenario.icon
                )}
                {scenario.name}
              </button>
            ))}
            <div className="text-xs text-gray-400 pt-2 border-t border-gray-600">
              Live Data Simulation
            </div>
          </div>
        )}
      </div>
    </div>
  );
}