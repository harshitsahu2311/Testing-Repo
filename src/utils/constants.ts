export const LOGIN_COMPONENTS = {
  LOGIN: "login",
  ENTER_EMAIL_FOR_OTP: "enter-email-for-otp",
  ENTER_EMAIL_FOR_LINK: "enter-email-for-link",
  CHANGE_PASSWORD: "change-password",
  RECEIVE_OTP: "receive-otp",
  ENTER_OTP: "enter-otp",
  ENTER_NEW_PASSWORD: "enter-new-password",
};

export const API_BASE_URL = {
  DEV: "http://13.235.164.22:3000/api/v2",
  LOCAL: "http://localhost:3000/api/v2",
};

export const URL = {
  LOGIN: `${API_BASE_URL.DEV}/auth/login`,
  VERIFY_LOGIN: `${API_BASE_URL.DEV}/auth/login/verify`,
  VERIFY_EMAIL: `${API_BASE_URL.DEV}/auth/forget-password`,
  VERIFY_FORGOT_PASSWORD: `${API_BASE_URL.DEV}/auth/forget-password-verify`,
  CHANGE_PASSWORD: `${API_BASE_URL.DEV}/auth/change-password`,
};
