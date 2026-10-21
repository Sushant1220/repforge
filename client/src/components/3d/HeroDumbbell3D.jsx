import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshReflectorMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Dumbbell with Metallic Graphite and Neon Green Energy Accents
const DumbbellMesh = ({ mouse }) => {
  const groupRef = useRef();
  const ringRef = useRef();
  const ringMatRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Slow continuous floating Y rotation
    groupRef.current.rotation.y += delta * 0.35;

    // Pulse neon emissive glow subtly
    if (ringMatRef.current) {
      ringMatRef.current.emissiveIntensity = 1.3 + Math.sin(state.clock.getElapsedTime() * 2.5) * 0.4;
    }

    // Smooth subtle mouse parallax tilt & translation
    if (mouse && mouse.current) {
      const floatX = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.08;
      const targetRotX = floatX + (mouse.current.y * 0.25);
      const targetRotZ = -mouse.current.x * 0.2;
      
      const targetPosX = mouse.current.x * 0.25;
      const targetPosY = mouse.current.y * 0.2;

      // Lerp rotation
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.06);

      // Lerp position parallax
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.06);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.06);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
    }
  });

  return (
    <group ref={groupRef} scale={[0.82, 0.82, 0.82]}>
      {/* Dynamic Core Neon Green Glow Light */}
      <pointLight position={[0, 0, 0]} intensity={2.8} distance={6} color="#C6FF00" />

      {/* Central Handle Bar (Metallic Chrome / Graphite) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 3.6, 32]} />
        <meshStandardMaterial
          color="#2a2d38"
          roughness={0.2}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Handle Knurling Rings (Chrome) */}
      {[-0.6, 0, 0.6].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.19, 0.19, 0.4, 24]} />
          <meshStandardMaterial color="#4a4e5d" roughness={0.4} metalness={0.8} />
        </mesh>
      ))}

      {/* Left Weight Plates (Outer to Inner) */}
      <group position={[-1.3, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.95, 0.95, 0.22, 32]} />
          <meshStandardMaterial color="#14161d" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[-0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
          <meshStandardMaterial color="#1a1d26" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.65, 0.65, 0.16, 32]} />
          <meshStandardMaterial color="#0f1015" roughness={0.4} metalness={0.9} />
        </mesh>

        {/* Outer Lock Collar */}
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 0.18, 24]} />
          <meshStandardMaterial color="#C6FF00" roughness={0.2} metalness={0.5} emissive="#C6FF00" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Right Weight Plates (Outer to Inner) */}
      <group position={[1.3, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.95, 0.95, 0.22, 32]} />
          <meshStandardMaterial color="#14161d" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
          <meshStandardMaterial color="#1a1d26" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.65, 0.65, 0.16, 32]} />
          <meshStandardMaterial color="#0f1015" roughness={0.4} metalness={0.9} />
        </mesh>

        {/* Outer Lock Collar */}
        <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 0.18, 24]} />
          <meshStandardMaterial color="#C6FF00" roughness={0.2} metalness={0.5} emissive="#C6FF00" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Glowing Neon Green Energy Orbit Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.7, 0.03, 16, 64]} />
        <meshStandardMaterial
          ref={ringMatRef}
          color="#C6FF00"
          emissive="#C6FF00"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};

export const HeroDumbbell3D = ({ className = '' }) => {
  const mouse = useRef({ x: 0, y: 0 });
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    // WebGL capability check
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebGlSupported(hasWebGL);
    } catch (e) {
      setWebGlSupported(false);
    }

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`flex items-center justify-center p-6 ${className}`}>
        <div className="w-48 h-48 rounded-full bg-[#C6FF00]/10 border border-[#C6FF00]/30 flex items-center justify-center text-[#C6FF00] font-black text-4xl shadow-[0_0_40px_rgba(198,255,0,0.3)] animate-pulse">
          🏋️‍♂️
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-[320px] sm:h-[400px] cursor-grab active:cursor-grabbing ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-4, -3, 2]} intensity={2.5} color="#C6FF00" />
        <pointLight position={[3, 4, 3]} intensity={1.2} color="#28D7FF" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <DumbbellMesh mouse={mouse} />
        </Float>
      </Canvas>
    </div>
  );
};
