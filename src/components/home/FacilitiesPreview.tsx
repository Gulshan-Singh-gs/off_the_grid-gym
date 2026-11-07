'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function FacilitiesPreview() {
  const zones = [
    {
      title: 'Free Weights & Olympic Platforms',
      category: 'STRENGTH & POWER',
      description: 'Heavy cast-iron and rubberized dumbbell racks ranging up to 40kg+, Olympic standard barbells, power racks, and flat/incline adjustable benches.',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      features: ['Dumbbells up to 40kg+', 'Dual Power Cages & Spotter Arms', 'Olympic Barbells & Bumper Plates'],
    },
    {
      title: 'Plate-Loaded & Selectorized Machines',
      category: 'HYPERTROPHY & ISOLATION',
      description: 'Ergonomically tuned chest press, incline press, lat pulldowns, seated cable rows, leg press, hack squats, and hamstring curls.',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
      features: ['Pin-Loaded Multi-Cable Crossover', 'Converging Chest & Shoulder Presses', 'Heavy-Duty 45° Leg Press'],
    },
    {
      title: 'Commercial Cardio & Stamina Deck',
      category: 'ENDURANCE & CARDIO',
      description: 'High-performance commercial treadmills, cross-trainers, and spin cycles to elevate your heart rate, optimize VO2 max, and accelerate caloric burn.',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80',
      features: ['Digital Shock-Absorbing Treadmills', 'Stationary Resistance Spin Bikes', 'Elliptical Cross Trainers'],
    },
    {
      title: 'Functional Turf & Core Mobility',
      category: 'ATHLETIC CONDITIONING',
      description: 'Dedicated functional turf zone for battle ropes, kettlebell swings, mobility drills, core stability workouts, and dynamic pre-workout warm-ups.',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
      features: ['Heavy Battle Ropes', 'Kettlebell & Medicine Ball Array', 'Full Plyometric & Core Flooring'],
    },
  ];

  return (
    <section id="facilities-overview" className="py-24 bg-[#08090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="ENGINEERED FOR RESULTS"
          title="PURPOSE-BUILT"
          highlightedText="FACILITIES"
          description="Explore our specialized training zones in Bal Sanda, Ropar. High-grade iron, modern biomechanics, and ample space to execute your workout without waiting in lines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-[#0e1117] border border-white/10 hover:border-[#00ff66]/40 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={zone.image}
                  alt={zone.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-transparent to-black/30" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-black bg-[#00ff66]">
                    {zone.category}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#00ff66] transition-colors">
                    {zone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {zone.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
                  {zone.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff66] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Facilities Button */}
        <div className="mt-12 text-center">
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00ff66]/40 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all"
          >
            <span>View Full Equipment & Facility Breakdown</span>
            <ArrowRight className="w-4 h-4 text-[#00ff66]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

