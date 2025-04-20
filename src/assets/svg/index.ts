import { FC } from "react";
import loader from "./loader";
import loginbg from "./loginbg";
import floIcon from "./flo-icon";
import handMoney from "./HandMoney";
import filterIcon from "./FilterIcon";
import bellIcon from "./BellIcon";
import billingIcon from "./BillingIcon";
import profileIcon from "./ProfileIcon";
import creditIcon from "./CreditIcon";
import creditRateIcon from "./CreditRateIcon";
import decrementIcon from "./decrementIcon";
import employeeIcon from "./EmployeeIcon";
import homeIcon from "./HomeIcon";
import incrementIcon from "./IncrementIcon";
import insightIcon from "./InsightIcon";
import logoutIcon from "./LogoutIcon";
import tracedIcon from "./TracedIcon";
import userIcon from "./UserIcon";
import walletIcon from "./WalletIcon";
import pdfIcon from "./PdfIcon";
import downloadIcon from "./downloadIcon";
import rentalIcon from "./RentalIcon";

interface IconMap {
  [key: string]: FC<any>;
}

const icons: IconMap = {
  loader,
  loginbg,
  floIcon,
  handMoney,
  filterIcon,
  bellIcon,
  billingIcon,
  creditIcon,
  creditRateIcon,
  homeIcon,
  logoutIcon,
  userIcon,
  walletIcon,
  tracedIcon,
  incrementIcon,
  decrementIcon,
  insightIcon,
  employeeIcon,
  profileIcon,
  pdfIcon,
  downloadIcon,
  rentalIcon,
};
export default icons;
