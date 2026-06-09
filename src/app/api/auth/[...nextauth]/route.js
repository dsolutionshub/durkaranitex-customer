import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { googleSignIn } from "../../services/authService";

const isProduction = process.env.NODE_ENV === "production";
let NEXTAUTH_URL = process.env.NEXTAUTH_URL;

if (!NEXTAUTH_URL && isProduction && process.env.VERCEL_URL) {
  NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
}

if (!NEXTAUTH_URL) {
  NEXTAUTH_URL = isProduction ? "http://localhost:3000" : "http://localhost:3000";
}

process.env.NEXTAUTH_URL = NEXTAUTH_URL;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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

          console.log("[GoogleSignIn] Raw backend response:", JSON.stringify(response));

          if (response?.data?.token) {
            token.accessToken = response.data.token;
            token.userId = response.data.customer?.id;
            token.username = response.data.customer?.name;
          } else if (response?.token) {
            token.accessToken = response.token;
            token.userId = response.customer?.id;
            token.username = response.customer?.name;
          } else {
            console.error("[GoogleSignIn] Could not extract token. Response:", JSON.stringify(response));
          }
        } catch (error) {
          console.error("[GoogleSignIn] Backend call failed:", error?.message);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};
      session.user.accessToken = token.accessToken;
      session.user.id = token.userId || token.sub;
      session.user.name = token.username || session.user.name;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
