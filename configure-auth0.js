#!/usr/bin/env node

/**
 * Auth0 Application Configuration Script
 * This script configures your Auth0 application for OAuth
 */

import https from 'https';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const AUTH0_DOMAIN = 'dev-ifn3ugjt57otm5sy.us.auth0.com';
const CLIENT_ID = '2pqWILG5wJcfqJVIB20YHmRItjuDBPxt';
const CLIENT_SECRET = 'zCCgMRsE1dn78_4QJ4Ig07PQVSsRhGCAxWf7N6NtkGsUGufLuFW0KwCryLQtKVvC';

// Configuration for your Auth0 application
const APP_CONFIG = {
  name: 'Cinely Streaming Platform',
  type: 'spa',
  callbacks: [
    'http://localhost:8080',
    'https://cinely.vercel.app'
  ],
  logout_urls: [
    'http://localhost:8080',
    'https://cinely.vercel.app'
  ],
  web_origins: [
    'http://localhost:8080',
    'https://cinely.vercel.app'
  ],
  allowed_origins: [
    'http://localhost:8080',
    'https://cinely.vercel.app'
  ],
  grant_types: [
    'authorization_code',
    'refresh_token',
    'implicit'
  ],
  token_endpoint_auth_method: 'none',
  sso: false,
  cross_origin_auth: false,
  refresh_token: {
    rotation_type: 'rotating',
    expiration_type: 'expiring',
    leeway: 0,
    token_lifetime: 2592000,
    infinite_token_lifetime: false,
    infinite_idle_token_lifetime: false,
    idle_token_lifetime: 1296000
  }
};

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function getManagementToken() {
  console.log('🔑 Getting Auth0 Management API token...');
  
  const options = {
    hostname: AUTH0_DOMAIN,
    port: 443,
    path: '/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    audience: `https://${AUTH0_DOMAIN}/api/v2/`,
    grant_type: 'client_credentials'
  };

  try {
    const response = await makeRequest(options, data);
    if (response.status === 200) {
      return response.data.access_token;
    } else {
      throw new Error(`Failed to get token: ${response.status} - ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    console.error('❌ Error getting management token:', error.message);
    return null;
  }
}

async function updateApplication(token) {
  console.log('⚙️ Updating Auth0 application configuration...');
  
  const options = {
    hostname: AUTH0_DOMAIN,
    port: 443,
    path: `/api/v2/clients/${CLIENT_ID}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await makeRequest(options, APP_CONFIG);
    if (response.status === 200) {
      console.log('✅ Application configuration updated successfully!');
      return true;
    } else {
      console.error('❌ Failed to update application:', response.status, response.data);
      return false;
    }
  } catch (error) {
    console.error('❌ Error updating application:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Auth0 OAuth Configuration via CLI\n');
  
  console.log('📋 Current Configuration:');
  console.log(`Domain: ${AUTH0_DOMAIN}`);
  console.log(`Client ID: ${CLIENT_ID}`);
  console.log(`Client Secret: ${CLIENT_SECRET.substring(0, 10)}...\n`);

  console.log('🔧 Attempting to configure application automatically...\n');

  // Try to get management token and update application
  const token = await getManagementToken();
  
  if (token) {
    const success = await updateApplication(token);
    
    if (success) {
      console.log('\n🎉 OAuth configuration completed successfully!');
      console.log('\n✅ Your Auth0 application is now configured with:');
      console.log('   • Callback URLs: http://localhost:8080, https://cinely.vercel.app');
      console.log('   • Logout URLs: http://localhost:8080, https://cinely.vercel.app');
      console.log('   • Web Origins: http://localhost:8080, https://cinely.vercel.app');
      console.log('   • Grant Types: Authorization Code, Refresh Token, Implicit');
      
      console.log('\n🧪 Ready to test:');
      console.log('   1. Start your dev server: npm run dev');
      console.log('   2. Open: http://localhost:8080');
      console.log('   3. Click profile icon to test OAuth login');
    } else {
      console.log('\n⚠️ Automatic configuration failed. Please configure manually:');
      showManualInstructions();
    }
  } else {
    console.log('\n⚠️ Could not authenticate with Auth0 Management API.');
    console.log('This might be due to insufficient permissions or incorrect credentials.');
    console.log('\nPlease configure manually:');
    showManualInstructions();
  }

  rl.close();
}

function showManualInstructions() {
  console.log('\n📝 Manual Configuration Steps:');
  console.log('1. Go to: https://manage.auth0.com');
  console.log('2. Navigate to: Applications → Your App → Settings');
  console.log('3. Configure the following URLs:\n');
  
  console.log('Allowed Callback URLs:');
  console.log('   http://localhost:8080');
  console.log('   https://cinely.vercel.app\n');
  
  console.log('Allowed Logout URLs:');
  console.log('   http://localhost:8080');
  console.log('   https://cinely.vercel.app\n');
  
  console.log('Allowed Web Origins:');
  console.log('   http://localhost:8080');
  console.log('   https://cinely.vercel.app\n');
  
  console.log('4. Go to: Advanced Settings → Grant Types');
  console.log('5. Enable: Authorization Code, Refresh Token, Implicit');
  console.log('6. Save changes');
}

// Run the script
main().catch(console.error);
