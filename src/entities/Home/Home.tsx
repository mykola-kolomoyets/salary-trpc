import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import useEmployeesFilter from "@/utils/hooks/useEmployeesFilter";
import Loader from "@/components/Loader";
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";
import Checkboxes from "@/components/Checkboxes";
import EmployeesList from "@/components/EmployeesList";

const Home: React.FC = () => {
  const router = useRouter();
  const {
    api,
    departmentSelect,
    levelsCheckboxes,
    occupationsSelect,
    searchInput,
  } = useEmployeesFilter();

  const onPrintReportClick = useCallback(() => {
    router.push("/print");
  }, [router]);

  const onAddTimelineClick = useCallback(() => {
    router.push("/add-timeline");
  }, [router]);

  return (
    <>
      <aside className="sticky top-4 h-min border-r border-r-slate-300 pr-4">
        <SearchInput
          value={searchInput.query}
          onChange={searchInput.onChange}
        />
        <Select
          label="Select Department"
          value={departmentSelect.selected}
          options={departmentSelect.options}
          onChange={departmentSelect.onChange}
        />
        <Select
          label="Select Occupation"
          value={occupationsSelect.selected}
          options={occupationsSelect.options}
          onChange={occupationsSelect.onChange}
        />
        <Checkboxes
          label="Select employees levels"
          options={levelsCheckboxes.options}
          selected={levelsCheckboxes.selected}
          onCheckboxChange={levelsCheckboxes.onChange}
        />
      </aside>
      <main className="col-span-2">
        <div className="mb-4 flex justify-end">
          <button
            className="rounded border border-gray-600 bg-gray-200 px-2 py-1 text-[0.75rem] text-black transition-colors hover:bg-blue-600 hover:text-white"
            onClick={onPrintReportClick}
          >
            Print Report
          </button>

          <button
            className="ml-2 rounded bg-blue-500 px-2 py-1 text-[0.75rem] text-white transition-colors hover:bg-blue-600"
            onClick={onAddTimelineClick}
          >
            Add Timeline
          </button>
        </div>
        {api.employeesList.isLoading ? (
          <Loader />
        ) : (
          <EmployeesList employees={api.employeesList.data || []} />
        )}
      </main>
    </>
  );
};

export default memo(Home);
