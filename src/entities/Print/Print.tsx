import { memo, useRef } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import usePrintFilter from "@/utils/hooks/usePrintFilter";
import usePrintToSave from "@/utils/hooks/usePrintToSave";
import { formatCurrency } from "@/utils/functions";
import { months } from "@/utils/constants";
import Select from "@/components/Select";
import Loader from "@/components/Loader";

const Print: React.FC = () => {
  const reportContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const onPrintClick = usePrintToSave(reportContentRef);
  const { api, monthSelect } = usePrintFilter();

  const onBackToMainClick = () => {
    router.back();
  };

  return (
    <>
      <aside className="h-full border-r border-r-slate-300 pr-4">
        <Select
          label="Select month"
          value={monthSelect.selected}
          options={monthSelect.options}
          onChange={monthSelect.onChange}
        />
      </aside>
      <main className="col-span-2">
        <div className="mb-4 flex justify-end gap-2">
          <button
            className="rounded bg-slate-300 px-2 py-1 text-[0.75rem] text-slate-800 transition-colors hover:bg-slate-400"
            onClick={onBackToMainClick}
          >
            Back to main
          </button>
          <button
            className="rounded bg-blue-500 px-2 py-1 text-[0.75rem] text-white transition-colors hover:bg-blue-600"
            onClick={onPrintClick}
            disabled={
              api.timeline.isLoading ||
              !api.timeline?.data ||
              !api.timeline?.data?.length
            }
          >
            Print Report
          </button>
        </div>
        <div
          className={clsx("w-full overflow-y-auto", {
            ["h-full"]: api.timeline.isLoading,
          })}
        >
          <div
            ref={reportContentRef}
            className="printable-content h-full overflow-y-auto bg-slate-200 first-letter:w-full"
          >
            {api.timeline.isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="mb-4 w-full bg-blue-300 p-6">
                  <h1 className="text-2xl font-semibold">
                    {months[(monthSelect.selected?.value || 1) - 1]} Report
                  </h1>
                </div>
                <table className="w-full">
                  <thead className="bg-slate-300">
                    <tr className="text-left">
                      <th className="p-3 text-sm">Full name</th>
                      <th className="p-3 text-sm">Department</th>
                      <th className="p-3 text-sm">Occupation</th>
                      <th className="p-3 text-right text-sm">
                        Hours worked, h
                      </th>
                      <th className="p-3 text-right text-sm">
                        Total salary, $
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-normal">
                    {api.timeline.data?.map(
                      ({ employee, id, worked_hours, rate }) => {
                        const fullName = `${employee.first_name} ${employee.last_name}`;

                        const salary = !!rate
                          ? worked_hours * rate.rate
                          : undefined;

                        return (
                          <tr key={id} className="even:bg-slate-300">
                            <th className="p-3 text-left text-xs">
                              {fullName}
                            </th>
                            <td className="p-3 text-xs">
                              {employee.department.name}
                            </td>
                            <td className="p-3 text-xs">
                              {employee.occupation.name}
                            </td>
                            <td className="p-3 text-right text-xs">
                              {worked_hours.toFixed(2)}
                            </td>
                            <td className="p-3 text-right text-xs">
                              {salary ? formatCurrency(salary) : "NaN"}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default memo(Print);
