import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import ProductsAdmin from "../pages/admin/ProductsAdmin";
import CreateProduct from "../pages/admin/CreateProduct";
import EditProduct from "../pages/admin/EditProduct";
import CategoriesAdmin from "../pages/admin/CategoriesAdmin";
import SettingsAdmin from "../pages/admin/SettingsAdmin";
import CarouselAdmin from "../pages/admin/CarouselAdmin";
import TestimonialsAdmin from "../pages/admin/TestimonialsAdmin";
import ProtectedRoute from "../components/ProtectedRoute";

  
  export default function AppRoutes() {
  
    return (
  
      <BrowserRouter>
  
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ProductsAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products/create"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <CategoriesAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <SettingsAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/carousel"
            element={
              <ProtectedRoute>
                <CarouselAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute>
                <TestimonialsAdmin />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
  
    );
  }