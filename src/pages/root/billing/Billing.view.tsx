import ProtectedLayout from "@/layout/ProtectedLayout";
import BillingMain from "./components/BillingMain";

function BikeTaxiView() {
  return (
    <ProtectedLayout>
      <BillingMain />
    </ProtectedLayout>
  );
}

export default BikeTaxiView;
