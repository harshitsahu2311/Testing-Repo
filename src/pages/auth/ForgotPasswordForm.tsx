import React, { useState } from "react";
import InputField from "@/components/InputField/InputField";
import { z } from "zod";

interface ForgotPasswordFormProps {
  setEmail: (email: string) => void;
  handleVerifyEmail: () => void;
  emailSent: boolean;
}

// Zod schema for email validation
const emailSchema = z.string().email("Please enter a valid email address");

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  setEmail,
  handleVerifyEmail,
  emailSent,
}) => {
  const [email, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);
    setEmail(value); // external state

    const validation = emailSchema.safeParse(value);
    setEmailError(validation.success ? "" : validation.error.errors[0].message);
  };

  const handleSubmit = () => {
    // Optional double check on submit
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setEmailError(validation.error.errors[0].message);
      return;
    }

    handleVerifyEmail();
  };

  return (
    <div>
      <p className="border-b mb-8 text-[24px] font-normal">
        Enter Email To Receive a Link
      </p>
      <div className="flex flex-col w-[480px]">
        <div className="mb-5">
          <InputField
            label="Email address"
            type="text"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
        </div>
        <button
          className="text-white bg-darkblue py-[8px] text-[14px] font-medium rounded"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
        {emailSent && (
          <p className="text-sm text-green-100 rounded-md p-2">
            Check your inbox to change password
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
