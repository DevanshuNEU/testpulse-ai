# TestPulse AI 🚀

**AI-Powered Test Intelligence Dashboard for Modern QA Teams**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

> Built for **Stably AI Internship Application** - Transforming Playwright test results into actionable insights with AI-powered analysis.

## 🎯 Overview

TestPulse AI revolutionizes how QA teams analyze and understand their test results. Built specifically for Playwright test suites, it provides intelligent failure analysis, performance insights, and predictive analytics to help teams ship faster with confidence.

### ✨ Key Features

- 🧠 **AI-Powered Failure Analysis** - Automatically group and summarize test failures
- 📊 **Performance Insights** - Track test duration trends and identify bottlenecks  
- 🔍 **Flakiness Detection** - Predict and prevent unreliable tests
- ⚡ **Real-time Dashboard** - Live updates and collaborative debugging
- 🚨 **Smart Alerts** - Get notified about critical test suite health issues

## 📸 Dashboard Screenshots

### Live Analytics Dashboard
The main dashboard provides real-time insights into your test suite performance:

- **📊 Key Metrics**: Total tests, success rates, average duration, last run time
- **🏃‍♂️ Recent Test Suites**: Latest test executions with detailed breakdowns
- **🌐 Browser Tracking**: Multi-browser test result monitoring
- **⚡ Real-time Updates**: Auto-refresh every 30 seconds for live monitoring
- **🎨 Professional UI**: Clean, responsive design with intuitive data visualization

*Currently running at: `http://localhost:3000` (Frontend) | `http://localhost:8080` (Backend)*

## 🏗 Architecture

### Full-Stack TypeScript Architecture
```
testpulse-ai/
├── frontend/          # Next.js 14 React application
├── backend/           # Node.js Express API server
├── shared/            # Shared TypeScript types
└── docker/            # Docker configuration
```

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **AI/ML**: OpenAI GPT integration ready
- **DevOps**: Docker, Professional CI/CD ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- Docker (optional, for PostgreSQL)

### Installation

```bash
# Clone the repository
git clone https://github.com/DevanshuNEU/testpulse-ai.git
cd testpulse-ai

# Install all dependencies
npm run install:all

# Set up database (SQLite for development)
cd backend
npm run db:generate
npm run db:migrate
npm run db:seed

# Start development servers
npm run dev
```

### Accessing the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/health

## 📊 API Endpoints

### Core Endpoints
- `GET /health` - Backend health and status
- `GET /api/test-suites` - Paginated test suite listing
- `GET /api/test-suites/:id` - Detailed test suite with results
- `GET /api/analytics/dashboard` - Dashboard summary statistics

### Response Format
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "pagination": {  // For paginated endpoints
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🗄️ Database Schema

### Core Models
- **TestSuite**: Test run containers with metadata
- **TestResult**: Individual test execution details  
- **FailurePattern**: AI-analyzed failure groupings

### Development Setup (SQLite)
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### Production Setup (PostgreSQL)
```bash
# Start PostgreSQL with Docker
docker run --name testpulse-postgres \
  -e POSTGRES_USER=testpulse \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=testpulse_dev \
  -p 5432:5432 \
  -d postgres:15-alpine

# Update DATABASE_URL in .env
DATABASE_URL="postgresql://testpulse:password123@localhost:5432/testpulse_dev"
```

## 🎨 Features Implemented

### ✅ Phase 1: Foundation
- [x] Full-stack TypeScript architecture
- [x] Professional monorepo structure
- [x] Database schema and migrations
- [x] RESTful API with comprehensive endpoints
- [x] Real-time frontend-backend integration

### ✅ Phase 2: Core Features  
- [x] SQLite development database
- [x] PostgreSQL production readiness
- [x] Professional API client with error handling
- [x] Real-time backend status monitoring
- [x] Comprehensive test data seeding

### ✅ Phase 3: Dashboard Analytics
- [x] Live dashboard with real-time test data display
- [x] Professional stat cards showing key metrics
- [x] Recent test suites list with detailed breakdowns
- [x] Responsive design with loading states
- [x] Browser-specific test execution tracking
- [x] Real-time data fetching with 30-second auto-refresh

### 🔄 Phase 4: Advanced Analytics (In Progress)
- [ ] Interactive charts and visualizations
- [ ] Advanced filtering and search
- [ ] Performance trend analysis
- [ ] Test result export functionality

### 📋 Phase 5: AI Integration (Planned)
- [ ] OpenAI-powered failure analysis
- [ ] Intelligent test pattern recognition
- [ ] Predictive failure detection
- [ ] Smart recommendations engine

## 🛠 Development Commands

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend

# Building
npm run build            # Build both applications
npm run build:frontend   # Build frontend only
npm run build:backend    # Build backend only

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations  
npm run db:seed          # Seed database with sample data

# Quality Assurance
npm run lint             # Lint all code
npm run test             # Run all tests
```

## 🎯 Stably AI Integration

### Direct Relevance
- **QA Testing Focus**: Addresses core Stably AI business challenges
- **Playwright Integration**: Perfect technology stack alignment
- **AI-Powered Analysis**: Demonstrates AI/ML integration capabilities
- **Professional Quality**: Production-ready development standards

### Skills Demonstrated
- **Full-Stack Development**: React, Node.js, TypeScript, databases
- **Modern Architecture**: Clean code, scalable design patterns  
- **Problem-Solving**: Real-time debugging and issue resolution
- **AI Integration**: OpenAI ready for intelligent test analysis
- **Professional Workflow**: Git, documentation, testing practices

## 📈 Performance & Scalability

### Current Capabilities
- **Database**: Handles thousands of test results efficiently
- **API**: Optimized queries with selective field loading
- **Frontend**: Real-time updates with intelligent polling
- **Error Handling**: Comprehensive logging and user feedback

### Production Ready Features
- **Docker Support**: Containerized deployment ready
- **Environment Configuration**: Flexible for different deployments
- **Database Migrations**: Version-controlled schema changes
- **Professional Logging**: Comprehensive monitoring support

## 🤝 Contributing

This project follows professional development standards:

- **Conventional Commits**: Clear, descriptive commit messages
- **TypeScript**: End-to-end type safety
- **ESLint + Prettier**: Code quality and formatting
- **Professional Documentation**: Comprehensive guides and comments

## 📄 License

MIT License - Built for educational and demonstration purposes.

## 🚀 Deployment

### Development
```bash
npm run dev  # Starts both frontend (3000) and backend (8080)
```

### Production
```bash
npm run build  # Build optimized bundles
npm start      # Start production servers
```

### Docker (Coming Soon)
```bash
docker-compose up  # Full stack with PostgreSQL
```

---

## 📞 Contact

**Devanshu Chicholikar**  
🎓 Northeastern University Student  
📍 Boston, MA  
🔗 [GitHub](https://github.com/DevanshuNEU) | [LinkedIn](https://linkedin.com/in/devanshu-chicholikar)

---

**Built with ❤️ for Stably AI Internship Application**

*Demonstrating full-stack development expertise with modern web technologies and AI integration capabilities.*
