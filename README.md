# Off The Grid Gym — Ropar (Rupnagar), Punjab

A distinctive, high-performance, production-ready digital web platform and owner administration system for **Off The Grid Gym, Ropar, Punjab, India**.

Designed to complement the official Instagram presence ([@offthegridgymropar](https://www.instagram.com/offthegridgymropar)) and Google Maps presence ([Google Maps Location](https://maps.app.goo.gl/uo77vpVSZ1UDW9Pp6)), focusing on converting prospective gym visitors into physical admissions without friction.

---

## 🚀 Key Features

### 1. High-Conversion Public Website
- **Athletic Dark Visual Identity:** Precision dark theme (`#08090B`) with high-voltage electric green accents (`#00FF66`), bold typography, and athletic contrast inspired by modern bodybuilding and strength training facilities.
- **Conversion-Optimized CTAs:**
  - Floating WhatsApp enquiry button with dynamic pre-filled messages.
  - Sticky mobile action bar (Direct Calling, WhatsApp, Google Maps Navigation, Pricing).
  - Pre-filled enquiry generator for specific membership plans and promotional offers.
- **No Online Payment Friction:** Strictly no customer registration, forced account creation, or automated recurring credit card billing. All admissions are processed in-person or directly via WhatsApp.
- **Dedicated Public Pages:**
  - **Homepage (`/`):** Hero with trial pass CTA, training philosophy, equipment preview, dynamic membership pricing, active offer spotlight, trainer previews, interactive facility gallery, and embedded Google Maps.
  - **About Page (`/about`):** The story behind "Off The Grid", gym pillars, and community standards in Bal Sanda, Ropar.
  - **Facilities Page (`/facilities`):** Verified zone breakdowns (Olympic Free Weights, Plate-Loaded Machines, Cable Crossover, Commercial Cardio Deck, Functional Turf).
  - **Pricing & Admissions (`/pricing`):** Dynamic INR fees (1-Month, 3-Month, 6-Month, 12-Month) with duration, savings breakdown, transparent fee guarantee, and FAQs.
  - **Promotional Offers (`/offers`):** Current active campaigns, promo codes, and automated expiry filtering.
  - **Certified Trainers (`/trainers`):** Coach profiles, specializations, years of experience, and 1-on-1 personal coaching overview.
  - **Gallery (`/gallery`):** Category-filtered photo media with fullscreen responsive Lightbox modal and keyboard navigation.
  - **Contact & Directions (`/contact`):** Verified address in Bal Sanda, operating hours, phone and WhatsApp links, Google Maps iframe embed, and fast pre-filled enquiry generator.

### 2. Dynamic Owner Administration Dashboard (`/admin/dashboard`)
Non-technical, password-protected administrative interface allowing the gym owner to manage the website without editing code:
- **Pricing Management:** Add/edit membership plans, change INR rates, update duration, toggle visibility, reorder cards, mark "Most Popular".
- **Promotional Offer Management:** Create discounts, set promo codes, assign validity dates, and toggle offers. Expired offers automatically hide from public view.
- **Gym Info & Timings:** Update phone, WhatsApp number, email, address, Google Maps link, Instagram handle, and weekly gym hours.
- **Trainer Profiles:** Add coaches, update biographies, upload photos, and manage specializations.
- **Gallery Manager:** Add photos, assign categories (Free Weights, Strength, Cardio, Ambience, Community), and change display sequence.
- **Dual Mode Architecture:**
  - Works out-of-the-box in **Live Demo / Sandbox Mode** with immediate local persistence.
  - Seamlessly syncs with **Supabase PostgreSQL** once credentials are provided in `.env.local`.

### 3. Local SEO & Search Engine Optimization
- Target keywords: *Gym in Ropar, Gym in Rupnagar, Best gym in Ropar, Fitness center in Ropar, Unisex gym in Bal Sanda Ropar, Gym membership fees in Ropar*.
- Valid Schema.org structured data: `ExerciseGym`, `SportsActivityLocation`, and `LocalBusiness` JSON-LD with geo-coordinates (`30.9527996, 76.522236`), verified address, price range, and opening hours.
- Automated `sitemap.xml` and `robots.txt` generation.
- Full OpenGraph and Twitter card metadata.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Full-stack React framework with Turbopack and static prerendering |
| **TypeScript** | Strict compile-time type safety |
| **Tailwind CSS v4** | Athletic utility-first styling with custom glow and theme variables |
| **Supabase PostgreSQL** | Cloud database with Row-Level Security (RLS) policies |
| **Lucide React** | Sleek icon system for fitness and navigation |
| **Cloudflare / OpenNext** | Edge deployment and global CDN delivery |

---

## 📦 Getting Started

### 1. Installation

```bash
# Clone or navigate to the project directory
cd Gym

# Install dependencies
npm install
```

### 2. Environment Variables

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

Fill in your Supabase project keys in `.env.local` (or leave empty to run in sandbox demo mode):

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Access

Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login):
- **Default Owner Passcode:** `ropar2026` (or sign in with your Supabase authenticated email/password).

---

## 🗄️ Supabase Database Setup

To provision the production PostgreSQL database on Supabase:

1. Create a new project on [Supabase.com](https://supabase.com).
2. Go to **SQL Editor** in the Supabase dashboard.
3. Open [`supabase/schema.sql`](./supabase/schema.sql) in this repository.
4. Paste the entire SQL script and click **Run**.
5. The script automatically:
   - Creates the 5 tables: `gym_settings`, `membership_plans`, `promotional_offers`, `trainers`, and `gallery_images`.
   - Creates `updated_at` automated triggers.
   - Configures **Row-Level Security (RLS)** allowing public visitors to read active rows, while restricting insert/update/delete strictly to authenticated owners.
   - Inserts initial realistic seed records for Off The Grid Gym Ropar.

---

## ☁️ Deployment Guide (Cloudflare)

### Option A: Cloudflare Pages (Recommended)
1. Push your repository to GitHub.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select the repository.
4. Set build settings:
   - **Framework preset:** `Next.js`
   - **Build command:** `npx @cloudflare/next-on-pages@1` or `npm run build`
   - **Output directory:** `.vercel/output/static` (or `.next`)
5. In **Environment variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://offthegridgymropar.in`)
   - `NODE_VERSION` = `20`
6. Click **Save and Deploy**.

### Option B: Cloudflare Workers with OpenNext
Install and build with OpenNext Cloudflare adapter:
```bash
npx opennextjs-cloudflare
npx wrangler deploy
```

---

## 🔍 Google Search Console & Local SEO Submission

To ensure Off The Grid Gym appears prominently in Ropar searches:

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add your domain property (e.g., `offthegridgymropar.in`).
3. Under **Sitemaps**, submit:
   ```
   https://offthegridgymropar.in/sitemap.xml
   ```
4. Verify your **Google Business Profile** (link matches `https://maps.app.goo.gl/uo77vpVSZ1UDW9Pp6`) and add the official website link directly to the Google Maps profile.

---

## 📋 Owner Asset Checklist

The following items can be provided by the gym owner to replace initial placeholders:

- [ ] **Official Contact Phone & WhatsApp Number:** Replace the placeholder `+91 98888 12345` with the exact desk SIM number in the Admin Dashboard (`/admin/dashboard` → Gym Info).
- [ ] **Owner-Shot Facility Images:** High-resolution photographs of the actual dumbbell racks, machines, and gym entrance can be uploaded or linked directly via the Gallery Manager.
- [ ] **Actual Coach Photos & Names:** Update trainer profiles with actual headshots and certifications.
- [ ] **Exact Fee Structure:** Adjust any customized seasonal fees or registration discounts in the Pricing Manager.
