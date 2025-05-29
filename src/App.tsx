import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RideHistory from './pages/RideHistory';
import Profile from './pages/Profile';
import UberStyle from './pages/UberStyle';
import Wallet from './pages/Wallet';
import Receipts from './pages/Receipts';
import Account from './pages/Account';
import { 
  HomeIcon,
  ClockIcon,
  UserIcon,
  MapIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';

// Layout component
const Layout = () => {
  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Protected route component
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!loading && !isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // While loading, show a loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="p-8 rounded-xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-black">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the children
  return isAuthenticated ? <Outlet /> : null;
};

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/uber-style" element={<UberStyle />} />
              <Route path="/history" element={<RideHistory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/receipts" element={<Receipts />} />
              <Route path="/account" element={<Account />} />
            </Route>
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
