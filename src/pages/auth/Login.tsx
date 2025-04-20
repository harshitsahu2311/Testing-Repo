import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LOGIN_COMPONENTS } from "@/utils/constants";
import LoginForm from "./LoginForm";
import { useAuth } from "@/hooks/useAuth";
import ForgotPasswordForm from "./ForgotPasswordForm";
import OtpVerificationForm from "./OtpVerificationForm";
import PasswordChangeForm from "./PasswordChangeForm";
import Icon from "@/utils/icon";
import { useAuthStore } from "@/store/authStore";

import LoginBg from "@/assets/png/loginBg.png";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const page = searchParams.get("page");
  const otpHash = searchParams.get("otp");
  const verifiedEmail = searchParams.get("email");

  const {
    loginState,
    setLoginState,
    email,
    setEmail,
    password,
    setPassword,
    setConfirmPassword,
    otp,
    setOtp,
    emailSent,
    error,
    setError,
    handleLogin,
    handleVerifyLoginOtp,
    handleVerifyEmail,
    handleVerifyForgotPassword,
    handlePasswordChange,
  } = useAuth();

  // Check if user is already logged in and redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token && currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  // Clear errors on initial load
  useEffect(() => {
    setError("");
  }, []);

  // Handle forget password verification from URL params
  useEffect(() => {
    if (otpHash && verifiedEmail) {
      handleVerifyForgotPassword(otpHash, verifiedEmail);
    }
  }, [otpHash, verifiedEmail]);

  // Handle page parameter
  useEffect(() => {
    if (page === "newPassword") {
      setLoginState(LOGIN_COMPONENTS.ENTER_NEW_PASSWORD);
    }
  }, [page]);

  // Render the appropriate component based on login state
  const renderLoginComponent = () => {
    switch (loginState) {
      case LOGIN_COMPONENTS.LOGIN:
        return (
          <LoginForm
            setLoginState={setLoginState}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            error={error}
          />
        );
      case LOGIN_COMPONENTS.ENTER_EMAIL_FOR_LINK:
        return (
          <ForgotPasswordForm
            setEmail={setEmail}
            handleVerifyEmail={handleVerifyEmail}
            emailSent={emailSent}
          />
        );
      case LOGIN_COMPONENTS.ENTER_OTP:
        return (
          <OtpVerificationForm
            otp={otp}
            setOtp={setOtp}
            handleVerifyLoginOtp={handleVerifyLoginOtp}
            error={error}
          />
        );
      case LOGIN_COMPONENTS.CHANGE_PASSWORD:
        return (
          <PasswordChangeForm
            handlePasswordChange={() =>
              verifiedEmail && handlePasswordChange(verifiedEmail)
            }
            setPassword={setPassword || ""}
            setConfirmPassword={setConfirmPassword || ""}
            error={error || ""}
          />
        );
      default:
        return (
          <LoginForm
            setLoginState={setLoginState}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        );
    }
  };

  return (
    <div className="grid grid-cols-10 h-screen">
      <div className="col-span-6 flex justify-center items-center flex-col">
        <Icon src="loginbg" className="absolute bottom-[150px]" />
        <div className="login-container absolute bg-white p-10 border border-border rounded-3xl">
          {renderLoginComponent()}
        </div>
        <p className="absolute bottom-3 font-[16px] text-fontColor">
          &#169; 2021. - 2025 All Rights Reserved. FLO
        </p>
      </div>
      <div className="col-span-4 relative">
        <img src={LoginBg} className="h-screen w-full" />
        <div className="absolute top-[170px] left-[10px] z-10">
          <h1 className="text-white text-4xl flex justify-center items-baseline font-bold px-10 pb-8">
            Customer Manager Control Panel
          </h1>
          <p className="text-white text-2xl font-normal px-10">
            Manage, oversee and streamline all system operations efficiently and
            effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
