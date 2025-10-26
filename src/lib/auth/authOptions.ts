import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.SESSION_SECRET,
  providers: [
    Credentials({
      name: 'Admin',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const adminUser = process.env.AUTH_ADMIN_USERNAME || 'admin';
        const adminPass = process.env.AUTH_ADMIN_PASSWORD || 'change-me';
        if (!credentials) return null;
        if (credentials.username === adminUser && credentials.password === adminPass) {
          return { id: 'admin', name: 'Admin', role: 'admin' } as any;
        }
        return null;
      }
    })
  ],
  pages: { signIn: '/en' }
};
