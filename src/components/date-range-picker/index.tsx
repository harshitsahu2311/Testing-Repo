
import { useState, useEffect, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import DatePickerComponent from "../date-picker";

interface DateRangePickerProps {
  currentDateRange?: {
    startDate: string;
    endDate: string;
  };
  setDateRange: (startDate: string, endDate: string) => void;
}

const DateRangePicker = ({ currentDateRange, setDateRange }: DateRangePickerProps) => {
  // Track if this is the initial render
  const isFirstRender = useRef(true);
  
  // Initialize with values from props or defaults
  const [startDate, setStartDate] = useState<Dayjs | null>(
    currentDateRange?.startDate ? dayjs(currentDateRange.startDate) : null
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    currentDateRange?.endDate ? dayjs(currentDateRange.endDate) : null
  );

  // When date values change, update the dashboard state - with debounce
  useEffect(() => {
    // Skip the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Only proceed if both dates are valid
    if (!startDate || !endDate) return;
    
    // Format dates for the API
    const formattedStartDate = startDate.format('YYYY-MM-DD');
    const formattedEndDate = endDate.format('YYYY-MM-DD');
    
    // Check if dates have changed and start date is not after end date
    if (!startDate.isAfter(endDate) && 
        (formattedStartDate !== currentDateRange?.startDate || 
         formattedEndDate !== currentDateRange?.endDate)) {
      
      // Debounce the date range update to reduce flickering
      const timeoutId = setTimeout(() => {
        setDateRange(formattedStartDate, formattedEndDate);
      }, 300); // 300ms debounce
      
      return () => clearTimeout(timeoutId);
    }
  }, [startDate, endDate, setDateRange, currentDateRange]);

  // Update local state when props change, but avoid infinite loops
  useEffect(() => {
    if (!currentDateRange) return;
    
    const newStartDate = dayjs(currentDateRange.startDate);
    const newEndDate = dayjs(currentDateRange.endDate);
    
    // Only update state if necessary to avoid rerenders
    if (!startDate || !newStartDate.isSame(startDate, 'day')) {
      setStartDate(newStartDate);
    }
    
    if (!endDate || !newEndDate.isSame(endDate, 'day')) {
      setEndDate(newEndDate);
    }
  }, [currentDateRange?.startDate, currentDateRange?.endDate]);

  const handleStartDateChange = (date: Dayjs | null) => {
    if (date) {
      // If selected start date is after end date, also update end date
      if (endDate && date.isAfter(endDate)) {
        setEndDate(date);
      }
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    if (date) {
      // If selected end date is before start date, also update start date
      if (startDate && date.isBefore(startDate)) {
        setStartDate(date);
      }
      setEndDate(date);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <DatePickerComponent 
        label="Start Date" 
        value={startDate}
        onChange={handleStartDateChange}
        format="YYYY-MM-DD"
        maxDate={endDate || undefined}
      />

      <div className="w-[1vw] h-[0.5px] bg-[#949494]" />

      <DatePickerComponent 
        label="End Date" 
        value={endDate}
        onChange={handleEndDateChange}
        format="YYYY-MM-DD"
        minDate={startDate || undefined}
      />
    </div>
  );
};

export default DateRangePicker;
