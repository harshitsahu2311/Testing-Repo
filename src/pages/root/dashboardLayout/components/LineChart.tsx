import { useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Box } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";

// Type for Status values (adjust as per your actual values)
type StatusType = "menu1" | "menu2" | "menu3" | "menu4";

const data = [
  { month: "Jan", users: 50 },
  { month: "Feb", users: 150 },
  { month: "Mar", users: 30 },
  { month: "Apr", users: 180 },
  { month: "May", users: 70 },
  { month: "Jun", users: 200 },
  { month: "Jul", users: 40 },
  { month: "Aug", users: 160 },
  { month: "Sep", users: 20 },
  { month: "Oct", users: 190 },
  { month: "Nov", users: 60 },
  { month: "Dec", users: 210 },
];

const ZigZagLineGraph = () => {
  // Define the status state
  const [status, setStatus] = useState<StatusType>("menu1");

  return (
    <Box
      sx={{
        padding: "32px",
        borderRadius: "27px",
        border: "1px solid #D0D0DA",
        marginBottom: "2rem",
      }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col justify-between gap-[11px] ">
          <h1 className="font-[Montserrat] text-[20px] font-medium leading-[20px] tracking-[0.02em] text-left">
            Customer Onboarding Metrics
          </h1>
          <div className="flex items-center gap-[10px] 2xl:gap-[16px]">
            <h1 className="font-[Montserrat] text-[24px] 2xl:text-[32px] font-bold leading-[32px] tracking-[0.02em] text-left ">
              5531
            </h1>

            <div className="flex items-center">
              <KeyboardDoubleArrowUpOutlinedIcon sx={{ color: "#007DA7" }} />
              <p className="flex items-center">
                <span className="font-[Montserrat] text-[16px] font-bold leading-[16px] tracking-[0.02em] text-[#020126]">
                  47
                </span>
                &nbsp;Drivers
              </p>
            </div>
          </div>
        </div>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="status-form-label" sx={{ fontSize: "17px" }}>
            Graph Type
          </InputLabel>
          <Select
            labelId="status-form-label"
            id="status-form"
            label="Graph Type"
            value={status}
            onChange={(event) => setStatus(event.target.value as StatusType)}
          >
            <MenuItem value={"menu1"}>Line</MenuItem>
            <MenuItem value={"menu2"}>Bar</MenuItem>
            <MenuItem value={"menu3"}>Pie</MenuItem>
            <MenuItem value={"menu4"}>Menu Item</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ResponsiveContainer width="100%" height={300} className="mt-[45px]">
        <AreaChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#007DA7"
            fill="#007DA7"
            fillOpacity={0.2}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#007DA7"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ZigZagLineGraph;
