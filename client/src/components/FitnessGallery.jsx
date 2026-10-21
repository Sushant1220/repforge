import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Dumbbell, Flame, Activity, Zap, Shield } from 'lucide-react';
import heroAthleteImg from '../assets/repforge_hero_athlete.png';
import homeWorkoutImg from '../assets/repforge_home_workout.png';
import gymFinderImg from '../assets/repforge_gym_finder.png';
import nutritionImg from '../assets/repforge_nutrition_card.png';
import supplementsImg from '../assets/repforge_supplements_card.png';

export const FitnessGallery = () => {
  const galleryItems = [
    {
      title: 'STRENGTH & POWER',
      tag: 'Heavy Lifting',
      image: heroAthleteImg,
      icon: Dumbbell,
      desc: 'Progressive overload compound movements for maximum muscular hypertrophy.'
    },
    {
      title: 'HOME CONDITIONING',
      tag: 'Bodyweight',
      image: homeWorkoutImg,
      icon: Flame,
      desc: 'High-intensity pushup and core routines without needing gym equipment.'
    },
    {
      title: 'PRO GYM ATMOSPHERE',
      tag: 'Facilities',
      image: gymFinderImg,
      icon: Shield,
      desc: 'Discover elite powerlifting and bodybuilding gyms with geolocation.'
    },
    {
      title: 'MACRO RECOVERY',
      tag: 'Nutrition',
      image: nutritionImg,
      icon: Activity,
      desc: 'Precision meal prep tracking with high protein and clean carb targets.'
    },
    {
      title: 'PERFORMANCE FUEL',
      tag: 'Supplements',
      image: supplementsImg,
      icon: Zap,
      desc: 'Targeted supplement formulas for strength, stamina, and joint longevity.'
    }
  ];

  return (
    <section className="space-y-6 py-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MOTIVATION &amp; DISCIPLINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight uppercase">
          TRAIN. TRANSFORM. <span className="text-[#ccff00] neon-text-glow">REPEAT.</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          Every rep counts. Explore the core pillars behind peak athletic conditioning.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {galleryItems.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative h-72 sm:h-80 rounded-3xl overflow-hidden border border-white/10 group cursor-pointer shadow-xl"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover img-hover-zoom filter brightness-[0.6] group-hover:brightness-[0.75]"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

              {/* Tag */}
              <div className="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#ccff00] text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1.5">
                <IconComp className="w-3 h-3 text-[#ccff00]" />
                <span>{item.tag}</span>
              </div>

              {/* Text Details */}
              <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1">
                <h3 className="text-base font-heading font-black text-white tracking-tight leading-tight group-hover:text-[#ccff00] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-300 leading-snug line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
