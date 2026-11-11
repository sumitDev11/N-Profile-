import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';

// 3D tilt that follows the mouse / finger
export default function TiltCard({ children, className = '', max = 12, style, ...rest }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  const move = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onPointerUp={reset}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
