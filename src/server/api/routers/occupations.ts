import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export default createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.occupation.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
});
