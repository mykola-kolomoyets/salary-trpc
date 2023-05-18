export type CheckboxData = {
  label: string;
  value: string;
  metadata?: number;
};

export type CheckboxProps = {
  checked: boolean;
} & Omit<CheckboxData, "value"> &
  React.HTMLAttributes<HTMLInputElement>;
