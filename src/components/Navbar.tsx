import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-white">BangiRider</Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-black font-semibold">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <span className="text-white">{user?.name || 'User'}</span>
          </button>
        </div>
        
        <button 
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors duration-300 font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 