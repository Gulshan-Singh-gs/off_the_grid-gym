'use client';

import { useState } from 'react';
import { 
  Dumbbell, 
  Activity, 
  Flame, 
  Zap, 
  CheckCircle2, 
  MessageCircle,
  ShieldAlert
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { generateWhatsAppUrl } from '@/lib/dataStore';
import { defaultGymSettings } from '@/lib/defaultData';

export default function FacilitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const facilityCategories = [
    { id: 'all', label: 'All Zones' },
    { id: 'freeweights', label: 'Free Weights & Barbells' },
    { id: 'machines', label: 'Plate-Loaded & Cable Machines' },
    { id: 'cardio', label: 'Cardio & Stamina' },
    { id: 'functional', label: 'Functional Turf & Core' },
  ];

  const facilities = [
    {
      category: 'freeweights',
      title: 'Olympic Barbells & Heavy Free Weights Deck',
      subtitle: 'The Core of Progressive Overload',
      description: 'Solid knurled Olympic barbells, full sets of rubber-coated hex and round dumbbells ranging up to heavy weights (40kg+), heavy-duty flat and adjustable incline benches, and dedicated Olympic deadlift & bench press stations.',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      specs: [
        'Hex & Round Dumbbells: 2.5kg up to 40kg+ in pairs',
        'Dual Power Squat Racks with Safety Catch Pins',
        'Olympic Standard 20kg Barbells & EZ Curl Bars',
        'Multiple Adjustable Flat, Incline, and Decline Benches',
        'Bumper & Cast-Iron Weight Plates',
      ],
    },
    {
      category: 'machines',
      title: 'Plate-Loaded Hypertrophy Stations',
      subtitle: 'Targeted Muscle Isolation with Joint Safety',
      description: 'Designed for targeted tension without unwanted shear stress on joints. Plate-loaded 45-degree leg press, seated chest press, converging shoulder press, incline press, and hack squat equipment.',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80',
      specs: [
        'Heavy-Duty 45° Linear Leg Press Station',
        'Hack Squat & Calf Raise Machine',
        'Plate-Loaded Incline & Flat Chest Press',
        'T-Bar Row Station & Chest-Supported Rows',
        'Multi-Grip Lat Pulldown & Seated Cable Rows',
      ],
    },
    {
      category: 'machines',
      title: 'Dual-Cable Functional Crossover & Pin-Loaded Stack',
      subtitle: 'Continuous Resistance Across Full Range of Motion',
      description: 'Precision dual-pulley cable system with adjustable pulley heights, smooth weight stacks, and a complete suite of attachments (rope, straight bars, single-hand D-handles, ankle straps, lat bars).',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      specs: [
        'Adjustable Dual-Stack Cable Crossover',
        'Leg Extension & Seated Leg Curl Machine',
        'Cable Triceps Pushdown & Biceps Stations',
        'Assisted Pull-Up & Dip Tower',
        'Full Array of Ergonomic Attachment Handles',
      ],
    },
    {
      category: 'cardio',
      title: 'Commercial Endurance & Cardio Deck',
      subtitle: 'Cardiovascular Conditioning & Caloric Burn',
      description: 'A dedicated cardio floor equipped with shock-absorbing commercial treadmills, magnetic resistance spin bikes, and elliptical trainers to build lung capacity, improve recovery, and burn fat.',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80',
      specs: [
        'Motorized Commercial Treadmills with Speed & Incline Controls',
        'Stationary Spin Bikes for HIIT & LISS Sessions',
        'Elliptical Cross-Trainers for Low-Impact Cardio',
        'Digital Heart Rate & Calorie Tracking Consoles',
      ],
    },
    {
      category: 'functional',
      title: 'High-Density Turf & Core Mobility Bay',
      subtitle: 'Agility, Explosive Power & Active Recovery',
      description: 'High-density rubber shock absorption flooring and synthetic turf strip. Ideal for plyometrics, core conditioning, battle ropes, kettlebell carries, and dynamic foam-rolling mobility drills.',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1000&q=80',
      specs: [
        'Heavy Battle Ropes for Anaerobic Conditioning',
        'Cast-Iron Kettlebells & Slam Balls',
        'High-Density Rubber Impact Flooring',
        'Foam Rollers, Resistance Bands & Stretching Mats',
      ],
    },
  ];

  const filtered = selectedCategory === 'all'
    ? facilities
    : facilities.filter((f) => f.category === selectedCategory);

  const whatsappUrl = generateWhatsAppUrl(
    defaultGymSettings.whatsapp_number,
    `Hello Off The Grid Gym Ropar! 👋\n\nI checked out your facilities online and would like to visit in Bal Sanda to inspect the gym equipment in person. Could you please share the best visiting time?`
  );

  return (
    <div className="py-16 sm:py-24 bg-[#08090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="VERIFIED GYM FACILITIES"
          title="PURPOSE-BUILT"
          highlightedText="EQUIPMENT"
          description="Off The Grid Gym provides heavy-duty hardware without compromises. Explore our training zones situated at Bal Sanda, Ropar."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {facilityCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#00ff66] text-black shadow-[0_0_20px_rgba(0,255,102,0.3)]'
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facilities List */}
        <div className="space-y-12">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden bg-[#0e1117] border border-white/10 hover:border-[#00ff66]/30 transition-all shadow-xl grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image side */}
              <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#151922]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[#0e1117]" />
              </div>

              {/* Text side */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00ff66] bg-[#00ff66]/10 px-3 py-1 rounded-full border border-[#00ff66]/20">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-3">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Specs list */}
                  <div className="mt-6 space-y-2.5">
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                      Equipment Specifications:
                    </div>
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    Maintained daily for safety & hygiene
                  </span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#00ff66] text-white hover:text-black border border-white/10 hover:border-[#00ff66] text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire About Facility</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hygiene & Etiquette Policy */}
        <div className="mt-16 p-8 rounded-2xl bg-[#0b0e14] border border-white/5 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white uppercase">
              Gym Hygiene & Weight Etiquette
            </h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              We take pride in a clean and safe environment. All members are required to re-rack weights after each set, wipe down bench pads, and wear clean indoor training shoes.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#00ff66] text-black font-extrabold uppercase text-xs shadow-md hover:bg-[#05e05d] transition-all inline-flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 fill-black" />
              <span>Book Facility Tour</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

