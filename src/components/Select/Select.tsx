import { memo } from "react";
import ReactSelect from "react-select";
import type { SelectProps } from "./types";
import Text from "@/components/Text";

const Select: React.FC<SelectProps> = ({ label, ...rest }) => {
  return (
    <div className="mb-4">
      <Text view="xs">{label}</Text>
      <ReactSelect instanceId="departments" {...rest} />
    </div>
  );
};

export default memo(Select);
