import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Redirect here if unauthenticated
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/admin');
      
      if (isAdminRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // If logged in and on the login page, redirect to dashboard
        if (nextUrl.pathname === '/login') {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // Add user details to JWT token on sign in
      if (user) {
        token.id = user.id;
        token.role = (user as { roleId?: string }).roleId; // We will attach role during authorize
      }
      return token;
    },
    async session({ session, token }) {
      // Expose user details in the session
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as { roleId?: unknown }).roleId = token.role;
      }
      return session;
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig;
