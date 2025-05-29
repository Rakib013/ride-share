import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  CalendarIcon, 
  InboxIcon,
  UserIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  GlobeAltIcon,
  ReceiptRefundIcon
} from '@heroicons/react/24/outline';

// Mock ride types with pricing
const RIDE_TYPES = [
  { 
    id: 'economy', 
    name: 'Economy', 
    price: '$10-15',
    time: '5 min',
    description: 'Affordable, everyday rides',
    capacity: '1-4',
    image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png'
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: '$18-22',
    time: '3 min',
    description: 'Premium cars with top-rated drivers',
    capacity: '1-4',
    image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1568070443/assets/82/6bf372-war-280-5dr.png'
  },
  { 
    id: 'suv', 
    name: 'SUV', 
    price: '$22-28',
    time: '7 min',
    description: 'Extra space for luggage and more passengers',
    capacity: '1-6',
    image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1555367538/assets/31/ad21b5-721c-4320-bed4-336e3e93b888/original/product-comfort-portland.png'
  }
];

// Mock locations for autocomplete
const LOCATIONS = [
  "New York City Center",
  "Brooklyn Heights",
  "Queens Boulevard",
  "Central Park",
  "Times Square",
  "JFK Airport",
  "LaGuardia Airport",
  "Manhattan Bridge",
  "Grand Central Station",
  "Empire State Building"
];

// Mock recent rides
const RECENT_RIDES = [
  {
    id: 'r1',
    type: 'Economy',
    pickup: 'JFK Airport',
    destination: 'Manhattan Bridge',
    date: 'Feb 22',
    time: '7:20 PM',
    status: 'Unfulfilled'
  },
  {
    id: 'r2',
    type: 'Premium',
    pickup: 'Central Park',
    destination: 'Times Square',
    date: 'Feb 20',
    time: '8:30 PM',
    status: 'Completed'
  }
];

// Add this mock data before the Home component
const RECENT_TRIPS = [
  {
    id: 1,
    date: 'Feb 22',
    time: '7:20 PM',
    status: 'Unfulfilled',
    pickup: '147 লাল রোড, Dhaka',
    dropoff: 'Gulshan-2, Dhaka',
    amount: 'BDT 350',
    distance: '8.5 km',
    duration: '25 mins',
    driver: {
      name: 'Rahim Ali',
      rating: 4.8,
      car: 'Toyota Allion',
      plate: 'DHA-1234'
    },
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 2,
    date: 'Feb 20',
    time: '8:30 PM',
    status: 'Completed',
    pickup: '62 Ideal Rd, Dhaka',
    dropoff: 'Banani, Dhaka',
    amount: 'BDT 280',
    distance: '6.2 km',
    duration: '20 mins',
    driver: {
      name: 'Karim Khan',
      rating: 4.9,
      car: 'Honda City',
      plate: 'DHA-5678'
    },
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 3,
    date: 'Feb 18',
    time: '3:15 PM',
    status: 'Completed',
    pickup: 'Mirpur-10, Dhaka',
    dropoff: 'Farmgate, Dhaka',
    amount: 'BDT 420',
    distance: '12.3 km',
    duration: '35 mins',
    driver: {
      name: 'Salam Mia',
      rating: 4.7,
      car: 'Suzuki Ciaz',
      plate: 'DHA-9012'
    },
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
];

// Mock profile menu
const ProfileMenu = ({ show, onClose, user, onSignOut }: { 
  show: boolean; 
  onClose: () => void; 
  user: any; 
  onSignOut: () => void;
}) => {
  if (!show) return null;
  
  return (
    <div className="absolute top-16 right-0 sm:right-6 bg-white rounded-lg shadow-xl w-full sm:w-80 z-50">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
            {user?.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-8 h-8" />
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-black">{user?.name || 'User'}</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
            <UserIcon className="w-6 h-6 mb-1 text-black" />
            <span className="text-sm text-center text-black">Help</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
            <InboxIcon className="w-6 h-6 mb-1 text-black" />
            <span className="text-sm text-center text-black">Wallet</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
            <CalendarIcon className="w-6 h-6 mb-1 text-black" />
            <span className="text-sm text-center text-black">Activity</span>
          </div>
        </div>
      </div>
      
      <div className="py-2">
        <Link to="/uber-style" className="flex items-center px-6 py-3 w-full hover:bg-gray-100 text-black">
          <UserIcon className="w-5 h-5 mr-3" />
          <span>Switch to Map View</span>
        </Link>
        <Link to="/wallet" className="flex items-center px-6 py-3 w-full hover:bg-gray-100 text-black">
          <UserIcon className="w-5 h-5 mr-3" />
          <span>Wallet</span>
        </Link>
        <Link to="/account" className="flex items-center px-6 py-3 w-full hover:bg-gray-100 text-black">
          <UserIcon className="w-5 h-5 mr-3" />
          <span>Account</span>
        </Link>
        <Link to="/receipts" className="flex items-center px-6 py-3 w-full hover:bg-gray-100 text-black">
          <UserIcon className="w-5 h-5 mr-3" />
          <span>Receipts</span>
        </Link>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button 
          className="w-full py-3 text-center text-red-500 font-medium flex items-center justify-center"
          onClick={onSignOut}
        >
          <UserIcon className="w-5 h-5 mr-2" />
          Sign out
        </button>
      </div>
    </div>
  );
};

// Update the trip cards section
const TripDetailsModal = ({ isOpen, onClose, trip }: { isOpen: boolean; onClose: () => void; trip: any }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-lg aspect-square rounded-none overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-black">Trip Details</h3>
                <p className="text-gray-500 mt-1">#{trip.id.toString().padStart(6, '0')}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Driver Info */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-500 mb-4">Driver Information</h4>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-black">{trip.driver.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm text-gray-600">{trip.driver.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Car Model</p>
                    <p className="font-medium text-black">{trip.driver.car}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">License Plate</p>
                    <p className="font-medium text-black">{trip.driver.plate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                  </div>
                  <p className="text-lg font-medium text-black">{trip.date} • {trip.time}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-medium text-gray-500">Distance & Duration</h4>
                  </div>
                  <p className="text-lg font-medium text-black">{trip.distance} • {trip.duration}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    trip.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {trip.status}
                  </span>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-medium text-gray-500">Amount</h4>
                  </div>
                  <p className="text-lg font-medium text-black">{trip.amount}</p>
                </div>
              </div>
            </div>

            {/* Trip Timeline */}
            <div className="mt-12">
              <h4 className="text-sm font-medium text-gray-500 mb-6">Trip Timeline</h4>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium text-black">{trip.pickup}</p>
                    <p className="text-sm text-gray-500 mt-1">{trip.time}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Drop-off</p>
                    <p className="font-medium text-black">{trip.dropoff}</p>
                    <p className="text-sm text-gray-500 mt-1">Estimated arrival</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-gray-100">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [selectedRide, setSelectedRide] = useState(RIDE_TYPES[0]);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('most-recent');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [upcomingRide, setUpcomingRide] = useState<any>(null);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [recentTrips, setRecentTrips] = useState<any[]>([]);

  useEffect(() => {
    // Load upcoming ride
    const storedRide = localStorage.getItem('upcomingRide');
    if (storedRide) {
      setUpcomingRide(JSON.parse(storedRide));
    }

    // Load recent trips
    const storedTrips = localStorage.getItem('recentTrips');
    if (storedTrips) {
      const parsedTrips = JSON.parse(storedTrips);
      // Combine sample trips with stored trips, avoiding duplicates
      const sampleTrips = RECENT_TRIPS.filter(sampleTrip => 
        !parsedTrips.some((storedTrip: { id: number }) => storedTrip.id === sampleTrip.id)
      );
      setRecentTrips([...parsedTrips, ...sampleTrips]);
    } else {
      // If no stored trips, use sample trips
      setRecentTrips(RECENT_TRIPS);
    }
  }, []);

  const filteredPickupLocations = LOCATIONS.filter(
    location => location.toLowerCase().includes(pickup.toLowerCase())
  );
  
  const filteredDestLocations = LOCATIONS.filter(
    location => location.toLowerCase().includes(destination.toLowerCase())
  );

  const handleBookRide = () => {
    if (!pickup || !destination) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsBookingConfirmed(true);
      
      // Reset after showing confirmation
      setTimeout(() => {
        setIsBookingConfirmed(false);
        setPickup('');
        setDestination('');
      }, 3000);
    }, 1500);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white px-4 sm:px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4 sm:space-x-3 w-full sm:w-auto justify-between sm:justify-start mb-4 sm:mb-0">
          <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <motion.path
                  d="M19 17H5C3.89543 17 3 16.1046 3 15V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V15C21 16.1046 20.1046 17 19 17Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.circle
                  cx="7"
                  cy="17"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
                <motion.circle
                  cx="17"
                  cy="17"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
              </svg>
            </motion.div>
            <Link to="/" className="text-2xl font-bold text-black font-serif">BangiRider</Link>
            <button 
              className="sm:hidden"
              onClick={toggleProfileMenu}
            >
              <UserIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="hidden sm:flex items-center space-x-6">
            <button className="flex items-center text-gray-800">
              <GlobeAltIcon className="w-5 h-5 mr-1" />
              <span>EN</span>
            </button>
            <button className="text-gray-800 font-medium">Help</button>
            <button 
              className="flex items-center space-x-2 bg-gray-100 text-black rounded-full px-4 py-2 hover:bg-gray-200"
              onClick={toggleProfileMenu}
            >
              <span className="font-medium">{user?.name ? `Md. ${user.name.split(' ')[0]}...` : 'User'}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <ProfileMenu 
          show={showProfileMenu} 
          onClose={() => setShowProfileMenu(false)} 
          user={user}
          onSignOut={handleSignOut}
        />
      </header>

      {/* Welcome Bar - Keep this section dark for contrast */}
      <div className="bg-gray-800 text-white px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto justify-center md:justify-start">
            <span className="font-medium mr-4 md:mr-8">Welcome back, {user?.name?.split(' ')[0] || 'User'}</span>
            <div className="flex items-center text-sm text-gray-300">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>You have no upcoming trips</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-8 w-full md:w-auto justify-center md:justify-start">
            <button 
              className="flex items-center text-white"
              onClick={() => navigate('/wallet')}
            >
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              <span>Wallet</span>
            </button>
            <button 
              className="flex items-center text-white"
              onClick={() => navigate('/receipts')}
            >
              <ReceiptRefundIcon className="w-5 h-5 mr-2" />
              <span>Receipts</span>
            </button>
            <button 
              className="flex items-center text-white"
              onClick={() => navigate('/account')}
            >
              <UserIcon className="w-5 h-5 mr-2" />
              <span>Account</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Request a Ride Section */}
          <div className="mb-16 flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-5xl font-bold mb-10 text-black">Request a ride</h1>
              
              {/* Ride Form */}
              <div className="space-y-4 max-w-md">
                <div className="relative">
                  <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                    <div className="mr-4 text-black">⚫</div>
                    <input 
                      type="text" 
                      placeholder="Enter location" 
                      className="bg-transparent w-full outline-none text-black"
                      value={pickup}
                      onChange={(e) => {
                        setPickup(e.target.value);
                        setShowPickupSuggestions(true);
                      }}
                      onFocus={() => setShowPickupSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
                    />
                  </div>
                  
                  {showPickupSuggestions && pickup && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredPickupLocations.map(location => (
                        <div
                          key={location}
                          className="p-3 hover:bg-gray-100 cursor-pointer text-black"
                          onClick={() => {
                            setPickup(location);
                            setShowPickupSuggestions(false);
                          }}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                    <div className="mr-4 text-black">■</div>
                    <input 
                      type="text" 
                      placeholder="Enter destination" 
                      className="bg-transparent w-full outline-none text-black"
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                        setShowDestSuggestions(true);
                      }}
                      onFocus={() => setShowDestSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                    />
                  </div>
                  
                  {showDestSuggestions && destination && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredDestLocations.map(location => (
                        <div
                          key={location}
                          className="p-3 hover:bg-gray-100 cursor-pointer text-black"
                          onClick={() => {
                            setDestination(location);
                            setShowDestSuggestions(false);
                          }}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="pt-2">
                  <Link
                    to="/uber-style" 
                    className="bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition"
                    // disabled={!pickup || !destination || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Loading...
                      </div>
                    ) : "Book a ride"}
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <img 
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_896,w_1344/v1712926828/assets/a3/cf8564-e2a6-418c-b9b0-65dd285c100b/original/3-2-ridesharing-new.jpg" 
                alt="Person getting into a car" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Upcoming Ride Section */}
          {upcomingRide && (
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8 text-black">Upcoming Ride</h2>
              <div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black mr-4">
                        <img 
                          src={upcomingRide.driver.profilePic} 
                          alt={upcomingRide.driver.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">{upcomingRide.driver.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center bg-black text-white px-2 py-0.5 rounded-full text-sm">
                            <span className="text-sm font-bold mr-1">★</span>
                            <span>{upcomingRide.driver.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-gray-600 text-sm">{upcomingRide.driver.totalRides} rides</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Estimated arrival</div>
                      <div className="text-xl font-bold text-black">{upcomingRide.driver.estimatedArrival}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Car Details</div>
                      <div className="font-medium text-black">{upcomingRide.driver.carModel}</div>
                      <div className="text-sm text-gray-600">{upcomingRide.driver.carColor} • {upcomingRide.driver.licensePlate}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Ride Type</div>
                      <div className="font-medium text-black">{upcomingRide.rideType.name}</div>
                      <div className="text-sm text-gray-600">Estimated cost: {upcomingRide.estimatedCost}</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-4">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500">Pickup</div>
                        <div className="font-medium text-black">{upcomingRide.pickup}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-4">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500">Destination</div>
                        <div className="font-medium text-black">{upcomingRide.destination}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <button 
                      onClick={() => {
                        localStorage.removeItem('upcomingRide');
                        setUpcomingRide(null);
                      }}
                      className="flex-1 py-3 px-6 border-2 border-black text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancel Ride
                    </button>
                    <button 
                      onClick={() => navigate('/uber-style')}
                      className="flex-1 py-3 px-6 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Track Ride
                    </button>
                    <button 
                      onClick={() => {
                        localStorage.setItem('pendingPayment', JSON.stringify(upcomingRide));
                        navigate('/wallet');
                      }}
                      className="flex-1 py-3 px-6 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Recent Activity Section */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-black">Recent activity</h2>
            
            <div className="border-b border-gray-200 mb-8">
              <div className="flex pb-1 overflow-x-auto">
                {['most-recent'].map((tab) => (
                  <button 
                    key={tab}
                    className={`relative mr-8 pb-2 px-1 ${activeTab === tab ? 'text-black font-medium' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {activeTab === 'most-recent' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentTrips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-black rounded-xl p-3.5">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={trip.icon} />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500">{trip.date} • {trip.time}</p>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <p className="font-medium text-black">{trip.pickup}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <p className="font-medium text-black">{trip.dropoff}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center space-x-4">
                              <p className="text-sm text-gray-600">{trip.distance}</p>
                              <p className="text-sm text-gray-600">•</p>
                              <p className="text-sm text-gray-600">{trip.duration}</p>
                            </div>
                            <p className="text-sm font-medium text-black mt-2">{trip.amount}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            trip.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {trip.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedTrip(trip)}
                      className="absolute bottom-6 right-6 text-black hover:text-gray-700 font-medium text-sm flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span>View details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <AnimatePresence>
            {selectedTrip && (
              <TripDetailsModal
                isOpen={!!selectedTrip}
                onClose={() => setSelectedTrip(null)}
                trip={selectedTrip}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">BangiRider</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition">About us</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Newsroom</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Investors</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Blog</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Careers</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition">Ride</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Drive</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Deliver</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Business</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Safety</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition">Community Guidelines</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Safety Center</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Insurance</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition">Help Center</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Contact us</button></li>
                <li><button className="text-gray-400 hover:text-white transition">Accessibility</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <button className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </button>
            </div>
            
            <p className="text-gray-500">© 2023 BangiRider Technologies Inc.</p>
          </div>
        </div>
      </footer>
      
      {/* Confirmation Modal */}
      {isBookingConfirmed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
        >
          <div className="bg-white p-8 rounded-xl max-w-md shadow-lg">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-black">Ride Booked!</h2>
              <p className="text-gray-700 mb-4">
                Your ride is on the way to {pickup}.
              </p>
              <p className="text-lg font-semibold text-black">
                ETA: {selectedRide.time}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home; 