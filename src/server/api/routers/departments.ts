import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export default createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.department.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
});
