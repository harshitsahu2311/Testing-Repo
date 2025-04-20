import { FormControl, InputLabel, MenuItem, Select, CircularProgress } from "@mui/material";
import { useState } from "react";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface BarChartProps {
  data?: { month: string; rentalUsers: number; bikeTaxiUsers: number }[];
  isLoading?: boolean;
}

// Default data in case data is not provided
const defaultData = [
  { month: "Jan", value1: 40000, value2: 24000 },
  { month: "Feb", value1: 30000, value2: 13980 },
  { month: "Mar", value1: 20000, value2: 98000 },
  { month: "Apr", value1: 27800, value2: 39080 },
  { month: "May", value1: 18900, value2: 48000 },
  { month: "Jun", value1: 23900, value2: 38000 },
  { month: "Jul", value1: 34900, value2: 43000 },
  { month: "Aug", value1: 41000, value2: 50000 },
  { month: "Sep", value1: 38000, value2: 55000 },
  { month: "Oct", value1: 45000, value2: 60000 },
  { month: "Nov", value1: 50000, value2: 65000 },
  { month: "Dec", value1: 52000, value2: 70000 },
];

const COLORS = ["#4DA4C1", "#007DA7", "#83C5D6"];

type ChartType = "bar" | "line" | "pie";

export default function SimpleBarChart({ data, isLoading = false }: BarChartProps) {
  const [chartType, setChartType] = useState<ChartType>("bar");

  // Map API data format to component data format if data exists
  const chartData = data ? data.map(item => ({
    month: item.month,
    value1: item.rentalUsers,
    value2: item.bikeTaxiUsers
  })) : defaultData;

  // Transform data for pie chart
  const pieData = [
    { name: "Value 1", value: chartData.reduce((sum, item) => sum + item.value1, 0) },
    { name: "Value 2", value: chartData.reduce((sum, item) => sum + item.value2, 0) },
  ];

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      );
    }

    switch (chartType) {
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
              minTickGap={20}
              dy={10}
              dx={-15}
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
            <Bar dataKey="value1" fill="#4DA4C1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="value2" fill="#007DA7" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart
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
            <Line
              type="monotone"
              dataKey="value1"
              stroke="#4DA4C1"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="value2"
              stroke="#007DA7"
              strokeWidth={2}
            />
          </LineChart>
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
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            {/* Default chart if none matches */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value1" fill="#4DA4C1" />
            <Bar dataKey="value2" fill="#007DA7" />
          </BarChart>
        );
    }
  };

  return (
    <div className="border border-[#D0D0DA] p-4 rounded-[27px]">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between gap-1">
          <h1 className="text-xs lg:text-sm xl:text-base font-medium text-left">
            Open and resolved ticket Metrics
          </h1>
          <div className="flex items-center gap-[10px] 2xl:gap-[16px]">
            <p className="text-sm lg:text-base xl:text-lg font-bold text-left">5531</p>
            <div className="flex items-center">
              <KeyboardDoubleArrowUpOutlinedIcon sx={{ color: "#007DA7" }} />
              <p className="flex items-center text-sm lg:text-base xl:text-lg">
                <span className="text-sm lg:text-base xl:text-lg font-bold text-[#020126]">47</span>
                &nbsp;Tickets
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
              <MenuItem value={"bar"}>Bar</MenuItem>
              <MenuItem value={"line"}>Line</MenuItem>
              <MenuItem value={"pie"}>Pie</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={400} className="-ml-[1rem]">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
