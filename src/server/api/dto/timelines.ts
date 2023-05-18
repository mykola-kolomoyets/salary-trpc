import { z } from "zod";
import type { Timeline } from "@prisma/client";
import type { EmployeeListResponse } from "./employees";

export const timelineByMonthRequestSchema = z.object({
  month: z.number().min(1).max(12),
});

export const timelineCreateRequestSchema = z.object({
  month: z.number().min(1).max(12),
  employeeId: z.number(),
  worked_hours: z.number().min(1).max(200),
});

export type TimelineByMonthRequestDTO = z.infer<
  typeof timelineByMonthRequestSchema
>;

export type TimelineCreateRequestDTO = z.infer<
  typeof timelineCreateRequestSchema
>;

export type TimelineByMonthResponse = Timeline & {
  employee: EmployeeListResponse;
};
