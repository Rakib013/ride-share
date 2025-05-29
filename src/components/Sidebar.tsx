import { NavLink } from 'react-router-dom';
import { 
  HomeIcon,
  ClockIcon,
  UserIcon,
  MapIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navItems = [
    { name: 'Home', path: '/home', icon: HomeIcon },
    { name: 'Ride History', path: '/history', icon: ClockIcon },
    { name: 'Profile', path: '/profile', icon: UserIcon },
  ];

  return (
    <aside className="w-64 bg-white border border-gray-200 shadow-lg m-4 rounded-xl flex flex-col py-6">
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-black flex items-center">
          <MapIcon className="w-8 h-8 mr-2 text-black" />
          BangiRider
        </h2>
      </div>
      
      <nav className="flex-1 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-black text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="px-6 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-700">Need help?</p>
          <button className="mt-2 text-black hover:text-gray-700 text-sm font-medium underline">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 