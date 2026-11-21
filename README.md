# WedPlan

WedPlan is a wedding planning platform. Couples browse wedding services and send booking requests to the vendors they like. Vendors publish their services, answer booking requests and can upgrade to Premium for unlimited services. Admins review services, manage users and see every subscription payment.

- **Live website:** _add after deploying_
- **Client repository:** [dev-ahsan7/WedPlan](https://github.com/dev-ahsan7/WedPlan)
- **Server repository:** [dev-ahsan7/wedplan-server](https://github.com/dev-ahsan7/wedplan-server)

## Important features

**For couples (customers)**
- Browse approved services with search, category and location filters, and price sorting
- Service details with a photo gallery, vendor info and a booking form (event date, location, message)
- Track every request in the dashboard and cancel requests that are still pending

**For vendors**
- Add, edit, hide and delete services, with photo upload to ImgBB
- Every new or edited service waits for admin approval
- Accept or reject booking requests
- Free plan with up to 3 active services, or Premium ($9.99/month) for unlimited services and a Premium badge
- Payment with Stripe Checkout. Premium turns on only after Stripe's verified webhook, and can be cancelled at the end of the month

**For admins**
- Dashboard overview with platform numbers
- Manage users: search, filter by role, see details, block and unblock
- Manage services: approve, reject, change status and delete
- Read-only list of subscription transactions

**Everywhere**
- Sign up and sign in with email and password or Google (Better Auth), with role choice and an optional profile photo
- Role-based dashboards with a sidebar. Each role can only open its own dashboard, and the server checks roles again on every request
- Blocked users are signed out and can't use private pages
- Loading states, empty states, a custom 404 and error pages, and toast messages for every action
- Responsive on phone, tablet and desktop, with Motion animations on the home page

## Technology stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Better Auth (with the JWT plugin), MongoDB, Motion (framer-motion), Sonner, Lucide icons, ImgBB, Stripe Checkout. The API is a separate Express server ([wedplan-server](https://github.com/dev-ahsan7/wedplan-server)).

## Installation

```bash
git clone https://github.com/dev-ahsan7/WedPlan.git
cd WedPlan
npm install
```

Copy `.env.example` to `.env` and fill in the values:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URI` | URL of the WedPlan server, for example `http://localhost:8100` |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB API key for photo uploads |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `MONGODB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | A long random string |
| `BETTER_AUTH_URL` | URL of this site, for example `http://localhost:3100` |

In Google Cloud, add `<BETTER_AUTH_URL>/api/auth/callback/google` as an authorised redirect URI.

## Run the project locally

1. Start the [server](https://github.com/dev-ahsan7/wedplan-server) first (it runs on port 8100).
2. Start the client:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3100](http://localhost:3100).

Admin accounts can't be created from the website. Sign up normally, then run `npm run make-admin -- your@email.com` in the server folder.
