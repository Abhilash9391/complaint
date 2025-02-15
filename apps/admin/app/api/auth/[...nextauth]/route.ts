import NextAuth from "next-auth";
import { adminAuthOptions } from "../../../lib/authOptions";
const handler = NextAuth(adminAuthOptions);
export { handler as GET, handler as POST };
