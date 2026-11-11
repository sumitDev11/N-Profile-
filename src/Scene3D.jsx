import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Two interlocked gold wedding rings ---------- */
function Rings() {
  const group = useRef();
  const { size, viewport } = useThree();
  const mobile = size.width < 768;

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e8c25a',
        metalness: 1,
        roughness: 0.18,
        envMapIntensity: 1.4,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const scroll = window.scrollY || 0;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const p = scroll / max; // 0 → 1 over the page
    const t = state.clock.elapsedTime;
    const g = group.current;
    g.rotation.y = t * 0.25 + p * Math.PI * 4;
    g.rotation.x = 0.35 + Math.sin(t * 0.4) * 0.1 + p * 1.2;

    // In the hero the rings glow softly *behind* the glass photo frame,
    // then glide out to their resting place as the page scrolls.
    const inHero = scroll < window.innerHeight * 0.5;
    const tx = inHero ? (mobile ? 0 : viewport.width * 0.21) : mobile ? 0 : viewport.width * 0.3;
    const ty = inHero ? viewport.height * (mobile ? 0.14 : 0.02) : (mobile ? 0.4 : 0.1) - p * (mobile ? 1 : 0.6);
    const ts = inHero ? (mobile ? 0.3 : 0.55) : mobile ? 0.5 : 0.8;
    g.position.x = THREE.MathUtils.damp(g.position.x, tx, 2.5, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, 2.5, delta);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, ts, 2.5, delta));
  });

  return (
    <group
      ref={group}
      position={[mobile ? 0 : viewport.width * 0.21, viewport.height * (mobile ? 0.14 : 0.02), 0]}
      scale={mobile ? 0.3 : 0.55}
    >
      <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh material={goldMat} position={[-0.42, 0, 0]} rotation={[0, 0.5, 0]}>
          <torusGeometry args={[0.85, 0.11, 20, 64]} />
        </mesh>
        <mesh material={goldMat} position={[0.42, 0, 0]} rotation={[Math.PI / 2.2, 0.5, 0]}>
          <torusGeometry args={[0.85, 0.11, 20, 64]} />
        </mesh>
      </Float>
    </group>
  );
}

/* ---------- Falling rose petals (one instanced mesh = 1 draw call) ---------- */
function Petals({ count }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  const petals = useMemo(() => {
    const palette = ['#c2185b', '#e75480', '#b0123a', '#f48fb1', '#d81b60'];
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 12,
      y: Math.random() * 10 - 5,
      z: (Math.random() - 0.5) * 3 - 0.5,
      speed: 0.35 + Math.random() * 0.45,
      spin: 0.5 + Math.random() * 1.5,
      sway: Math.random() * Math.PI * 2,
      scale: 0.7 + Math.random() * 0.6,
      color: new THREE.Color(palette[Math.floor(Math.random() * palette.length)]),
    }));
  }, [count]);

  const geometry = useMemo(() => {
    const g = new THREE.SphereGeometry(0.12, 7, 5); // low-poly
    g.scale(1, 0.22, 0.75); // flatten into a petal
    return g;
  }, []);

  const setColors = (m) => {
    if (!m) return;
    mesh.current = m;
    petals.forEach((p, i) => m.setColorAt(i, p.color));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  };

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const top = viewport.height / 2 + 1;
    const halfW = Math.max(viewport.width / 2, 3);
    petals.forEach((p, i) => {
      p.y -= p.speed * delta;
      if (p.y < -top) {
        p.y = top;
        p.x = (Math.random() - 0.5) * halfW * 2;
      }
      dummy.position.set(p.x + Math.sin(t * 0.8 + p.sway) * 0.4, p.y, p.z);
      dummy.rotation.set(t * p.spin + p.sway, t * p.spin * 0.7, Math.sin(t + p.sway));
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={setColors} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial roughness={0.6} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

export default function Scene3D() {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="scene3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : 'always'}
      >
        <ambientLight intensity={0.5} color="#ffe4b5" />
        <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff1cc" />
        <pointLight position={[-4, -2, 3]} intensity={8} color="#ff9e6b" />

        {/* Warm studio reflections built in code — no HDR download needed */}
        <Environment resolution={64}>
          <color attach="background" args={['#6b4210']} />
          <Lightformer form="rect" intensity={4} color="#fff4d6" position={[0, 4, 3]} scale={[10, 3, 1]} />
          <Lightformer form="rect" intensity={3} color="#ffd38a" position={[-5, 0, 2]} scale={[3, 8, 1]} />
          <Lightformer form="rect" intensity={2.5} color="#ffb070" position={[5, -1, 2]} scale={[3, 8, 1]} />
          <Lightformer form="rect" intensity={2} color="#fff0c0" position={[0, -4, 2]} scale={[10, 2, 1]} />
          <Lightformer form="circle" intensity={3} color="#ffffff" position={[0, 0, -5]} scale={4} />
        </Environment>

        <Rings />
        {!reduced && <Petals count={mobile ? 14 : 26} />}
        {!reduced && (
          <Sparkles count={mobile ? 30 : 60} scale={[10, 8, 3]} size={mobile ? 2.5 : 3.5} speed={0.35} color="#f5dd8c" opacity={0.9} />
        )}
      </Canvas>
    </div>
  );
}
