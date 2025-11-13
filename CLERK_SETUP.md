# Clerk Authentication Setup Guide

This guide will walk you through setting up Clerk authentication for this Next.js template.

## Step 1: Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com) and sign up for a free account
2. Once logged in, you'll be taken to the Clerk Dashboard

## Step 2: Create a New Application

1. Click on "Add application" or create your first application
2. Give your application a name (e.g., "Minimalist Next.js Template")
3. Choose "Next.js" as the framework (optional)
4. Click "Create application"

## Step 3: Configure Authentication Methods

1. In the Clerk Dashboard, go to **User & Authentication** → **Email, Phone, Username**
2. Enable **Email address** as an identifier
3. Under **Authentication strategies**, ensure **Password** is enabled
4. (Optional) Disable social logins if you only want email/password:
   - Go to **User & Authentication** → **Social Connections**
   - Disable any social providers you don't want to use

## Step 4: Get Your API Keys

1. In the Clerk Dashboard, go to **API Keys**
2. You'll see two keys:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)
3. Copy these keys - you'll need them in the next step

## Step 5: Configure Your Environment

1. In your project root, copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Clerk keys:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   ```

3. Save the file

## Step 6: Test the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. You should see:
   - Sign In and Sign Up buttons in the header
   - Click "Sign Up" to create a test account
   - After signing up, you'll be redirected to the homepage
   - You should see your user profile icon in the header
   - Try accessing the Dashboard page

## Authentication Features

### Available Routes

- `/` - Public homepage (shows sign-in/sign-up buttons when logged out)
- `/sign-in` - Sign in page with Clerk's UI
- `/sign-up` - Sign up page with Clerk's UI
- `/dashboard` - Protected page (requires authentication)

### User Experience

When **logged out**:
- Users see "Sign In" and "Sign Up" buttons in the header
- Accessing `/dashboard` redirects to `/sign-in`

When **logged in**:
- Users see their profile icon (UserButton) in the header
- Users see a "Dashboard" link in the header
- Users can access all protected pages
- Click the profile icon to manage account or sign out

## Customization

### Customizing Clerk Components

You can customize the appearance of Clerk components in your `app/layout.tsx`:

```tsx
<ClerkProvider
  appearance={{
    variables: {
      colorPrimary: '#000000',
      colorText: '#000000',
    },
  }}
>
  {/* ... */}
</ClerkProvider>
```

See [Clerk's theming documentation](https://clerk.com/docs/components/customization/overview) for more options.

### Adding More Protected Routes

To protect additional routes, they'll automatically be protected by the middleware in `middleware.ts`. To make a route public, add it to the `isPublicRoute` matcher:

```typescript
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/",
  "/your-public-route(.*)"  // Add your public route here
]);
```

## Troubleshooting

### "Publishable key not valid" Error

- Make sure you've copied the correct key from the Clerk Dashboard
- Ensure the key starts with `pk_test_` or `pk_live_`
- Check that there are no extra spaces in your `.env.local` file

### Build Fails with Clerk Errors

- Make sure you have valid Clerk keys in your `.env.local` file
- All pages that use Clerk components are set to `dynamic = 'force-dynamic'`

### Can't Access Dashboard

- Make sure you're signed in
- Check that the middleware is properly configured
- Verify that `/dashboard` is not in the public routes list

## Production Deployment

When deploying to production:

1. In your Clerk Dashboard, switch to the production environment
2. Copy the production API keys (they start with `pk_live_` and `sk_live_`)
3. Add these keys to your deployment platform's environment variables:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Railway: Project → Variables

4. Make sure to set:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Component Reference](https://clerk.com/docs/components/overview)
