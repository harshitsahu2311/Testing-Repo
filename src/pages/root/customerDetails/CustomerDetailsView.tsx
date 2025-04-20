import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Greetings from "@/components/greeting";
import ProtectedLayout from "@/layout/ProtectedLayout";
import { fetchCustomerById } from "@/services/customerService";
import { fetchBillingById } from "@/services/billingService";

import CustomerDetails from "./components/CustomerDetails";
import CustomerHeader from "./components/CustomerHeader";

// Create a unified response type that can handle both customer and billing data
type UnifiedDetailResponse = {
  data: any;
  message?: string;
  errors?: null | any;
  code?: string;
};

function CustomerDetailsView() {
  const { id } = useParams();
  const location = useLocation();
  const [customerData, setCustomerData] =
    useState<UnifiedDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        if (id) {
          // Determine which API to call based on the path or location state
          const fromBilling = location.pathname.includes("/taxi-details/");

          const response = fromBilling
            ? await fetchBillingById(id)
            : await fetchCustomerById(id);

          setCustomerData(response);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id, location, refreshKey]);

  // Function to force refresh of customer data
  const refreshCustomerData = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <ProtectedLayout>
      <div className="p-8">
        <Greetings />
        <CustomerHeader customerData={customerData?.data} />
        <div className="mt-2">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading customer details...</p>
            </div>
          ) : (
            <CustomerDetails
              customerData={customerData}
              onSuspend={refreshCustomerData}
            />
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
}
export default CustomerDetailsView;
