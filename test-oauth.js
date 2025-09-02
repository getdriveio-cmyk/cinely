#!/usr/bin/env node

/**
 * OAuth Setup Test Script
 * This script tests your OAuth configuration
 */

import https from 'https';

const AUTH0_DOMAIN = 'dev-ifn3ugjt57otm5sy.us.auth0.com';
const CLIENT_ID = '2pqWILG5wJcfqJVIB20YHmRItjuDBPxt';

console.log('🧪 Testing OAuth Configuration\n');

// Test 1: Check if Auth0 domain is accessible
console.log('1. Testing Auth0 domain accessibility...');
const options = {
  hostname: AUTH0_DOMAIN,
  port: 443,
  path: '/.well-known/openid_configuration',
  method: 'GET'
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('   ✅ Auth0 domain is accessible');
      
      try {
        const config = JSON.parse(data);
        console.log(`   ✅ OpenID Configuration found`);
        console.log(`   ✅ Authorization endpoint: ${config.authorization_endpoint}`);
        console.log(`   ✅ Token endpoint: ${config.token_endpoint}`);
      } catch (e) {
        console.log('   ⚠️ Could not parse OpenID configuration');
      }
    } else {
      console.log(`   ❌ Auth0 domain returned status: ${res.statusCode}`);
    }
    
    // Test 2: Check environment variables
    console.log('\n2. Testing environment variables...');
    const envVars = {
      'VITE_AUTH0_DOMAIN': process.env.VITE_AUTH0_DOMAIN,
      'VITE_AUTH0_CLIENT_ID': process.env.VITE_AUTH0_CLIENT_ID,
      'VITE_AUTH0_CLIENT_SECRET': process.env.VITE_AUTH0_CLIENT_SECRET
    };
    
    let envOk = true;
    for (const [key, value] of Object.entries(envVars)) {
      if (value) {
        console.log(`   ✅ ${key} is set`);
      } else {
        console.log(`   ❌ ${key} is not set`);
        envOk = false;
      }
    }
    
    // Test 3: Generate test URLs
    console.log('\n3. OAuth URLs for testing:');
    const redirectUri = 'http://localhost:8080';
    const scope = 'openid profile email';
    const responseType = 'code';
    
    const authUrl = `https://${AUTH0_DOMAIN}/authorize?` +
      `response_type=${responseType}&` +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}`;
    
    console.log(`   Authorization URL: ${authUrl}`);
    
    // Summary
    console.log('\n📋 Summary:');
    if (res.statusCode === 200 && envOk) {
      console.log('   ✅ OAuth configuration looks good!');
      console.log('\n🚀 Next steps:');
      console.log('   1. Configure URLs in Auth0 Dashboard (see auth0-setup-guide.md)');
      console.log('   2. Start your dev server: npm run dev');
      console.log('   3. Test the OAuth flow by clicking the profile icon');
    } else {
      console.log('   ⚠️ Some issues found. Please check the errors above.');
    }
  });
});

req.on('error', (error) => {
  console.log(`   ❌ Error connecting to Auth0: ${error.message}`);
  console.log('\n📋 Summary:');
  console.log('   ❌ Cannot connect to Auth0. Please check your domain configuration.');
});

req.end();
