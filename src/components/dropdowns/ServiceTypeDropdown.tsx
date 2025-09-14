import { useServiceTypes } from "@db/hooks/service_type";
import {
  StyledDropdown,
  DropdownChoice,
} from "@components/dropdowns/StyledDropdown";
import { DimensionValue } from "react-native";

export type ServiceTypeDropdownProps = {
  onChange: (value: string | undefined) => void;
  value: string | undefined;
  width?: DimensionValue
};

export function ServiceTypeDropdown({
  onChange,
  value,
  width
}: ServiceTypeDropdownProps) {
  const { data: serviceTypes } = useServiceTypes();
  const choices: DropdownChoice[] = serviceTypes?.map((st) => ({
    label: st.name,
    value: String(st.id),
  })) || [];

  return (
    <StyledDropdown
      choices={choices}
      onChange={onChange}
      label="Service Type"
      value={value}
      width={width}
    />
  );
}
