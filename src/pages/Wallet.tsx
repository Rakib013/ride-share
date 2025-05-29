import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, ChevronDownIcon, PlusIcon, ReceiptRefundIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const [currency] = useState('BDT');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem('walletBalance');
    const initialBalance = storedBalance ? parseFloat(storedBalance) : 5000.00;
    return isNaN(initialBalance) ? 5000.00 : initialBalance;
  });
  const [pendingPayment, setPendingPayment] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [upcomingRide, setUpcomingRide] = useState<any>(null);

  useEffect(() => {
    const storedPayment = localStorage.getItem('pendingPayment');
    const storedUpcomingRide = localStorage.getItem('upcomingRide');
    
    if (storedPayment) {
      setPendingPayment(JSON.parse(storedPayment));
    }
    if (storedUpcomingRide) {
      setUpcomingRide(JSON.parse(storedUpcomingRide));
    }
  }, []);

  const paymentMethods = [
    { id: 'bkash', name: 'Bkash', icon: '💳' },
    { id: 'card', name: 'Card', icon: '💳' },
    { id: 'cash', name: 'Cash', icon: '💵' }
  ];

  const getPaymentMessage = (method: string) => {
    switch (method) {
      case 'bkash':
        return 'Hey, you will be paying by Bkash';
      case 'card':
        return 'Hey, you will be paying by Card';
      case 'cash':
        return 'Hey, you will be paying by Cash';
      default:
        return '';
    }
  };

  const handlePayment = () => {
    if (!selectedPayment) return;
    
    // Simulate payment processing
    setTimeout(() => {
      const cost = parseFloat(pendingPayment.estimatedCost.replace('BDT ', ''));
      const newBalance = balance - cost;
      
      // Update balance state and localStorage
      setBalance(newBalance);
      localStorage.setItem('walletBalance', newBalance.toString());
      
      // Create completed trip object
      const completedTrip = {
        id: Date.now(), // Generate unique ID
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        status: 'Completed',
        pickup: pendingPayment.pickup,
        dropoff: pendingPayment.destination,
        amount: pendingPayment.estimatedCost,
        distance: pendingPayment.distance || '8.5 km',
        duration: pendingPayment.duration || '25 mins',
        driver: pendingPayment.driver,
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      };

      // Get existing trips from localStorage
      const existingTrips = JSON.parse(localStorage.getItem('recentTrips') || '[]');
      
      // Add new trip to the beginning of the array
      const updatedTrips = [completedTrip, ...existingTrips];
      
      // Store updated trips
      localStorage.setItem('recentTrips', JSON.stringify(updatedTrips));
      
      // Clear pending payment and upcoming ride
      localStorage.removeItem('pendingPayment');
      localStorage.removeItem('upcomingRide');
      
      setShowPaymentModal(false);
      setShowConfirmation(true);
      
      // Clear confirmation after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
        navigate('/home');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Welcome Bar - Keep this section dark for contrast */}
      <div className="bg-gray-800 text-white px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto justify-center md:justify-start">
            <span className="font-medium mr-4 md:mr-8">Welcome to your Wallet</span>
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

      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        {/* Wallet Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 relative overflow-hidden shadow-xl"
        >
          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full"
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-6"
            >
              <div>
                <p className="text-gray-400 mb-2 text-sm">BangiRider Cash</p>
                <h2 className="text-3xl sm:text-5xl font-bold text-white">{currency} {balance.toFixed(2)}</h2>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Pending Payment Section */}
        {pendingPayment && upcomingRide && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-black rounded-xl p-6 mb-8"
          >
            <h3 className="text-xl font-bold mb-4">Pending Payment</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ride Type</span>
                <span className="font-medium">{pendingPayment.rideType.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">From</span>
                <span className="font-medium">{pendingPayment.pickup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">To</span>
                <span className="font-medium">{pendingPayment.destination}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-xl font-bold">{pendingPayment.estimatedCost}</span>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </motion.div>
        )}

        {/* Payment Methods */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Payment methods</h2>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                  selectedPayment === method.id 
                    ? 'bg-black text-white' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id ? 'border-white' : 'border-gray-400'
                    }`}>
                      {selectedPayment === method.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-white rounded-full"
                        />
                      )}
                    </div>
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium">{method.name}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedPayment === method.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {selectedPayment === method.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <p className="text-sm">{getPaymentMessage(method.id)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6">Confirm Payment</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount</span>
                  <span className="text-xl font-bold">{pendingPayment?.estimatedCost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">
                    {selectedPayment ? selectedPayment.charAt(0).toUpperCase() + selectedPayment.slice(1) : 'Not selected'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 border-2 border-black text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Confirm Payment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Payment Successful!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for choosing BangiRider. Your ride is confirmed and we hope you have a great journey!
              </p>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">Updated Balance</p>
                <p className="text-2xl font-bold">{currency} {balance.toFixed(2)}</p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-500"
              >
                Redirecting to home...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Wallet; 