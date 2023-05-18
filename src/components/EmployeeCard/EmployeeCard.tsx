import Image from "next/image";
import { memo, useMemo } from "react";
import type { EmployeeListResponse } from "@/server/api/dto/employees";
import Text from "@/components/Text";

const EmployeeCard: React.FC<EmployeeListResponse> = ({
  first_name,
  last_name,
  id,
  level,
  department,
  occupation,
}) => {
  const fullName = useMemo(() => {
    return `${first_name} ${last_name}`;
  }, [first_name, last_name]);

  return (
    <div className=" relative flex flex-col items-center rounded border-x border-y border-slate-300 bg-slate-100 p-3">
      <Text
        className=" absolute left-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-sm bg-blue-300"
        view="xs"
        color="white"
      >
        {id}
      </Text>
      <Image
        className="h-12 w-12 rounded-full"
        src="/images/avatar-default.webp"
        alt={fullName}
        width={48}
        height={48}
      />
      <div className="mt-5 flex w-full grow flex-col justify-between">
        <Text className="mb-2" view="xs">
          <span className="font-bold">{fullName}</span>
        </Text>
        <Text view="xs">
          Level: <span className="font-semibold">{level}</span>
        </Text>
        <Text view="xs">
          Occupation: <span className="font-semibold">{occupation.name}</span>
        </Text>
        <Text view="xs">
          Department: <span className="font-semibold">{department.name}</span>
        </Text>
      </div>
    </div>
  );
};

export default memo(EmployeeCard);
