# Minimalist Next.js Template

A production-ready, minimalist Next.js template with TypeScript, Tailwind CSS, Clerk authentication, and essential security features.

## Features

- **Next.js 16** - Latest version with App Router
- **TypeScript** - Strict mode enabled for type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Clerk Authentication** - Email/password authentication with built-in UI components
- **Security Headers** - Pre-configured security headers including CSP, HSTS, and more
- **Error Handling** - Built-in error boundaries and 404 page
- **ESLint** - Code quality and consistency
- **Production Ready** - Optimized build configuration

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Clerk account (free at [clerk.com](https://clerk.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/james-gardner/minimalist-next-template.git
cd minimalist-next-template
```

2. Install dependencies:
```bash
npm install
```

3. Set up Clerk:
   - Create a free account at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy your API keys from the dashboard
   - See [CLERK_SETUP.md](CLERK_SETUP.md) for detailed setup instructions

4. Create environment file:
```bash
cp .env.example .env.local
```

5. Update `.env.local` with your Clerk keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
```

**Note:** For a detailed step-by-step guide on setting up Clerk, see [CLERK_SETUP.md](CLERK_SETUP.md)

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
├── app/
│   ├── dashboard/          # Protected dashboard page
│   ├── sign-in/            # Clerk sign-in page
│   ├── sign-up/            # Clerk sign-up page
│   ├── error.tsx           # Error boundary
│   ├── not-found.tsx       # 404 page
│   ├── layout.tsx          # Root layout with ClerkProvider
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── public/                 # Static files
├── middleware.ts           # Clerk authentication middleware
├── .env.example            # Environment variables template
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Authentication

This template uses [Clerk](https://clerk.com) for authentication with the following features:

- **Email/Password Sign-up** - Users can create accounts with email and password
- **Sign-in Flow** - Secure authentication with Clerk's built-in UI
- **Protected Routes** - Middleware-based route protection
- **User Management** - User profile and session management via Clerk
- **Dashboard** - Example protected page showing user information

### Authentication Routes

- `/sign-in` - Sign in page
- `/sign-up` - Sign up page  
- `/dashboard` - Protected dashboard (requires authentication)

### Configuring Clerk

In your Clerk dashboard:

1. Go to **User & Authentication** → **Email, Phone, Username**
2. Enable **Email address** 
3. Set authentication strategy to **Password**
4. Disable social logins if you only want email/password

## Security Features

This template includes several security best practices:

- **Strict-Transport-Security** - Enforces HTTPS
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME sniffing
- **X-XSS-Protection** - Enables browser XSS protection
- **Referrer-Policy** - Controls referrer information
- **Permissions-Policy** - Restricts browser features
- **Clerk Authentication** - Industry-standard authentication with session management

## Customization

### Metadata

Update the metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your app description",
};
```

### Environment Variables

Add environment variables to `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

Public variables must be prefixed with `NEXT_PUBLIC_`.

## Deployment

This template can be deployed to any platform that supports Next.js:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- Self-hosted with Node.js

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

