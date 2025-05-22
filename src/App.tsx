import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Employees from './pages/Employees';
import PayslipGenerator from './pages/PayslipGenerator';
import ContributionCalculator from './pages/ContributionCalculator';
import CUGenerator from './pages/CUGenerator';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="payslips" element={<PayslipGenerator />} />
              <Route path="contributions" element={<ContributionCalculator />} />
              <Route path="cu" element={<CUGenerator />} />
              <Route path="documents" element={<Documents />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App