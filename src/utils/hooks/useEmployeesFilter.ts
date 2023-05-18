import { useEffect } from "react";
import useGetAllDepartments from "@/utils/hooks/api/departments/useGetAllDepartments";
import useGetEmployeesList from "@/utils/hooks/api/employees/useGetEmployeesList";
import useGetLevels from "@/utils/hooks/api/employees/useGetLevels";
import useGetAllOccupations from "@/utils/hooks/api/occupations/useGetAllOccupations";
import useSelect from "@/utils/hooks/useSelect";
import useMultipleCheckboxes from "@/utils/hooks/useMultipleCheckboxes";
import usePagination from "@/utils/hooks/usePagination";
import useSearch from "@/utils/hooks/useSearch";
import { initialSelectValue } from "@/utils/constants";

const useEmployeesFilter = () => {
  /**
   * PAGINATION
   */
  const [page, limit] = usePagination();

  /**
   * SEARCH
   */
  const [searchQuery, debouncedSearchQuery, onSearchQueryChange] = useSearch();

  /**
   * SELECTS
   */
  const [
    selectedDepartment,
    departmentOptions,
    onDepartmentChange,
    updateDepartmentOptions,
  ] = useSelect();

  const [
    selectedOccupation,
    occupationsOptions,
    onOccupationChange,
    updateOccupationOptions,
  ] = useSelect();

  /**
   * CHECKBOXES
   */
  const [
    selectedLevels,
    debouncedLevels,
    levelsCheckboxesData,
    onLevelsCheckboxChange,
    updateLevelsOptions,
  ] = useMultipleCheckboxes();

  /**
   * API
   */
  const employeesListApi = useGetEmployeesList({
    page,
    limit,
    search: debouncedSearchQuery,
    department: selectedDepartment?.value,
    occupation: selectedOccupation?.value,
    levels: debouncedLevels,
  });

  const { data: departmentsList } = useGetAllDepartments();

  const { data: occupationsList } = useGetAllOccupations();

  const { data: levelsInfo } = useGetLevels();

  /**
   * EFFECTS
   */
  useEffect(() => {
    if (!departmentsList?.length) {
      updateDepartmentOptions([]);

      return;
    }

    const options = departmentsList.map((department) => {
      return {
        label: department.name,
        value: department.id,
      };
    });

    options.unshift(initialSelectValue);

    updateDepartmentOptions(options);
  }, [departmentsList, updateDepartmentOptions]);

  useEffect(() => {
    if (!occupationsList?.length) {
      updateOccupationOptions([]);

      return;
    }

    const options = occupationsList
      .filter((occupation) => {
        return selectedDepartment?.value
          ? occupation.departmentId === selectedDepartment?.value
          : true;
      })
      ?.map((occupation) => {
        return {
          label: occupation.name,
          value: occupation.id,
        };
      });

    options.unshift(initialSelectValue);

    updateOccupationOptions(options);
  }, [occupationsList, selectedDepartment?.value, updateOccupationOptions]);

  useEffect(() => {
    if (!levelsInfo) {
      updateLevelsOptions([]);
      return;
    }

    const options = Object.entries(levelsInfo).map(([level, occurrences]) => {
      return {
        label: `Level ${level}`,
        value: level,
        metadata: occurrences,
      };
    });

    updateLevelsOptions(options);
  }, [levelsInfo, updateLevelsOptions]);

  useEffect(() => {
    onOccupationChange(initialSelectValue);
  }, [onOccupationChange, selectedDepartment]);

  /**
   * RESULT
   */
  return {
    api: {
      employeesList: employeesListApi,
    },
    searchInput: {
      query: searchQuery,
      onChange: onSearchQueryChange,
    },
    departmentSelect: {
      selected: selectedDepartment,
      options: departmentOptions,
      onChange: onDepartmentChange,
    },
    occupationsSelect: {
      selected: selectedOccupation,
      options: occupationsOptions,
      onChange: onOccupationChange,
    },
    levelsCheckboxes: {
      selected: selectedLevels,
      options: levelsCheckboxesData,
      onChange: onLevelsCheckboxChange,
    },
  };
};

export default useEmployeesFilter;
