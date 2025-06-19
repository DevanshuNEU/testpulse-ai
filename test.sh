#!/bin/bash

# TestPulse AI - Automated Testing Script
echo "🧪 TestPulse AI - Running Complete Test Suite"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test results
PASSED=0
FAILED=0

# Function to run test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected="$3"
    
    echo -n "Testing: $test_name... "
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}PASS${NC}"
        ((PASSED++))
    else
        echo -e "${RED}FAIL${NC}"
        echo "  Command: $test_command"
        ((FAILED++))
    fi
}

# Test 1: Backend Health Check
run_test "Backend Health" "curl -s http://localhost:8080/health | jq -e '.success == true'"

# Test 2: Dashboard Analytics
run_test "Dashboard Analytics" "curl -s http://localhost:8080/api/analytics/dashboard | jq -e '.data.summary.totalTests > 0'"

# Test 3: Test Suites Endpoint
run_test "Test Suites API" "curl -s http://localhost:8080/api/test-suites | jq -e '.data.testSuites | length > 0'"

# Test 4: Database Connection
run_test "Database Connection" "sqlite3 backend/prisma/dev.db 'SELECT COUNT(*) FROM test_suites;' | grep -q '10'"

# Test 5: Frontend Response
run_test "Frontend Loading" "curl -s http://localhost:3001 | grep -q 'TestPulse AI'"

# Test 6: API Response Time
echo -n "Testing: API Response Time... "
response_time=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:8080/api/analytics/dashboard)
if (( $(echo "$response_time < 1.0" | bc -l) )); then
    echo -e "${GREEN}PASS${NC} (${response_time}s)"
    ((PASSED++))
else
    echo -e "${YELLOW}SLOW${NC} (${response_time}s)"
    ((FAILED++))
fi

# Summary
echo "============================================="
echo -e "Tests Passed: ${GREEN}$PASSED${NC}"
echo -e "Tests Failed: ${RED}$FAILED${NC}"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! TestPulse AI is ready for demo.${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Check the issues above.${NC}"
    exit 1
fi
