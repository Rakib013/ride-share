import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePic?: string;
  address?: string;
}

interface StoredUser extends User {
  password: string;
}

// Initial mock user data
const INITIAL_MOCK_USERS: StoredUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password',
    phone: '+1987654321',
    profilePic: 'https://randomuser.me/api/portraits/women/1.jpg'
  }
];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mockUsers, setMockUsers] = useState<StoredUser[]>(() => {
    // Try to get stored users from localStorage first
    const storedUsers = localStorage.getItem('mockUsers');
    return storedUsers ? JSON.parse(storedUsers) : INITIAL_MOCK_USERS;
  });

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save mockUsers to localStorage whenever it changes
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }, [mockUsers]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    console.log('Login attempt with:', email, password);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try to find user in mock data
      const foundUser = mockUsers.find(u => 
        u.email === email && u.password === password
      );
      
      if (foundUser) {
        console.log('Found matching user in database');
        // Remove password from foundUser
        const userToStore = { 
          id: foundUser.id,
          name: foundUser.name, 
          email: foundUser.email,
          phone: foundUser.phone,
          profilePic: foundUser.profilePic,
          address: foundUser.address
        };
        
        setUser(userToStore);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userToStore));
        console.log('Authentication state:', true);
        return true;
      }
      
      console.log('No matching user found');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(u => u.email === email)) {
        console.log('Email already exists:', email);
        setLoading(false);
        return false;
      }
      
      // Create new user
      const newUser: StoredUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // Store password for future logins
        phone: '+880 17' + Math.floor(Math.random() * 10000000).toString().padStart(8, '0'),
        address: 'House 123, Road 12, Block B, Banani, Dhaka 1213',
        profilePic: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      };
      
      // Update mockUsers array with the new user
      const updatedUsers = [...mockUsers, newUser];
      setMockUsers(updatedUsers);
      
      // Store in localStorage without the password
      const userToStore: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        profilePic: newUser.profilePic,
        address: newUser.address
      };
      
      setUser(userToStore);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userToStore));
      console.log('User registered successfully:', email);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  return {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading
  };
}; 