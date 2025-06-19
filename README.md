# TestPulse AI

**AI-Powered Test Intelligence Dashboard for Modern QA Teams**

> Professional test analytics platform designed for Playwright test suites with intelligent failure analysis and performance insights.

## Overview

TestPulse AI transforms test execution results into actionable insights through comprehensive analytics and AI-powered analysis. Built specifically for modern QA teams using Playwright, it provides real-time monitoring, failure pattern detection, and performance optimization recommendations.

### Key Features

- **Real-time Analytics Dashboard** - Live monitoring of test execution metrics
- **Intelligent Failure Analysis** - Automated grouping and categorization of test failures  
- **Performance Insights** - Duration trends and bottleneck identification
- **Cross-browser Testing Support** - Multi-browser test result tracking
- **Professional UI/UX** - Clean, responsive interface with intuitive navigation

## Technical Architecture

### Full-Stack TypeScript Implementation
```
testpulse-ai/
├── frontend/          # Next.js 14 React application
├── backend/           # Node.js Express API server  
├── shared/            # Shared TypeScript type definitions
└── test-suite.sh      # Comprehensive testing script
```

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM
- **Database**: SQLite (development) / PostgreSQL (production)
- **Infrastructure**: Professional CI/CD ready with Docker support

## Quick Start

### Prerequisites
- Node.js 18+
- npm 8+

### Installation & Setup

```bash
# Clone repository
git clone https://github.com/DevanshuNEU/testpulse-ai.git
cd testpulse-ai

# Install dependencies for all packages
npm run install:all

# Set up database
cd backend
npm run db:generate
npm run db:migrate
npm run db:seed

# Start development servers
cd ..
npm run dev
```

### Access Points
- **Frontend Dashboard**: http://localhost:3001
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/api

## Testing Framework

### Comprehensive Test Suite
Run the complete testing framework to validate all components:

```bash
./test-suite.sh
```

This automated test suite validates:
- Backend API health and connectivity
- Database integrity and data consistency
- Frontend accessibility and responsiveness
- Cross-origin resource sharing (CORS) configuration
- Performance metrics and response times

### Manual Testing Procedures

#### Backend API Testing
```bash
# Health check
curl http://localhost:8080/health

# Analytics dashboard data
curl http://localhost:8080/api/analytics/dashboard | jq

# Test suites listing
curl http://localhost:8080/api/test-suites | jq
```

#### Database Validation
```bash
# Verify seeded data
cd backend
npm run db:seed

# Check database contents
sqlite3 dev.db "SELECT COUNT(*) FROM test_suites;"
sqlite3 dev.db "SELECT COUNT(*) FROM test_results;"
```

#### Frontend Integration Testing
1. Open browser developer tools
2. Navigate to http://localhost:3001
3. Verify network requests show successful API calls
4. Confirm dashboard displays live test data
5. Test real-time data refresh functionality

## API Documentation

### Core Endpoints

#### Health Check
```
GET /health
```
Returns service status and configuration information.

#### Analytics Dashboard
```
GET /api/analytics/dashboard
```
Returns comprehensive test analytics including success rates, performance metrics, and recent test suite results.

#### Test Suites
```
GET /api/test-suites
GET /api/test-suites/:id
```
Paginated test suite listings with detailed individual test results.

### Response Format
All API endpoints return consistent JSON responses:
```json
{
  "success": boolean,
  "data": object,
  "pagination": object  // For paginated endpoints
}
```

## Database Schema

### Core Models
- **TestSuite**: Container for test execution runs with aggregated metrics
- **TestResult**: Individual test execution details with status and timing
- **FailurePattern**: AI-analyzed failure groupings for pattern recognition

### Development Database (SQLite)
Includes realistic seeded data:
- 10 test suites with company-themed names
- 676+ individual test results across multiple browsers
- 5 failure patterns with AI-generated analysis
- Cross-browser coverage (Chrome, Firefox, Safari, Edge)

## Development Workflow

### Available Commands
```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Frontend only (Next.js)  
npm run dev:backend      # Backend only (Express)

# Database Operations  
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:seed          # Populate with sample data

# Quality Assurance
npm run lint             # Code linting
npm run test             # Run test suites
npm run build            # Production builds
```

### Testing Protocol
After each significant change:
1. Run `./test-suite.sh` to validate all components
2. Check frontend at http://localhost:3001
3. Verify API responses at http://localhost:8080/api
4. Confirm database integrity with manual queries
5. Test cross-browser compatibility

## Performance Metrics

### Current Capabilities
- **Database**: Handles 676+ test results efficiently
- **API Response Times**: Sub-100ms for analytics endpoints  
- **Frontend Loading**: Real-time updates with 30-second refresh intervals
- **Concurrent Users**: Designed for team-based usage patterns

### Scalability Considerations
- Optimized database queries with selective field loading
- Professional error handling and logging
- CORS configuration for multiple frontend origins
- Efficient pagination for large datasets

## Production Deployment

### Environment Configuration
```bash
# Backend (.env)
DATABASE_URL="file:./dev.db"  # SQLite for development
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3001

# Production PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### Docker Support
```bash
# Build containers
docker-compose build

# Start services  
docker-compose up -d

# Production deployment
docker-compose -f docker-compose.prod.yml up
```

## Quality Assurance

### Code Standards
- End-to-end TypeScript implementation
- ESLint and Prettier configuration
- Comprehensive error handling
- Professional logging and monitoring
- Git conventional commits

### Testing Coverage
- Automated backend API validation
- Frontend integration testing  
- Database consistency checks
- Cross-browser compatibility verification
- Performance benchmarking

## Contributing

This project follows professional development standards with clear documentation, comprehensive testing, and maintainable architecture. All contributions should include corresponding test coverage and documentation updates.

## License

MIT License - Built for educational and professional demonstration purposes.

---

**Built by Devanshu Chicholikar**  
Northeastern University Computer Science Student  
Boston, Massachusetts
