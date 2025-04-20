/** A REACT-HOOK-FORM WRAPPER OVER MUI TEXTFIELD */

import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

export type FormTextFieldProps = {
  control: unknown;
  name: string;
  label?: string;
} & Omit<
  TextFieldProps,
  "label" | "helperText" | "error" | "value" | "onChange" | "onBlur" | "ref"
>;
function FormTextField(props: FormTextFieldProps) {
  const { control, name, label, children, ...rest } = props;
  return (
    <Controller
      control={control as Control<FieldValues>}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
        >
          {children}
        </TextField>
      )}
    />
  );
}
export default FormTextField;
