import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectRoute from "./auth/ProtectRoute";
import RestaurantPage from "./pages/RestaurantPage";
import SearchPage from "./pages/SearchPage";

const AppRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        }
      />

      <Route element={<ProtectRoute />}>
        <Route 
          path='/user-profile'
          element={
            <Layout>
                <UserProfilePage />
            </Layout>
          }
        />
      </Route>
        
      <Route element={<ProtectRoute />}>
        <Route 
          path='/manage-restaurant'
          element={
            <Layout>
                <RestaurantPage />
            </Layout>
          }
        />
      </Route>
      
      <Route 
          path='/search/:city'
          element={
            <Layout>
                <SearchPage />
            </Layout>
          }
        />

      <Route path='/auth-callback' element={<AuthCallBackPage />} />
    </Routes>
  );
};

export default AppRoute;
