import {
  Area,
  AreaChart,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

interface LineChartProps {
  chartTitle: string;
  data?: { month: string; rentalUsers: number; bikeTaxiUsers: number }[];
  isLoading?: boolean;
}

import { useState } from "react";

import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";

// Type for chart types
type ChartType = "line" | "bar" | "pie";

// Default data in case data is not provided
const defaultData = [
  { month: "Jan", rentalUsers: 90000, bikeTaxiUsers: 20000 },
  { month: "Feb", rentalUsers: 25000, bikeTaxiUsers: 25000 },
  { month: "Mar", rentalUsers: 30000, bikeTaxiUsers: 80000 },
  { month: "Apr", rentalUsers: 55000, bikeTaxiUsers: 35000 },
  { month: "May", rentalUsers: 39000, bikeTaxiUsers: 19000 },
  { month: "Jun", rentalUsers: 70000, bikeTaxiUsers: 10000 },
  { month: "Jul", rentalUsers: 120000, bikeTaxiUsers: 170000 },
  { month: "Aug", rentalUsers: 70000, bikeTaxiUsers: 70500 },
  { month: "Sep", rentalUsers: 100000, bikeTaxiUsers: 100000 },
  { month: "Oct", rentalUsers: 95000, bikeTaxiUsers: 95000 },
  { month: "Nov", rentalUsers: 98000, bikeTaxiUsers: 98000 },
  { month: "Dec", rentalUsers: 120000, bikeTaxiUsers: 120000 },
];

const MetricsChart = ({ chartTitle, isLoading = false }: LineChartProps) => {
  // Define the chart type state
  const [chartType, setChartType] = useState<ChartType>("line");

  // Use provided data or fall back to default data
  const chartData = defaultData;

  // Correctly prepare the pie chart data based on the API's structure
  const pieData = [
    {
      name: "Rental Users",
      value: chartData.reduce((sum, item) => sum + item.rentalUsers, 0),
    },
    {
      name: "Bike Taxi Users",
      value: chartData.reduce((sum, item) => sum + item.bikeTaxiUsers, 0),
    },
  ];

  const COLORS = ["#8884d8", "#83a6ed"];

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      );
    }

    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 15, left: -10, bottom: 20 },
      scrollable: true,
      scrollBegin: 0,
      scrollEnd: 100,
    };

    switch (chartType) {
      case "line":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval={0}
              minTickGap={20}
              dy={10}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
              tickCount={10}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: "6px",
                fontSize: "14px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="rentalUsers"
              stroke="#007DA7"
              fillOpacity={1}
              fill="url(#colorUsers)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="bikeTaxiUsers"
              stroke="#007DA7"
              fillOpacity={1}
              fill="url(#colorUsers)"
              strokeWidth={2}
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval={0}
              minTickGap={30}
              height={60}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
              tickCount={10}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: "6px",
                fontSize: "14px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="rentalUsers" fill="#007DA7" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: "6px",
                fontSize: "14px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        );
      default:
        return (
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            {/* Default chart if none matches */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="rentalUsers"
              fill="#007DA7"
              stroke="#007DA7"
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-[27px] border border-[#D0D0DA]">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between gap-1 ">
          <h1 className="text-xs lg:text-sm xl:text-base font-medium text-left">
            {chartTitle}
          </h1>
          <div className="flex items-center gap-[10px] 2xl:gap-[16px]">
            <p className="text-sm font-bold text-left lg:text-base xl:text-lg ">
              5531
            </p>

            <div className="flex items-center">
              <KeyboardDoubleArrowUpOutlinedIcon sx={{ color: "#007DA7" }} />
              <p className="flex items-center text-sm lg:text-base xl:text-lg">
                <span className="text-sm lg:text-base xl:text-lg font-bold text-[#020126]">
                  47
                </span>
                &nbsp;
                {chartTitle === "Customer Onboarding Metrics"
                  ? "Users"
                  : "Tickets"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[35%] md:w-[25%] xl:w-[15%]">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="status-form-label" sx={{ fontSize: "14px" }}>
              Graph Type
            </InputLabel>
            <Select
              labelId="status-form-label"
              id="status-form"
              label="Graph Type"
              value={chartType}
              onChange={(event) =>
                setChartType(event.target.value as ChartType)
              }
              size="small"
              sx={{
                fontSize: "14px",
                "& .MuiSelect-select": {
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                },
              }}
            >
              <MenuItem value={"line"}>Line</MenuItem>
              <MenuItem value={"bar"}>Bar</MenuItem>
              <MenuItem value={"pie"}>Pie</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={400}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricsChart;
