import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LoginPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "marketplace", Component: MarketplacePage },
      { path: "profile", Component: ProfilePage },
      { path: "help", Component: HelpPage },
    ],
  },
]);