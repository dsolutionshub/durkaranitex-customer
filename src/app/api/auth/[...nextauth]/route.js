export const dynamic = "force-dynamic";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { googleSignIn } from "../../services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const response = await googleSignIn({
            email: profile.email,
            name: profile.name,
            googleId: profile.sub,
          });

          if (response.status === "success" && response.data) {
            token.accessToken = response.data.token;
            token.userId = response.data.customer.id;
            token.username = response.data.customer.name;
          }
        } catch (error) {
          getErrorMessage(error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.userId || token.sub;
      session.user.name = token.username || session.user.name;
      return session;
    },
  },
});

export { handler as GET, handler as POST };