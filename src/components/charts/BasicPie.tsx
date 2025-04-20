
import { PieChart } from "@mui/x-charts/PieChart";
import { legendClasses } from "@mui/x-charts";

interface AnalyticsData {
  totalRides: number;
  values: {
    label: string;
    value: number;
  }[];
}

interface BasicPieProps {
  analyticsData?: AnalyticsData;
}

export default function BasicPie({ analyticsData }: BasicPieProps) {
  const palette = ["#9CC99E", "#F77E7E", "#FFCDCD"];
  
  // Use default data if analytics data is not available
  const pieData = analyticsData?.values || [
    { label: "Completed", value: 47 },
    { label: "Cancelled", value: 62 },
    { label: "Cancelled By Customer", value: 47 },
  ];
  
  // Format labels to capitalize first letter
  const formattedData = pieData.map(item => ({
    id: item.label,
    value: item.value,
    label: item.label.charAt(0).toUpperCase() + item.label.slice(1)
  }));

  return (
    <PieChart
      colors={palette}
      series={[
        {
          data: formattedData,
          innerRadius: 50,
          cx: 200,
          paddingAngle: 5,
        },
      ]}

      sx={{
        [`& .${legendClasses.mark}`]: {
          rx: 8, // Sets horizontal border radius to 8px
          ry: 8, // Sets vertical border radius to 8px
        },
      }}
      slotProps={{
        legend: {
          itemMarkWidth: 42,
          itemMarkHeight: 32,
          markGap: 16,
          itemGap: 16,
        },
      }}
    />
  );
}
