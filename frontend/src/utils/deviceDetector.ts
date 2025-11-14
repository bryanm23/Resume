export interface DeviceInfo {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  isTouchDevice: boolean;
  userAgent: string;
}

export const detectDevice = (): DeviceInfo => {
  const userAgent = navigator.userAgent;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Detect device type
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
    deviceType = 'mobile';
  } else if (/tablet|ipad|playbook|silk/i.test(userAgent) || (screenWidth >= 600 && screenWidth <= 1024)) {
    deviceType = 'tablet';
  }

  // Detect browser
  let browser = 'Unknown';
  let browserVersion = 'Unknown';

  if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
    browser = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
    browser = 'Safari';
    const match = userAgent.match(/Version\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.indexOf('Edg') > -1) {
    browser = 'Edge';
    const match = userAgent.match(/Edg\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browser = 'Opera';
    const match = userAgent.match(/(?:Opera|OPR)\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  }

  // Detect OS
  let os = 'Unknown';
  let osVersion = 'Unknown';

  if (userAgent.indexOf('Windows NT') > -1) {
    os = 'Windows';
    const match = userAgent.match(/Windows NT (\d+\.\d+)/);
    if (match) {
      const version = parseFloat(match[1]);
      if (version === 10.0) osVersion = '10/11';
      else if (version === 6.3) osVersion = '8.1';
      else if (version === 6.2) osVersion = '8';
      else if (version === 6.1) osVersion = '7';
      else osVersion = match[1];
    }
  } else if (userAgent.indexOf('Mac OS X') > -1) {
    os = 'macOS';
    const match = userAgent.match(/Mac OS X (\d+[._]\d+)/);
    if (match) {
      osVersion = match[1].replace('_', '.');
    }
  } else if (userAgent.indexOf('Linux') > -1) {
    os = 'Linux';
  } else if (userAgent.indexOf('Android') > -1) {
    os = 'Android';
    const match = userAgent.match(/Android (\d+\.\d+)/);
    osVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
    os = 'iOS';
    const match = userAgent.match(/OS (\d+[._]\d+)/);
    if (match) {
      osVersion = match[1].replace('_', '.');
    }
  }

  // Detect touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return {
    deviceType,
    browser,
    browserVersion,
    os,
    osVersion,
    screenWidth,
    screenHeight,
    viewportWidth,
    viewportHeight,
    isTouchDevice,
    userAgent,
  };
};

export const logDeviceInfo = (): void => {
  const info = detectDevice();
  console.group('🖥️ Device Information');
  console.log('Device Type:', info.deviceType);
  console.log('Browser:', `${info.browser} ${info.browserVersion}`);
  console.log('OS:', `${info.os} ${info.osVersion}`);
  console.log('Screen:', `${info.screenWidth}x${info.screenHeight}`);
  console.log('Viewport:', `${info.viewportWidth}x${info.viewportHeight}`);
  console.log('Touch Device:', info.isTouchDevice);
  console.log('User Agent:', info.userAgent);
  console.groupEnd();
};

