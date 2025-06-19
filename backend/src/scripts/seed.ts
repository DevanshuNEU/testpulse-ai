import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  await prisma.testResult.deleteMany();
  await prisma.testSuite.deleteMany();
  await prisma.failurePattern.deleteMany();

  // Create test suites with results
  for (let i = 0; i < 10; i++) {
    const totalTests = faker.number.int({ min: 20, max: 100 });
    const passed = faker.number.int({ min: Math.floor(totalTests * 0.6), max: totalTests });
    const failed = faker.number.int({ min: 0, max: totalTests - passed });
    const skipped = faker.number.int({ min: 0, max: totalTests - passed - failed });
    const flaky = totalTests - passed - failed - skipped;

    const startTime = faker.date.recent({ days: 30 });
    const duration = faker.number.int({ min: 60000, max: 600000 }); // 1-10 minutes
    const endTime = new Date(startTime.getTime() + duration);

    const testSuite = await prisma.testSuite.create({
      data: {
        name: `${faker.company.name()} E2E Tests`,
        startTime,
        endTime,
        totalTests,
        passed,
        failed,
        skipped,
        flaky,
        duration,
        browser: faker.helpers.arrayElement(['chrome', 'firefox', 'safari', 'edge']),
        environment: faker.helpers.arrayElement(['development', 'staging', 'production']),
        commit: faker.git.commitSha(),
        branch: faker.helpers.arrayElement(['main', 'develop', 'feature/auth', 'bugfix/login']),
      },
    });

    // Create individual test results for this suite
    const testFiles = ['login.spec.ts', 'dashboard.spec.ts', 'checkout.spec.ts', 'profile.spec.ts', 'navigation.spec.ts'];
    
    for (let j = 0; j < totalTests; j++) {
      const testStartTime = new Date(startTime.getTime() + (j * 1000));
      const testDuration = faker.number.int({ min: 500, max: 30000 });
      
      let status = 'PASSED';
      if (j < failed) status = 'FAILED';
      else if (j < failed + skipped) status = 'SKIPPED';
      else if (j < failed + skipped + flaky) status = 'FLAKY';
      
      await prisma.testResult.create({
        data: {
          testName: `${faker.hacker.noun()} ${faker.hacker.verb()} test`,
          testFile: faker.helpers.arrayElement(testFiles),
          status,
          duration: testDuration,
          startTime: testStartTime,
          endTime: new Date(testStartTime.getTime() + testDuration),
          error: status === 'FAILED' ? faker.lorem.sentence() : null,
          browser: testSuite.browser,
          projectName: 'E2E Tests',
          tags: JSON.stringify(['e2e', 'automated']),
          testSuiteId: testSuite.id,
        },
      });
    }

    console.log(`✅ Created test suite: ${testSuite.name} with ${totalTests} test results`);
  }
  // Create some failure patterns
  const failurePatterns = [
    'Element not found: login button',
    'Timeout waiting for page load',
    'Network request failed: 500 Internal Server Error',
    'Database connection timeout',
    'Authentication token expired',
  ];

  for (const pattern of failurePatterns) {
    await prisma.failurePattern.create({
      data: {
        pattern,
        count: faker.number.int({ min: 5, max: 25 }),
        severity: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
        aiSummary: `This error typically occurs when ${pattern.toLowerCase()}. Common causes include network issues or element state changes.`,
        suggestedFix: `Consider adding explicit waits or improving error handling for: ${pattern}`,
        testNames: JSON.stringify(faker.helpers.arrayElements([
          'login.spec.ts',
          'dashboard.spec.ts', 
          'checkout.spec.ts',
          'profile.spec.ts',
        ], faker.number.int({ min: 1, max: 3 }))),
      },
    });
  }

  console.log('🎉 Database seeded successfully!');
  
  const stats = await prisma.testSuite.count();
  console.log(`📊 Created ${stats} test suites with sample data`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
