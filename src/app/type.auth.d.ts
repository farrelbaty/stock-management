// types/auth.d.ts
import "auth.js";

declare module "auth.js" {
  interface AuthSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: { name: string };
    } & AuthSession["user"];
  }

  interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: { name: string };
  }
}

declare module "auth.js/jwt" {
  interface JWT {
    id: string;
    role: { name: string };
    name: string;
    email: string;
  }
}
