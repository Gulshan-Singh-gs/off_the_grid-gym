'use client';

import { useState, useEffect } from 'react';
import { 
  Award, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  HeartHandshake,
  Dumbbell
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { Trainer, GymSettings } from '@/types';
import { getTrainers, getGymSettings, generateWhatsAppUrl } from '@/lib/dataStore';
import { defaultTrainers, defaultGymSettings } from '@/lib/defaultData';

export default function TrainersPage() {
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

  return (
    <div className="py-16 sm:py-24 bg-[#08090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="CERTIFIED FITNESS COACHES"
          title="MEET OUR"
          highlightedText="TRAINERS"
          description="Dedicated coaches who prioritize joint longevity, clinical form mechanics, and realistic, sustainable body transformations."
        />

        {/* Trainers List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {trainers.map((trainer) => {
            const trainerWhatsAppUrl = generateWhatsAppUrl(
              settings.whatsapp_number,
              `Hello Off The Grid Gym Ropar! 👋\n\nI am interested in Personal Training / 1-on-1 coaching with ${trainer.name} (${trainer.role}). Could you please share the training session details and available slots?`
            );

            return (
              <div
                key={trainer.id}
                className="group rounded-3xl overflow-hidden bg-[#0e1117] border border-white/10 hover:border-[#00ff66]/40 transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Overlay */}
                  <div className="relative h-88 sm:h-96 w-full overflow-hidden bg-[#151922]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={trainer.image_url}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-transparent to-transparent opacity-90" />
                    
                    {/* Experience Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-black bg-[#00ff66] flex items-center gap-1 shadow-md">
                        <Award className="w-3.5 h-3.5 fill-black" />
                        {trainer.experience_years}+ Years Experience
                      </span>
                    </div>
                  </div>

                  {/* Information Details */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-2xl font-black text-white uppercase tracking-wide group-hover:text-[#00ff66] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#00ff66] uppercase tracking-wider mt-1">
                      {trainer.role}
                    </p>
                    <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {trainer.bio}
                    </p>

                    {/* Specializations list */}
                    <div className="mt-6">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Core Specializations:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {trainer.specializations.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-gray-300 font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="p-6 sm:p-8 pt-0">
                  <a
                    href={trainerWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-[#00ff66] text-white hover:text-black border border-white/10 hover:border-[#00ff66] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consult with {trainer.name.split(' ')[0]}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Personal Training Program Overview */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#0b0e14] border border-white/10">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#00ff66] bg-[#00ff66]/10 px-3 py-1 rounded-full border border-[#00ff66]/20">
              1-ON-1 COACHING OVERVIEW
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-3">
              Why Opt for Dedicated Personal Coaching at Off The Grid?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
              While every general membership includes floor guidance, our dedicated 1-on-1 coaching packages are designed for accelerated fat loss, competitive bodybuilding, or rehabilitation after injury.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-[#0e1117] border border-white/5">
              <Target className="w-6 h-6 text-[#00ff66] mb-3" />
              <h4 className="font-bold text-white uppercase mb-1">
                Customized Split & Periodization
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Workouts tailored specifically to your kinetic chain, mobility constraints, and target goals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e1117] border border-white/5">
              <ShieldCheck className="w-6 h-6 text-[#00ff66] mb-3" />
              <h4 className="font-bold text-white uppercase mb-1">
                Form Auditing & Safety
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Constant real-time feedback on spinal alignment, elbow flare, and hip hinge depth to prevent injuries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e1117] border border-white/5">
              <HeartHandshake className="w-6 h-6 text-[#00ff66] mb-3" />
              <h4 className="font-bold text-white uppercase mb-1">
                Nutrition & Accountability
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Calculated protein and macro benchmarks that integrate seamlessly with traditional Punjabi and Indian diet routines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

