import React, { useState, useEffect } from 'react';
import { detectDevice, DeviceInfo as DeviceInfoType } from '../utils/deviceDetector';
import { ComputerDesktopIcon, DevicePhoneMobileIcon, DeviceTabletIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const DeviceInfo: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const info = detectDevice();
    setDeviceInfo(info);
    
    // Log to console on mount
    console.group('🖥️ Device Information');
    console.log('Device Type:', info.deviceType);
    console.log('Browser:', `${info.browser} ${info.browserVersion}`);
    console.log('OS:', `${info.os} ${info.osVersion}`);
    console.log('Screen:', `${info.screenWidth}x${info.screenHeight}`);
    console.log('Viewport:', `${info.viewportWidth}x${info.viewportHeight}`);
    console.log('Touch Device:', info.isTouchDevice);
    console.groupEnd();

    // Update on resize
    const handleResize = () => {
      const updatedInfo = detectDevice();
      setDeviceInfo(updatedInfo);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!deviceInfo) return null;

  const getDeviceIcon = () => {
    switch (deviceInfo.deviceType) {
      case 'mobile':
        return <DevicePhoneMobileIcon className="h-4 w-4" />;
      case 'tablet':
        return <DeviceTabletIcon className="h-4 w-4" />;
      default:
        return <ComputerDesktopIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Compact view - always visible */}
          <div className="flex items-center space-x-4 text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              {getDeviceIcon()}
              <span className="font-medium capitalize">{deviceInfo.deviceType}</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-gray-600 dark:text-gray-400">
              <span className="font-medium">{deviceInfo.browser} {deviceInfo.browserVersion}</span>
              <span>•</span>
              <span>{deviceInfo.os} {deviceInfo.osVersion !== 'Unknown' ? deviceInfo.osVersion : ''}</span>
              <span>•</span>
              <span>{deviceInfo.viewportWidth} × {deviceInfo.viewportHeight}px</span>
            </div>
            <div className="sm:hidden text-gray-600 dark:text-gray-400">
              <span>{deviceInfo.browser}</span>
            </div>
          </div>

          {/* Expand/Collapse button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-1"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Expanded view */}
        {isExpanded && (
          <div className="pb-3 border-t border-gray-200 dark:border-gray-700 mt-2 pt-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Device Type</div>
                <div className="font-semibold text-gray-900 dark:text-white capitalize">
                  {deviceInfo.deviceType}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Browser</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {deviceInfo.browser} {deviceInfo.browserVersion}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">OS</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {deviceInfo.os} {deviceInfo.osVersion !== 'Unknown' ? deviceInfo.osVersion : ''}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Viewport</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {deviceInfo.viewportWidth} × {deviceInfo.viewportHeight}px
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Screen</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {deviceInfo.screenWidth} × {deviceInfo.screenHeight}px
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Touch</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {deviceInfo.isTouchDevice ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceInfo;

