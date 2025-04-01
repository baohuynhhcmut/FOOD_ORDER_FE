import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectRoute from "./auth/ProtectRoute";
import RestaurantPage from "./pages/RestaurantPage";
import SearchPage from "./pages/SearchPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import OrderPage from "./pages/OrderPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import RestaurantDefault from "./pages/Restaurant/RestaurantDefault/RestaurantDefault";
import CreatRestaurant from "./pages/Restaurant/CreatRestaurant";
import EditRestaurant from "./pages/Restaurant/EditRestaurant";
import FoodPage from "./pages/Food/FoodPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import PaymentCallBack from "./pages/Payment/PaymentCallBack";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentFail from "./pages/Payment/PaymentFail";
import Order from "./pages/History/Order";
import Cart from "./pages/Cart/Cart";
import RestaurantClient from "./pages/RestaurantClient/RestaurantClient";
import Overview from "./pages/Dashboard/Overview";
import Dashboard from "./layouts/Dashboard";
import MenuDashboard from "./pages/MenuDashboard";
import OrderDashboard from "./pages/OrderDashboard";
import UserDashbroad from "./pages/UserDashboard";
import ScrollToTop from "./utils/ScrollToTop";
import RestaurantDetail from "./pages/RestaurantClientDetail/RestaurantDetail";
import VoucherDashboard from "./pages/VoucherDashboard/VoucherDashboard";



const AppRoute = () => {
  return (
    <Routes>
     
      <Route
        path="/"
        element={
          <Layout showHero={true}>
             <ScrollToTop />
            <HomePage />
          </Layout>
        }
      />

      <Route
        path="/user-profile"
        element={
          <ProtectedRoute>
            <Layout>
              <ScrollToTop />
              <UserProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-restaurant"
        element={
          <ProtectedRoute>
            <Layout>
            <ScrollToTop />

              <RestaurantDefault />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-restaurant/create"
        element={
          <ProtectedRoute>
            <Layout>
            <ScrollToTop />

              <CreatRestaurant />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/setting/:restaurantId"
        element={
          <ProtectedRoute>
              <Dashboard>
                <ScrollToTop />
                <EditRestaurant />
              </Dashboard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/food"
        element={
            <Layout>
               <ScrollToTop />

              <FoodPage />
            </Layout>
        }
      />


      <Route
        path="/payment/vnpay"
        element={
          <ProtectedRoute>
            <Layout>
            <ScrollToTop />

              <PaymentPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/vnpay-callback"
        element={
          <ProtectedRoute>
            <Layout>
            <ScrollToTop />

                <PaymentCallBack />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/payment/success"
        element={
          <ProtectedRoute>
            <Layout>
            <ScrollToTop />

                <PaymentSuccess />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/fail"
        element={
          <ProtectedRoute>
            <Layout>
            <ScrollToTop />

                <PaymentFail />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/order/history"
        element={
          <ProtectedRoute>
            <Layout>
            <ScrollToTop />

                <Order />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Layout>
            <ScrollToTop />

                <Cart />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant"
        element={
          <ProtectedRoute>
            <Layout>
            <ScrollToTop />
                <RestaurantClient />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/overview/:restaurantId"
        element={
          <Dashboard>
             <ScrollToTop />

              <Overview />
          </Dashboard>
        }
      />

      
      <Route
        path="/dashboard/menu/:restaurantId"
        element={
          <Dashboard>
             <ScrollToTop />

              <MenuDashboard />
          </Dashboard>
        }
      />
      <Route
        path="/dashboard/order/:restaurantId"
        element={
          <Dashboard>
             <ScrollToTop />
              <OrderDashboard />
          </Dashboard>
        }
      />

      <Route
        path="/dashboard/voucher/:restaurantId"
        element={
          <Dashboard>
             <ScrollToTop />
              <VoucherDashboard />
          </Dashboard>
        }
      />


      <Route
        path="/dashboard/user/:restaurantId"
        element={
          <Dashboard>
             <ScrollToTop />
              <UserDashbroad />
          </Dashboard>
        }
      />
      
      <Route
        path="/restaurant/detail/:restaurantId"
        element={
            <ProtectedRoute>
              <Layout>
                <ScrollToTop />
                <RestaurantDetail />
              </Layout>
            </ProtectedRoute>
        }
      />










      <Route element={<ProtectRoute />}>
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
               <ScrollToTop />

              <RestaurantPage />
            </Layout>
          }
        />
      </Route>

      <Route
        path="/search/:city"
        element={
          <Layout>
             <ScrollToTop />

            <SearchPage />
          </Layout>
        }
      />

      <Route
        path="/detail/:id"
        element={
          <Layout>
             <ScrollToTop />

            <RestaurantDetailPage />
          </Layout>
        }
      />

      <Route
        path="/order-status"
        element={
          <Layout>
             <ScrollToTop />

            <OrderPage />
          </Layout>
        }
      />

      <Route
        path="/user-info"
        element={
          <ProtectedRoute>
            <Layout>
              <div>abc</div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="/auth-callback" element={<AuthCallBackPage />} />
    </Routes>
  );
};

export default AppRoute;
