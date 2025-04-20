import { AppBar, Tabs, Tab, Box } from "@mui/material";
import RouteIcon from "@mui/icons-material/Route";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useState } from "react";
import RideHistory from "./RideHistory";
import PersonalDetails from "./PersonalDetails";
import AnalyticsContent from "./AnalyticsContent";
import MapContent from "./MapContent";

interface CustomerDashboardProps {
  customerData: {
    data: any;
    message?: string;
    errors?: null | any;
    code?: string;
  } | null;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  customerData,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="h-[600px] border-[10px] border-LightGray overflow-hidden">
        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            boxShadow: "none",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#007DA7",
              },
              "& .Mui-selected": {
                color: "#007DA7",
              },
            }}
          >
            <Tab
              icon={<RouteIcon />}
              label="Map"
              iconPosition="start"
              sx={{ fontSize: "0.7rem" }}
            />
            <Tab
              icon={<TwoWheelerIcon />}
              label="Ride History"
              iconPosition="start"
              sx={{ fontSize: "0.7rem" }}
            />
            <Tab
              icon={<PersonOutlineIcon />}
              label="Personal details"
              iconPosition="start"
              sx={{ fontSize: "0.7rem" }}
            />
            <Tab
              icon={<AutoGraphIcon />}
              label="Analytics"
              iconPosition="start"
              sx={{ fontSize: "0.7rem" }}
            />
          </Tabs>
        </AppBar>

        {activeTab === 1 && (
          <Box className="h-[calc(100%-70px)] overflow-auto flex items-center space">
            {activeTab === 1 && <RideHistory />}
          </Box>
        )}

        {activeTab === 2 && (
          <Box className="h-[calc(100%-70px)] overflow-auto flex space px-[27px]">
            {activeTab === 2 && <PersonalDetails customerData={customerData} />}
          </Box>
        )}

        {activeTab === 3 && (
          <Box className="h-[calc(100%-70px)] overflow-auto flex items-center space 2xl:px-[108px] 2xl:py-[200px]">
            {activeTab === 3 && <AnalyticsContent />}
          </Box>
        )}
        {activeTab === 0 && (
          <Box className="h-[calc(100%-70px)] overflow-auto flex items-center space  ">
            {activeTab === 0 && <MapContent />}
          </Box>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
