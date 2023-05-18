import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { employeeListRequestSchema } from "../dto/employees";

export default createTRPCRouter({
  getList: publicProcedure
    .input(employeeListRequestSchema)
    .query(({ ctx, input }) => {
      const { page, limit, ...rest } = input;

      const levels = input?.levels
        ? input.levels.map((level) => {
            return +level;
          })
        : [];

      return ctx.prisma.employee.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          OR: [
            {
              first_name: {
                contains: rest?.search,
                mode: "insensitive",
              },
            },
            {
              last_name: {
                contains: rest?.search,
                mode: "insensitive",
              },
            },
          ],
          departmentId: rest?.department === 0 ? undefined : rest?.department,
          occupationId: rest?.occupation === 0 ? undefined : rest?.occupation,
          level: {
            [levels.length ? "in" : "notIn"]: levels,
          },
        },
        orderBy: {
          last_name: "asc",
        },
        include: {
          department: true,
          occupation: true,
        },
      });
    }),

  getLevels: publicProcedure.query(async ({ ctx }) => {
    const levels = await ctx.prisma.employee.findMany({
      select: {
        level: true,
      },
    });

    return levels.reduce((acc, curr) => {
      const currentLevel = curr.level;
      const currentLevelCount = acc[currentLevel];

      return {
        ...acc,
        [currentLevel]: currentLevelCount ? currentLevelCount + 1 : 1,
      };
    }, {} as Record<number, number>);
  }),
  getIds: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.employee.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
      },
    });
  }),
});
