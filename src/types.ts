export interface Room {
  id: string;
  name: string;
  category: string;
  area: number; // m²
  status: 'available' | 'reserved' | 'occupied';
  priceMonthly: number; // USD
  description: string;
  badge: string;
  specs: {
    windows: string;
    desk: string;
    starlink: string;
    bed: string;
    view: string;
    noise: string;
  };
  features: string[];
  images: {
    url: string;
    caption: string;
    tag: string;
  }[];
}

export interface PainPoint {
  id: string;
  category: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
  solvedBadge: string;
  iconName: string;
}

export interface TelemetryMetric {
  id: string;
  label: string;
  value: string;
  status: 'optimal' | 'good' | 'standby';
  unit?: string;
  subtext: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  period: string;
  rating: number;
  text: string;
  highlight: string;
  country: string;
}

export interface FAQItem {
  id: string;
  category: 'visa' | 'tech' | 'living' | 'booking' | 'tax';
  question: string;
  answer: string;
}

export interface BookingFormData {
  name: string;
  telegramOrWhatsapp: string;
  email: string;
  occupation: string;
  preferredRoomId: string;
  arrivalDate: string;
  stayDuration: string;
  notes: string;
}
