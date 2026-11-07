-- =========================================================================
-- OFF THE GRID GYM (ROPAR) — SUPABASE PRODUCTION DATABASE SCHEMA
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Helper function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- 2. GYM SETTINGS TABLE (Single row configuration)
-- =========================================================================
CREATE TABLE IF NOT EXISTS gym_settings (
    id TEXT PRIMARY KEY DEFAULT 'otg-settings-01',
    gym_name TEXT NOT NULL DEFAULT 'Off The Grid Gym',
    tagline TEXT NOT NULL,
    short_description TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Rupnagar (Ropar)',
    state TEXT NOT NULL DEFAULT 'Punjab',
    pincode TEXT NOT NULL DEFAULT '140001',
    google_maps_url TEXT NOT NULL,
    google_maps_embed_url TEXT NOT NULL,
    instagram_url TEXT NOT NULL,
    instagram_handle TEXT NOT NULL DEFAULT '@offthegridgymropar',
    opening_hours JSONB NOT NULL DEFAULT '{"weekdays": "5:30 AM – 10:00 PM", "saturday": "5:30 AM – 9:30 PM", "sunday": "7:00 AM – 1:00 PM"}'::jsonb,
    announcement JSONB NOT NULL DEFAULT '{"enabled": true, "badge": "NEW YEAR / SEASON ADMISSION", "text": "Now Enrolling for Morning & Evening Batches in Ropar. Claim your Free 1-Day Trial Pass!", "link_url": "/pricing"}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_gym_settings_updated_at
BEFORE UPDATE ON gym_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================================
-- 3. MEMBERSHIP PLANS TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS membership_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    duration_label TEXT NOT NULL,
    duration_months INT NOT NULL CHECK (duration_months > 0),
    price_inr INT NOT NULL CHECK (price_inr >= 0),
    original_price_inr INT,
    badge TEXT,
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    is_popular BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_membership_plans_updated_at
BEFORE UPDATE ON membership_plans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================================
-- 4. PROMOTIONAL OFFERS TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS promotional_offers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    badge TEXT NOT NULL DEFAULT 'LIMITED OFFER',
    description TEXT NOT NULL,
    discount_text TEXT NOT NULL,
    promo_code TEXT,
    applicable_plan TEXT,
    valid_from DATE NOT NULL DEFAULT CURRENT_DATE,
    valid_until DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_date_range CHECK (valid_until >= valid_from)
);

CREATE TRIGGER update_promotional_offers_updated_at
BEFORE UPDATE ON promotional_offers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================================
-- 5. TRAINERS TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS trainers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    experience_years INT NOT NULL DEFAULT 1,
    bio TEXT NOT NULL,
    specializations TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_trainers_updated_at
BEFORE UPDATE ON trainers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================================
-- 6. GALLERY IMAGES TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS gallery_images (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('strength', 'cardio', 'freeweights', 'ambience', 'community')),
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INT NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_gallery_images_updated_at
BEFORE UPDATE ON gallery_images
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE gym_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotional_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public READ policies (Anonymous visitors can read published/active content)
CREATE POLICY "Public read gym settings" 
    ON gym_settings FOR SELECT 
    USING (true);

CREATE POLICY "Public read active plans" 
    ON membership_plans FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Public read valid active offers" 
    ON promotional_offers FOR SELECT 
    USING (is_active = true AND valid_until >= CURRENT_DATE);

CREATE POLICY "Public read active trainers" 
    ON trainers FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Public read active gallery" 
    ON gallery_images FOR SELECT 
    USING (is_active = true);

-- Authenticated (Admin) FULL ACCESS policies (Insert, Update, Delete)
CREATE POLICY "Admin full access gym settings" 
    ON gym_settings FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access membership plans" 
    ON membership_plans FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access promotional offers" 
    ON promotional_offers FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access trainers" 
    ON trainers FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access gallery images" 
    ON gallery_images FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);

-- =========================================================================
-- 8. INITIAL SEED DATA FOR OFF THE GRID GYM ROPAR
-- =========================================================================

INSERT INTO gym_settings (
    id, gym_name, tagline, short_description, phone_number, whatsapp_number, 
    email, address, city, state, pincode, google_maps_url, google_maps_embed_url, 
    instagram_url, instagram_handle, opening_hours, announcement
) VALUES (
    'otg-settings-01',
    'Off The Grid Gym',
    'Ropar''s Premier Strength & Performance Training Ground',
    'An elite, distraction-free athletic facility in Bal Sanda, Ropar. Equipped with heavy-duty biomechanical machinery, Olympic free weights, dedicated cardio zones, and certified coaching designed for real transformations.',
    '+91 98888 12345',
    '919888812345',
    'contact@offthegridgymropar.in',
    'Bal Sanda, Bela Road, Rupnagar (Ropar)',
    'Rupnagar (Ropar)',
    'Punjab',
    '140001',
    'https://maps.app.goo.gl/uo77vpVSZ1UDW9Pp6',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d855.9385078512521!2d76.5218909!3d30.9527815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905550005ed3511%3A0xdbe6b9d8e24710b0!2sOFF%20THE%20GRID%20GYM%20ROPAR!5e0!3m2!1sen!2sin!4v1730000000000!5m2!1sen!2sin',
    'https://www.instagram.com/offthegridgymropar',
    '@offthegridgymropar',
    '{"weekdays": "5:30 AM – 10:00 PM", "saturday": "5:30 AM – 9:30 PM", "sunday": "7:00 AM – 1:00 PM"}'::jsonb,
    '{"enabled": true, "badge": "NEW YEAR / SEASON ADMISSION", "text": "Now Enrolling for Morning & Evening Batches in Ropar. Claim your Free 1-Day Trial Pass!", "link_url": "/pricing"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

INSERT INTO membership_plans (id, name, duration_label, duration_months, price_inr, original_price_inr, badge, description, features, is_popular, is_active, sort_order) VALUES
('plan-1-month', '1 Month Kickstart', '1 Month', 1, 1600, 1800, NULL, 'Perfect for short-term goals, testing the facility, or visiting athletes in Ropar.', ARRAY['Full Access to Heavy Free-Weights & Machine Floor', 'Cardio & Functional Conditioning Zone Access', 'Initial Physical Fitness & Posture Assessment', 'Locker & Changing Room Amenities', 'General Floor Trainer Guidance', 'No Hidden Admission Charges'], false, true, 1),
('plan-3-months', '3 Months Transformation', '3 Months', 3, 4200, 4800, 'MOST POPULAR', 'The optimal timeframe to build strength, strip body fat, and cement consistent training habits.', ARRAY['Everything in 1 Month Kickstart', 'Complimentary Custom Workout Routine Sheet', 'Basic Nutrition & Macronutrient Guidance', 'Bi-weekly Body Composition & Progress Tracking', 'Priority Locker Access', 'Saves ₹600 compared to monthly renewal'], true, true, 2),
('plan-6-months', '6 Months Pro Athlete', '6 Months', 6, 7500, 9600, 'GREAT VALUE', 'Designed for dedicated lifters committed to significant progressive overload and physique development.', ARRAY['Everything in 3 Months Transformation', 'Customized Hypertrophy / Strength Periodization Plan', 'Monthly Form Checks & 1-on-1 Routine Adjustments', 'Free 15-Day Membership Hold / Vacation Freeze', 'Exclusive Off The Grid Gym Shaker / Merch Discount', 'Saves ₹2,100 compared to monthly renewal'], false, true, 3),
('plan-12-months', '12 Months Elite Yearly', '12 Months', 12, 13500, 19200, 'BEST ROI', 'Maximum commitment for lifelong fitness. Our lowest per-month rate for serious fitness enthusiasts.', ARRAY['Unrestricted VIP Access 365 Days a Year', 'Complete Transformation Blueprint (Training + Diet)', '1 Free Guest Pass per month for friends or family', 'Up to 30 Days Membership Freeze Option', 'Dedicated Locker Allocation (Subject to availability)', 'Saves ₹5,700 — Only ₹1,125 / month equivalent'], false, true, 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO promotional_offers (id, title, badge, description, discount_text, promo_code, applicable_plan, valid_from, valid_until, is_active) VALUES
('offer-season-special', 'Ropar Fitness Drive: Flat ₹1,000 Off Quarterly & Annual Plans', 'LIMITED TIME OFFER', 'Start your transformation with Ropar’s finest training crew. Get instant ₹1,000 off any 3-Month, 6-Month, or 12-Month plan plus a complimentary body fat assessment.', 'SAVE ₹1,000 INSTANTLY', 'OTGROPAR1000', 'Quarterly & Annual Memberships', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', true),
('offer-buddy-pack', 'Lift Together: 15% Off Couple / Buddy Membership', 'BUDDY SPECIAL', 'Bring your workout partner, sibling, or friend. Enroll together and both receive 15% off any 3-month or 6-month tier.', '15% OFF FOR BOTH', 'OTGBUDDY', 'Buddy Enrollments (2 Members)', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO trainers (id, name, role, experience_years, bio, specializations, image_url, is_active, sort_order) VALUES
('trainer-01', 'Gurpreet Singh', 'Head Strength & Conditioning Coach', 7, 'Specializing in biomechanics, compound lifts, and hypertrophy training. Committed to helping Ropar fitness enthusiasts lift safely with clinical technique.', ARRAY['Hypertrophy & Bodybuilding', 'Powerlifting Mechanics', 'Fat Loss Protocols', 'Injury Prevention'], 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', true, 1),
('trainer-02', 'Aman Sharma', 'Functional & HIIT Fitness Coach', 5, 'Passionate about athletic endurance, kettlebell conditioning, and posture rehabilitation. Designs dynamic regimens tailored to busy professionals and beginners.', ARRAY['Functional Training', 'Cardiovascular Conditioning', 'Mobility & Posture', 'Core Strength'], 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80', true, 2),
('trainer-03', 'Simran Kaur', 'Transformation & Female Fitness Specialist', 4, 'Dedicated to empowering women through strength training, body re-composition, and sustainable nutritional habits without restrictive crash dieting.', ARRAY['Female Strength Training', 'Glute & Leg Hypertrophy', 'Body Recomposition', 'Nutritional Counseling'], 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80', true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO gallery_images (id, title, category, image_url, caption, sort_order, is_active) VALUES
('gallery-01', 'Heavy Dumbbell & Free Weights Deck', 'freeweights', 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80', 'Full dumbbell rack from 2.5kg up to heavy dumbbells, paired with adjustable Olympic incline and flat benches.', 1, true),
('gallery-02', 'Plate-Loaded Lat Pulldown & Row Stations', 'strength', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80', 'State-of-the-art back and lat isolation machines with smooth converging cables for optimal muscle stretch.', 2, true),
('gallery-03', 'Power Racks & Olympic Barbell Platforms', 'strength', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80', 'Reinforced squat cages with bumper plates for heavy squats, deadlifts, and bench presses.', 3, true),
('gallery-04', 'Commercial Cardio Deck', 'cardio', 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80', 'Treadmills, cross trainers, and spin bikes with digital tracking to boost cardiovascular endurance and VO2 max.', 4, true),
('gallery-05', 'Off The Grid Atmospheric Gym Ambience', 'ambience', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', 'Motivating dark athletic environment with focused spotlighting, high energy music, and no-excuses atmosphere.', 5, true),
('gallery-06', 'Functional Turf & Mobility Bay', 'community', 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80', 'High-density rubber flooring and turf zone for battle ropes, plyometrics, kettlebell circuits, and warm-ups.', 6, true)
ON CONFLICT (id) DO NOTHING;

