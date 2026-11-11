import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { FaOm, FaEnvelopeOpenText, FaBell } from 'react-icons/fa';
import { profile } from '../data.js';

const EASE = [0.65, 0, 0.35, 1];

/* ---------- Marigold toran (garland) across the top ---------- */
function Toran() {
  const SWAGS = 4;
  const PER = 11;
  const balls = [];
  for (let s = 0; s < SWAGS; s++) {
    for (let i = 0; i <= PER; i++) {
      const t = i / PER;
      balls.push({
        key: `${s}-${i}`,
        left: ((s + t) / SWAGS) * 100,
        top: Math.sin(Math.PI * t), // 0 → 1 → 0 (sag), scaled in CSS
        alt: (s + i) % 2 === 1,
      });
    }
  }
  const strands = Array.from({ length: SWAGS + 1 }, (_, k) => ({ left: (k / SWAGS) * 100, len: k % 2 ? 6 : 9 }));

  return (
    <motion.div
      className="toran"
      aria-hidden="true"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -140, opacity: 0, transition: { duration: 0.6, ease: EASE } }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      {balls.map((b) => (
        <span
          key={b.key}
          className={`marigold${b.alt ? ' alt' : ''}`}
          style={{ left: `${b.left}%`, '--sag': b.top }}
        />
      ))}
      {strands.map((st, k) => (
        <span key={k} className="strand" style={{ left: `${st.left}%`, '--d': `${k * -0.7}s` }}>
          {Array.from({ length: st.len }, (_, j) => (
            <i key={j} className={j % 2 ? 'alt' : ''} />
          ))}
          <FaBell className="bell" />
        </span>
      ))}
    </motion.div>
  );
}

/* ---------- Large slowly-turning mandala behind everything ---------- */
function BigMandala() {
  const petals = Array.from({ length: 48 }, (_, i) => i * 7.5);
  return (
    <svg className="intro-mandala" viewBox="0 0 400 400" aria-hidden="true">
      <g fill="none" stroke="#d4af37" strokeWidth="0.8">
        <circle cx="200" cy="200" r="190" opacity="0.35" />
        <circle cx="200" cy="200" r="150" strokeDasharray="2 6" opacity="0.5" />
        <circle cx="200" cy="200" r="110" opacity="0.3" />
      </g>
      {petals.map((a) => (
        <path
          key={a}
          d="M200 14 C209 34 209 52 200 66 C191 52 191 34 200 14Z"
          fill="#d4af37"
          opacity="0.18"
          transform={`rotate(${a} 200 200)`}
        />
      ))}
    </svg>
  );
}

function Sparks() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 6 + Math.random() * 7,
        delay: -Math.random() * 12,
        drift: (Math.random() - 0.5) * 60,
        key: i,
      })),
    []
  );
  return (
    <div className="sparks" aria-hidden="true">
      {sparks.map((s) => (
        <span
          key={s.key}
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            '--drift': `${s.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function Intro({ onOpen }) {
  const letters = [...profile.name];
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true); // doors swing open via a CSS transition (runs on the GPU, smooth on slow phones)
    onOpen();
  };

  return (
    <motion.div
      className={`intro${opening ? ' open' : ''}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 1.5, duration: 0.35 } }}
    >
      {/* Palace doors */}
      <div className="door left" aria-hidden="true">
        <span className="knob" />
      </div>
      <div className="door right" aria-hidden="true">
        <span className="knob" />
      </div>

      <motion.div className="intro-fx" exit={{ opacity: 0, transition: { duration: 0.4 } }}>
        <BigMandala />
        <Sparks />
      </motion.div>

      <Toran />

      <motion.div
        className="intro-inner"
        exit={{ opacity: 0, scale: 1.12, filter: 'blur(6px)', transition: { duration: 0.45 } }}
      >
        <motion.div
          className="om-wrap"
          initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="om-ripple" />
          <span className="om-ripple r2" />
          <span className="om-orbit">
            <i />
          </span>
          <div className="om-ring">
            <FaOm className="om-spin" />
          </div>
        </motion.div>

        <h1 className="intro-name" aria-label={profile.name}>
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              className="intro-letter"
              style={{ '--i': i }}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.7 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="intro-sub"
          initial={{ opacity: 0, letterSpacing: '1em' }}
          animate={{ opacity: 0.9, letterSpacing: '0.38em' }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="sub-line" /> Marriage Biodata <span className="sub-line" />
        </motion.p>

        <motion.div
          className="intro-cta"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="cta-pulse" aria-hidden="true" />
          <span className="cta-pulse p2" aria-hidden="true" />
          <motion.button className="btn btn-gold intro-btn" onClick={handleOpen} whileTap={{ scale: 0.94 }}>
            <FaEnvelopeOpenText /> Open Biodata
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
