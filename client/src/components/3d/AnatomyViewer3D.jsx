import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MUSCLE_GROUPS } from '../../data/muscleExercises';

const AnatomicalBody3D = ({ selectedMuscle, hoveredMuscle, onSelectMuscle, view }) => {
  const bodyGroupRef = useRef();

  // Rotate body group smoothly to Front (0) or Back (PI) when view changes
  useFrame((state, delta) => {
    if (!bodyGroupRef.current) return;
    const targetY = view === 'back' ? Math.PI : 0;
    bodyGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      bodyGroupRef.current.rotation.y,
      targetY,
      0.1
    );
  });

  const getMuscleMaterial = (muscleId) => {
    const isSelected = selectedMuscle === muscleId;
    const isHovered = hoveredMuscle === muscleId;

    if (isSelected) {
      return (
        <meshStandardMaterial
          color="#ccff00"
          emissive="#ccff00"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.6}
        />
      );
    }
    if (isHovered) {
      return (
        <meshStandardMaterial
          color="#a3e635"
          emissive="#a3e635"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.5}
        />
      );
    }
    return (
      <meshStandardMaterial
        color="#222530"
        roughness={0.4}
        metalness={0.7}
      />
    );
  };

  return (
    <group ref={bodyGroupRef} position={[0, -0.4, 0]} scale={[1, 1, 1]}>
      {/* 1. HEAD */}
      <mesh position={[0, 2.3, 0]}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color="#1a1c24" roughness={0.5} metalness={0.6} />
      </mesh>
      {/* NECK */}
      <mesh position={[0, 1.88, 0]}>
        <cylinderGeometry args={[0.16, 0.22, 0.35, 16]} />
        <meshStandardMaterial color="#1f222d" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* 2. CHEST (Pectorals) */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('chest'); }}>
        <mesh position={[-0.26, 1.38, 0.22]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.42, 0.38, 0.2]} />
          {getMuscleMaterial('chest')}
        </mesh>
        <mesh position={[0.26, 1.38, 0.22]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[0.42, 0.38, 0.2]} />
          {getMuscleMaterial('chest')}
        </mesh>
      </group>

      {/* 3. ABS (6-Pack Grid) */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('abs'); }}>
        <mesh position={[0, 0.9, 0.22]}>
          <boxGeometry args={[0.42, 0.52, 0.16]} />
          {getMuscleMaterial('abs')}
        </mesh>
      </group>

      {/* 4. OBLIQUES */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('obliques'); }}>
        <mesh position={[-0.32, 0.9, 0.18]}>
          <boxGeometry args={[0.2, 0.48, 0.16]} />
          {getMuscleMaterial('obliques')}
        </mesh>
        <mesh position={[0.32, 0.9, 0.18]}>
          <boxGeometry args={[0.2, 0.48, 0.16]} />
          {getMuscleMaterial('obliques')}
        </mesh>
      </group>

      {/* 5. SHOULDERS (Deltoids) */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('shoulders'); }}>
        <mesh position={[-0.64, 1.46, 0]}>
          <sphereGeometry args={[0.26, 20, 20]} />
          {getMuscleMaterial('shoulders')}
        </mesh>
        <mesh position={[0.64, 1.46, 0]}>
          <sphereGeometry args={[0.26, 20, 20]} />
          {getMuscleMaterial('shoulders')}
        </mesh>
      </group>

      {/* 6. BICEPS */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('biceps'); }}>
        <mesh position={[-0.72, 1.05, 0.08]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.16, 0.14, 0.48, 16]} />
          {getMuscleMaterial('biceps')}
        </mesh>
        <mesh position={[0.72, 1.05, 0.08]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.16, 0.14, 0.48, 16]} />
          {getMuscleMaterial('biceps')}
        </mesh>
      </group>

      {/* 7. TRICEPS */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('triceps'); }}>
        <mesh position={[-0.72, 1.05, -0.08]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.16, 0.14, 0.48, 16]} />
          {getMuscleMaterial('triceps')}
        </mesh>
        <mesh position={[0.72, 1.05, -0.08]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.16, 0.14, 0.48, 16]} />
          {getMuscleMaterial('triceps')}
        </mesh>
      </group>

      {/* 8. FOREARMS */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('forearms'); }}>
        <mesh position={[-0.82, 0.52, 0.05]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.14, 0.11, 0.52, 16]} />
          {getMuscleMaterial('forearms')}
        </mesh>
        <mesh position={[0.82, 0.52, 0.05]} rotation={[0, 0, -0.15]}>
          <cylinderGeometry args={[0.14, 0.11, 0.52, 16]} />
          {getMuscleMaterial('forearms')}
        </mesh>
      </group>

      {/* 9. TRAPS */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('traps'); }}>
        <mesh position={[0, 1.62, -0.12]}>
          <boxGeometry args={[0.58, 0.28, 0.22]} />
          {getMuscleMaterial('traps')}
        </mesh>
      </group>

      {/* 10. UPPER BACK */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('upper_back'); }}>
        <mesh position={[0, 1.36, -0.2]}>
          <boxGeometry args={[0.62, 0.35, 0.18]} />
          {getMuscleMaterial('upper_back')}
        </mesh>
      </group>

      {/* 11. LATS */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('lats'); }}>
        <mesh position={[-0.35, 1.15, -0.18]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.26, 0.52, 0.16]} />
          {getMuscleMaterial('lats')}
        </mesh>
        <mesh position={[0.35, 1.15, -0.18]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.26, 0.52, 0.16]} />
          {getMuscleMaterial('lats')}
        </mesh>
      </group>

      {/* 12. LOWER BACK */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('lower_back'); }}>
        <mesh position={[0, 0.78, -0.2]}>
          <boxGeometry args={[0.42, 0.32, 0.16]} />
          {getMuscleMaterial('lower_back')}
        </mesh>
      </group>

      {/* 13. GLUTES */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('glutes'); }}>
        <mesh position={[-0.22, 0.36, -0.16]}>
          <sphereGeometry args={[0.26, 18, 18]} />
          {getMuscleMaterial('glutes')}
        </mesh>
        <mesh position={[0.22, 0.36, -0.16]}>
          <sphereGeometry args={[0.26, 18, 18]} />
          {getMuscleMaterial('glutes')}
        </mesh>
      </group>

      {/* 14. QUADS */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('quads'); }}>
        <mesh position={[-0.24, -0.25, 0.1]} rotation={[-0.05, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.18, 0.85, 18]} />
          {getMuscleMaterial('quads')}
        </mesh>
        <mesh position={[0.24, -0.25, 0.1]} rotation={[-0.05, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.18, 0.85, 18]} />
          {getMuscleMaterial('quads')}
        </mesh>
      </group>

      {/* 15. HAMSTRINGS */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('hamstrings'); }}>
        <mesh position={[-0.24, -0.25, -0.1]} rotation={[0.05, 0, 0]}>
          <cylinderGeometry args={[0.21, 0.17, 0.85, 18]} />
          {getMuscleMaterial('hamstrings')}
        </mesh>
        <mesh position={[0.24, -0.25, -0.1]} rotation={[0.05, 0, 0]}>
          <cylinderGeometry args={[0.21, 0.17, 0.85, 18]} />
          {getMuscleMaterial('hamstrings')}
        </mesh>
      </group>

      {/* 16. CALVES */}
      <group onClick={(e) => { e.stopPropagation(); onSelectMuscle('calves'); }}>
        <mesh position={[-0.24, -1.05, 0]}>
          <cylinderGeometry args={[0.17, 0.11, 0.72, 18]} />
          {getMuscleMaterial('calves')}
        </mesh>
        <mesh position={[0.24, -1.05, 0]}>
          <cylinderGeometry args={[0.17, 0.11, 0.72, 18]} />
          {getMuscleMaterial('calves')}
        </mesh>
      </group>
    </group>
  );
};

export const AnatomyViewer3D = ({ selectedMuscle, onSelectMuscle, view = 'front' }) => {
  return (
    <div className="w-full h-[450px] sm:h-[500px] relative rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-[#121821] border border-[#2A3442]">
      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.2, 4.8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 4]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, 3, -4]} intensity={0.8} color="#C6FF00" />
        <pointLight position={[0, 2, 3]} intensity={1.5} color="#C6FF00" />

        <AnatomicalBody3D
          selectedMuscle={selectedMuscle}
          onSelectMuscle={onSelectMuscle}
          view={view}
        />

        <OrbitControls
          enableZoom={true}
          maxDistance={7}
          minDistance={3}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-[#161D27]/90 backdrop-blur-md border border-[#2A3442] text-[11px] text-[#B8C2CF] text-center pointer-events-none">
        💡 Drag to rotate 3D muscular model • Click any 3D muscle to view exercises
      </div>
    </div>
  );
};
