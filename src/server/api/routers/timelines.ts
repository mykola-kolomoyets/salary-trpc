import { Prisma, type Rate } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  timelineByMonthRequestSchema,
  timelineCreateRequestSchema,
} from "@/server/api/dto/timelines";

export default createTRPCRouter({
  getByMonth: publicProcedure
    .input(timelineByMonthRequestSchema)
    .query(async ({ ctx, input }) => {
      const timelines = await ctx.prisma.timeline.findMany({
        where: {
          month: {
            equals: input.month,
          },
        },
        orderBy: {
          employee: {
            last_name: "asc",
          },
        },
        include: {
          employee: {
            include: {
              department: true,
              occupation: true,
            },
          },
        },
      });

      const rates = await Promise.all<{
        employeeId: number;
        rate: Rate | null;
      }>(
        timelines.map(async (timeline) => {
          const { employee } = timeline;

          const currentEmployeeRate = await ctx.prisma.rate.findFirst({
            where: {
              occupationId: {
                equals: employee.occupationId,
              },
              level: {
                equals: employee.level,
              },
            },
          });

          return new Promise((resolve) => {
            resolve({
              employeeId: employee.id,
              rate: currentEmployeeRate,
            });
          });
        })
      );

      const response = timelines.map((timeline) => {
        const employeesRate = rates.find((rate) => {
          return rate?.employeeId === timeline.employeeId;
        });

        return {
          ...timeline,
          ...employeesRate,
        };
      });

      return response;
    }),
  create: publicProcedure
    .input(timelineCreateRequestSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.timeline.create({
          data: input,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new Prisma.PrismaClientKnownRequestError(
              `This employee already has tracked time! Check the data please`,
              { code: "P2002", clientVersion: "1.0" }
            );
          }
        }
      }
    }),
});
