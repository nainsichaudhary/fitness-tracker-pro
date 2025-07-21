import React from 'react';
import { 
  Watch, 
  Smartphone, 
  WifiOff, 
  BluetoothOff, 
  Plus, 
  ArrowRight, 
  Info,
  Activity,
  Heart,
  TrendingUp
} from 'lucide-react';

const NoDeviceConnected = ({ onConnectDevice, onContinueWithout }) => {
  const features = [
    {
      icon: Activity,
      title: "Manual Tracking",
      description: "Log your workouts and activities manually with our easy-to-use interface"
    },
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Track your vital signs and health metrics using your phone's sensors"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "View detailed charts and insights about your fitness journey"
    }
  ];

  const benefits = [
    "Real-time heart rate monitoring",
    "Automatic workout detection",
    "Sleep quality tracking",
    "Step counting accuracy",
    "GPS workout routes",
    "Calorie burn precision"
  ];

  const handleConnectDevice = () => {
    try {
      if (onConnectDevice) {
        onConnectDevice();
      }
    } catch (error) {
      console.error('Error connecting device:', error);
    }
  };

  const handleContinueWithout = () => {
    try {
      if (onContinueWithout) {
        onContinueWithout();
      }
    } catch (error) {
      console.error('Error continuing without device:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] rounded-xl flex items-center justify-center mr-3">
              <Watch className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white">No Smart Device Connected</h1>
          </div>
          <p className="text-gray-400">Connect your smartwatch or fitness tracker for enhanced tracking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Benefits */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center">
                  <Info className="text-white" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-white">Benefits of Connecting</h2>
              </div>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Available Features Without Device</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                      <p className="text-gray-400 text-xs mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Connection Options */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Watch className="text-white" size={32} />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Connect Your Device</h2>
                <p className="text-gray-400">Get the most out of FitTrack with automatic data sync</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleConnectDevice}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/25 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Connect Smart Device</span>
                  <ArrowRight size={20} />
                </button>

                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-3">Supported devices:</p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span>Apple Watch</span>
                    <span>•</span>
                    <span>Samsung Galaxy Watch</span>
                    <span>•</span>
                    <span>Fitbit</span>
                    <span>•</span>
                    <span>Garmin</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6B7280] to-[#4B5563] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Continue Without Device</h3>
                <p className="text-gray-400 text-sm mb-4">You can still track your fitness manually</p>
                
                <button
                  onClick={handleContinueWithout}
                  className="w-full px-6 py-3 bg-[#334155] text-white font-medium rounded-lg hover:bg-[#475569] transition-colors"
                >
                  Start Manual Tracking
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-8">
          <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155] inline-block">
            <p className="text-gray-400 text-sm">
              You can always connect a device later from the settings menu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoDeviceConnected; 