import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import {
  FaOm, FaAngleDoubleDown, FaArrowRight, FaFilePdf, FaMapMarkerAlt, FaGraduationCap,
  FaBriefcase,
} from 'react-icons/fa';
import TiltCard from './TiltCard.jsx';
import { profile, media, heroHighlights } from '../data.js';
import { onImgError } from '../placeholder.js';

const item = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pop = {
  hidden: { opacity: 0, scale: 0.6 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 160, damping: 16, delay: 0.9 + i * 0.2 },
  }),
};

export default function Hero({ opened }) {
  const lenis = useLenis();
  const state = opened ? 'show' : 'hidden';

  const goTo = (id) => {
    if (lenis) lenis.scrollTo(id, { offset: -20 });
    else document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="hero">
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />

      <div className="hero-grid">
        {/* ---------- Text ---------- */}
        <div className="hero-text">
          <motion.p className="anim blessing" variants={item} initial="hidden" animate={state} custom={0}>
            <FaOm /> <span>॥ श्री गणेशाय नमः ॥</span> <FaOm />
          </motion.p>

          <motion.p className="anim eyebrow" variants={item} initial="hidden" animate={state} custom={1}>
            Namaste, I'm
          </motion.p>

          <motion.h1 className="anim hero-name" variants={item} initial="hidden" animate={state} custom={2}>
            {profile.name}
          </motion.h1>

          <motion.p className="anim hero-role" variants={item} initial="hidden" animate={state} custom={3}>
            {profile.designation}
          </motion.p>

          <motion.p className="anim hero-tagline" variants={item} initial="hidden" animate={state} custom={4}>
            {profile.tagline}
          </motion.p>

          <motion.div className="anim hero-actions" variants={item} initial="hidden" animate={state} custom={5}>
            <button className="btn btn-gold" onClick={() => goTo('#about')}>
              View Biodata <FaArrowRight />
            </button>
            <button className="btn btn-glass" onClick={() => window.print()}>
              Download PDF <FaFilePdf />
            </button>
          </motion.div>

          <motion.ul className="anim hero-meta" variants={item} initial="hidden" animate={state} custom={6}>
            <li>
              <FaMapMarkerAlt /> {profile.city}, {profile.state}
            </li>
            <li>
              <FaGraduationCap /> {heroHighlights.education}
            </li>
            <li>
              <FaBriefcase /> {heroHighlights.company}
            </li>
          </motion.ul>
        </div>

        {/* ---------- Portrait: head breaks out of the glass frame ---------- */}
        <motion.div
          className="anim portrait-col"
          initial={{ opacity: 0, y: 40 }}
          animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltCard className="frame-wrap" max={6}>
            <div className="frame" aria-hidden="true" />
            <img
              className="frame-person"
              src={media.heroCutout}
              alt={profile.name}
              onError={onImgError}
              fetchPriority="high"
              draggable="false"
            />

            <motion.div className="float-orb" variants={pop} initial="hidden" animate={state} custom={2} aria-hidden="true">
              <FaOm />
            </motion.div>
          </TiltCard>
        </motion.div>
      </div>

      <motion.button
        className="anim scroll-down"
        onClick={() => goTo('#about')}
        aria-label="Scroll down"
        variants={item}
        initial="hidden"
        animate={state}
        custom={7}
      >
        <FaAngleDoubleDown />
      </motion.button>
    </header>
  );
}
