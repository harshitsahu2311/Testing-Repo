import { useState } from "react";
import { z } from "zod";
import FlowLogoIcon from "@/assets/svg/FloLogoIcon";
import InputField from "@/components/InputField/InputField";
import { LOGIN_COMPONENTS } from "@/utils/constants";

interface LoginFormProps {
  setLoginState: (state: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleLogin: () => void;
  error?: string | null;
}

// Zod schema for validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm: React.FC<LoginFormProps> = ({
  setLoginState,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  error,
}) => {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Full form validation on submit
  const validateForm = () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return false;
    }

    setErrors({});
    return true;
  };

  // Field-level validation for email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const result = loginSchema.shape.email.safeParse(value);
    setErrors((prev) => ({
      ...prev,
      email: result.success ? undefined : result.error.errors[0]?.message,
    }));
  };

  // Field-level validation for password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const result = loginSchema.shape.password.safeParse(value);
    setErrors((prev) => ({
      ...prev,
      password: result.success ? undefined : result.error.errors[0]?.message,
    }));
  };

  // Submit handler
  const onSubmit = () => {
    if (validateForm()) {
      handleLogin();
    }
  };

  return (
    <div>
      <FlowLogoIcon />
      <p className="border-b my-8 text-[20px] font-normal">
        Login into FLO Account
      </p>
      <div className="flex flex-col w-[480px]">
        <div className="mb-5">
          <InputField
            label="Email address"
            type="text"
            value={email}
            onChange={handleEmailChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>
        <div className="mb-5">
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </div>
        <div className="flex justify-between items-center mb-5 w-full">
          <div className="flex-1">
            {error && (
              <p className="text-red-100 text-sm whitespace-nowrap">
                Invalid email or password
              </p>
            )}
          </div>
          <div>
            <p
              onClick={() =>
                setLoginState(LOGIN_COMPONENTS.ENTER_EMAIL_FOR_LINK)
              }
              className="cursor-pointer font-semibold text-sm whitespace-nowrap"
            >
              Forgot Password?
            </p>
          </div>
        </div>

        <button
          className="text-white bg-darkblue py-[8px] text-[14px] font-medium rounded"
          onClick={onSubmit}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
