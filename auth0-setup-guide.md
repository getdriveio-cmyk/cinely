# 🔐 Auth0 OAuth Setup Guide

## 📋 Current Configuration

Your Auth0 application is already configured with:
- **Domain**: `dev-ifn3ugjt57otm5sy.us.auth0.com`
- **Client ID**: `2pqWILG5wJcfqJVIB20YHmRItjuDBPxt`
- **Client Secret**: `zCCgMRsE1dn78_4QJ4Ig07PQVSsRhGCAxWf7N6NtkGsUGufLuFW0KwCryLQtKVvC`

## 🛠 Manual Configuration Required

Since your application is a Single Page Application (SPA), you need to configure it manually in the Auth0 Dashboard.

### Step 1: Access Auth0 Dashboard
1. Go to [https://manage.auth0.com](https://manage.auth0.com)
2. Log in to your Auth0 account
3. Navigate to **Applications** in the left sidebar

### Step 2: Configure Your Application
1. Find your application (should be named something like "Cinely" or similar)
2. Click on the application name to open settings
3. Go to the **Settings** tab

### Step 3: Set Application URLs
In the **Application URIs** section, configure:

#### Allowed Callback URLs
```
http://localhost:8080
https://cinely.vercel.app
```

#### Allowed Logout URLs
```
http://localhost:8080
https://cinely.vercel.app
```

#### Allowed Web Origins
```
http://localhost:8080
https://cinely.vercel.app
```

#### Allowed Origins (CORS)
```
http://localhost:8080
https://cinely.vercel.app
```

> **Note**: If you have a custom domain for your Vercel deployment, replace `https://cinely.vercel.app` with your custom domain URL.

### Step 4: Advanced Settings
1. Scroll down to **Advanced Settings**
2. Click on **Grant Types** tab
3. Ensure these are checked:
   - ✅ **Authorization Code**
   - ✅ **Refresh Token**
   - ✅ **Implicit**

### Step 5: Save Changes
Click **Save Changes** at the bottom of the page.

## 🧪 Testing Your Setup

### Development Testing (Localhost)

#### 1. Start Development Server
```bash
npm run dev
```

#### 2. Open Application
Go to [http://localhost:8080](http://localhost:8080)

#### 3. Test Authentication
1. Click the profile icon in the top-right corner
2. You should be redirected to Auth0's Universal Login page
3. Sign in with any available provider (Google, GitHub, email, etc.)
4. You should be redirected back to your app
5. You should now be able to access protected routes like `/dashboard`

### Production Testing (Vercel)

#### 1. Deploy to Vercel
```bash
git add .
git commit -m "Add OAuth configuration"
git push
```

#### 2. Open Production App
Go to [https://cinely.vercel.app](https://cinely.vercel.app)

#### 3. Test Authentication
1. Click the profile icon in the top-right corner
2. You should be redirected to Auth0's Universal Login page
3. Sign in with any available provider
4. You should be redirected back to your production app
5. You should now be able to access protected routes

### Environment Detection
The app automatically detects whether it's running in development or production and uses the appropriate URLs for OAuth callbacks.

## 🔧 Environment Variables

Your `.env` file should contain:
```env
VITE_AUTH0_DOMAIN=dev-ifn3ugjt57otm5sy.us.auth0.com
VITE_AUTH0_CLIENT_ID=2pqWILG5wJcfqJVIB20YHmRItjuDBPxt
VITE_AUTH0_CLIENT_SECRET=zCCgMRsE1dn78_4QJ4Ig07PQVSsRhGCAxWf7N6NtkGsUGufLuFW0KwCryLQtKVvC
```

## 🚨 Troubleshooting

### Issue: "Invalid Callback URL"
**Solution**: Make sure `http://localhost:8080` is in your Allowed Callback URLs

### Issue: "Invalid Client"
**Solution**: Verify your Client ID matches the one in your Auth0 Dashboard

### Issue: "CORS Error"
**Solution**: Add `http://localhost:8080` to Allowed Web Origins

### Issue: "Redirect Loop"
**Solution**: Check that Allowed Logout URLs includes `http://localhost:8080`

## ✅ Success Checklist

- [ ] Auth0 Dashboard URLs configured
- [ ] Development server running
- [ ] Can access http://localhost:8080
- [ ] Profile icon redirects to Auth0 login
- [ ] Can sign in with Auth0
- [ ] Redirects back to app after login
- [ ] Can access /dashboard and other protected routes

## 🎉 Next Steps

Once OAuth is working:
1. Test all protected routes
2. Configure additional Auth0 providers if needed
3. Set up production URLs for deployment
4. Remove any test components

Your OAuth integration will be complete and ready for production!
