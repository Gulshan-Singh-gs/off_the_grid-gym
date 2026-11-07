export interface GymSettings {
  id: string;
  gym_name: string;
  tagline: string;
  short_description: string;
  phone_number: string;
  whatsapp_number: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  google_maps_url: string;
  google_maps_embed_url: string;
  instagram_url: string;
  instagram_handle: string;
  opening_hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  announcement: {
    enabled: boolean;
    text: string;
    badge: string;
    link_url?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  duration_label: string;
  duration_months: number;
  price_inr: number;
  original_price_inr?: number;
  description: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  badge?: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface PromotionalOffer {
  id: string;
  title: string;
  badge: string;
  description: string;
  discount_text: string;
  promo_code?: string;
  applicable_plan?: string;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience_years: number;
  bio: string;
  specializations: string[];
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export type GalleryCategory = 'strength' | 'cardio' | 'freeweights' | 'ambience' | 'community';

export interface GalleryImage {
  id: string;
  title: string;
  category: GalleryCategory;
  image_url: string;
  caption?: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

