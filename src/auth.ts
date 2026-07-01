import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/db';
import bcrypt from 'bcryptjs';

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // Find the user in the database
          const user = await prisma.user.findUnique({
            where: { email },
            include: { role: true }
          });
          
          if (!user) return null;
          
          // Compare hashed password
          const passwordsMatch = await bcrypt.compare(password, user.password);
          
          if (passwordsMatch) {
            // Return user object that matches the session schema we want
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              roleId: user.role.name, // Exposing the role name (e.g. 'super_admin')
            };
          }
        }
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
