import { Divider } from "@mui/material";
import CreditIcon from "@/assets/svg/CreditIcon";
import CreditRateIcon from "@/assets/svg/CreditRateIcon";
import InsightIcon from "@/assets/svg/InsightIcon";
import DateRangePicker from "@/components/date-range-picker";
import Greetings from "@/components/greeting";
import Insights from "@/components/insights";
import ProtectedLayout from "@/layout/ProtectedLayout";
import Activities from "./components/Activities";
import RecentEmployees from "./components/RecentEmployees";
import ChartComponent from "./components/ChartComponent";
import { useDashboard } from "@/hooks/useDashboard";

const CustomerManagerIcon = () => {
  return (
    <div className="h-fit w-fit px-4 py-2 rounded-[10px] font-[500] text-AccentBlue flex justify-center items-center bg-SoftBlue">
      N
    </div>
  );
};

const DashboardView = () => {
  const { dashboardData, isLoading, currentDateRange, setDateRange } =
    useDashboard();

  // Get summary values for each chart
  const getOnboardingSummary = () => {
    if (!dashboardData || !dashboardData.data.onBoardingData)
      return { value: 0, change: 0 };

    // Sum the rental users for the entire period as the total value
    const totalRentalUsers = dashboardData.data.onBoardingData.reduce(
      (sum, item) => sum + (item.rentalUsers || 0),
      0
    );

    // Use customer onboarding metric for the change percentage if available
    const changePercent =
      dashboardData.data.metrics.find((m) => m.title === "Customer Onboarding")
        ?.change.percent || 0;

    return { value: totalRentalUsers, change: changePercent };
  };

  const getTicketsSummary = () => {
    if (!dashboardData || !dashboardData.data.raiseTicketData)
      return { value: 0, change: 0 };

    // Sum the raised tickets for the entire period as the total value
    const totalRaisedTickets = dashboardData.data.raiseTicketData.reduce(
      (sum, item) => sum + (item.raisedTickets || 0),
      0
    );

    // Use opened tickets metric for the change percentage if available
    const changePercent =
      dashboardData.data.metrics.find((m) => m.title === "Opened Tickets")
        ?.change.percent || 0;

    return { value: totalRaisedTickets, change: changePercent };
  };

  const getOpenResolvedSummary = () => {
    if (!dashboardData || !dashboardData.data.openResolvedTickets)
      return { value: 0, change: 0 };

    // Sum the open tickets for the entire period as the total value
    const totalOpenTickets = dashboardData.data.openResolvedTickets.reduce(
      (sum, item) => sum + (item.openTickets || 0),
      0
    );

    // Use active tickets metric for the change percentage if available
    const changePercent =
      dashboardData.data.metrics.find((m) => m.title === "Active Tickets")
        ?.change.percent || 0;

    return { value: totalOpenTickets, change: changePercent };
  };

  // Get summary data for each chart
  const onboardingSummary = getOnboardingSummary();
  const ticketsSummary = getTicketsSummary();
  const openResolvedSummary = getOpenResolvedSummary();

  return (
    <>
      <ProtectedLayout>
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex flex-col gap-6 p-4 overflow-x-hidden overflow-y-scroll md:w-[calc(100%-270px)]">
            {/* GREETINGS HEADER */}
            <div className="flex justify-between items-center">
              <Greetings />
              <CustomerManagerIcon />
            </div>

            {/* DATE RANGE PICKER */}
            <div className="mt-4">
              <DateRangePicker
                currentDateRange={currentDateRange}
                setDateRange={setDateRange}
              />
            </div>

            {/* INSIGHTS */}
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-4 xl:gap-0 xl:flex-nowrap xl:justify-between">
              {isLoading ? (
                <>
                  <Insights
                    title="Active Tickets"
                    value={"Loading..."}
                    change={true}
                    icon={<InsightIcon />}
                  />
                  <Insights
                    title="Resolved Tickets"
                    value={"Loading..."}
                    change={false}
                    icon={<CreditIcon />}
                  />
                  <Insights
                    title="Opened Tickets"
                    value={"Loading..."}
                    change={true}
                    icon={<CreditRateIcon />}
                  />
                </>
              ) : (
                dashboardData?.data.metrics.map((metric, index) => {
                  const icons = [
                    <InsightIcon key="insight" />,
                    <CreditIcon key="credit" />,
                    <CreditRateIcon key="creditRate" />,
                  ];

                  return (
                    <Insights
                      key={index}
                      title={metric.title}
                      value={metric.value.toString()}
                      change={metric.change.direction === "up"}
                      icon={icons[index]}
                      changePercent={metric.change.percent}
                      changeSince="last month"
                    />
                  );
                })
              )}
            </div>

            {/* CHARTS */}
            <div className="flex flex-col gap-6">
              <ChartComponent
                chartType="onboarding"
                chartTitle="Customer Onboarding Metrics"
                data={dashboardData?.data.onBoardingData}
                isLoading={isLoading}
                summaryValue={onboardingSummary.value}
                summaryChange={onboardingSummary.change}
                summaryLabel="Users"
              />
              <ChartComponent
                chartType="raisedTickets"
                chartTitle="Raised Tickets"
                data={dashboardData?.data.raiseTicketData}
                isLoading={isLoading}
                summaryValue={ticketsSummary.value}
                summaryChange={ticketsSummary.change}
                summaryLabel="Tickets"
              />
              <ChartComponent
                chartType="tickets"
                chartTitle="Open and Resolved Tickets"
                data={dashboardData?.data.openResolvedTickets}
                isLoading={isLoading}
                summaryValue={openResolvedSummary.value}
                summaryChange={openResolvedSummary.change}
                summaryLabel="Tickets"
              />
            </div>
          </div>

          <Divider className="md:hidden" />

          <div className="md:w-[270px] flex flex-col p-3 gap-4 md:overflow-y-scroll">
            <Activities />
            <RecentEmployees />
          </div>
        </div>
      </ProtectedLayout>
    </>
  );
};

export default DashboardView;
