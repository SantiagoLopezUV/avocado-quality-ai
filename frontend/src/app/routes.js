import { createBrowserRouter } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HelpPage from "./pages/HelpPage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Root from "./pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LoginPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "marketplace", Component: MarketplacePage },
      { path: "history", Component: HistoryPage },
      { path: "profile", Component: ProfilePage },
      { path: "help", Component: HelpPage },
      { path: "forgot-password", Component: ForgotPasswordPage },
      { path: "reset-password", Component: ResetPasswordPage },
    ],
  },
]);