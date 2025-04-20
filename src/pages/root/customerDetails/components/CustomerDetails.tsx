import imgLogo from "@/assets/png/defaultProfile.png";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import CustomerReviews from "./CustomerReview";
import CustomerDashboard from "./CustomerDashboard";
import { blockCustomer, unblockCustomer } from "@/services/customerService";
import { blockBilling, unblockBilling } from "@/services/billingService";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CustomerBlockConfirmModal from "@/pages/root/customer/components/CustomerBlockConfirmModal";

interface CustomerDetailsProps {
  customerData: {
    data: any;
    message?: string;
    errors?: null | any;
    code?: string;
  } | null;
  onSuspend?: () => void;
}

function CustomerDetails({ customerData, onSuspend }: CustomerDetailsProps) {
  const customer = customerData?.data;
  const location = useLocation();
  const fromBilling =
    location.state?.from === "/billing" ||
    location.pathname.includes("/taxi-details/");

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  console.log("===============>>>", customerData);

  const handleSuspendAccount = async () => {
    if (customer?.id) {
      try {
        if (fromBilling) {
          await blockBilling([customer.id]);
        } else {
          await blockCustomer([customer.id]);
        }
        // Refresh data after successful block
        if (onSuspend) {
          onSuspend();
        }
      } catch (error) {
        console.error("Error suspending account:", error);
      }
    }
  };

  const handleReactivateAccount = async () => {
    if (customer?.id) {
      try {
        if (fromBilling) {
          await unblockBilling([customer.id]);
        } else {
          await unblockCustomer([customer.id]);
        }
        // Refresh data after successful unblock
        if (onSuspend) {
          onSuspend();
        }
      } catch (error) {
        console.error("Error reactivating account:", error);
      }
    }
  };

  return (
    <div>
      <div className="w-full border-[10px] border-LightGray">
        <div className="bg-white">
          <div className="flex px-4 py-4 ">
            <img
              src={customer?.avatar || imgLogo}
              alt={`${customer?.first_name}'s avatar`}
              className="h-48"
            />

            <div className="mt-6 ml-6 flex flex-col h-full w-full">
              <div>
                <div className="flex items-center mb-2 justify-between">
                  <h1 className="text-2xl font-bold mr-3">{customer?.name}</h1>
                  <div
                    className={`${
                      customer?.status === "inactive"
                        ? "bg-red-50 text-red-100"
                        : "bg-TransparentGreen text-StatusGreen"
                    } rounded-xl px-3 py-1 w-16 h-6 flex items-center justify-center`}
                  >
                    <p className="text-xs">{customer?.status}</p>
                  </div>
                  <div className="justify-between ml-auto">
                    {customer?.status === "inactive" ? (
                      <button
                        className="bg-green-600 text-white px-5 py-2 border rounded-3xl text-xs"
                        onClick={handleReactivateAccount}
                      >
                        REACTIVATE ACCOUNT
                      </button>
                    ) : (
                      <button
                        className="bg-CrimsonRed text-white px-5 py-2 border rounded-3xl text-xs"
                        onClick={() => setIsDeactivateModalOpen(true)}
                      >
                        DEACTIVATE ACCOUNT
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  Location: {customer?.location || "Not specified"}, ID:{" "}
                  {customer?.customer_id}
                </p>
              </div>
              <div className="flex mt-[2rem] justify-between">
                <div className="w-full flex items-center space-x-4">
                  <p>
                    <span className="text-2xl font-extrabold">
                      {customer?.rating}{" "}
                    </span>
                    Rating
                  </p>
                  <div className="w-[2px] h-6 bg-CloudBlue"></div>
                  <p>
                    <span className="text-2xl font-extrabold">
                      {customer?.totalRides}{" "}
                    </span>
                    Rides
                  </p>
                </div>
                <div className="m-auto flex">
                  <div className="border border-AccentBlue mr-3 rounded-lg p-1">
                    <PhoneIcon />
                  </div>
                  <div className="border border-AccentBlue rounded-lg p-1">
                    <MessageIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="ml-[-0.5rem] w-[65%] border-[8px] border-white">
          <CustomerDashboard customerData={customerData} />
        </div>
        <div className="w-[36%] border-[10px] border-white">
          <CustomerReviews />
        </div>
      </div>

      {/* Deactivation Confirmation Modal */}
      <CustomerBlockConfirmModal
        open={isDeactivateModalOpen}
        handleClose={() => setIsDeactivateModalOpen(false)}
        onBlockConfirm={handleSuspendAccount}
        title="Deactivate Account"
        message="Are you sure you want to deactivate this account? The user won't be able to use their account."
        confirmButtonText="Yes, Deactivate"
      />
    </div>
  );
}

export default CustomerDetails;
