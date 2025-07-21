import React, { useState, useEffect } from 'react';
import { 
  Watch, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Bluetooth, 
  BluetoothOff, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Settings, 
  Battery, 
  Signal, 
  ArrowRight, 
  Plus,
  X,
  Info
} from 'lucide-react';

const SmartDeviceConnection = ({ onDeviceConnected, onSkip }) => {
  const [connectionStatus, setConnectionStatus] = useState('searching'); // searching, found, connecting, connected, failed
  const [availableDevices, setAvailableDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSearching, setIsSearching] = useState(true);

  // Simulate device discovery with proper error handling
  useEffect(() => {
    let searchTimeout;
    let connectionTimeout;

    const simulateDeviceSearch = () => {
      setIsSearching(true);
      setConnectionStatus('searching');
      setAvailableDevices([]);
      setSelectedDevice(null);
      setConnectionProgress(0);
      setErrorMessage('');

      searchTimeout = setTimeout(() => {
        try {
          const mockDevices = [
            {
              id: '1',
              name: 'Apple Watch Series 8',
              type: 'smartwatch',
              battery: 85,
              signal: 'strong',
              lastSeen: '2 min ago',
              isConnected: false
            },
            {
              id: '2',
              name: 'Samsung Galaxy Watch 6',
              type: 'smartwatch',
              battery: 72,
              signal: 'medium',
              lastSeen: '5 min ago',
              isConnected: false
            },
            {
              id: '3',
              name: 'Fitbit Sense 2',
              type: 'fitness-tracker',
              battery: 45,
              signal: 'weak',
              lastSeen: '10 min ago',
              isConnected: false
            },
            {
              id: '4',
              name: 'Garmin Fenix 7',
              type: 'smartwatch',
              battery: 90,
              signal: 'strong',
              lastSeen: '1 min ago',
              isConnected: false
            }
          ];

          setAvailableDevices(mockDevices);
          setConnectionStatus('found');
          setIsSearching(false);
        } catch (error) {
          console.error('Device search error:', error);
          setConnectionStatus('failed');
          setErrorMessage('Failed to search for devices. Please try again.');
          setIsSearching(false);
        }
      }, 2000);

      return () => {
        if (searchTimeout) clearTimeout(searchTimeout);
        if (connectionTimeout) clearTimeout(connectionTimeout);
      };
    };

    simulateDeviceSearch();

    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
      if (connectionTimeout) clearTimeout(connectionTimeout);
    };
  }, []);

  const handleDeviceSelect = (device) => {
    if (!device) return;

    try {
      setSelectedDevice(device);
      setConnectionStatus('connecting');
      setConnectionProgress(0);
      setErrorMessage('');

      // Simulate connection process with proper error handling
      const connectionInterval = setInterval(() => {
        setConnectionProgress(prev => {
          if (prev >= 100) {
            clearInterval(connectionInterval);
            setConnectionStatus('connected');
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate connection failure for weak signal devices
      if (device.signal === 'weak') {
        setTimeout(() => {
          clearInterval(connectionInterval);
          setConnectionStatus('failed');
          setErrorMessage('Connection failed due to weak signal. Please move closer to the device.');
        }, 3000);
      }
    } catch (error) {
      console.error('Device selection error:', error);
      setConnectionStatus('failed');
      setErrorMessage('Failed to connect to device. Please try again.');
    }
  };

  const handleRetryConnection = () => {
    if (selectedDevice) {
      handleDeviceSelect(selectedDevice);
    }
  };

  const handleRefreshDevices = () => {
    setConnectionStatus('searching');
    setSelectedDevice(null);
    setConnectionProgress(0);
    setErrorMessage('');
    setAvailableDevices([]);
    setIsSearching(true);
    
    // Simulate refresh with error handling
    setTimeout(() => {
      try {
        const refreshedDevices = [
          {
            id: '1',
            name: 'Apple Watch Series 8',
            type: 'smartwatch',
            battery: 85,
            signal: 'strong',
            lastSeen: 'Just now',
            isConnected: false
          },
          {
            id: '2',
            name: 'Samsung Galaxy Watch 6',
            type: 'smartwatch',
            battery: 72,
            signal: 'medium',
            lastSeen: '2 min ago',
            isConnected: false
          }
        ];
        setAvailableDevices(refreshedDevices);
        setConnectionStatus('found');
        setIsSearching(false);
      } catch (error) {
        console.error('Device refresh error:', error);
        setConnectionStatus('failed');
        setErrorMessage('Failed to refresh devices. Please try again.');
        setIsSearching(false);
      }
    }, 1500);
  };

  const getSignalIcon = (signal) => {
    if (!signal) return <Signal className="text-gray-400" size={16} />;
    
    switch (signal) {
      case 'strong':
        return <Signal className="text-green-400" size={16} />;
      case 'medium':
        return <Signal className="text-yellow-400" size={16} />;
      case 'weak':
        return <Signal className="text-red-400" size={16} />;
      default:
        return <Signal className="text-gray-400" size={16} />;
    }
  };

  const getBatteryColor = (battery) => {
    if (!battery) return 'text-gray-400';
    if (battery > 80) return 'text-green-400';
    if (battery > 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const renderConnectionStatus = () => {
    switch (connectionStatus) {
      case 'searching':
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <RefreshCw className="text-[#8B5CF6] animate-spin" size={48} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Searching for Devices</h3>
              <p className="text-gray-400">Make sure your smartwatch is nearby and Bluetooth is enabled</p>
            </div>
          </div>
        );

      case 'found':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Available Devices</h3>
              <p className="text-gray-400">Select a device to connect</p>
            </div>
            
            <div className="space-y-3">
              {availableDevices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => handleDeviceSelect(device)}
                  className="w-full p-4 bg-[#1E293B] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-all duration-200 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] rounded-lg flex items-center justify-center">
                        <Watch className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{device.name}</h4>
                        <p className="text-gray-400 text-sm capitalize">{device.type.replace('-', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Battery className={`${getBatteryColor(device.battery)}`} size={16} />
                        <span className="text-gray-400 text-sm">{device.battery}%</span>
                      </div>
                      {getSignalIcon(device.signal)}
                      <ArrowRight className="text-gray-400" size={20} />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleRefreshDevices}
                disabled={isSearching}
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={16} className={isSearching ? 'animate-spin' : ''} />
                <span>{isSearching ? 'Searching...' : 'Refresh Devices'}</span>
              </button>
            </div>
          </div>
        );

      case 'connecting':
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#334155] rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#8B5CF6] rounded-full animate-spin border-t-transparent"></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Connecting to {selectedDevice?.name}</h3>
              <p className="text-gray-400 mb-4">Please wait while we establish a secure connection</p>
              
              <div className="w-full bg-[#334155] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${connectionProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">{connectionProgress}% Complete</p>
            </div>
          </div>
        );

      case 'connected':
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center">
                <CheckCircle className="text-white" size={32} />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Successfully Connected!</h3>
              <p className="text-gray-400 mb-4">{selectedDevice?.name} is now connected and ready to sync data</p>
              
              <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Device Status</span>
                  <span className="text-green-400 text-sm font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Battery Level</span>
                  <span className="text-white text-sm">{selectedDevice?.battery}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Signal Strength</span>
                  <div className="flex items-center space-x-1">
                    {getSignalIcon(selectedDevice?.signal)}
                    <span className="text-white text-sm capitalize">{selectedDevice?.signal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => onDeviceConnected(selectedDevice)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/25 transition-all duration-200"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-full flex items-center justify-center">
                <AlertCircle className="text-white" size={32} />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Connection Failed</h3>
              <p className="text-gray-400 mb-4">{errorMessage || 'Failed to connect to device'}</p>
              
              <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155] text-left">
                <h4 className="text-white font-medium mb-3">Troubleshooting Tips:</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#8B5CF6] mt-1">•</span>
                    <span>Ensure your smartwatch is within 10 feet</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#8B5CF6] mt-1">•</span>
                    <span>Check that Bluetooth is enabled on both devices</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#8B5CF6] mt-1">•</span>
                    <span>Try restarting your smartwatch</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#8B5CF6] mt-1">•</span>
                    <span>Make sure the device isn't connected to another app</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleRetryConnection}
                className="flex-1 px-6 py-3 bg-[#1E293B] text-white font-medium rounded-lg border border-[#334155] hover:bg-[#334155] transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleRefreshDevices}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/25 transition-all duration-200"
              >
                Search Again
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="text-red-400" size={48} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
              <p className="text-gray-400">Please try refreshing the page</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] rounded-xl flex items-center justify-center mr-3">
              <Watch className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white">Connect Device</h1>
          </div>
          <p className="text-gray-400">Sync your smartwatch to track your fitness data automatically</p>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] p-8">
          {renderConnectionStatus()}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            Skip for now - I'll connect later
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartDeviceConnection; 