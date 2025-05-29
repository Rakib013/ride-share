import { useState } from 'react';
import { motion } from 'framer-motion';

// Mock ride history data
const MOCK_RIDES = [
  {
    id: '1',
    date: '2023-05-15',
    time: '14:30',
    pickup: 'Times Square',
    destination: 'JFK Airport',
    driver: {
      name: 'Michael Johnson',
      rating: 4.8,
      photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    car: {
      model: 'Toyota Camry',
      color: 'Black',
      plate: 'NYC 4532'
    },
    status: 'completed',
    price: '$35.40',
    distance: '18.2 miles',
    duration: '45 mins'
  },
  {
    id: '2',
    date: '2023-05-12',
    time: '09:15',
    pickup: 'Central Park',
    destination: 'Brooklyn Heights',
    driver: {
      name: 'Sarah Williams',
      rating: 4.9,
      photo: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    car: {
      model: 'Honda Civic',
      color: 'Silver',
      plate: 'NYC 7890'
    },
    status: 'completed',
    price: '$22.15',
    distance: '7.8 miles',
    duration: '32 mins'
  },
  {
    id: '3',
    date: '2023-05-08',
    time: '20:45',
    pickup: 'Manhattan Bridge',
    destination: 'Queens Boulevard',
    driver: {
      name: 'David Chen',
      rating: 4.7,
      photo: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    car: {
      model: 'Tesla Model 3',
      color: 'White',
      plate: 'NYC 2341'
    },
    status: 'completed',
    price: '$29.75',
    distance: '12.5 miles',
    duration: '38 mins'
  },
  {
    id: '4',
    date: '2023-05-05',
    time: '11:20',
    pickup: 'Grand Central Station',
    destination: 'Empire State Building',
    driver: {
      name: 'Jessica Brown',
      rating: 5.0,
      photo: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
    car: {
      model: 'Hyundai Sonata',
      color: 'Blue',
      plate: 'NYC 9876'
    },
    status: 'completed',
    price: '$12.40',
    distance: '1.8 miles',
    duration: '15 mins'
  },
  {
    id: '5',
    date: '2023-04-30',
    time: '16:50',
    pickup: 'LaGuardia Airport',
    destination: 'Times Square',
    driver: {
      name: 'Robert Garcia',
      rating: 4.6,
      photo: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    car: {
      model: 'Ford Escape',
      color: 'Red',
      plate: 'NYC 3456'
    },
    status: 'canceled',
    price: '$28.90',
    distance: '10.3 miles',
    duration: '40 mins'
  }
];

const RideHistory = () => {
  const [selectedRide, setSelectedRide] = useState<typeof MOCK_RIDES[0] | null>(null);
  
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Your Ride History</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ride List */}
        <div className="col-span-1 lg:col-span-2">
          <div className="glass p-6 rounded-xl">
            {MOCK_RIDES.map((ride, index) => (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`mb-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedRide?.id === ride.id 
                    ? 'bg-primary bg-opacity-20 border border-primary' 
                    : 'hover:bg-white hover:bg-opacity-5 border border-transparent'
                }`}
                onClick={() => setSelectedRide(ride)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className={`text-sm px-2 py-1 rounded-full mr-3 ${
                        ride.status === 'completed' ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'
                      }`}>
                        {ride.status === 'completed' ? 'Completed' : 'Canceled'}
                      </span>
                      <span className="text-gray-400 text-sm">{ride.date} • {ride.time}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{ride.pickup} to {ride.destination}</h3>
                    <div className="text-gray-400 text-sm">{ride.car.model} • {ride.distance}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{ride.price}</div>
                    <div className="text-gray-400 text-sm">{ride.duration}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Ride Details */}
        <div className="glass p-6 rounded-xl">
          {selectedRide ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Ride Details</h2>
              
              <div className="mb-6">
                <div className="glass p-4 rounded-lg bg-opacity-20">
                  <div className="flex justify-between mb-4">
                    <div className="text-gray-400">Pickup</div>
                    <div className="font-semibold text-right">{selectedRide.pickup}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-400">Destination</div>
                    <div className="font-semibold text-right">{selectedRide.destination}</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Driver</h3>
                <div className="flex items-center">
                  <img 
                    src={selectedRide.driver.photo} 
                    alt={selectedRide.driver.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{selectedRide.driver.name}</div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {selectedRide.driver.rating}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Vehicle</h3>
                <div className="glass p-4 rounded-lg bg-opacity-20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">Model</div>
                      <div>{selectedRide.car.model}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Color</div>
                      <div>{selectedRide.car.color}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Plate</div>
                      <div>{selectedRide.car.plate}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3">Payment</h3>
                <div className="flex justify-between items-center">
                  <div className="text-gray-400">Total</div>
                  <div className="text-2xl font-bold">{selectedRide.price}</div>
                </div>
              </div>
              
              {selectedRide.status === 'completed' && (
                <button className="btn-secondary w-full mt-4">
                  Download Receipt
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No Ride Selected</h3>
              <p className="text-gray-400">
                Select a ride from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideHistory; 