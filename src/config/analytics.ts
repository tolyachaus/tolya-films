/**
 * Google Analytics 4 & Consent Mode v2 Configuration
 * 
 * INSTRUCTION FOR TOLYA:
 * Replace 'G-XXXXXXXXXX' below with your actual Google Analytics Measurement ID (e.g. 'G-A1B2C3D4E5').
 */
export const GA_MEASUREMENT_ID = 'G-8VTK8P9G3F';

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'tolya_films_cookie_consent_v2';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Initialize Google Consent Mode v2 defaults
 * Must run before any GA script loads
 */
export const initConsentMode = () => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  // Get saved preferences or default to denied
  const saved = getConsentPreferences();
  const analyticsGranted = saved ? saved.analytics : false;

  // Google Consent Mode v2 Default State
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  if (analyticsGranted) {
    loadGoogleAnalytics();
  }
};

/**
 * Dynamically load Google Analytics script only if measurement ID is set and consent is granted
 */
export const loadGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

  // Prevent duplicate script insertion
  if (document.getElementById('ga-gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  
  script.onload = () => {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true
    });
  };

  document.head.appendChild(script);
};

/**
 * Update Consent State when user accepts/rejects in Cookie Banner
 */
export const updateConsentState = (analytics: boolean) => {
  if (typeof window === 'undefined') return;

  const status = analytics ? 'granted' : 'denied';

  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: status,
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  saveConsentPreferences({
    necessary: true,
    analytics,
    timestamp: Date.now()
  });

  if (analytics) {
    loadGoogleAnalytics();
    // Fire immediate pageview for active session registration
    setTimeout(() => {
      trackPageView(window.location.hash || window.location.pathname);
    }, 500);
  }
};

/**
 * LocalStorage Helpers
 */
export const getConsentPreferences = (): ConsentPreferences | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const saveConsentPreferences = (prefs: ConsentPreferences) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save cookie consent', e);
  }
};

/**
 * Helper to safely track custom GA4 events
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

  const prefs = getConsentPreferences();
  if (!prefs || !prefs.analytics) return;

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};

/**
 * Pre-configured Event Helpers
 */
export const trackFormSubmit = (formName: string = 'Booking Inquiry') => {
  trackEvent('generate_lead', {
    event_category: 'Engagement',
    event_label: formName
  });
};

export const trackEmailClick = (email: string = 'tolya.films@gmail.com') => {
  trackEvent('click_email', {
    event_category: 'Contact',
    event_label: email
  });
};

export const trackPhoneClick = (phone: string = '+49 160 9652965') => {
  trackEvent('click_phone', {
    event_category: 'Contact',
    event_label: phone
  });
};

export const trackInstagramClick = () => {
  trackEvent('click_instagram', {
    event_category: 'Social',
    event_label: 'Instagram Profile'
  });
};

export const trackPageView = (path: string, title?: string) => {
  trackEvent('page_view', {
    page_path: path,
    page_title: title || document.title
  });
};
