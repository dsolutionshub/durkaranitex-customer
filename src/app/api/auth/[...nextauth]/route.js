import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { googleSignIn } from "../../services/authService";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    events: {
    async signIn({ user, account }) {
      try {
        const payload = {
          email: user.email,
          name: user.name,
          uid: account?.providerAccountId,
        };

        const response = await googleSignIn(payload);
        console.log("Google SignIn API response:", response);
      } catch (err) {
        console.error("Error calling googleSignIn:", err);
      }
    },
  },
  },
});

export { handler as GET, handler as POST };