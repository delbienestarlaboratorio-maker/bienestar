import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users, sessions, accounts, verificationTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const authConfig: NextAuthConfig = {
    adapter: DrizzleAdapter(db) as any,
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await db.select().from(users).where(eq(users.email, credentials.email as string)).limit(1);

                if (!user || user.length === 0 || !user[0].isActive) {
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password as string, user[0].password);

                if (!isValid) {
                    return null;
                }

                // Update last login
                await db.update(users)
                    .set({ lastLogin: new Date() })
                    .where(eq(users.id, user[0].id));

                return {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    role: user[0].role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role as string;
                (session.user as any).id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 horas
    },
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
