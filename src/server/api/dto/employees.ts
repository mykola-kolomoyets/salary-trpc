import { z } from "zod";
import type { Employee, Occupation, Department } from "@prisma/client";

export const employeeListRequestSchema = z.object({
  page: z.number(),
  limit: z.number(),
  search: z.optional(z.string().trim()),
  department: z.optional(z.number()),
  occupation: z.optional(z.number()),
  levels: z.optional(z.array(z.string())),
});

export type EmployeeListRequestDTO = z.infer<typeof employeeListRequestSchema>;

export type EmployeeListResponse = Employee & {
  occupation: Occupation;
  department: Department;
};
