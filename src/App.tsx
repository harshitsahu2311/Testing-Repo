import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "./pages/root/notFoundPage/notFoundPage";
import CustomerView from "./pages/root/customer/Customer.view";
import Login from "./pages/auth/Login";
import CustomerDetailsView from "./pages/root/customerDetails/CustomerDetailsView";
import TicketsPage from "./pages/root/tickets/TicketsPage";
import RecentView from "./pages/root/recentActivity/RecentView";
import DashboardView from "./pages/root/dashboardLayout/dashboard.view";
import BikeTaxiView from "./pages/root/billing/Billing.view";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardView />} />
      <Route path="/rental" element={<CustomerView />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/tickets/:id" element={<TicketsPage />} />{" "}
      {/* Route for ticket details */}
      <Route path="/bike-taxi" element={<BikeTaxiView />} />
      <Route path="/recent-activity" element={<RecentView />} />
      <Route path="/customer-details/:id" element={<CustomerDetailsView />} />
      <Route path="/taxi-details/:id" element={<CustomerDetailsView />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
