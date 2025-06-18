import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get dashboard analytics
router.get('/dashboard', async (req, res) => {
  try {
    // Get counts and basic stats
    const totalTests = await prisma.testResult.count();
    const totalSuites = await prisma.testSuite.count();
    
    const recentResults = await prisma.testResult.findMany({
      take: 1000,
      orderBy: { createdAt: 'desc' },
      select: { status: true, duration: true, createdAt: true },
    });

    const passed = recentResults.filter(r => r.status === 'PASSED').length;
    const failed = recentResults.filter(r => r.status === 'FAILED').length;
    const successRate = totalTests > 0 ? (passed / totalTests) * 100 : 0;
    
    const avgDuration = recentResults.length > 0 
      ? recentResults.reduce((sum, r) => sum + r.duration, 0) / recentResults.length
      : 0;

    // Get recent test suites
    const recentSuites = await prisma.testSuite.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        passed: true,
        failed: true,
        totalTests: true,
        duration: true,
        createdAt: true,
        browser: true,
      },
    });

    res.json({
      success: true,
      data: {
        summary: {
          totalTests,
          totalSuites,
          successRate: Math.round(successRate * 100) / 100,
          averageDuration: Math.round(avgDuration),
          lastRunTime: recentSuites[0]?.createdAt || null,
        },
        recentSuites,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data',
    });
  }
});

export default router;
