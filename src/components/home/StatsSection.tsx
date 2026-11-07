import { Trophy, Target, HeartHandshake, Shield } from 'lucide-react';

export default function StatsSection() {
  const values = [
    {
      icon: Target,
      title: 'Precision Biomechanics',
      description: 'Engineered angles and converging resistance profiles that recruit muscles efficiently while sparing sensitive joints and ligaments.',
    },
    {
      icon: Trophy,
      title: 'Progressive Overload',
      description: 'Comprehensive free weight equipment up to heavy dumbbells, Olympic bars, and calibrated bumper plates for serious strength progressions.',
    },
    {
      icon: HeartHandshake,
      title: 'Supportive Training Culture',
      description: 'A dedicated, respectful unisex environment where beginners and seasoned lifters alike receive actionable form cues and guidance.',
    },
    {
      icon: Shield,
      title: 'No Lock-in Gimmicks',
      description: 'Honest, transparent local membership pricing with zero hidden admission fees or aggressive sales calls. You train on your terms.',
    },
  ];

  return (
    <section className="py-20 bg-[#0a0c10] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0f1218] border border-white/5 hover:border-[#00ff66]/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ff66] group-hover:bg-[#00ff66] group-hover:text-black transition-colors mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2 group-hover:text-[#00ff66] transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

