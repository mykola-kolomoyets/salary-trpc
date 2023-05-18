import { memo } from "react";
import type { EmployeesListProps } from "./types";
import EmployeeCard from "@/components/EmployeeCard";
import Text from "@/components/Text";

const EmployeesList: React.FC<EmployeesListProps> = ({ employees }) => {
  if (!employees.length) {
    return (
      <div className="m-auto mt-28 flex  justify-center">
        <Text view="md">No employees with such criteria</Text>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {employees.map((employee) => {
        return <EmployeeCard key={employee.id} {...employee} />;
      })}
    </div>
  );
};

export default memo(EmployeesList);
