import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/dashboardpage";
import { TrackingPage } from "../pages/TrackingPage";
import { FacilitiesPage } from "../pages/FacilitiesPage";
import { BerthSchedulingPage } from "../pages/berthscheduling";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/tracking", element: <TrackingPage /> },
  { path: "/facilities", element: <FacilitiesPage /> },
  { path: "/berth-scheduling", element: <BerthSchedulingPage /> },
]);