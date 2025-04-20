import ProtectedLayout from "@/layout/ProtectedLayout";
import { useActivities } from "@/hooks/useActivities";
import ActivityTimeline from "./components/ActivityTimeline";
import DateRangePicker from "@/components/date-range-picker";

function RecentView() {
  const { isLoading, currentDateRange, setDateRange } = useActivities();

  return (
    <ProtectedLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Recent Activities</h1>
          <div className="flex items-center mt-4">
            <DateRangePicker
              currentDateRange={currentDateRange}
              setDateRange={setDateRange}
            />
          </div>
        </div>
        {isLoading ? <p>Loading activities...</p> : <ActivityTimeline />}
      </div>
    </ProtectedLayout>
  );
}

export default RecentView;
