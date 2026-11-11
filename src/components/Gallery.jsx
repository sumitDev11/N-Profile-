import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { FaTimes } from 'react-icons/fa';
import Reveal from './Reveal.jsx';
import { onImgError } from '../placeholder.js';

export default function Gallery({ photos }) {
  const [active, setActive] = useState(null);
  const lenis = useLenis();

  useEffect(() => {
    if (active === null) return;
    lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [active, lenis]);

  return (
    <>
      <div className="gallery">
        {photos.map((src, i) => (
          <Reveal key={src + i} delay={i * 0.1} className="g-item">
            <button className="g-btn" onClick={() => setActive(i)} aria-label={`View photo ${i + 1}`}>
              <img src={src} alt={`Moment ${i + 1}`} loading="lazy" onError={onImgError} />
            </button>
          </Reveal>
        ))}
      </div>

      {createPortal(
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              key={active}
              src={photos[active]}
              alt={`Moment ${active + 1}`}
              onError={onImgError}
              decoding="async"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            />
            <button className="lb-close" onClick={() => setActive(null)} aria-label="Close">
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}
