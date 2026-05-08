import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';

// Pages
import LandingPage from '../pages/Landing/LandingPage';
import Features from '../pages/Landing/Features';
import Pricing from '../pages/Landing/Pricing';
import Blogs from '../pages/Landing/Blogs';
import JoinUs from '../pages/Landing/JoinUs';
import PublicPlaceholder from '../pages/Landing/PublicPlaceholder';

import SignIn from '../pages/Auth/SignIn';
import Register from '../pages/Auth/Register';
import OTPVerify from '../pages/Auth/OTPVerify';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import SetNewPassword from '../pages/Auth/SetNewPassword';

import DashboardOverview from '../pages/Dashboard/DashboardOverview';
import Products from '../pages/Inventory/Products';
import Settings from '../pages/Dashboard/Settings';
import Profile from '../pages/Dashboard/Profile';
import Subscription from '../pages/Dashboard/Subscription';
import Orders from '../pages/Inventory/Orders';
import Suppliers from '../pages/Inventory/Suppliers';
import Reports from '../pages/Dashboard/Reports';
import Customers from '../pages/Dashboard/Customers';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Pages wrapped securely with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/payment" element={<PublicPlaceholder />} />
        </Route>

        {/* Auth Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTPVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Under Construction Fallbacks */}
          <Route path="orders" element={<Orders />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="customers" element={<Customers />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
