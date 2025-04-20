import ProtectedLayout from "@/layout/ProtectedLayout";
import CustomerMain from "./components/CustomerMain";
import { useCustomer } from "@/hooks/useCustomer";

function CustomerView() {
  const { data } = useCustomer();
  console.log(data);
  return (
    <ProtectedLayout>
      <CustomerMain />
    </ProtectedLayout>
  );
}
export default CustomerView;
