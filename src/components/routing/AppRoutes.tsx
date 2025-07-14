
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import LoginPage from '@/components/LoginPage';
import { Profile } from '@/components/pages/Profile';
import { Calendar } from '@/components/pages/Calendar';
import { Reports } from '@/components/pages/Reports';
import { Students } from '@/components/pages/Students';
import { Staff } from '@/components/pages/Staff';
import { Classes } from '@/components/pages/Classes';
import { Finances } from '@/components/pages/Finances';
import { Analytics } from '@/components/pages/Analytics';
import { Settings } from '@/components/pages/Settings';
import { Timetable } from '@/components/pages/Timetable';
import { Assignments } from '@/components/pages/Assignments';
import { Results } from '@/components/pages/Results';
import { Notifications } from '@/components/pages/Notifications';
import { Attendance } from '@/components/pages/Attendance';
import { Facilities } from '@/components/pages/Facilities';
import { Communication } from '@/components/pages/Communication';
import { Help } from '@/components/pages/Help';
import { Library } from '@/components/pages/Library';
import About from '@/pages/About';
import WhyUs from '@/pages/WhyUs';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Disclaimer from '@/pages/Disclaimer';
import NotFound from '@/pages/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import { Dashboard } from './Dashboard';
import { pageTransitions } from '@/config/pageTransitions';

// Enhanced page transitions for school environment
const schoolPageTransitions = {
  slideIn: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  },
  zoomFade: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 }
  },
  bounceIn: {
    initial: { scale: 0.3, opacity: 0, y: 100 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.8, opacity: 0, y: -50 }
  },
  flipIn: {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: 90, opacity: 0 }
  }
};

export const AppRoutes: React.FC = () => {
  const location = useLocation();
  const [transition, setTransition] = useState<any>(schoolPageTransitions.slideIn);

  useEffect(() => {
    const transitions = Object.values(schoolPageTransitions);
    const randomIndex = Math.floor(Math.random() * transitions.length);
    setTransition(transitions[randomIndex]);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={transition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ 
          duration: 0.6, 
          ease: [0.68, -0.55, 0.265, 1.55],
          type: "spring",
          damping: 20,
          stiffness: 300
        }}
      >
        <Routes location={location}>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/calendar" element={
            <ProtectedRoute>
              <Layout>
                <Calendar />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/students" element={
            <ProtectedRoute>
              <Layout>
                <Students />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/staff" element={
            <ProtectedRoute>
              <Layout>
                <Staff />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/classes" element={
            <ProtectedRoute>
              <Layout>
                <Classes />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/finances" element={
            <ProtectedRoute>
              <Layout>
                <Finances />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/analytics" element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/timetable" element={
            <ProtectedRoute>
              <Layout>
                <Timetable />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/assignments" element={
            <ProtectedRoute>
              <Layout>
                <Assignments />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/results" element={
            <ProtectedRoute>
              <Layout>
                <Results />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/notifications" element={
            <ProtectedRoute>
              <Layout>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/attendance" element={
            <ProtectedRoute>
              <Layout>
                <Attendance />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/facilities" element={
            <ProtectedRoute>
              <Layout>
                <Facilities />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/communication" element={
            <ProtectedRoute>
              <Layout>
                <Communication />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/library" element={
            <ProtectedRoute>
              <Layout>
                <Library />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/help" element={
            <ProtectedRoute>
              <Layout>
                <Help />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};
