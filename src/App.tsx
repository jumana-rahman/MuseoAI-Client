import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Providers from "./providers/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Museums from "./pages/Museums";
import MuseumDetail from "./pages/MuseumDetail";
import Favorites from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Recommendations from "./pages/Recommendations";
import GuideDetail from "./pages/GuideDetail";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#D8B892] border-t-[#4E342E] rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
}

function Layout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/museums" element={<Museums />} />
          <Route path="/museums/:id" element={<ErrorBoundary><MuseumDetail /></ErrorBoundary>} />
          <Route path="/guides/:id" element={<GuideDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/items/add" element={<ProtectedRoute><Navigate to="/dashboard/add-guide" replace /></ProtectedRoute>} />
          <Route path="/items/manage" element={<ProtectedRoute><Navigate to="/dashboard/my-guides" replace /></ProtectedRoute>} />
          <Route path="/dashboard/manage-guides" element={<ProtectedRoute><Navigate to="/dashboard/my-guides" replace /></ProtectedRoute>} />
        </Route>
        <Route path="/dashboard/*" element={<ProtectedRoute><ErrorBoundary><Dashboard /></ErrorBoundary></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-8xl font-bold text-[#EDD9BC] mb-4">404</p>
        <h2 className="font-display text-2xl text-[#4E342E] font-bold mb-2">Page Not Found</h2>
        <p className="text-[#8B857C] mb-8">The page you're looking for doesn't exist in our gallery.</p>
        <a href="/" className="bg-[#4E342E] text-[#F8F5F0] px-6 py-3 rounded-2xl font-semibold hover:bg-[#A65E2E] transition-colors text-sm">
          Return Home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Providers>
      <Toaster position="top-right" richColors closeButton />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Providers>
  );
}
