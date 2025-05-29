import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  CalendarIcon, 
  InboxIcon,
  UserIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  ClockIcon,
  XMarkIcon,
  MapIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { GoogleMap, useJsApiLoader, Marker, Circle, DirectionsRenderer } from '@react-google-maps/api';

// Mock ride types with pricing
const RIDE_TYPES = [
  { 
    id: 'economy', 
    name: 'Economy', 
    price: 'BDT 250',
    time: '5 min',
    description: 'Affordable, everyday rides',
    capacity: '1-4',
    image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png'
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: 'BDT 350',
    time: '3 min',
    description: 'Premium cars with top-rated drivers',
    capacity: '1-4',
    image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1568070443/assets/82/6bf372-war-280-5dr.png'
  },
  { 
    id: 'suv', 
    name: 'SUV', 
    price: 'BDT 500',
    time: '7 min',
    description: 'Extra space for luggage and more passengers',
    capacity: '1-6',
    image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1555367538/assets/31/ad21b5-721c-4320-bed4-336e3e93b888/original/product-comfort-portland.png'
  }
];

// Mock driver data
const MOCK_DRIVERS = [
  {
    id: 'd1',
    name: 'John Smith',
    rating: 4.8,
    totalRides: 1245,
    carModel: 'Toyota Camry 2022',
    carColor: 'Black',
    licensePlate: 'ABC-123',
    estimatedArrival: '3 min',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 'd2',
    name: 'Sarah Johnson',
    rating: 4.9,
    totalRides: 2156,
    carModel: 'Honda Civic 2023',
    carColor: 'Silver',
    licensePlate: 'XYZ-789',
    estimatedArrival: '5 min',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 'd3',
    name: 'Michael Chen',
    rating: 4.7,
    totalRides: 987,
    carModel: 'Tesla Model 3 2023',
    carColor: 'White',
    licensePlate: 'DEF-456',
    estimatedArrival: '4 min',
    profilePic: 'https://randomuser.me/api/portraits/men/67.jpg'
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

// Map component
const Map = ({ 
  pickup, 
  destination, 
  pickupCoords, 
  destinationCoords, 
  onMapClick, 
  isSelectingLocation, 
  directionsResponse 
}: { 
  pickup: string; 
  destination: string;
  pickupCoords: google.maps.LatLngLiteral | null;
  destinationCoords: google.maps.LatLngLiteral | null;
  onMapClick: (lat: number, lng: number) => void;
  isSelectingLocation: 'pickup' | 'destination' | null;
  directionsResponse: google.maps.DirectionsResult | null;
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" // You would need a real API key here
  });

  // Dhaka, Bangladesh coordinates
  const center = {
    lat: 23.8103,
    lng: 90.4125
  };

  // Mock vehicle locations
  const vehicles = [
    { lat: 23.8103 + 0.005, lng: 90.4125 + 0.01 },
    { lat: 23.8103 - 0.008, lng: 90.4125 - 0.005 },
    { lat: 23.8103 + 0.012, lng: 90.4125 - 0.008 },
    { lat: 23.8103 - 0.015, lng: 90.4125 + 0.01 },
    { lat: 23.8103 + 0.002, lng: 90.4125 + 0.018 },
  ];

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng && isSelectingLocation) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      onMapClick(lat, lng);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={center}
      zoom={14}
      onClick={handleMapClick}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
      }}
    >
      {/* Current location circle */}
      <Circle
        center={center}
        radius={300}
        options={{
          fillColor: '#64b5f6',
          fillOpacity: 0.2,
          strokeColor: '#2196f3',
          strokeOpacity: 0.5,
          strokeWeight: 1,
        }}
      />
      
      {/* Vehicle markers */}
      {vehicles.map((vehicle, index) => (
        <Marker
          key={index}
          position={vehicle}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/cabs.png',
            scaledSize: new window.google.maps.Size(24, 24),
          }}
        />
      ))}
      
      {/* Pickup marker */}
      {pickupCoords && (
        <Marker
          position={pickupCoords}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new window.google.maps.Size(32, 32),
          }}
          title="Pickup Location"
        />
      )}
      
      {/* Destination marker */}
      {destinationCoords && (
        <Marker
          position={destinationCoords}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(32, 32),
          }}
          title="Destination"
        />
      )}

      {/* Directions renderer for showing the route */}
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            suppressMarkers: true, // We're using custom markers
            polylineOptions: {
              strokeColor: '#1f2937',
              strokeWeight: 4,
              strokeOpacity: 0.8,
            },
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );
};

// Mock profile menu
const ProfileMenu = ({ show, onClose, user, onSignOut }: { 
  show: boolean; 
  onClose: () => void; 
  user: any; 
  onSignOut: () => void;
}) => {
  if (!show) return null;
  
  return (
    <div className="absolute top-16 right-6 bg-white rounded-lg shadow-xl w-80 z-50">
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
        <button className="flex items-center px-6 py-3 w-full hover:bg-gray-100 text-black">
          <UserIcon className="w-5 h-5 mr-3" />
          <span>Manage account</span>
        </button>
        <button className="flex items-center px-6 py-3 w-full hover:bg-gray-100 text-black">
          <UserIcon className="w-5 h-5 mr-3" />
          <span>Ride</span>
        </button>
        <Link to="/home" className="flex items-center px-6 py-3 w-full hover:bg-gray-100 text-black">
          <UserIcon className="w-5 h-5 mr-3" />
          <span>Switch to Classic View</span>
        </Link>
        <button className="flex items-center px-6 py-3 w-full hover:bg-gray-100 text-black">
          <UserIcon className="w-5 h-5 mr-3" />
          <span>BangiRider Business</span>
        </button>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button 
          className="w-full py-3 text-center text-red-500 font-medium flex items-center justify-center"
          onClick={onSignOut}
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
          Sign out
        </button>
      </div>
    </div>
  );
};

const UberStyle = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [selectedRide, setSelectedRide] = useState(RIDE_TYPES[0]);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [pickupCoords, setPickupCoords] = useState<google.maps.LatLngLiteral | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<google.maps.LatLngLiteral | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [routeDistance, setRouteDistance] = useState<string>('');
  const [routeDuration, setRouteDuration] = useState<string>('');
  const [isSelectingLocation, setIsSelectingLocation] = useState<'pickup' | 'destination' | null>(null);
  const [noRiderFound, setNoRiderFound] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<typeof MOCK_DRIVERS[0] | null>(null);
  const [isRideConfirmed, setIsRideConfirmed] = useState(false);
  
  // Add new state variables for time and passenger options
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [showPassengerOptions, setShowPassengerOptions] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Pick up now');
  const [selectedPassenger, setSelectedPassenger] = useState('For me');

  const timeOptions = [
    { id: 'now', label: 'Pick up now' },
    { id: 'scheduled', label: 'Schedule for later' },
    { id: 'asap', label: 'As soon as possible' }
  ];

  const passengerOptions = [
    { id: 'me', label: 'For me' },
    { id: 'someone', label: 'For someone else' },
    { id: 'multiple', label: 'Multiple passengers' }
  ];

  const filteredPickupLocations = LOCATIONS.filter(
    location => location.toLowerCase().includes(pickup.toLowerCase())
  );
  
  const filteredDestLocations = LOCATIONS.filter(
    location => location.toLowerCase().includes(destination.toLowerCase())
  );

  // Calculate route when both pickup and destination coordinates are set
  const calculateRoute = async () => {
    if (!pickupCoords || !destinationCoords) return;

    const directionsService = new google.maps.DirectionsService();
    
    try {
      const result = await directionsService.route({
        origin: pickupCoords,
        destination: destinationCoords,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(result);
      
      // Extract distance and duration
      const route = result.routes[0];
      if (route) {
        const leg = route.legs[0];
        setRouteDistance(leg.distance?.text || '');
        setRouteDuration(leg.duration?.text || '');
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  const handleBookRide = async () => {
    if ((!pickup || !destination) && (!pickupCoords || !destinationCoords)) return;
    
    setIsLoading(true);
    setNoRiderFound(false);
    setDriverFound(false);
    
    // Calculate route if coordinates are available
    if (pickupCoords && destinationCoords) {
      await calculateRoute();
      // Short delay to show the route before showing driver found message
      setTimeout(() => {
        setIsLoading(false);
        setIsBookingConfirmed(true);
        // After 2 seconds, randomly decide if driver is found
        setTimeout(() => {
          // Randomly decide if driver is found (50% chance)
          const isDriverAvailable = Math.random() > 0.5;
          if (isDriverAvailable) {
            setDriverFound(true);
            // Randomly select one of the three drivers
            const randomDriver = MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)];
            setSelectedDriver(randomDriver);
          } else {
            setNoRiderFound(true);
          }
        }, 2000);
      }, 1000);
    } else {
      // If no coordinates, just show the finding driver message
      setTimeout(() => {
        setIsLoading(false);
        setIsBookingConfirmed(true);
        // After 2 seconds, randomly decide if driver is found
        setTimeout(() => {
          const isDriverAvailable = Math.random() > 0.5;
          if (isDriverAvailable) {
            setDriverFound(true);
            // Randomly select one of the three drivers
            const randomDriver = MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)];
            setSelectedDriver(randomDriver);
          } else {
            setNoRiderFound(true);
          }
        }, 2000);
      }, 1500);
    }
  };

  const handleConfirmDriver = () => {
    setIsRideConfirmed(true);
    // Store ride details in localStorage for Home page
    const rideDetails = {
      id: Date.now().toString(),
      pickup,
      destination,
      driver: selectedDriver,
      rideType: selectedRide,
      status: 'Upcoming',
      scheduledTime: new Date().toISOString(),
      estimatedDuration: routeDuration,
      estimatedDistance: routeDistance,
      estimatedCost: selectedRide.price
    };
    localStorage.setItem('upcomingRide', JSON.stringify(rideDetails));
    navigate('/home');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (isSelectingLocation === 'pickup') {
      setPickupCoords({ lat, lng });
      setPickup(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
      setIsSelectingLocation('destination');
      // Clear existing route when changing pickup
      setDirectionsResponse(null);
      setRouteDistance('');
      setRouteDuration('');
    } else if (isSelectingLocation === 'destination') {
      setDestinationCoords({ lat, lng });
      setDestination(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
      setIsSelectingLocation(null);
      // Clear existing route when changing destination
      setDirectionsResponse(null);
      setRouteDistance('');
      setRouteDuration('');
    }
  };

  const startLocationSelection = (type: 'pickup' | 'destination') => {
    setIsSelectingLocation(type);
  };

  const clearLocations = () => {
    setPickup('');
    setDestination('');
    setPickupCoords(null);
    setDestinationCoords(null);
    setDirectionsResponse(null);
    setRouteDistance('');
    setRouteDuration('');
    setIsSelectingLocation(null);
  };

  // Effect to reset state after showing "Finding driver" message
  useEffect(() => {
    if (isBookingConfirmed) {
      const resetTimeout = setTimeout(() => {
        setIsBookingConfirmed(false);
        setPickup('');
        setDestination('');
        setPickupCoords(null);
        setDestinationCoords(null);
        setDirectionsResponse(null);
        setRouteDistance('');
        setRouteDuration('');
        setIsSelectingLocation(null);
      }, 4000); // Show "Finding driver" for 4 seconds

      return () => clearTimeout(resetTimeout);
    }
  }, [isBookingConfirmed]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white px-4 sm:px-6 py-4 shadow-sm sticky top-0 z-30">
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
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/home')}
              className="flex items-center space-x-2 bg-black/5 hover:bg-black/10 px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg 
                className="w-5 h-5 text-black" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              <span className="text-black font-medium">Back to Home</span>
            </motion.button>
          </motion.div>
        </div>
      </header> 

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Sidebar - Ride Request Form */}
        <div className="w-full lg:w-[400px] p-6 border-r border-gray-200 overflow-y-auto">
          <div className="space-y-6 pb-20">
            <h1 className="text-2xl font-bold text-black">Find a trip</h1>
            
            {/* Pickup location */}
            <div className="relative">
              <div className="flex items-center bg-white border-2 border-black/10 p-4 rounded-xl shadow-sm hover:border-black/20 transition-all duration-300">
                <div className="mr-4 text-black flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Pick-up location" 
                  className="bg-transparent w-full outline-none text-black placeholder-black/50 font-medium"
                  value={pickup}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    setShowPickupSuggestions(true);
                  }}
                  onFocus={() => setShowPickupSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
                />
                <button 
                  onClick={() => startLocationSelection('pickup')}
                  className={`ml-2 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 ${
                    isSelectingLocation === 'pickup' 
                      ? 'bg-black text-white shadow-lg' 
                      : 'bg-black/5 text-black hover:bg-black/10'
                  }`}
                >
                  {isSelectingLocation === 'pickup' ? 'Click on map' : 'Select on map'}
                </button>
              </div>
              
              {showPickupSuggestions && pickup && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-black/10 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {filteredPickupLocations.map(location => (
                    <div
                      key={location}
                      className="p-4 hover:bg-black/5 cursor-pointer text-black font-medium border-b border-black/5 last:border-0 transition-colors duration-200"
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
            
            {/* Dropoff location */}
            <div className="relative">
              <div className="flex items-center bg-white border-2 border-black/10 p-4 rounded-xl shadow-sm hover:border-black/20 transition-all duration-300">
                <div className="mr-4 text-black flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Drop-off location" 
                  className="bg-transparent w-full outline-none text-black placeholder-black/50 font-medium"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setShowDestSuggestions(true);
                  }}
                  onFocus={() => setShowDestSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                />
                <button 
                  onClick={() => startLocationSelection('destination')}
                  className={`ml-2 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 ${
                    isSelectingLocation === 'destination' 
                      ? 'bg-black text-white shadow-lg' 
                      : 'bg-black/5 text-black hover:bg-black/10'
                  }`}
                >
                  {isSelectingLocation === 'destination' ? 'Click on map' : 'Select on map'}
                </button>
              </div>
              
              {showDestSuggestions && destination && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-black/10 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {filteredDestLocations.map(location => (
                    <div
                      key={location}
                      className="p-4 hover:bg-black/5 cursor-pointer text-black font-medium border-b border-black/5 last:border-0 transition-colors duration-200"
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
            
            {/* Route Information */}
            {directionsResponse && routeDistance && routeDuration && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Route Information</h3>
                <div className="flex justify-between text-sm text-blue-800">
                  <span>Distance: {routeDistance}</span>
                  <span>Duration: {routeDuration}</span>
                </div>
              </div>
            )}
            
            {/* Clear locations button */}
            {(pickupCoords || destinationCoords) && (
              <button
                onClick={clearLocations}
                className="flex items-center justify-center w-full py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
              >
                <XMarkIcon className="w-4 h-4 mr-2" />
                Clear Locations
              </button>
            )}
            
            {/* Instructions for map selection */}
            {isSelectingLocation && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  {isSelectingLocation === 'pickup' 
                    ? '📍 Click on the map to select your pickup location'
                    : '🎯 Click on the map to select your destination'
                  }
                </p>
              </div>
            )}
            
            {/* Time selection */}
            <div className="relative">
              <button 
                onClick={() => setShowTimeOptions(!showTimeOptions)}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg text-black w-full hover:bg-gray-200 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-black" />
                  <span>{selectedTime}</span>
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-black transition-transform duration-200 ${showTimeOptions ? 'transform rotate-180' : ''}`} />
              </button>
              
              {showTimeOptions && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-black/10 rounded-xl shadow-lg">
                  {timeOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center p-4 hover:bg-black/5 cursor-pointer text-black font-medium border-b border-black/5 last:border-0 transition-colors duration-200"
                    >
                      <input
                        type="radio"
                        name="timeOption"
                        checked={selectedTime === option.label}
                        onChange={() => {
                          setSelectedTime(option.label);
                          setShowTimeOptions(false);
                        }}
                        className="mr-3 h-4 w-4 text-black border-2 border-black/20 rounded-full focus:ring-black"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* For me selection */}
            <div className="relative">
              <button 
                onClick={() => setShowPassengerOptions(!showPassengerOptions)}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg text-black w-full hover:bg-gray-200 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <UserIcon className="w-5 h-5 mr-2 text-black" />
                  <span>{selectedPassenger}</span>
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-black transition-transform duration-200 ${showPassengerOptions ? 'transform rotate-180' : ''}`} />
              </button>
              
              {showPassengerOptions && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-black/10 rounded-xl shadow-lg">
                  {passengerOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center p-4 hover:bg-black/5 cursor-pointer text-black font-medium border-b border-black/5 last:border-0 transition-colors duration-200"
                    >
                      <input
                        type="radio"
                        name="passengerOption"
                        checked={selectedPassenger === option.label}
                        onChange={() => {
                          setSelectedPassenger(option.label);
                          setShowPassengerOptions(false);
                        }}
                        className="mr-3 h-4 w-4 text-black border-2 border-black/20 rounded-full focus:ring-black"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Search button */}
            <button
              onClick={handleBookRide}
              className="bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition w-full"
              disabled={(!pickup && !pickupCoords) || (!destination && !destinationCoords) || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Calculating route...
                </div>
              ) : directionsResponse ? "Book Ride" : (pickupCoords && destinationCoords) ? "Find Route" : "Search"}
            </button>
            
            {/* Switch to Classic View */}
            <div className="bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition w-full">
              <Link 
                to="/home" 
                className="text-white hover:text-white text-center block w-full"
              >
                Switch to Classic View
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Map Area */}
        <div className="w-full h-[50vh] lg:h-screen flex-1 relative">
          <Map 
            pickup={pickup}
            destination={destination}
            pickupCoords={pickupCoords}
            destinationCoords={destinationCoords}
            onMapClick={handleMapClick}
            isSelectingLocation={isSelectingLocation}
            directionsResponse={directionsResponse}
          />
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {(isBookingConfirmed || noRiderFound || driverFound) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
        >
          <div className="bg-white p-12 rounded-2xl shadow-2xl m-4 w-[600px] h-[600px] flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center">
              {!noRiderFound && !driverFound ? (
                <>
                  <div className="w-32 h-32 mx-auto bg-black rounded-full flex items-center justify-center mb-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-black">Finding Driver</h2>
                  <p className="text-gray-700 mb-6 text-lg text-center max-w-md">
                    We're looking for the nearest driver to pick you up.
                  </p>
                  {routeDuration && (
                    <p className="text-xl font-semibold text-black mb-2">
                      Estimated trip time: {routeDuration}
                    </p>
                  )}
                  {routeDistance && (
                    <p className="text-lg text-gray-600">
                      Distance: {routeDistance}
                    </p>
                  )}
                </>
              ) : driverFound && selectedDriver ? (
                <>
                  <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-black">
                    <img 
                      src={selectedDriver.profilePic} 
                      alt={selectedDriver.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-black">{selectedDriver.name}</h2>
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center bg-black text-white px-4 py-2 rounded-full text-lg">
                      <span className="text-xl font-bold mr-2">★</span>
                      <span>{selectedDriver.rating}</span>
                    </div>
                    <span className="mx-3 text-gray-500 text-lg">•</span>
                    <span className="text-gray-600 text-lg">{selectedDriver.totalRides} rides</span>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-6 mb-8 w-full max-w-md">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 text-lg">Car</span>
                      <span className="font-medium text-black text-lg">{selectedDriver.carModel}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 text-lg">Color</span>
                      <span className="font-medium text-black text-lg">{selectedDriver.carColor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-lg">License Plate</span>
                      <span className="font-medium text-black text-lg">{selectedDriver.licensePlate}</span>
                    </div>
                  </div>
                  <div className="flex space-x-6 w-full max-w-md">
                    <button
                      onClick={() => {
                        setDriverFound(false);
                        setNoRiderFound(true);
                      }}
                      className="flex-1 py-4 px-8 border-2 border-black text-black font-medium rounded-xl hover:bg-gray-100 transition-colors text-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmDriver}
                      className="flex-1 py-4 px-8 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors text-lg"
                    >
                      Book Driver
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-32 h-32 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-8"
                  >
                    <svg
                      className="w-16 h-16 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </motion.div>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-4 text-gray-900"
                  >
                    Sorry, No Driver Found
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 mb-8 text-lg text-center max-w-md"
                  >
                    Please try searching again in a few minutes
                  </motion.p>
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => {
                      setIsBookingConfirmed(false);
                      setNoRiderFound(false);
                    }}
                    className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors text-lg"
                  >
                    Search Again
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile bottom navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-20">
        <button 
          onClick={toggleSidebar}
          className="flex flex-col items-center"
        >
          <MapIcon className="h-6 w-6 text-gray-500" />
          <span className="text-xs mt-1">Ride</span>
        </button>
        
        <button
          onClick={() => navigate('/home')}
          className="flex flex-col items-center"
        >
          <HomeIcon className="h-6 w-6 text-gray-500" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button
          onClick={() => navigate('/account')}
          className="flex flex-col items-center"
        >
          <UserIcon className="h-6 w-6 text-gray-500" />
          <span className="text-xs mt-1">Account</span>
        </button>
      </div>
    </div>
  );
};

export default UberStyle; 