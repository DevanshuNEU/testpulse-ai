# TestPulse AI - Testing Guide

## 🧪 Complete Testing Scenarios

### **Scenario 1: API Health & Data Flow**
```bash
# Test backend health
curl http://localhost:8080/health

# Test dashboard analytics
curl http://localhost:8080/api/analytics/dashboard | jq

# Test test suites endpoint
curl http://localhost:8080/api/test-suites | jq

# Expected: All should return JSON with success: true
```

### **Scenario 2: Database Verification**
```bash
cd backend
sqlite3 dev.db "SELECT COUNT(*) FROM test_suites;"
sqlite3 dev.db "SELECT COUNT(*) FROM test_results;"
sqlite3 dev.db "SELECT status, COUNT(*) FROM test_results GROUP BY status;"

# Expected: 10 test suites, 600+ test results, mixed status distribution
```

### **Scenario 3: Frontend Integration**
1. Open http://localhost:3001
2. Verify "Backend Connected" status (green)
3. Check for real data in stat cards
4. Verify test suites list shows recent executions
5. Confirm no console errors in DevTools

### **Scenario 4: Real-world Data Simulation**
```bash
# Add new test suite data
cd backend
npm run db:seed  # Re-seed with fresh data

# Verify dashboard updates
curl http://localhost:8080/api/analytics/dashboard | jq '.data.summary'
```

### **Scenario 5: Error Handling**
```bash
# Stop backend
pkill -f "tsx watch"

# Check frontend shows "Backend offline" status
# Restart backend and verify reconnection
```

## 🎯 **Key Test Metrics**

### **Performance Benchmarks**
- API response time: < 200ms
- Frontend load time: < 2s
- Database queries: < 100ms
- Memory usage: < 100MB

### **Data Integrity**
- Total tests should match sum of passed/failed/skipped/flaky
- Success rate calculation should be accurate
- Recent suites should be ordered by createdAt DESC

### **User Experience**
- No loading spinners > 3 seconds  
- Clean error messages (no raw JSON)
- Responsive design works on mobile
- Auto-refresh doesn't break UI state
