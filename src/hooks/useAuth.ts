import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_COMPONENTS } from "@/utils/constants";
import { useAuthStore } from "@/store/authStore";
import {
  changePassword,
  loginUser,
  sendPasswordResetLink,
  verifyForgotPassword,
  verifyLoginOtp,
} from "@/services/authService";

// Define interface for API response

export const useAuth = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(LOGIN_COMPONENTS.LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const { login, setError, error, currentUser } = useAuthStore();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token && currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    try {
      const data = (await loginUser(email, password)) as any;

      if (data.message === "otp sent successfully") {
        setLoginState(LOGIN_COMPONENTS.ENTER_OTP);
        setError("");
      } else {
        setError(data.status.message || "Login failed");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };

  const handleVerifyLoginOtp = async () => {
    try {
      const data = (await verifyLoginOtp(email, otp)) as any;

      if (data?.userId) {
        login(data?.accessToken || "", data?.userId || null);
        setError("");
        navigate("/dashboard");
      } else {
        setError("OTP Verification Failed.");
      }
    } catch (error: any) {
      setError(error.message || "OTP verification failed");
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const data = (await sendPasswordResetLink(email)) as any;

      if (data.status.status_code === 200) {
        setEmailSent(true);
      } else {
        setError("Password reset request failed.");
      }
    } catch (error: any) {
      setError(error.message || "Password reset request failed");
    }
  };

  const handleVerifyForgotPassword = async (
    otpHash: string,
    verifiedEmail: string
  ) => {
    try {
      if (otpHash && verifiedEmail) {
        const data = (await verifyForgotPassword(
          verifiedEmail,
          otpHash
        )) as any;

        if (data.status.status_code === 200) {
          setLoginState(LOGIN_COMPONENTS.CHANGE_PASSWORD);
          return true;
        } else {
          setError("Forget password verification error");
          return false;
        }
      }
      return false;
    } catch (error: any) {
      setError(error.message || "Password verification failed");
      return false;
    }
  };

  const handlePasswordChange = async (verifiedEmail: string) => {
    if (password === confirmPassword) {
      try {
        const data = (await changePassword(
          verifiedEmail,
          confirmPassword
        )) as any;

        if (data.status.status_code === 200) {
          navigate("/dashboard");
        } else {
          setError("Password Change Failed.");
        }
      } catch (error: any) {
        setError(error.message || "Password change failed");
      }
    } else {
      setError("Passwords don't match");
    }
  };

  return {
    loginState,
    setLoginState,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
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
  };
};
