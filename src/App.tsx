import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import AcademicsSection from './components/AcademicsSection';
import AdmissionsCTA from './components/AdmissionsCTA';
import LearningSpaces from './components/LearningSpaces';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import NoticeBoard from './components/NoticeBoard';
import QuickPortals from './components/QuickPortals';

// Pages
import IntroductionPage from './pages/IntroductionPage';
import ManagementDeskPage from './pages/ManagementDeskPage';
import FacilitiesPage from './pages/FacilitiesPage';
import AdmissionProcessPage from './pages/AdmissionProcessPage';
import UniformTimingsPage from './pages/UniformTimingsPage';
import CbseCurriculumPage from './pages/CbseCurriculumPage';
import ContactPage from './pages/ContactPage';
import MandatoryDisclosurePage from './pages/MandatoryDisclosurePage';
import EventGalleryPage from './pages/EventGalleryPage';
import AchieversPage from './pages/AchieversPage';
import ResultsPage from './pages/ResultsPage';
import TransferCertificatePage from './pages/TransferCertificatePage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function HomePage() {
  return (
    <>
      <HeroBanner />
      <NoticeBoard />
      <QuickPortals />
      <AboutSection />
      <AcademicsSection />
      <LearningSpaces />
      <AdmissionsCTA />
    </>
  );
}

function App() {
  useSmoothScroll();
  useScrollAnimation(); // Triggers CSS animations as sections scroll into view

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/managements-desk" element={<ManagementDeskPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/admission-process" element={<AdmissionProcessPage />} />
        <Route path="/school-uniform-timings" element={<UniformTimingsPage />} />
        <Route path="/cbse-curriculum" element={<CbseCurriculumPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/mandatory-disclosure" element={<MandatoryDisclosurePage />} />
        <Route path="/events" element={<EventGalleryPage />} />
        <Route path="/achievers" element={<AchieversPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/tc" element={<TransferCertificatePage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
