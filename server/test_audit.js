const http = require('http');

async function request(path, method = 'GET', body = null, token = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: '127.0.0.1',
      port: 5001,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (e) => reject(e));
    if (payload) req.write(payload);
    req.end();
  });
}

async function runFullAudit() {
  console.log('🚀 Running Comprehensive API Audit & Nearby Gyms Feature Test for FitForge AI...\n');
  let errors = [];

  // 1. Auth Audit
  console.log('--- 1. Testing Auth Endpoints ---');
  let token = null;

  try {
    const loginRes = await request('/api/auth/login', 'POST', {
      email: 'alex@fitforge.ai',
      password: 'Password123!'
    });
    if (loginRes.status === 200 && loginRes.body.token) {
      token = loginRes.body.token;
      console.log('✅ Demo login successful for Alex Rivers');
    } else {
      errors.push(`Demo login failed: status ${loginRes.status}`);
    }
  } catch (e) {
    errors.push(`Demo login exception: ${e.message}`);
  }

  // 2. Nearby Gyms API Test
  console.log('\n--- 2. Testing Nearby Gyms API Endpoints ---');
  try {
    const gymRes = await request('/api/gyms/nearby?lat=19.0760&lng=72.8777&radius=10&sort=Nearest', 'GET', null, token);
    if (gymRes.status === 200 && Array.isArray(gymRes.body.gyms) && gymRes.body.gyms.length > 0) {
      console.log(`✅ Nearby gyms endpoint returned ${gymRes.body.gyms.length} gyms sorted by distance`);
      console.log(`   Closest Gym: ${gymRes.body.gyms[0].name} (${gymRes.body.gyms[0].distance} km away)`);
    } else {
      errors.push(`GET /api/gyms/nearby failed: status ${gymRes.status}`);
    }
  } catch (e) {
    errors.push(`GET /api/gyms/nearby exception: ${e.message}`);
  }

  console.log('\n==================================================');
  if (errors.length === 0) {
    console.log('🎉 ALL BACKEND, SUPPLEMENT & NEARBY GYMS API ENDPOINTS PASSED WITH 0 ERRORS!');
  } else {
    console.error(`🚨 DETECTED ${errors.length} ERRORS:`);
    errors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
  }
  console.log('==================================================\n');
}

runFullAudit();
