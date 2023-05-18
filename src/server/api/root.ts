import { createTRPCRouter } from "@/server/api/trpc";
import employeesRouter from "@/server/api/routers/employees";
import departmentsRouter from "@/server/api/routers/departments";
import occupationsRouter from "@/server/api/routers/occupations";
import timelinesRouter from "@/server/api/routers/timelines";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  employees: employeesRouter,
  departments: departmentsRouter,
  occupations: occupationsRouter,
  timelines: timelinesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
