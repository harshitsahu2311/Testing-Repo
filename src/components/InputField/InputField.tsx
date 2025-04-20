//mui input
import TextField from "@mui/material/TextField";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <div>
      <TextField
        id="outlined-required"
        label={label}
        type={type}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        fullWidth
        {...(value !== undefined && { value })}
        {...(onChange !== undefined && { onChange })}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#C5C5C4",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "#C5C5C4",
              borderWidth: "1px",
            },
          },
        }}
      />
    </div>
  );
};

export default InputField;
