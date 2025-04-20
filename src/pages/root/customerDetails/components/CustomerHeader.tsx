import { useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

import { CustomerResponse } from "@/services/customerService";
function CustomerHeader({ customerData }: { customerData: CustomerResponse }) {
  const navigate = useNavigate();

  console.log(customerData);

  return (
    <div className="mt-4">
      <div className="flex">
        <button onClick={() => navigate(-1)}>
          <KeyboardBackspaceOutlinedIcon />
        </button>
        <p className="text-sm ml-2 mt-1">{customerData?.name} &gt; Details</p>
      </div>
    </div>
  );
}

export default CustomerHeader;
