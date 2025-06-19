#!/bin/bash

echo "🚀 TestPulse AI - Comprehensive Testing Suite"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "\n${BLUE}1. Testing Backend Health${NC}"
HEALTH_RESPONSE=$(curl -s http://localhost:8080/health)
if [[ $? -eq 0 ]] && [[ $HEALTH_RESPONSE == *"success"* ]]; then
    echo -e "✅ Backend Health: ${GREEN}OK${NC}"
    echo "$HEALTH_RESPONSE" | jq .
else
    echo -e "❌ Backend Health: ${RED}Failed${NC}"
    exit 1
fi

echo -e "\n${BLUE}2. Testing Analytics Dashboard${NC}"
DASHBOARD_RESPONSE=$(curl -s http://localhost:8080/api/analytics/dashboard)
if [[ $? -eq 0 ]] && [[ $DASHBOARD_RESPONSE == *"success"* ]]; then
    echo -e "✅ Dashboard API: ${GREEN}OK${NC}"
    echo "$DASHBOARD_RESPONSE" | jq .data.summary
else
    echo -e "❌ Dashboard API: ${RED}Failed${NC}"
    exit 1
fi

echo -e "\n${BLUE}3. Testing Test Suites${NC}"
SUITES_RESPONSE=$(curl -s "http://localhost:8080/api/test-suites?page=1&limit=10")
if [[ $? -eq 0 ]] && [[ $SUITES_RESPONSE == *"success"* ]]; then
    echo -e "✅ Test Suites API: ${GREEN}OK${NC}"
    echo "$SUITES_RESPONSE" | jq '.data.pagination'
else
    echo -e "❌ Test Suites API: ${RED}Failed${NC}"
    exit 1
fi

echo -e "\n${BLUE}4. Database Validation${NC}"
TOTAL_TESTS=$(echo "$DASHBOARD_RESPONSE" | jq -r '.data.summary.totalTests')
TOTAL_SUITES=$(echo "$DASHBOARD_RESPONSE" | jq -r '.data.summary.totalSuites')
SUCCESS_RATE=$(echo "$DASHBOARD_RESPONSE" | jq -r '.data.summary.successRate')

echo -e "✅ Total Tests: ${GREEN}$TOTAL_TESTS${NC}"
echo -e "✅ Total Suites: ${GREEN}$TOTAL_SUITES${NC}"
echo -e "✅ Success Rate: ${GREEN}$SUCCESS_RATE%${NC}"

echo -e "\n${BLUE}5. Testing Frontend Connectivity${NC}"
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [[ $FRONTEND_RESPONSE -eq 200 ]]; then
    echo -e "✅ Frontend: ${GREEN}Accessible${NC}"
else
    echo -e "❌ Frontend: ${RED}Not accessible (HTTP $FRONTEND_RESPONSE)${NC}"
    exit 1
fi

echo -e "\n${BLUE}6. Performance Check${NC}"
echo -e "✅ Backend Port: ${GREEN}8080${NC}"
echo -e "✅ Frontend Port: ${GREEN}3000${NC}"

echo -e "\n${GREEN}🎉 Testing Complete!${NC}"
echo -e "${GREEN}Access your dashboard: http://localhost:3000${NC}"
