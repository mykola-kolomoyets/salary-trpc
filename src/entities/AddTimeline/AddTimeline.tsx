import { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useGetEmployeesIds from "@/utils/hooks/api/employees/useGetEmployeesIds";
import useSelect from "@/utils/hooks/useSelect";
import { months } from "@/utils/constants";
import Select from "@/components/Select";
import Text from "@/components/Text";
import useCreateTImeline from "@/utils/hooks/api/timelines/useCreateTimeline";

const AddTimeline: React.FC = () => {
  const router = useRouter();
  const [workedHours, setWorkedHours] = useState("");
  const [month, monthsOptions, onMonthChange, updateMonthsOptions] =
    useSelect();
  const [employee, employeesOptions, onEmployeeChange, updateEmployeesOptions] =
    useSelect();
  const { data, isFetched } = useGetEmployeesIds();
  const { mutate, isLoading, isSuccess, isError, error } = useCreateTImeline();

  const onBackToMainClick = () => {
    router.back();
  };

  const onWorkedHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkedHours(event.target.value);
  };

  const onTimelineSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log();

      if (!month || !employee || !workedHours || isNaN(+workedHours)) {
        return;
      }

      mutate({
        month: month.value,
        employeeId: employee?.value,
        worked_hours: +workedHours,
      });
    },
    [employee, month, mutate, workedHours]
  );

  useEffect(() => {
    updateMonthsOptions(
      months.map((month, index) => {
        return {
          label: month,
          value: index + 1,
        };
      })
    );
  }, [updateMonthsOptions]);

  useEffect(() => {
    if (isFetched && !!data) {
      updateEmployeesOptions(
        data?.map((employeeItem) => {
          return {
            label:
              `${employeeItem?.first_name} ${employeeItem?.last_name}`.trim(),
            value: employeeItem.id,
          };
        })
      );
    }
  }, [data, isFetched, updateEmployeesOptions]);

  return (
    <main className="col-span-3">
      <div className="mb-4 flex justify-end gap-2">
        <button
          className="rounded bg-slate-300 px-2 py-1 text-[0.75rem] text-slate-800 transition-colors hover:bg-slate-400"
          onClick={onBackToMainClick}
        >
          Back to main
        </button>
      </div>
      <div className="m-auto h-[calc(100%-26px)] w-full max-w-[500px] overflow-y-auto">
        {!isLoading && isError ? (
          <div className="mb-4">
            <Text className="text-red-600" view="md">
              Error ocurred while adding timeline:
            </Text>
            <Text className="text-red-600" view="md">
              {error?.message}
            </Text>
          </div>
        ) : null}

        {!isLoading && isSuccess ? (
          <div className="mb-4">
            <Text className="text-green-600" view="md">
              Timeline was successfully added
            </Text>
          </div>
        ) : null}
        <form onSubmit={onTimelineSubmit}>
          <Select
            label="Select month"
            value={month}
            options={monthsOptions}
            onChange={onMonthChange}
          />
          <Select
            label="Select Employee"
            isSearchable
            value={employee}
            options={employeesOptions}
            onChange={onEmployeeChange}
          />
          <label htmlFor="worked-hours">
            <Text view="xs">Enter worked hours</Text>
            <input
              id="worked-hours"
              className=" h-9 w-full rounded-[0.25rem] border-x border-y border-solid border-slate-300 bg-transparent bg-white p-2 text-slate-700 outline-none"
              type="number"
              min={1}
              max={200}
              value={workedHours}
              onChange={onWorkedHoursChange}
            />
          </label>
          <button
            type="submit"
            className=" mt-5 w-full rounded bg-blue-500 p-2 text-[0.75rem] text-white transition-colors hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default memo(AddTimeline);
