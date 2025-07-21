import React, { useState } from 'react';
import { 
  Palette, 
  Check, 
  X, 
  Sparkles,
  Heart,
  Moon,
  Sun,
  Flower2
} from 'lucide-react';

const ThemeCustomizer = ({ currentTheme, onThemeChange, onClose }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const themes = [
    {
      id: 'default',
      name: 'Classic Purple',
      description: 'Original FitTrack theme',
      colors: {
        primary: '#8B5CF6',
        secondary: '#F472B6',
        accent: '#6D28D9',
        background: '#0F172A',
        surface: '#1E293B',
        border: '#334155'
      },
      icon: Sparkles
    },
    {
      id: 'pink-dream',
      name: 'Pink Dream',
      description: 'Soft and dreamy pink theme',
      colors: {
        primary: '#EC4899',
        secondary: '#F472B6',
        accent: '#BE185D',
        background: '#1F1B24',
        surface: '#2D1B3D',
        border: '#4C1D95'
      },
      icon: Heart
    },
    {
      id: 'rose-garden',
      name: 'Rose Garden',
      description: 'Elegant rose and gold theme',
      colors: {
        primary: '#E11D48',
        secondary: '#FB7185',
        accent: '#BE123C',
        background: '#1F1B24',
        surface: '#2D1B3D',
        border: '#4C1D95'
      },
      icon: Flower2
    },
    {
      id: 'lavender-sky',
      name: 'Lavender Sky',
      description: 'Calming lavender and blue theme',
      colors: {
        primary: '#A855F7',
        secondary: '#C084FC',
        accent: '#7C3AED',
        background: '#0F172A',
        surface: '#1E293B',
        border: '#334155'
      },
      icon: Moon
    },
    {
      id: 'sunset-glow',
      name: 'Sunset Glow',
      description: 'Warm orange and pink sunset theme',
      colors: {
        primary: '#F97316',
        secondary: '#FB7185',
        accent: '#EA580C',
        background: '#1F1B24',
        surface: '#2D1B3D',
        border: '#4C1D95'
      },
      icon: Sun
    }
  ];

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    // Apply theme immediately when selected
    onThemeChange(theme);
  };

  const handleCancel = () => {
    // Revert to original theme if user cancels
    onThemeChange(currentTheme);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#334155]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] rounded-lg flex items-center justify-center">
              <Palette className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Choose Theme</h2>
              <p className="text-gray-400 text-sm">Click any theme to apply instantly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#334155] transition-colors"
          >
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Theme Options */}
        <div className="p-6 space-y-4">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedTheme.id === theme.id;
            
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                    : 'border-[#334155] bg-[#1E293B] hover:border-[#475569]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                      }}
                    >
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {theme.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{theme.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Color Preview */}
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.secondary }}
                      ></div>
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.accent }}
                      ></div>
                    </div>
                    
                    {isSelected && (
                      <div className="w-6 h-6 bg-[#8B5CF6] rounded-full flex items-center justify-center">
                        <Check className="text-white" size={14} />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Preview */}
        <div className="px-6 pb-6">
          <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155]">
            <h4 className="text-white font-medium mb-3">Current Theme Preview</h4>
            <div className="space-y-3">
              <div 
                className="h-3 rounded-full"
                style={{ backgroundColor: selectedTheme.colors.primary }}
              ></div>
              <div 
                className="h-3 rounded-full"
                style={{ backgroundColor: selectedTheme.colors.secondary }}
              ></div>
              <div 
                className="h-3 rounded-full"
                style={{ backgroundColor: selectedTheme.colors.accent }}
              ></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 border-t border-[#334155]">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-3 bg-[#334155] text-white font-medium rounded-lg hover:bg-[#475569] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/25 transition-all duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer; 