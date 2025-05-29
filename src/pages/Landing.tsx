import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Landing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ride');
  const [showBanner, setShowBanner] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      setIsLoggedIn(!!user);
    };
    
    checkAuth();
  }, []);

  const serviceOptions = [
    { id: 'ride', name: 'Ride', icon: '🚗', desc: 'Ride to your destination' },
    { id: 'drive', name: 'Drive', icon: '🧑‍✈️', desc: 'Drive when you want, earn what you need' },
    { id: 'business', name: 'Business', icon: '💼', desc: 'Solutions for your business travel' }
  ];

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAccountClick = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white px-4 sm:px-6 py-4 shadow-sm flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4 sm:space-x-8 mb-2 sm:mb-0">
          <div className="flex items-center space-x-2">
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
            <h1 className="text-2xl font-bold text-black font-serif">BangiRider</h1>
          </div>
          
          <div className="flex-1 flex justify-center">
            <motion.button 
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
              <span>Ride</span>
            </motion.button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={isLoggedIn ? handleAccountClick : handleLogin}
            className="bg-gray-100 hover:bg-gray-200 text-black font-medium px-4 py-2 rounded-full transition"
          >
            {isLoggedIn ? 'Account' : 'Sign in'}
          </button>
        </div>
      </header>

      {/* Promo Banner */}
      {showBanner && (
        <div className="bg-gray-100 py-4 px-4 sm:px-6 relative">
          <div className="container mx-auto text-center flex items-center justify-center">
            <p className="text-black pr-6">
              Check out the new products unveiled at Go-Get 2025 for your everyday. Discover what's new →
            </p>
            <button 
              onClick={() => setShowBanner(false)}
              className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 text-black"
            >
              <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Left content */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-0 md:pr-12 mb-8 md:mb-0">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-5xl font-bold text-black mb-6">Go anywhere with BangiRider</h2>
            </div>

            {/* Ride form */}
            <div className="space-y-4">
              <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                <div className="mr-4 text-black">⚫</div>
                <input 
                  type="text" 
                  placeholder="Pickup location" 
                  className="bg-transparent w-full outline-none text-black"
                />
                <svg className="h-5 w-5 text-gray-500 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                <div className="mr-4 text-black">■</div>
                <input 
                  type="text" 
                  placeholder="Dropoff location" 
                  className="bg-transparent w-full outline-none text-black"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="flex items-center justify-center bg-gray-100 p-4 rounded-lg text-black w-full sm:w-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Today
                </button>
                
                <button className="flex items-center justify-between bg-gray-100 p-4 rounded-lg text-black w-full sm:w-1/2">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Now
                  </div>
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => navigate('/home')}
                  className="bg-black text-white py-3 px-6 rounded-lg w-full sm:w-1/2 font-medium hover:bg-gray-800 transition"
                >
                  Need a Ride?
                </button>
                
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-black text-white py-3 px-6 rounded-lg w-full sm:w-1/2 font-medium hover:bg-gray-800 transition"
                >
                  Log in to see your recent activity
                </button>
              </div>
            </div>

            {/* Animated Cycle Design (More Realistic) */}
            <div className="relative w-full h-48 mt-8 mb-8 flex justify-center items-center">
              <motion.svg
                viewBox="0 0 300 150"
                className="w-full h-auto max-h-48"
                initial="hidden"
                animate="visible"
              >
                {/* Back Wheel */}
                <motion.circle
                  cx="70"
                  cy="100"
                  r="30"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
                 {/* Back Wheel Spokes */}
                <motion.g
                   initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  {[...Array(16)].map((_, i) => (
                    <line
                      key={`back-spoke-${i}`}
                      x1="70"
                      y1="100"
                      x2={70 + 30 * Math.cos(i * Math.PI / 8)}
                      y2={100 + 30 * Math.sin(i * Math.PI / 8)}
                      stroke="black"
                      strokeWidth="1"
                    />
                  ))}
                </motion.g>

                {/* Front Wheel */}
                <motion.circle
                  cx="230"
                  cy="100"
                  r="30"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
                {/* Front Wheel Spokes */}
                 <motion.g
                   initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  {[...Array(16)].map((_, i) => (
                    <line
                      key={`front-spoke-${i}`}
                      x1="230"
                      y1="100"
                      x2={230 + 30 * Math.cos(i * Math.PI / 8)}
                      y2={100 + 30 * Math.sin(i * Math.PI / 8)}
                      stroke="black"
                      strokeWidth="1"
                    />
                  ))}
                </motion.g>

                {/* Frame */}
                <motion.path
                  d="M70 100 L110 60 L175 60 L230 100 L175 100 L110 100 L70 100 M110 60 L110 35 M175 60 L195 45 L215 45"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0 }}
                />
                
                {/* Seat Tube to Chainstay */}
                 <motion.path
                  d="M110 100 L50 100"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                />

                 {/* Seat Stay */}
                 <motion.path
                  d="M175 60 L50 100"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                />

                {/* Seat */}
                <motion.path
                  d="M110 35 C110 35, 100 25, 95 35"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 2.6 }}
                />

                {/* Handlebars */}
                <motion.path
                  d="M215 45 L225 40 L230 50"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                   initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 2.6 }}
                />
                
                {/* Crankset and Pedals */}
                 <motion.g
                   initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                 >
                  <circle cx="175" cy="100" r="8" stroke="black" strokeWidth="2" fill="none" /> {/* Crank center */}
                  <line x1="175" y1="100" x2="195" y2="115" stroke="black" strokeWidth="2" /> {/* Pedal arm 1 */}
                   <line x1="175" y1="100" x2="155" y2="85" stroke="black" strokeWidth="2" /> {/* Pedal arm 2 */}
                  <circle cx="195" cy="115" r="3" stroke="black" strokeWidth="2" fill="none" /> {/* Pedal 1 */}
                  <circle cx="155" cy="85" r="3" stroke="black" strokeWidth="2" fill="none" /> {/* Pedal 2 */}
                 </motion.g>

                 {/* Chain Ring */}
                 <motion.circle
                   cx="175"
                   cy="100"
                   r="14"
                   stroke="black"
                   strokeWidth="2"
                   fill="none"
                    initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                 />

                 {/* Rear Derailleur (simplified) */}
                  <motion.path
                   d="M50 100 L55 110 L65 110"
                   stroke="black"
                   strokeWidth="2"
                   fill="none"
                    initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 3.0 }}
                  />
                
              </motion.svg>
            </div>

            {/* Display content for other service tabs */}
            {activeTab !== 'ride' && (
              <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                <div className="text-4xl mb-4">{serviceOptions.find(o => o.id === activeTab)?.icon}</div>
                <h3 className="text-xl text-black font-medium mb-3">{serviceOptions.find(o => o.id === activeTab)?.name}</h3>
                <p className="text-gray-700 mb-4">{serviceOptions.find(o => o.id === activeTab)?.desc}</p>
                <button 
                  onClick={() => navigate('/login')} 
                  className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition"
                >
                  Learn more
                </button>
              </div>
            )}
          </div>

          {/* Right content - Illustration */}
          <div className="md:w-1/2">
            <img 
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1344,w_1344/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png" 
              alt="BangiRider car illustration" 
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* App Banner Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-black mb-4">Download the app</h2>
                <p className="text-gray-700 mb-6">Get a ride in minutes. Or become a driver and earn money on your schedule.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center hover:bg-gray-800 transition">
                    <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.996 0.52c-0.923 0-1.996 0.716-3.178 1.042-1.606 0.444-3.288 0.094-4.556-0.802l-0.156 0.094c-2.112 1.273-4.017 3.127-4.017 6.873 0 6.066 3.214 13.397 6.027 16.273-0.284-0.447-0.338-1.298-0.069-1.917 0.289-0.664 0.892-1.194 1.62-1.444 0.689-0.238 1.406-0.45 2.225-0.624 0.775-0.165 1.549-0.328 2.244-0.624 0.659-0.281 1.231-0.697 1.644-1.239 0.5-0.655 0.764-1.564 0.764-2.523 0-0.647-0.173-1.239-0.476-1.718-0.302-0.476-0.712-0.834-1.175-1.092-0.933-0.517-2.111-0.714-3.366-0.714-1.112 0-2.296 0.152-3.464 0.309 0.042-0.14 0.127-0.273 0.189-0.406 0.887-1.992 1.754-3.586 3.524-3.586 0.46 0 0.977 0.141 1.546 0.407 0.462 0.216 0.918 0.52 1.323 0.851l0.242 0.196c0.312-0.331 0.595-0.669 0.895-1.016 0.182-0.211 0.368-0.427 0.566-0.65l0.087-0.098c-0.234-0.164-0.47-0.325-0.714-0.475-0.966-0.594-2.067-1.026-3.09-1.071h-0.001z"></path>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-xl font-semibold">App Store</div>
                    </div>
                  </button>
                  <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center hover:bg-gray-800 transition">
                    <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.883 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-xl font-semibold">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="BangiRider map view" 
                  className="w-full h-[300px] object-cover rounded-r-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-16">Ride with BangiRider</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Request a ride anytime",
                description: "BangiRider is ready 24/7. Request a ride any time, any day of the year.",
                icon: "🚕"
              },
              {
                title: "Budget-friendly options",
                description: "Compare prices on every kind of ride, from daily commutes to special evenings out.",
                icon: "💰"
              },
              {
                title: "Safety first",
                description: "We prioritize your safety with industry-leading security features for both riders and drivers.",
                icon: "🛡️"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-gray-100 p-8 rounded-xl text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-4">Available in these cities</h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mb-16">Find BangiRider in over 10,000 cities worldwide, spanning across large metro areas to smaller suburbs.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
              "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville"
            ].map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg text-center shadow-sm"
              >
                <p className="text-black">{city}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition">
              View all cities
            </button>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Landing; 