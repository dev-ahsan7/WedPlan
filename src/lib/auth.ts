import { betterAuth } from 'better-auth';
import { APIError, createAuthMiddleware, getOAuthState } from 'better-auth/api';
import { jwt } from 'better-auth/plugins';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { MongoClient } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('wedPlan');

// On Vercel this closes idle connections before the function sleeps,
// so a woken-up function doesn't use a dead connection
attachDatabasePool(client);

// Connect before Better Auth uses the client. If the function goes to sleep
// while a connection is still opening, MongoDB closes the client for good.
await client.connect();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  hooks: {
    // The sign up form checks the password too, but the server must not trust the form
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== '/sign-up/email') return;

      const password = ctx.body?.password;
      if (typeof password !== 'string' || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        throw new APIError('BAD_REQUEST', {
          message: 'Password must have an uppercase and a lowercase letter.',
        });
      }
    }),
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    // Extra fields from the assignment. Only role and businessName can be sent at sign up.
    additionalFields: {
      role: { type: 'string', defaultValue: 'customer' },
      businessName: { type: 'string', required: false },
      isBlocked: { type: 'boolean', defaultValue: false, input: false },
      subscriptionPlan: { type: 'string', defaultValue: 'free', input: false },
      subscriptionExpiresAt: { type: 'date', required: false, input: false },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Google sign up sends the chosen role through the OAuth state
          const oauthState = await getOAuthState();
          const role = oauthState?.role ?? user.role;

          // Nobody can sign up as admin, anything else becomes a customer
          const safeRole = role === 'vendor' ? 'vendor' : 'customer';

          return {
            data: {
              ...user,
              role: safeRole,
              businessName: safeRole === 'vendor' ? user.businessName : undefined,
            },
          };
        },
      },
      update: {
        before: async (data) => {
          // Users can't change their own role or plan from the profile page.
          // The Express server changes these fields directly in the database.
          if (
            'role' in data ||
            'isBlocked' in data ||
            'subscriptionPlan' in data ||
            'subscriptionExpiresAt' in data
          ) {
            throw new APIError('FORBIDDEN', {
              message: 'You can not change your role or subscription.',
            });
          }
        },
      },
    },
    session: {
      create: {
        before: async (session, ctx) => {
          // Blocked users can't log in
          const user = (await ctx?.context.internalAdapter.findUserById(
            session.userId,
          )) as { isBlocked?: boolean } | null;

          if (user?.isBlocked) {
            throw new APIError('FORBIDDEN', {
              message: 'Your account has been blocked. Please contact support.',
            });
          }
        },
      },
    },
  },
  plugins: [jwt()],
});
