import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  
  secret: process.env.JWT_SECRET as string,
};

// ... rest of the file remains the same ...

// Crie o handler com as opções do NextAuth
const handler = NextAuth(authOptions);

// Exporte as rotas GET e POST
export { handler as GET, handler as POST };
