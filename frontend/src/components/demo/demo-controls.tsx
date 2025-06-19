'use client';

import { useState } from 'react';
import { Play, Zap, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';

interface DemoControlsProps {
  onRunScenario: (scenario: string) => void;
  isRunning: boolean;
}

export function DemoControls({ onRunScenario, isRunning }: DemoControlsProps) {
  const scenarios = [
    {
      id: 'success-run',
      name: 'Successful Test Run',
      description: 'Simulate a test suite with high success rate',
      icon: <Play className="h-4 w-4" />,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'critical-failure',
      name: 'Critical Failure',
      description: 'Simulate major test failures and alerts',
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      id: 'performance-issue',
      name: 'Performance Degradation',
      description: 'Show slow test execution times',
      icon: <Zap className="h-4 w-4" />,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      id: 'recovery',
      name: 'System Recovery',
      description: 'Show improvement after fixes',
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'continuous-testing',
      name: 'Continuous Testing',
      description: 'Simulate ongoing test execution',
      icon: <RefreshCw className="h-4 w-4" />,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-lg border p-4 min-w-[300px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">🎬 Demo Controls</h3>
          <div className="text-xs text-gray-500">For Presentation</div>
        </div>
        
        <div className="space-y-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onRunScenario(scenario.id)}
              disabled={isRunning}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-white text-sm font-medium transition-colors ${
                isRunning ? 'bg-gray-400 cursor-not-allowed' : scenario.color
              }`}
            >
              {isRunning ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                scenario.icon
              )}
              <div className="text-left">
                <div className="font-medium">{scenario.name}</div>
                <div className="text-xs opacity-90">{scenario.description}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Demo Mode Active - Live Data Simulation
          </div>
        </div>
      </div>
    </div>
  );
}