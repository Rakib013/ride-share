import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated, redirecting to /home');
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Form submitted with:', email, password);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      const success = await login(email, password);
      console.log('Login success:', success);
      
      if (success) {
        console.log('Redirecting to /home');
        navigate('/home');
      } else {
        setError('Invalid email or password. Try demo@example.com / password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    }
  };

  // For testing purposes, fill in demo credentials
  const fillDemoCredentials = () => {
    setEmail('demo@example.com');
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-black px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">BangiRider</Link>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
        >
          <h1 className="text-3xl font-bold text-black mb-6">Welcome Back</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-500 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                disabled={loading}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Demo credentials: <br />
              Email: demo@example.com <br />
              Password: password
            </p>
            <button 
              onClick={fillDemoCredentials}
              className="text-black underline mt-2 hover:text-gray-700"
            >
              Fill Demo Credentials
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Don't have an account? {' '}
              <Link to="/register" className="text-black underline hover:text-gray-700">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 