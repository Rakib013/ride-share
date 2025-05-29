import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, ChevronDownIcon, ReceiptRefundIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Mock receipt data
const RECEIPTS = [
  {
    id: 'rec1',
    date: 'May 19, 2023',
    amount: 'BDT 250.00',
    from: 'Central Park',
    to: 'Times Square',
    status: 'Completed'
  },
  {
    id: 'rec2',
    date: 'May 15, 2023',
    amount: 'BDT 350.00',
    from: 'JFK Airport',
    to: 'Manhattan Bridge',
    status: 'Completed'
  },
  {
    id: 'rec3',
    date: 'May 10, 2023',
    amount: 'BDT 200.00',
    from: 'Brooklyn Heights',
    to: 'Queens Boulevard',
    status: 'Completed' 
  }
];

const Receipts: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
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
          <span className="font-medium mr-4 md:mr-8">Welcome to your Receipts</span>
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

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Your Receipts</h2>
          <p className="text-gray-600 mt-3 text-lg">View and download your ride receipts</p>
        </motion.div>
        
        {/* Receipts List */}
        <div className="grid gap-8">
          {RECEIPTS.map((receipt, index) => (
            <motion.div
              key={receipt.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white rounded-3xl transform transition-transform group-hover:scale-[1.02] duration-300" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex items-start gap-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10 rounded-2xl transform rotate-3" />
                          <div className="relative bg-white p-4 rounded-2xl shadow-sm">
                            <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{receipt.date}</h3>
                          <div className="space-y-3">
                            <div className="flex items-center text-gray-600 group/item">
                              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover/item:bg-black/5 transition-colors duration-200">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium">From: {receipt.from}</span>
                            </div>
                            <div className="flex items-center text-gray-600 group/item">
                              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover/item:bg-black/5 transition-colors duration-200">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium">To: {receipt.to}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-2xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                        {receipt.amount}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 ring-1 ring-green-600/20">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                          </svg>
                          {receipt.status}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center px-5 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
    </div>
  );
};

export default Receipts; 