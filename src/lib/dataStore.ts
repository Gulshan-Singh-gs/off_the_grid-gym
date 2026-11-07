import { supabase, isSupabaseConfigured } from './supabase';
import {
  defaultGymSettings,
  defaultMembershipPlans,
  defaultPromotionalOffers,
  defaultTrainers,
  defaultGalleryImages,
} from './defaultData';
import {
  GymSettings,
  MembershipPlan,
  PromotionalOffer,
  Trainer,
  GalleryImage,
} from '@/types';

// Browser-safe local storage keys for fallback demo mode
const STORAGE_KEYS = {
  SETTINGS: 'otg_gym_settings',
  PLANS: 'otg_membership_plans',
  OFFERS: 'otg_promotional_offers',
  TRAINERS: 'otg_trainers',
  GALLERY: 'otg_gallery_images',
};

function getLocalItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('otg_datastore_updated'));
  } catch (err) {
    console.error(`Failed to save ${key} to localStorage:`, err);
  }
}

// ==========================================
// GYM SETTINGS
// ==========================================
export async function getGymSettings(): Promise<GymSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('gym_settings')
        .select('*')
        .eq('id', 'otg-settings-01')
        .single();
      if (!error && data) {
        return data as GymSettings;
      }
    } catch (e) {
      console.warn('Supabase fetch failed for settings, falling back to local:', e);
    }
  }
  return getLocalItem<GymSettings>(STORAGE_KEYS.SETTINGS, defaultGymSettings);
}

export async function updateGymSettings(settings: GymSettings): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('gym_settings')
        .upsert({ ...settings, id: 'otg-settings-01' });
      if (!error) return true;
    } catch (e) {
      console.error('Supabase update error:', e);
    }
  }
  setLocalItem(STORAGE_KEYS.SETTINGS, settings);
  return true;
}

// ==========================================
// MEMBERSHIP PLANS
// ==========================================
export async function getMembershipPlans(publicOnly = true): Promise<MembershipPlan[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('membership_plans').select('*').order('sort_order', { ascending: true });
      if (publicOnly) {
        query = query.eq('is_active', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as MembershipPlan[];
      }
    } catch (e) {
      console.warn('Supabase fetch failed for plans, falling back to local:', e);
    }
  }

  const all = getLocalItem<MembershipPlan[]>(STORAGE_KEYS.PLANS, defaultMembershipPlans);
  const filtered = publicOnly ? all.filter((p) => p.is_active) : all;
  return filtered.sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveMembershipPlans(plans: MembershipPlan[]): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('membership_plans').upsert(plans);
      if (!error) return true;
    } catch (e) {
      console.error('Supabase save error:', e);
    }
  }
  setLocalItem(STORAGE_KEYS.PLANS, plans);
  return true;
}

export async function deleteMembershipPlan(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('membership_plans').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.error('Supabase delete error:', e);
    }
  }
  const current = getLocalItem<MembershipPlan[]>(STORAGE_KEYS.PLANS, defaultMembershipPlans);
  setLocalItem(
    STORAGE_KEYS.PLANS,
    current.filter((p) => p.id !== id)
  );
  return true;
}

// ==========================================
// PROMOTIONAL OFFERS
// ==========================================
export async function getPromotionalOffers(publicOnly = true): Promise<PromotionalOffer[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('promotional_offers').select('*').order('created_at', { ascending: false });
      if (publicOnly) {
        const today = new Date().toISOString().split('T')[0];
        query = query.eq('is_active', true).gte('valid_until', today);
      }
      const { data, error } = await query;
      if (!error && data) {
        return data as PromotionalOffer[];
      }
    } catch (e) {
      console.warn('Supabase fetch failed for offers, falling back to local:', e);
    }
  }

  const all = getLocalItem<PromotionalOffer[]>(STORAGE_KEYS.OFFERS, defaultPromotionalOffers);
  if (!publicOnly) return all;

  const todayStr = new Date().toISOString().split('T')[0];
  return all.filter((o) => o.is_active && o.valid_until >= todayStr);
}

export async function savePromotionalOffers(offers: PromotionalOffer[]): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('promotional_offers').upsert(offers);
      if (!error) return true;
    } catch (e) {
      console.error('Supabase save error:', e);
    }
  }
  setLocalItem(STORAGE_KEYS.OFFERS, offers);
  return true;
}

export async function deletePromotionalOffer(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('promotional_offers').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.error('Supabase delete error:', e);
    }
  }
  const current = getLocalItem<PromotionalOffer[]>(STORAGE_KEYS.OFFERS, defaultPromotionalOffers);
  setLocalItem(
    STORAGE_KEYS.OFFERS,
    current.filter((o) => o.id !== id)
  );
  return true;
}

// ==========================================
// TRAINERS
// ==========================================
export async function getTrainers(publicOnly = true): Promise<Trainer[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('trainers').select('*').order('sort_order', { ascending: true });
      if (publicOnly) {
        query = query.eq('is_active', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Trainer[];
      }
    } catch (e) {
      console.warn('Supabase fetch failed for trainers, falling back to local:', e);
    }
  }

  const all = getLocalItem<Trainer[]>(STORAGE_KEYS.TRAINERS, defaultTrainers);
  const filtered = publicOnly ? all.filter((t) => t.is_active) : all;
  return filtered.sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveTrainers(trainers: Trainer[]): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('trainers').upsert(trainers);
      if (!error) return true;
    } catch (e) {
      console.error('Supabase save error:', e);
    }
  }
  setLocalItem(STORAGE_KEYS.TRAINERS, trainers);
  return true;
}

export async function deleteTrainer(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('trainers').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.error('Supabase delete error:', e);
    }
  }
  const current = getLocalItem<Trainer[]>(STORAGE_KEYS.TRAINERS, defaultTrainers);
  setLocalItem(
    STORAGE_KEYS.TRAINERS,
    current.filter((t) => t.id !== id)
  );
  return true;
}

// ==========================================
// GALLERY IMAGES
// ==========================================
export async function getGalleryImages(publicOnly = true): Promise<GalleryImage[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('gallery_images').select('*').order('sort_order', { ascending: true });
      if (publicOnly) {
        query = query.eq('is_active', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as GalleryImage[];
      }
    } catch (e) {
      console.warn('Supabase fetch failed for gallery, falling back to local:', e);
    }
  }

  const all = getLocalItem<GalleryImage[]>(STORAGE_KEYS.GALLERY, defaultGalleryImages);
  const filtered = publicOnly ? all.filter((g) => g.is_active) : all;
  return filtered.sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveGalleryImages(images: GalleryImage[]): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('gallery_images').upsert(images);
      if (!error) return true;
    } catch (e) {
      console.error('Supabase save error:', e);
    }
  }
  setLocalItem(STORAGE_KEYS.GALLERY, images);
  return true;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('gallery_images').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.error('Supabase delete error:', e);
    }
  }
  const current = getLocalItem<GalleryImage[]>(STORAGE_KEYS.GALLERY, defaultGalleryImages);
  setLocalItem(
    STORAGE_KEYS.GALLERY,
    current.filter((g) => g.id !== id)
  );
  return true;
}

// ==========================================
// WHATSAPP & PHONE ACTION UTILITIES
// ==========================================
export function generateWhatsAppUrl(
  phoneNumber: string,
  message: string
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function generatePlanEnquiryMessage(planName: string, price: number): string {
  return `Hello Off The Grid Gym Ropar! 👋\n\nI am interested in joining your gym and would like more details about the *${planName}* (₹${price.toLocaleString('en-IN')}).\n\nCould you please let me know about timing slots, admission process, and when I can visit for a facility tour?\n\nThank you!`;
}

export function generateOfferEnquiryMessage(offerTitle: string, promoCode?: string): string {
  const codePart = promoCode ? ` (Promo Code: *${promoCode}*)` : '';
  return `Hello Off The Grid Gym Ropar! 👋\n\nI saw your promotional offer on your website: *${offerTitle}*${codePart}.\n\nI would love to claim this offer and schedule a visit to the gym. Please guide me on the next steps!`;
}

export function generateGeneralEnquiryMessage(): string {
  return `Hello Off The Grid Gym Ropar! 👋\n\nI am looking for a premier gym in Ropar and would like to know more about membership packages, trainer support, and facility timings.\n\nCould you please share the details?`;
}

export function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthNum = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      return `${day} ${months[monthNum - 1] || ''} ${year}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}
