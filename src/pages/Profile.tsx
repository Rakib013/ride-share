import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

// Mock payment methods
const PAYMENT_METHODS = [
  {
    id: 'card1',
    type: 'VISA',
    last4: '4242',
    expiry: '05/25',
    isDefault: true
  },
  {
    id: 'card2',
    type: 'MASTERCARD',
    last4: '5678',
    expiry: '08/24',
    isDefault: false
  }
];

// Mock addresses
const ADDRESSES = [
  {
    id: 'addr1',
    name: 'Home',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    isDefault: true
  },
  {
    id: 'addr2',
    name: 'Work',
    address: '555 Business Ave, 12th Floor, New York, NY 10018',
    isDefault: false
  }
];

const Profile = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    // For now, just toggle editing mode
    setIsEditing(false);
  };
  
  // Different tabs for the profile page
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'payment', label: 'Payment Methods' },
    { id: 'addresses', label: 'Saved Places' },
    { id: 'preferences', label: 'Preferences' }
  ];
  
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="col-span-1">
          <div className="glass p-6 rounded-xl">
            <div className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-white hover:bg-opacity-10 text-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-span-1 md:col-span-3">
          <div className="glass p-6 rounded-xl">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-secondary px-4 py-2"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 rounded-full mr-6 bg-primary flex items-center justify-center text-3xl font-bold text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold">{user?.name || 'User'}</h3>
                    <p className="text-gray-400">Member since May 2023</p>
                  </div>
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="input-field w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        className="input-field w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="input-field w-full"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        className="btn-primary px-6 py-2"
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="glass p-4 rounded-lg bg-opacity-20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                          <div className="font-semibold">{user?.name || 'Not set'}</div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Email</label>
                          <div className="font-semibold">{user?.email || 'Not set'}</div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Phone Number</label>
                          <div className="font-semibold">{user?.phone || 'Not set'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Account Security</h3>
                      <div className="glass p-4 rounded-lg bg-opacity-20">
                        <button className="text-primary hover:text-blue-400 transition-colors">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <button className="btn-secondary px-4 py-2">
                    Add Payment Method
                  </button>
                </div>
                
                <div className="space-y-4">
                  {PAYMENT_METHODS.map(method => (
                    <div key={method.id} className="glass p-4 rounded-lg bg-opacity-20 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-white rounded mr-4 flex items-center justify-center font-bold text-blue-800">
                          {method.type}
                        </div>
                        <div>
                          <div className="font-semibold">
                            •••• {method.last4}
                            {method.isDefault && (
                              <span className="ml-2 text-xs bg-primary bg-opacity-20 text-primary px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">Expires {method.expiry}</div>
                        </div>
                      </div>
                      <div>
                        <button className="text-gray-400 hover:text-red-400">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Saved Places</h2>
                  <button className="btn-secondary px-4 py-2">
                    Add Address
                  </button>
                </div>
                
                <div className="space-y-4">
                  {ADDRESSES.map(address => (
                    <div key={address.id} className="glass p-4 rounded-lg bg-opacity-20 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">
                          {address.name}
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-primary bg-opacity-20 text-primary px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">{address.address}</div>
                      </div>
                      <div>
                        <button className="text-gray-400 hover:text-red-400">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">App Preferences</h2>
                
                <div className="space-y-6">
                  <div className="glass p-4 rounded-lg bg-opacity-20">
                    <h3 className="font-semibold mb-4">Notifications</h3>
                    
                    <div className="space-y-3">
                      {[
                        { id: 'ride_updates', label: 'Ride Updates' },
                        { id: 'promotions', label: 'Promotions and Offers' },
                        { id: 'account', label: 'Account Updates' }
                      ].map(option => (
                        <div key={option.id} className="flex items-center justify-between">
                          <span>{option.label}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={option.id !== 'promotions'} />
                            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="glass p-4 rounded-lg bg-opacity-20">
                    <h3 className="font-semibold mb-4">App Settings</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Dark Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>Location Services</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 