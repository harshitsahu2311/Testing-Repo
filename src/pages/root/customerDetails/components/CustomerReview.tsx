import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useCustomerReviews } from "@/hooks/useCustomerReviews";
import { format } from "date-fns";

const CustomerReviews = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useCustomerReviews(id || "");

  // Format date function
  const formatReviewDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd-MM-yyyy");
    } catch {
      return "Invalid date";
    }
  };

  if (isLoading) {
    return (
      <div className="h-[600px] mr-[-0.5rem] p-6 bg-gray-50 border-[10px] border-LightGray overflow-auto flex justify-center items-center">
        <CircularProgress size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] mr-[-0.5rem] p-6 bg-gray-50 border-[10px] border-LightGray overflow-auto flex justify-center items-center">
        <p className="text-red-500">Error loading reviews. Please try again.</p>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="h-[600px] mr-[-0.5rem] p-6 bg-gray-50 border-[10px] border-LightGray overflow-auto flex justify-center items-center">
        <p className="text-gray-500">No reviews available.</p>
      </div>
    );
  }

  const reviews = data.data;

  return (
    <div className="h-[600px] mr-[-0.5rem] p-6 bg-gray-50 border-[10px] border-LightGray overflow-auto">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-xl">Reviews</h1>
          <input
            type="search"
            placeholder="Search by ID"
            className="bg-LightGray outline-none rounded-xl px-3 py-2 text-xs"
          />
        </div>
        {/* Reviews List */}
        <div className="space-y-4">
          {/* Full-width Line */}
          <div className="-mx-6 w-[calc(100%+3rem)] h-[2px] bg-LightGray my-4" />

          {reviews.map((review) => (
            <Box
              key={review.id}
              className="bg-white rounded-lg shadow-sm py-2 relative"
            >
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {/* Placeholder for Icon */}
                    <span className="text-xl text-gray-500 bg-[#E2EBF2] px-2 py-1 rounded-lg">
                      🚲
                    </span>
                  </div>
                  <div>
                    <h2 className="font-bold text-xs ">
                      {review.vehicle_number}
                    </h2>
                    <div className="flex">
                      <p className="text-gray-500 text-xs ">
                        Ride ID - {review.rideId}
                      </p>
                      <div className="w-[2px] bg-BorderGray mr-1 ml-1" />
                      {/* Rating */}
                      <div className="flex items-center ">
                        {Array(5)
                          .fill(0)
                          .map((_, index) =>
                            index < review.rating ? (
                              <StarIcon
                                key={index}
                                sx={{ fontSize: "0.8rem", marginRight: "1px" }}
                                className="text-AccentBlue"
                              />
                            ) : (
                              <StarOutlineIcon
                                key={index}
                                sx={{ fontSize: "0.8rem", marginRight: "1px" }}
                              />
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {formatReviewDate(review.createdAt)}
                </div>
              </div>

              {/* Content */}
              <p className="text-xs text-secondary mt-2">
                {review.review_description}
              </p>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
