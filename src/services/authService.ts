import api from "@/services/httpRequest";
import { URL } from "@/utils/constants";
import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    console.log("I am here in loginUser");
    const response = await axios.post(URL.LOGIN, {
      email,
      password,
    });
    console.log("I have already logged in", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const verifyLoginOtp = async (email: string, otp: string) => {
  try {
    console.log("I am here in verifyLoginOtp");
    const response = await axios.post(URL.VERIFY_LOGIN, {
      email,
      otp,
    });
    console.log("I have already verified the OTP", response.data);
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);
    throw error;
  }
};

export const sendPasswordResetLink = async (email: string) => {
  try {
    const response = await api.post(URL.VERIFY_EMAIL, { email });
    return response.data;
  } catch (error) {
    console.error("Password reset request error:", error);
    throw error;
  }
};

export const verifyForgotPassword = async (email: string, otphash: string) => {
  try {
    const response = await api.post(URL.VERIFY_FORGOT_PASSWORD, {
      email,
      otphash,
    });
    return response.data;
  } catch (error) {
    console.error("Forgot password verification error:", error);
    throw error;
  }
};

export const changePassword = async (
  email: string,
  password: string,
  type = "forget",
  userid = ""
) => {
  try {
    const response = await api.post(URL.CHANGE_PASSWORD, {
      email,
      password,
      type,
      userid,
    });
    return response.data;
  } catch (error) {
    console.error("Password change error:", error);
    throw error;
  }
};
