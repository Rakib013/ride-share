import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  ChevronDownIcon, 
  UserIcon, 
  CreditCardIcon, 
  LockClosedIcon,
  BellIcon, 
  MapPinIcon, 
  ShieldCheckIcon,
  PencilSquareIcon,
  StarIcon,
  CogIcon,
  PhoneIcon,
  IdentificationIcon,
  ArrowLeftOnRectangleIcon,
  ReceiptRefundIcon,
  ShoppingBagIcon,
  CalendarIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface EditableField {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<EditableField>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+880 17' + Math.floor(Math.random() * 10000000).toString().padStart(8, '0'),
    address: user?.address || 'House 123, Road 12, Block B, Banani, Dhaka 1213'
  });
  
  // Update formData when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '+880 17' + Math.floor(Math.random() * 10000000).toString().padStart(8, '0'),
        address: user.address || 'House 123, Road 12, Block B, Banani, Dhaka 1213'
      });
    }
  }, [user]);
  
  const [tempFormData, setTempFormData] = useState<EditableField>(formData);
  
  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleEdit = (field: string) => {
    setTempFormData(formData);
    setEditingField(field);
  };

  const handleSave = (field: string) => {
    setFormData(tempFormData);
    setEditingField(null);
  };

  const handleCancel = () => {
    setTempFormData(formData);
    setEditingField(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 sm:px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
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
            <span className="font-medium mr-4 md:mr-8">Welcome back </span>
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

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-[400px] lg:w-[450px] xl:w-[500px]">
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              {/* Modern gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
              <div className="absolute inset-[1px] bg-white rounded-3xl"></div>
              
              <div className="text-center mb-8 relative">
                <div className="relative inline-block mb-6 group">
                  <div className="w-40 h-40 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center text-white mx-auto transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-7xl font-semibold transform transition-transform duration-500 group-hover:scale-110">{user?.name?.charAt(0) || formData.name.charAt(0)}</span>
                    )}
                    {/* Modern animated ring */}
                    <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-white/40 rounded-full animate-[spin_4s_linear_infinite]"></div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button 
                    onClick={triggerImageUpload}
                    className="absolute bottom-0 right-0 bg-black text-white rounded-full p-4 shadow-xl hover:bg-gray-800 transform hover:scale-110 transition-all duration-300 hover:shadow-2xl"
                  >
                    <PencilSquareIcon className="w-6 h-6" />
                  </button>
                </div>
                <h3 className="text-4xl font-bold text-black mb-3 transform transition-transform duration-300 group-hover:scale-105">{formData.name}</h3>
                <div className="flex items-center justify-center text-lg text-gray-600 mt-2">
                  <StarIcon className="w-7 h-7 text-black mr-2 transform transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-semibold text-xl">4.9</span>
                  <span className="mx-3">•</span>
                  <span className="text-black font-medium text-xl">Premium Member</span>
                </div>
              </div>
            </div>
            
            <nav className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative group hover:shadow-2xl transition-all duration-500">
              {/* Modern gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
              <div className="absolute inset-[1px] bg-white rounded-3xl"></div>
              
              <div className="relative">
                <button 
                  onClick={() => setActiveSection('personal')}
                  className={`w-full text-left py-6 px-8 flex items-center border-l-4 transition-all duration-300 hover:bg-gray-50/50 relative ${
                    activeSection === 'personal' 
                      ? 'border-black bg-gray-50/80 text-black font-medium' 
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-black/10">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xl">Personal Information</span>
                </button>
                <button 
                  onClick={() => setActiveSection('privacy')}
                  className={`w-full text-left py-6 px-8 flex items-center border-l-4 transition-all duration-300 hover:bg-gray-50/50 relative ${
                    activeSection === 'privacy' 
                      ? 'border-black bg-gray-50/80 text-black font-medium' 
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-black/10">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xl">Privacy</span>
                </button>
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left py-6 px-8 flex items-center text-red-600 hover:bg-red-50/50 border-l-4 border-transparent transition-all duration-300 relative"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-red-100">
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xl">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {activeSection === 'personal' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 transform transition-all duration-500 hover:shadow-2xl"
              >
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl font-bold mb-4 flex items-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mr-4">
                    <UserIcon className="w-7 h-7 text-white" />
                  </div>
                  Personal Information
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 mb-8 text-lg"
                >
                  Manage your personal information and account settings
                </motion.p>
                
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-start">
                        <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-black/10">
                          <IdentificationIcon className="w-7 h-7 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-xl text-black mb-1">Name</h3>
                          {editingField === 'name' ? (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mt-2 flex items-center space-x-3"
                            >
                              <input
                                type="text"
                                value={tempFormData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="flex-1 px-4 py-3 border-2 border-black/10 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-lg"
                              />
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSave('name')}
                                className="p-3 bg-black text-white rounded-xl hover:bg-black/90 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                              >
                                <CheckIcon className="w-5 h-5" />
                                <span>Save</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCancel}
                                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                              >
                                <XMarkIcon className="w-5 h-5" />
                                <span>Cancel</span>
                              </motion.button>
                            </motion.div>
                          ) : (
                            <p className="text-gray-600 text-lg">{formData.name}</p>
                          )}
                        </div>
                      </div>
                      {editingField !== 'name' && (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEdit('name')}
                          className="text-black hover:text-black/80 flex items-center space-x-2 bg-black/5 hover:bg-black/10 px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                          <span>Edit</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-start">
                        <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-black/10">
                          <CogIcon className="w-7 h-7 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-xl text-black mb-1">Email</h3>
                          {editingField === 'email' ? (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mt-2 flex items-center space-x-3"
                            >
                              <input
                                type="email"
                                value={tempFormData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="flex-1 px-4 py-3 border-2 border-black/10 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-lg"
                              />
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSave('email')}
                                className="p-3 bg-black text-white rounded-xl hover:bg-black/90 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                              >
                                <CheckIcon className="w-5 h-5" />
                                <span>Save</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCancel}
                                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                              >
                                <XMarkIcon className="w-5 h-5" />
                                <span>Cancel</span>
                              </motion.button>
                            </motion.div>
                          ) : (
                            <p className="text-gray-600 text-lg">{formData.email}</p>
                          )}
                        </div>
                      </div>
                      {editingField !== 'email' && (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEdit('email')}
                          className="text-black hover:text-black/80 flex items-center space-x-2 bg-black/5 hover:bg-black/10 px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                          <span>Edit</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-start">
                        <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-black/10">
                          <PhoneIcon className="w-7 h-7 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-xl text-black mb-1">Phone</h3>
                          {editingField === 'phone' ? (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mt-2 flex items-center space-x-3"
                            >
                              <input
                                type="tel"
                                value={tempFormData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className="flex-1 px-4 py-3 border-2 border-black/10 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-lg"
                              />
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSave('phone')}
                                className="p-3 bg-black text-white rounded-xl hover:bg-black/90 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                              >
                                <CheckIcon className="w-5 h-5" />
                                <span>Save</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCancel}
                                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                              >
                                <XMarkIcon className="w-5 h-5" />
                                <span>Cancel</span>
                              </motion.button>
                            </motion.div>
                          ) : (
                            <p className="text-gray-600 text-lg">{formData.phone}</p>
                          )}
                        </div>
                      </div>
                      {editingField !== 'phone' && (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEdit('phone')}
                          className="text-black hover:text-black/80 flex items-center space-x-2 bg-black/5 hover:bg-black/10 px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                          <span>Edit</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-start">
                        <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-black/10">
                          <MapPinIcon className="w-7 h-7 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-xl text-black mb-1">Default Address</h3>
                          {editingField === 'address' ? (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mt-2 flex items-center space-x-3"
                            >
                              <input
                                type="text"
                                value={tempFormData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className="flex-1 px-4 py-3 border-2 border-black/10 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-lg"
                              />
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSave('address')}
                                className="p-3 bg-black text-white rounded-xl hover:bg-black/90 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                              >
                                <CheckIcon className="w-5 h-5" />
                                <span>Save</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCancel}
                                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                              >
                                <XMarkIcon className="w-5 h-5" />
                                <span>Cancel</span>
                              </motion.button>
                            </motion.div>
                          ) : (
                            <p className="text-gray-600 text-lg">{formData.address}</p>
                          )}
                        </div>
                      </div>
                      {editingField !== 'address' && (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEdit('address')}
                          className="text-black hover:text-black/80 flex items-center space-x-2 bg-black/5 hover:bg-black/10 px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                          <span>Edit</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8 bg-black/5 rounded-2xl p-6 border border-black/10"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mr-4">
                      <ShieldCheckIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl text-black">Account Security</h4>
                      <p className="text-gray-600 text-lg mt-1">Your account is secure and up to date</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            {activeSection !== 'personal' && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  {activeSection === 'security' && <LockClosedIcon className="w-6 h-6 mr-2 text-blue-600" />}
                  {activeSection === 'notifications' && <BellIcon className="w-6 h-6 mr-2 text-blue-600" />}
                  {activeSection === 'locations' && <MapPinIcon className="w-6 h-6 mr-2 text-blue-600" />}
                  {activeSection === 'privacy' && <ShieldCheckIcon className="w-6 h-6 mr-2 text-blue-600" />}
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h2>
                
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-8 transform transition-all duration-500 hover:scale-110">
                    {activeSection === 'security' && <LockClosedIcon className="w-12 h-12 text-white" />}
                    {activeSection === 'notifications' && <BellIcon className="w-12 h-12 text-white" />}
                    {activeSection === 'locations' && <MapPinIcon className="w-12 h-12 text-white" />}
                    {activeSection === 'privacy' && <ShieldCheckIcon className="w-12 h-12 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">Coming Soon</h3>
                  <p className="text-gray-600 max-w-md mb-8 text-lg">
                    We're crafting something special to enhance your BangiRider experience.
                  </p>
                  <button 
                    onClick={() => setActiveSection('personal')}
                    className="bg-black text-white py-4 px-10 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 group"
                  >
                    <span>Back to Personal Information</span>
                    <svg 
                      className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
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

export default Account; 