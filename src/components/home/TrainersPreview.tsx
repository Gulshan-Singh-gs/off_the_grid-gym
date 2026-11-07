'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Award, MessageCircle } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { Trainer, GymSettings } from '@/types';
import { getTrainers, getGymSettings, generateWhatsAppUrl } from '@/lib/dataStore';
import { defaultTrainers, defaultGymSettings } from '@/lib/defaultData';

export default function TrainersPreview() {
  const [trainers, setTrainers] = useState<Trainer[]>(defaultTrainers);
  const [settings, setSettings] = useState<GymSettings>(defaultGymSettings);

  useEffect(() => {
    getTrainers().then(setTrainers);
    getGymSettings().then(setSettings);

    const handleUpdate = () => {
      getTrainers().then(setTrainers);
      getGymSettings().then(setSettings);
    };

    window.addEventListener('otg_datastore_updated', handleUpdate);
    return () => window.removeEventListener('otg_datastore_updated', handleUpdate);
  }, []);

  if (trainers.length === 0) return null;

  return (
    <section className="py-24 bg-[#08090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="EXPERT GUIDANCE"
          title="MEET YOUR"
          highlightedText="COACHES"
          description="Experienced fitness mentors focused on proper lifting mechanics, sustainable nutritional habits, and dedicated accountability for every member."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer) => {
            const trainerWhatsAppUrl = generateWhatsAppUrl(
              settings.whatsapp_number,
              `Hello Off The Grid Gym Ropar! 👋\n\nI would like to enquire about Personal Training and 1-on-1 coaching with ${trainer.name} (${trainer.role}). Could you please share the PT packages?`
            );

            return (
              <div
                key={trainer.id}
                className="group rounded-2xl overflow-hidden bg-[#0e1117] border border-white/10 hover:border-[#00ff66]/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Overlay */}
                  <div className="relative h-80 w-full overflow-hidden bg-[#151922]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={trainer.image_url}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-transparent to-transparent" />
                    
                    {/* Experience Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-black bg-[#00ff66] flex items-center gap-1 shadow-md">
                        <Award className="w-3 h-3 fill-black" />
                        {trainer.experience_years}+ Yrs Exp
                      </span>
                    </div>
                  </div>

                  {/* Bio & Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-white uppercase tracking-wide group-hover:text-[#00ff66] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#00ff66] uppercase tracking-wider mt-0.5">
                      {trainer.role}
                    </p>
                    <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                      {trainer.bio}
                    </p>

                    {/* Specialization Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {trainer.specializations.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-300 font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Consultation CTA */}
                <div className="p-6 pt-0">
                  <a
                    href={trainerWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-[#00ff66] text-white hover:text-black border border-white/10 hover:border-[#00ff66] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Consult Coach</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:border-[#00ff66]/40 transition-all"
          >
            <span>Learn More About Personal Coaching</span>
            <ArrowRight className="w-4 h-4 text-[#00ff66]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

