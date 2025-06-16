import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER!,
    }),
  ],
callbacks: {
  async jwt({ token, account }) {
    type DecodedToken = {
      realm_access?: {
        roles?: string[];
      };
    };

    // Always update accessToken if present
    if (account && account.access_token) {
      token.accessToken = account.access_token;
    }

    // Always decode roles from the latest accessToken if present
    if (token.accessToken && typeof token.accessToken === "string") {
      const decoded = jwt.decode(token.accessToken) as DecodedToken | null;
      token.roles = decoded?.realm_access?.roles || [];
    } else {
      token.roles = [];
    }

    return token;
  },
  async session({ session, token }) {
    session.accessToken = token.accessToken as string;
    session.roles = token.roles as string[];
    return session;
  },
},
});