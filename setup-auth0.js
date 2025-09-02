#!/usr/bin/env node

/**
 * Auth0 Configuration Setup Script
 * This script helps configure your Auth0 application for OAuth
 */

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const AUTH0_DOMAIN = 'dev-ifn3ugjt57otm5sy.us.auth0.com';
const CLIENT_ID = '2pqWILG5wJcfqJVIB20YHmRItjuDBPxt';
const CLIENT_SECRET = 'zCCgMRsE1dn78_4QJ4Ig07PQVSsRhGCAxWf7N6NtkGsUGufLuFW0KwCryLQtKVvC';

console.log('🔐 Auth0 OAuth Configuration Setup\n');

console.log('📋 Configuration Summary:');
console.log(`Domain: ${AUTH0_DOMAIN}`);
console.log(`Client ID: ${CLIENT_ID}`);
console.log(`Client Secret: ${CLIENT_SECRET.substring(0, 10)}...`);

console.log('\n🌐 Required Auth0 Dashboard Configuration:');
console.log('1. Go to: https://manage.auth0.com');
console.log('2. Navigate to: Applications → Your App → Settings');
console.log('3. Configure the following URLs:\n');

console.log('📝 Allowed Callback URLs:');
console.log('   http://localhost:8080');
console.log('   https://cinely.vercel.app');

console.log('\n📝 Allowed Logout URLs:');
console.log('   http://localhost:8080');
console.log('   https://cinely.vercel.app');

console.log('\n📝 Allowed Web Origins:');
console.log('   http://localhost:8080');
console.log('   https://cinely.vercel.app');

console.log('\n📝 Allowed Origins (CORS):');
console.log('   http://localhost:8080');
console.log('   https://cinely.vercel.app');

console.log('\n⚙️ Advanced Settings:');
console.log('1. Go to: Advanced Settings → Grant Types');
console.log('2. Enable these grant types:');
console.log('   ✅ Authorization Code');
console.log('   ✅ Refresh Token');
console.log('   ✅ Implicit');

console.log('\n🔧 Environment Variables (already set in .env):');
console.log('   VITE_AUTH0_DOMAIN=dev-ifn3ugjt57otm5sy.us.auth0.com');
console.log('   VITE_AUTH0_CLIENT_ID=2pqWILG5wJcfqJVIB20YHmRItjuDBPxt');
console.log('   VITE_AUTH0_CLIENT_SECRET=zCCgMRsE1dn78_4QJ4Ig07PQVSsRhGCAxWf7N6NtkGsUGufLuFW0KwCryLQtKVvC');

console.log('\n✅ Next Steps:');
console.log('1. Configure the URLs in Auth0 Dashboard (see above)');
console.log('2. Start your development server: npm run dev');
console.log('3. Open: http://localhost:8080');
console.log('4. Click the profile icon to test OAuth login');

console.log('\n🧪 Testing Checklist:');
console.log('□ Auth0 Dashboard URLs configured');
console.log('□ Development server running');
console.log('□ Can access http://localhost:8080');
console.log('□ Profile icon redirects to Auth0 login');
console.log('□ Can sign in with Auth0');
console.log('□ Redirects back to app after login');
console.log('□ Can access /dashboard and other protected routes');

rl.question('\nPress Enter to continue...', () => {
  console.log('\n🚀 Setup complete! Your OAuth integration is ready to test.');
  rl.close();
});
