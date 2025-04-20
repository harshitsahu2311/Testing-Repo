import { useState } from "react";
import { z } from "zod";
import InputField from "@/components/InputField/InputField";

interface OtpVerificationFormProps {
  otp: string;
  setOtp: (otp: string) => void;
  handleVerifyLoginOtp: () => void;
  error: string | null;
}

// Zod schema for OTP validation
const otpSchema = z
  .string()
  .min(1, { message: "OTP is required" })
  .length(6, { message: "OTP must be 6 digits" });

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  otp,
  setOtp,
  handleVerifyLoginOtp,
  error,
}) => {
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined
  );

  // OTP field validation on change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtp(value);

    const result = otpSchema.safeParse(value);
    setValidationError(
      result.success ? undefined : result.error.errors[0]?.message
    );
  };

  // Form validation before submission
  const validateAndSubmit = () => {
    const result = otpSchema.safeParse(otp);

    if (result.success) {
      setValidationError(undefined);
      handleVerifyLoginOtp();
    } else {
      setValidationError(result.error.errors[0]?.message);
    }
  };

  return (
    <div>
      <p className="border-b mb-8 text-[24px] font-normal">Enter The OTP</p>
      <div className="flex flex-col w-[480px]">
        <div className="mb-5">
          <InputField
            label="OTP"
            type="text"
            value={otp}
            onChange={handleOtpChange}
            error={!!validationError}
            helperText={validationError}
          />
        </div>
        {error && <p className="text-red-100 text-sm mb-4">Invalid OTP</p>}
        <button
          className="text-white bg-darkblue py-[8px] text-[14px] font-medium rounded"
          onClick={validateAndSubmit}
        >
          VERIFY
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationForm;
