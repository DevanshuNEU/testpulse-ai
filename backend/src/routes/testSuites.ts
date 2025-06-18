import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const router = Router();

// Get all test suites with pagination
router.get('/test-suites', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const testSuites = await prisma.testSuite.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        startTime: true,
        endTime: true,
        totalTests: true,
        passed: true,
        failed: true,
        skipped: true,
        flaky: true,
        duration: true,
        browser: true,
        environment: true,
        commit: true,
        branch: true,
        createdAt: true,
      },
    });

    const total = await prisma.testSuite.count();

    res.json({
      success: true,
      data: {
        testSuites,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching test suites:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch test suites',
    });
  }
});
// Get test suite by ID with results
router.get('/test-suites/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const testSuite = await prisma.testSuite.findUnique({
      where: { id },
      include: {
        testResults: {
          orderBy: { startTime: 'desc' },
        },
      },
    });

    if (!testSuite) {
      return res.status(404).json({
        success: false,
        error: 'Test suite not found',
      });
    }

    res.json({
      success: true,
      data: testSuite,
    });
  } catch (error) {
    console.error('Error fetching test suite:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch test suite',
    });
  }
});

export default router;
