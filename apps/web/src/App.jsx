import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import HRServiceDetailPage from './pages/HRServiceDetailPage.jsx';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import BlogsPage from "./pages/BlogsPage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogDetailPage from "./pages/BlogDetailPage";
import IndustryDetailPage from "./pages/IndustryDetailPage";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  useEffect(() => {
    try {
      // Trigger Apollo page view tracking on route change
      if (typeof window.apolloTracking === 'function') {
        window.apolloTracking('trackPageView', { path: location.pathname });
      } else if (window.apolloTracking && typeof window.apolloTracking.track === 'function') {
        window.apolloTracking.track('page_view', { path: location.pathname });
      }
    } catch (error) {
      console.error('Apollo tracking error on route change:', error);
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><ProductsPage /></PageWrapper>} />
        <Route path="/products/:productId" element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        {/* <Route path="/services/hr/:slug" element={<PageWrapper><HRServiceDetailPage /></PageWrapper>} /> */}
        <Route path="/services/:serviceId" element={<PageWrapper><ServiceDetailPage /></PageWrapper>} />
        <Route path="/careers" element={<PageWrapper><CareersPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/admin/login" element={<Login />} />
        <Route
  path="/blogs"
  element={
    <PageWrapper>
      <BlogsPage />
    </PageWrapper>
  }
/>

<Route
  path="/industries/:industryId"
  element={<IndustryDetailPage />}
/>
<Route
  path="/blogs/:slug"
  element={
    <PageWrapper>
      <BlogDetailPage />
    </PageWrapper>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <PageWrapper>
        <AdminDashboard />
      </PageWrapper>
    </ProtectedRoute>
  }
/>
        {/* Catch-all route for 404s */}
        <Route path="*" element={<PageWrapper><HomePage /></PageWrapper>} />
        
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" theme="dark" />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
