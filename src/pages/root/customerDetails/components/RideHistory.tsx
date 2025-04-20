import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useRides } from "@/hooks/useRides";

function RideHistory() {
  const { id } = useParams();
  const { data, isLoading, error } = useRides(id || "");

  // Format date if it exists
  const formatRideDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd-MM-yyyy");
    } catch {
      return "Invalid date";
    }
  };

  // Format time if it exists
  const formatRideTime = (timeString: string | null) => {
    if (!timeString) return "N/A";
    try {
      return format(new Date(timeString), "hh:mm a");
    } catch {
      return "Invalid time";
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center p-8">
        <CircularProgress size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center p-8">
        <p className="text-red-500">
          Error loading ride history. Please try again.
        </p>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center p-8">
        <p className="text-gray-500">No ride history available.</p>
      </div>
    );
  }

  const rideHistoryData = data.data;

  return (
    <div className="w-full h-full">
      <div>
        <div className="bg-white border border-LightGray">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-lightblue">
              <tr>
                <th className="py-3 px-4 border-b-2 border-b-LightGray font-medium ">
                  Ride ID
                </th>
                <th className="py-3 px-4 border-b-2 border-b-LightGray font-medium">
                  Vehicle Number
                </th>
                <th className="py-3 px-4 border-b-2 border-b-LightGray font-medium">
                  Date
                </th>
                <th className="py-3 px-4 border-b-2 border-b-LightGray font-medium">
                  Booking Time
                </th>
                <th className="py-3 px-4 border-b-2 border-b-LightGray font-medium">
                  Fare
                </th>
                <th className="py-3 px-4 border-b-2 border-b-LightGray font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rideHistoryData.map((ride, index) => (
                <tr key={index} className="hover:bg-gray-50 text-xs">
                  <td className="py-3 px-4 border-b-2 border-b-LightGray">
                    {ride.ride_id}
                  </td>
                  <td className="py-3 px-4 border-b-2 border-b-LightGray">
                    {ride.vehicle_number}
                  </td>
                  <td className="py-3 px-4 border-b-2 border-b-LightGray">
                    {formatRideDate(ride.booking_date)}
                  </td>
                  <td className="py-3 px-4 border-b-2 border-b-LightGray">
                    {formatRideTime(ride.booking_time)}
                  </td>
                  <td className="py-3 px-4 border-b-2 border-b-LightGray">
                    {ride.fare ? `₹${ride.fare}` : "N/A"}
                  </td>
                  <td className="py-3 px-4 border-b-2 border-b-LightGray text-StatusGreen">
                    {ride.ride_status.charAt(0).toUpperCase() +
                      ride.ride_status.slice(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RideHistory;
