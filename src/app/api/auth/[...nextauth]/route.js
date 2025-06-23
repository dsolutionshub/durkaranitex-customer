// /src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { googleSignIn } from "../../services/authService";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async signIn({ user, account}) {
    const payload = {
      email: user.email,
      name:  user.name,
      uid:   account.providerAccountId,
    };

    try {
      const res = await googleSignIn(payload);
      user.backendToken = res.token;
      console.log(res);
      return true
    } catch (err) {
      console.error("googleSignIn failed:", err);
      return false;      
    }
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.backendToken) {
        token.backendToken = user.backendToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.backendToken = token.backendToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
