import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import HeaderUI from "./components/Header";
import Footer from "./components/Footer";
import ShopPage from "./components/Shop";
import Login from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAcc";
import ForgotPassword from "./pages/ForgotPassword";
import AdminHomeScreen from "./pages/Admin/AdminHomeScreen";
import EditProductScreen from "./pages/Admin/EditProductScreen";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import EditUsersScreen from "./pages/Admin/EditUserScreen";
import EditOrder from "./pages/Admin/EditOrder";
import Orders from "./pages/Admin/Orders";
import CheckoutPage from "./pages/CheckoutPage";
import Account from "./pages/Account";
import OrderScreen from "./pages/OrderScreen";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Shipping from "./pages/Shipping";

export default function App() {
  return (
    <>
      <HeaderUI />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/forgotPass" element={<ForgotPassword />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/order/:id" element={<OrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          
          {/* New Legal and Info Pages */}
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/shipping" element={<Shipping />} />

          <Route path="/admin/*" element={<ProtectedAdminRoute><AdminHomeScreen /></ProtectedAdminRoute>} />
          <Route path="/product/create" element={<ProtectedAdminRoute><CreateProduct /></ProtectedAdminRoute>} />

          <Route path="/product/:id/edit" element={<ProtectedAdminRoute><EditProductScreen /></ProtectedAdminRoute>} />
          <Route path="/user/:id/edit" element={<ProtectedAdminRoute><EditUsersScreen /></ProtectedAdminRoute>} />
          <Route path="/order/:id/edit" element={<ProtectedAdminRoute><EditOrder /></ProtectedAdminRoute>} />
        </Routes>
      </ScrollToTop>
      <Footer />
    </>
  );
}
