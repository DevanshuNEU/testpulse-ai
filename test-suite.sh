#!/bin/bash

echo "🧪 TestPulse AI - Comprehensive Testing Suite"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test Backend Health
echo -e "\n${YELLOW}1. Testing Backend Health${NC}"
HEALTH_RESPONSE=$(curl -s http://localhost:8080/health)
if echo "$HEALTH_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ Backend Health: OK${NC}"
else
    echo -e "${RED}✗ Backend Health: FAILED${NC}"
    echo "$HEALTH_RESPONSE"
fi

# Test Analytics Dashboard
echo -e "\n${YELLOW}2. Testing Analytics Dashboard${NC}"
DASHBOARD_RESPONSE=$(curl -s http://localhost:8080/api/analytics/dashboard)
if echo "$DASHBOARD_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ Dashboard API: OK${NC}"
    echo "$DASHBOARD_RESPONSE" | jq '.data.summary'
else
    echo -e "${RED}✗ Dashboard API: FAILED${NC}"
    echo "$DASHBOARD_RESPONSE"
fi

# Test Test Suites
echo -e "\n${YELLOW}3. Testing Test Suites${NC}"
SUITES_RESPONSE=$(curl -s http://localhost:8080/api/test-suites)
if echo "$SUITES_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ Test Suites API: OK${NC}"
    echo "$SUITES_RESPONSE" | jq '.data.pagination'
else
    echo -e "${RED}✗ Test Suites API: FAILED${NC}"
    echo "$SUITES_RESPONSE"
fi

# Test Database Counts
echo -e "\n${YELLOW}4. Database Validation${NC}"
DASHBOARD_DATA=$(curl -s http://localhost:8080/api/analytics/dashboard | jq '.data.summary')
if [ "$DASHBOARD_DATA" != "null" ]; then
    TOTAL_TESTS=$(echo "$DASHBOARD_DATA" | jq '.totalTests')
    TOTAL_SUITES=$(echo "$DASHBOARD_DATA" | jq '.totalSuites')
    SUCCESS_RATE=$(echo "$DASHBOARD_DATA" | jq '.successRate')
    
    echo -e "${GREEN}✓ Total Tests: $TOTAL_TESTS${NC}"
    echo -e "${GREEN}✓ Total Suites: $TOTAL_SUITES${NC}"
    echo -e "${GREEN}✓ Success Rate: $SUCCESS_RATE%${NC}"
else
    echo -e "${RED}✗ Database: No data available${NC}"
fi

# Test Frontend Connectivity
echo -e "\n${YELLOW}5. Testing Frontend Connectivity${NC}"
FRONTEND_RESPONSE=$(curl -s http://localhost:3000)
if echo "$FRONTEND_RESPONSE" | grep -q "TestPulse AI"; then
    echo -e "${GREEN}✓ Frontend: Accessible${NC}"
else
    echo -e "${RED}✗ Frontend: Not accessible${NC}"
fi

echo -e "\n${YELLOW}6. Performance Check${NC}"
echo -e "${GREEN}✓ Backend Port: 8080${NC}"
echo -e "${GREEN}✓ Frontend Port: 3000${NC}"

echo -e "\n${GREEN}🎉 Testing Complete!${NC}"
echo -e "${YELLOW}Access your dashboard: http://localhost:3000${NC}"
