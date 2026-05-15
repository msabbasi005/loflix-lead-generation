import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminLeads from './pages/admin/Leads';
import AdminPricing from './pages/admin/AdminPricing';
import AdminServices from './pages/admin/AdminServices';
import AdminContact from './pages/admin/AdminContact';
import AdminStats from './pages/admin/AdminStats';
import AdminTeam from './pages/admin/AdminTeam';
import AdminAbout from './pages/admin/AdminAbout';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="about" element={<AdminAbout />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
