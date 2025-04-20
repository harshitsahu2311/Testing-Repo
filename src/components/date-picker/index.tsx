
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

// Extend MUI DatePickerProps to allow all props dynamically
interface DatePickerComponentProps
  extends Omit<DatePickerProps<Dayjs>, "value" | "onChange"> {
  label: string;
  value?: Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
  format?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  value,
  onChange,
  format = "DD-MM-YY",
  minDate,
  maxDate,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{ textField: { size: "small" } }}
        sx={{
          width: "150px",
        }}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
        {...props} // Allow all additional DatePicker props
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
