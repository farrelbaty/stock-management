export const authConfig = {
  session: {
    strategy: "jwt" as const,
    updateAge: 24 * 60 * 60,
  },
  providers: [],
};
