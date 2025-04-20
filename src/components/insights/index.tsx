
import React from "react";
import IncrementIcon from "../../assets/svg/IncrementIcon";
import DecrementIcon from "../../assets/svg/decrementIcon";
interface InsightsProps {
  title: string;
  value: string | number;
  change: boolean;
  icon: React.ReactNode;
  changePercent?: number;
  changeSince?: string;
}
const Insights = ({ title, value, change, icon, changePercent = 8.5, changeSince = "yesterday" }: InsightsProps) => {
  return (
    <div className="md:w-[48%] xl:w-[32%] md:whitespace-nowrap flex flex-col justify-between border shadow-sm border-[#CFCFD9] rounded-[20px] h-28 p-4 ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h4 className="text-[#202224] text-sm md:text-xs xl:text-sm font-[600] opacity-75">
            {title}
          </h4>
          <h5 className="text-base md:text-sm xl:text-base font-[700]">
            {value}
          </h5>
        </div>
        <>{icon}</>
      </div>
      <div>
        <span className="text-sm md:text-xs xl:text-sm font-[600] text-[#606060] flex items-center">
          {change ? <IncrementIcon /> : <DecrementIcon />}{" "}
          <span
            className={`text-sm md:text-xs xl:text-sm font-[600] px-2 ${
              change ? "text-[#00B69B]" : "text-[red]"
            }`}
          >
            {" "}
            {changePercent}%{" "}
          </span>
          {change ? "Up" : "Down"} from {changeSince}.
        </span>
      </div>
    </div>
  );
};

export default Insights;
