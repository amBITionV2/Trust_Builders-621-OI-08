import { Language } from '../types';

type TranslationKey =
  | 'appName'
  | 'login'
  | 'logout'
  | 'mobile'
  | 'password'
  | 'liveTrack'
  | 'routes'
  | 'nearestStop'
  | 'bookTicket'
  | 'payments'
  | 'notifications'
  | 'settings'
  | 'search'
  | 'timeline'
  | 'mapView'
  | 'availableSeats'
  | 'eta'
  | 'from'
  | 'to'
  | 'fare'
  | 'pay'
  | 'upiId'
  | 'confirmPayment'
  | 'verificationCode'
  | 'usageStatus'
  | 'theme'
  | 'language'
  | 'darkMode'
  | 'lightMode'
  | 'english'
  | 'kannada'
  | 'hindi'
  | 'welcome'
  | 'selectStop'
  | 'bookNow'
  | 'myTickets'
  | 'unread'
  | 'currentLocation'
  | 'nextBusIn'
  | 'minutes'
  | 'unused'
  | 'used'
  | 'expired'
  | 'pending'
  | 'completed'
  | 'failed';

type Translations = Record<Language, Record<TranslationKey, string>>;

const translations: Translations = {
  en: {
    appName: 'BMTC Passenger',
    login: 'Login',
    logout: 'Logout',
    mobile: 'Mobile Number',
    password: 'Password',
    liveTrack: 'Live Track',
    routes: 'Routes & Stops',
    nearestStop: 'Nearest Stop',
    bookTicket: 'Book Ticket',
    payments: 'Payments',
    notifications: 'Notifications',
    settings: 'Settings',
    search: 'Search bus or stop...',
    timeline: 'Timeline View',
    mapView: 'Map View',
    availableSeats: 'Available Seats',
    eta: 'ETA',
    from: 'From',
    to: 'To',
    fare: 'Fare',
    pay: 'Pay',
    upiId: 'UPI ID',
    confirmPayment: 'Confirm Payment',
    verificationCode: 'Verification Code',
    usageStatus: 'Status',
    theme: 'Theme',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    english: 'English',
    kannada: 'ಕನ್ನಡ',
    hindi: 'हिंदी',
    welcome: 'Welcome',
    selectStop: 'Select Stop',
    bookNow: 'Book Now',
    myTickets: 'My Tickets',
    unread: 'Unread',
    currentLocation: 'Current Location',
    nextBusIn: 'Next Bus In',
    minutes: 'minutes',
    unused: 'Unused',
    used: 'Used',
    expired: 'Expired',
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed'
  },
  kn: {
    appName: 'BMTC ಪ್ರಯಾಣಿಕರು',
    login: 'ಲಾಗಿನ್',
    logout: 'ಲಾಗ್ ಔಟ್',
    mobile: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    password: 'ಪಾಸ್ವರ್ಡ್',
    liveTrack: 'ಲೈವ್ ಟ್ರ್ಯಾಕ್',
    routes: 'ಮಾರ್ಗಗಳು ಮತ್ತು ನಿಲ್ದಾಣಗಳು',
    nearestStop: 'ಹತ್ತಿರದ ನಿಲ್ದಾಣ',
    bookTicket: 'ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ',
    payments: 'ಪಾವತಿಗಳು',
    notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್ಗಳು',
    search: 'ಬಸ್ ಅಥವಾ ನಿಲ್ದಾಣ ಹುಡುಕಿ...',
    timeline: 'ಟೈಮ್ಲೈನ್ ವೀಕ್ಷಣೆ',
    mapView: 'ನಕ್ಷೆ ವೀಕ್ಷಣೆ',
    availableSeats: 'ಲಭ್ಯವಿರುವ ಸೀಟುಗಳು',
    eta: 'ಅಂದಾಜು ಸಮಯ',
    from: 'ಇಂದ',
    to: 'ಗೆ',
    fare: 'ದರ',
    pay: 'ಪಾವತಿಸಿ',
    upiId: 'UPI ID',
    confirmPayment: 'ಪಾವತಿ ದೃಢೀಕರಿಸಿ',
    verificationCode: 'ಪರಿಶೀಲನಾ ಕೋಡ್',
    usageStatus: 'ಸ್ಥಿತಿ',
    theme: 'ಥೀಮ್',
    language: 'ಭಾಷೆ',
    darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್',
    lightMode: 'ಲೈಟ್ ಮೋಡ್',
    english: 'English',
    kannada: 'ಕನ್ನಡ',
    hindi: 'हिंदी',
    welcome: 'ಸ್ವಾಗತ',
    selectStop: 'ನಿಲ್ದಾಣ ಆಯ್ಕೆಮಾಡಿ',
    bookNow: 'ಈಗ ಬುಕ್ ಮಾಡಿ',
    myTickets: 'ನನ್ನ ಟಿಕೆಟ್ಗಳು',
    unread: 'ಓದದಿದ್ದ',
    currentLocation: 'ಪ್ರಸ್ತುತ ಸ್ಥಳ',
    nextBusIn: 'ಮುಂದಿನ ಬಸ್',
    minutes: 'ನಿಮಿಷಗಳು',
    unused: 'ಬಳಸದಿದ್ದ',
    used: 'ಬಳಸಿದ',
    expired: 'ಅವಧಿ ಮುಗಿದಿದೆ',
    pending: 'ಬಾಕಿ ಇದೆ',
    completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    failed: 'ವಿಫಲವಾಗಿದೆ'
  },
  hi: {
    appName: 'BMTC यात्री',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    mobile: 'मोबाइल नंबर',
    password: 'पासवर्ड',
    liveTrack: 'लाइव ट्रैक',
    routes: 'मार्ग और स्टॉप',
    nearestStop: 'निकटतम स्टॉप',
    bookTicket: 'टिकट बुक करें',
    payments: 'भुगतान',
    notifications: 'सूचनाएं',
    settings: 'सेटिंग्स',
    search: 'बस या स्टॉप खोजें...',
    timeline: 'टाइमलाइन व्यू',
    mapView: 'मैप व्यू',
    availableSeats: 'उपलब्ध सीटें',
    eta: 'अनुमानित समय',
    from: 'से',
    to: 'तक',
    fare: 'किराया',
    pay: 'भुगतान करें',
    upiId: 'UPI ID',
    confirmPayment: 'भुगतान की पुष्टि करें',
    verificationCode: 'सत्यापन कोड',
    usageStatus: 'स्थिति',
    theme: 'थीम',
    language: 'भाषा',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
    english: 'English',
    kannada: 'ಕನ್ನಡ',
    hindi: 'हिंदी',
    welcome: 'स्वागत है',
    selectStop: 'स्टॉप चुनें',
    bookNow: 'अभी बुक करें',
    myTickets: 'मेरे टिकट',
    unread: 'अपठित',
    currentLocation: 'वर्तमान स्थान',
    nextBusIn: 'अगली बस',
    minutes: 'मिनट',
    unused: 'अप्रयुक्त',
    used: 'प्रयुक्त',
    expired: 'समाप्त',
    pending: 'लंबित',
    completed: 'पूर्ण',
    failed: 'विफल'
  }
};

export const t = (key: TranslationKey, lang: Language): string => {
  return translations[lang][key] || translations.en[key];
};
