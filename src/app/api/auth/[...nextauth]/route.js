import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { googleSignIn } from "../../services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";

const isProduction = process.env.NODE_ENV === "production";
let NEXTAUTH_URL = process.env.NEXTAUTH_URL;

if (!NEXTAUTH_URL && isProduction && process.env.VERCEL_URL) {
  NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
}

if (!NEXTAUTH_URL) {
  if (isProduction) {
    console.warn(
      "NEXTAUTH_URL is not set in production. Falling back to http://localhost:3000 for build. Set NEXTAUTH_URL in Vercel to your production URL."
    );
    NEXTAUTH_URL = "http://localhost:3000";
  } else {
    NEXTAUTH_URL = "http://localhost:3000";
  }
}

process.env.NEXTAUTH_URL = NEXTAUTH_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn("NextAuth Google provider missing client ID or secret.");
}

if (!process.env.NEXTAUTH_SECRET) {
  console.warn("NextAuth secret is not set. Set NEXTAUTH_SECRET in .env.local or production environment.");
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
  logger: {
    error(code, metadata) {
      console.error("NextAuth error", code, metadata);
    },
    warn(code) {
      console.warn("NextAuth warn", code);
    },
    debug(code, metadata) {
      console.debug("NextAuth debug", code, metadata);
    },
  },
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

          if (response?.status === "success" && response?.data) {
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
      session.user = session.user || {};
      session.user.accessToken = token.accessToken;
      session.user.id = token.userId || token.sub;
      session.user.name = token.username || session.user.name;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
