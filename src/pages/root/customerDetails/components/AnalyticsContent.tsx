import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BasicPie from "@/components/charts/BasicPie";
import {
  AnalyticsResponse,
  fetchCustomerAnalytics,
} from "@/services/customerService";
import { fetchTaxiAnalytics } from "@/services/billingService";

function AnalyticsContent() {
  const { id } = useParams();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        if (id) {
          const fromBilling = location.pathname.includes("/taxi-details/");

          const response = fromBilling
            ? await fetchTaxiAnalytics(id)
            : await fetchCustomerAnalytics(id);
          setAnalyticsData(response);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  return (
    <div className="w-full sm:h-[220px] 2xl:w-[785px] 2xl:h-[320px]">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading analytics...</p>
        </div>
      ) : (
        <BasicPie analyticsData={analyticsData?.data} />
      )}
    </div>
  );
}

export default AnalyticsContent;
