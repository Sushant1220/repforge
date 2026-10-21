import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, Zap, Trophy, Flame } from 'lucide-react';

const CelebrationPlate3D = () => {
  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      {/* 3D Gold / Chrome Weight Plate */}
      <mesh>
        <cylinderGeometry args={[1.5, 1.5, 0.35, 32]} />
        <meshStandardMaterial color="#ccff00" roughness={0.2} metalness={0.8} emissive="#ccff00" emissiveIntensity={0.4} />
      </mesh>
      {/* Inner Rim */}
      <mesh position={[0, 0, 0.18]}>
        <cylinderGeometry args={[1.1, 1.1, 0.05, 32]} />
        <meshStandardMaterial color="#121318" roughness={0.4} metalness={0.9} />
      </mesh>
      {/* Central Hole */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 24]} />
        <meshStandardMaterial color="#08090c" roughness={0.1} metalness={1} />
      </mesh>
    </group>
  );
};

export const WorkoutCompletion3DModal = ({ isOpen, onClose, workoutTitle = 'Workout' }) => {
  useEffect(() => {
    if (isOpen) {
      // Controlled, light confetti explosion
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ccff00', '#ffffff', '#a3e635']
      });

      // Auto close or keep interactive
      const timer = setTimeout(() => {
        // Keeps modal visible until user closes or 4s passes
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#0b0c10] border-2 border-[#ccff00]/40 rounded-3xl p-6 text-center space-y-5 shadow-[0_0_50px_rgba(204,255,0,0.35)] z-10 overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/15 rounded-full blur-3xl pointer-events-none" />

          {/* 3D Plate Animation Canvas */}
          <div className="h-44 w-full relative mx-auto">
            <Canvas
              gl={{ antialias: true, alpha: true }}
              camera={{ position: [0, 0, 4.5], fov: 45 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[3, 3, 3]} intensity={1.5} color="#ffffff" />
              <pointLight position={[0, 0, 2]} intensity={2} color="#ccff00" />
              <Float speed={4} rotationIntensity={1.5} floatIntensity={1}>
                <CelebrationPlate3D />
              </Float>
            </Canvas>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black tracking-wider uppercase">
              <Trophy className="w-4 h-4" />
              <span>WORKOUT COMPLETED!</span>
            </div>

            <h2 className="text-2xl font-heading font-black text-white">
              Great Job! 💪🏻
            </h2>

            <p className="text-xs text-gray-300">
              You crushed <strong className="text-[#ccff00]">{workoutTitle}</strong> with 100% effort!
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider hover:bg-lime-400 shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all cursor-pointer active:scale-95"
          >
            Continue Building
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
