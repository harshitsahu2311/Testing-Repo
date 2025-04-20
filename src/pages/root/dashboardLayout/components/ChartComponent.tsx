import {
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
  Area,
  AreaChart,
} from "recharts";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";

interface ChartProps {
  chartTitle?: string;
  chartType?: "onboarding" | "tickets" | "raisedTickets";
  data?: any;
  isLoading?: boolean;
  summaryValue?: string | number;
  summaryLabel?: string;
  summaryChange?: number;
}

type ChartType = "line" | "bar" | "pie";

const ChartComponent = ({
  chartTitle = "Chart Data",
  chartType = "onboarding",
  data,
  isLoading = false,
  summaryValue = "5531",
  summaryLabel = "Users",
  summaryChange = 47,
}: ChartProps) => {
  const [selectedChartType, setSelectedChartType] = useState<ChartType>("line");
  const isMobile = useMediaQuery("(max-width:767px)");
  const isMediumScreen = useMediaQuery("(max-width:1439px)");

  const chartConfig: {
    [key: string]: {
      dataKeys: string[];
      labels: string[];
      colors: string[];
    };
  } = {
    onboarding: {
      dataKeys: ["rentalUsers", "bikeTaxiUsers"],
      labels: ["Rental Users", "Bike Taxi Users"],
      colors: ["#4DA4C1", "#007DA7"],
    },
    tickets: {
      dataKeys: ["openTickets", "resolvedTickets"],
      labels: ["Open Tickets", "Resolved Tickets"],
      colors: ["#4DA4C1", "#007DA7"],
    },
    raisedTickets: {
      dataKeys: ["raisedTickets", "processingTickets"],
      labels: ["Raised Tickets", "Processing Tickets"],
      colors: ["#4DA4C1", "#007DA7"],
    },
    line: {
      dataKeys: ["rentalUsers", "bikeTaxiUsers"],
      labels: ["Rental Users", "Bike Taxi Users"],
      colors: ["#4DA4C1", "#007DA7"],
    },
    bar: {
      dataKeys: ["rentalUsers", "bikeTaxiUsers"],
      labels: ["Rental Users", "Bike Taxi Users"],
      colors: ["#4DA4C1", "#007DA7"],
    },
    pie: {
      dataKeys: ["rentalUsers", "bikeTaxiUsers"],
      labels: ["Rental Users", "Bike Taxi Users"],
      colors: ["#4DA4C1", "#007DA7"],
    },
  };

  const config = chartConfig[chartType] || chartConfig.onboarding;
  const { dataKeys, labels, colors } = config;

  useEffect(() => {
    console.log("chart type", selectedChartType);
  }, [selectedChartType]);

  const defaultData = [
    {
      month: "Jan",
      rentalUsers: 5000,
      bikeTaxiUsers: 3000,
      openTickets: 1000,
      resolvedTickets: 500,
      raisedTickets: 700,
      processingTickets: 300,
    },
    {
      month: "Feb",
      rentalUsers: 4000,
      bikeTaxiUsers: 2500,
      openTickets: 1200,
      resolvedTickets: 600,
      raisedTickets: 800,
      processingTickets: 400,
    },
    {
      month: "Mar",
      rentalUsers: 6000,
      bikeTaxiUsers: 4000,
      openTickets: 900,
      resolvedTickets: 700,
      raisedTickets: 500,
      processingTickets: 200,
    },
  ];

  const chartData = data || defaultData;

  const preparedChartData = chartData.map((item: any) => {
    const result: { [key: string]: string | number } = { month: item.month };

    dataKeys.forEach((key) => {
      if (typeof item[key] !== "undefined") {
        result[key] = item[key];
      } else {
        result[key] = 0;
      }
    });

    return result;
  });

  const pieData = preparedChartData
    ? [
        {
          name: labels[0],
          value: preparedChartData.reduce((sum: number, item: any) => {
            const value = item[dataKeys[0]];
            return sum + (typeof value === "number" ? value : 0);
          }, 0),
        },
        {
          name: labels[1],
          value: preparedChartData.reduce((sum: number, item: any) => {
            const value = item[dataKeys[1]];
            return sum + (typeof value === "number" ? value : 0);
          }, 0),
        },
      ]
    : [];

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="flex justify-center items-center h-full">
          <p>No data available</p>
        </div>
      );
    }

    const commonProps = {
      data: preparedChartData,
      margin: { top: 5, right: 15, left: -20, bottom: 20 },
      scrollable: true,
      scrollBegin: 0,
      scrollEnd: 100,
    };

    switch (selectedChartType) {
      case "line":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient
                id={`color${dataKeys[0]}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id={`color${dataKeys[1]}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[1]} stopOpacity={0} />
              </linearGradient>
            </defs>
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
              dy={12}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000} K`}
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
              formatter={(value, name) => {
                const index = dataKeys.indexOf(name as string);
                return [value, index !== -1 ? labels[index] : name];
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKeys[0]}
              stroke={colors[0]}
              fillOpacity={1}
              fill={`url(#color${dataKeys[0]})`}
              name={labels[0]}
            />
            <Area
              type="monotone"
              dataKey={dataKeys[1]}
              stroke={colors[1]}
              fillOpacity={1}
              fill={`url(#color${dataKeys[1]})`}
              name={labels[1]}
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps} barCategoryGap={15}>
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
              dy={12}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000} K`}
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
              formatter={(value, name) => {
                const index = dataKeys.indexOf(name as string);
                return [value, index !== -1 ? labels[index] : name];
              }}
            />
            <Bar
              dataKey={dataKeys[0]}
              fill={colors[0]}
              radius={[4, 4, 0, 0]}
              name={labels[0]}
              barSize={isMediumScreen ? 10 : 18}
            />
            <Bar
              dataKey={dataKeys[1]}
              fill={colors[1]}
              radius={[4, 4, 0, 0]}
              name={labels[1]}
              barSize={isMediumScreen ? 10 : 18}
            />
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
              nameKey="name"
              label={({ name, percent, x, y, cx }) => (
                <text
                  x={x}
                  y={y}
                  textAnchor={isMobile ? "middle" : x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  fill="#333"
                  className="text-sm md:text-base"
                >
                  {`${name}: ${(percent * 100).toFixed(0)}%`}
                </text>
              )}
            >
              {pieData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: "6px",
                fontSize: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        );
      default:
        return (
          <AreaChart
            data={preparedChartData}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`color${dataKeys[0]}-default`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id={`color${dataKeys[1]}-default`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[1]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                const index = dataKeys.indexOf(name as string);
                return [value, index !== -1 ? labels[index] : name];
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKeys[0]}
              stroke={colors[0]}
              fillOpacity={1}
              fill={`url(#color${dataKeys[0]}-default)`}
              name={labels[0]}
            />
            <Area
              type="monotone"
              dataKey={dataKeys[1]}
              stroke={colors[1]}
              fillOpacity={1}
              fill={`url(#color${dataKeys[1]}-default)`}
              name={labels[1]}
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
              {summaryValue}
            </p>

            <div className="flex items-center">
              <KeyboardDoubleArrowUpOutlinedIcon sx={{ color: "#007DA7" }} />
              <p className="flex items-center text-sm lg:text-base xl:text-lg">
                <span className="text-sm lg:text-base xl:text-lg font-bold text-[#020126]">
                  {summaryChange}
                </span>
                &nbsp;
                {summaryLabel}
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
              value={selectedChartType}
              onChange={(event) =>
                setSelectedChartType(event.target.value as ChartType)
              }
              size="small"
              sx={{
                fontSize: "14px",
              }}
            >
              <MenuItem value={"line"}>Line</MenuItem>
              <MenuItem value={"bar"}>Bar</MenuItem>
              <MenuItem value={"pie"}>Pie</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {selectedChartType !== "pie" && (
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <ResponsiveContainer width="100%" height={400}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {selectedChartType === "pie" && (
        <div className="flex justify-center items-center">
          <ResponsiveContainer height={400} width="90%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
