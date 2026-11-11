import { motion } from 'motion/react';
import { FaMusic, FaPlay, FaWhatsapp } from 'react-icons/fa';
import { waLink } from './Contact.jsx';

export default function FloatingButtons({ playing, onToggleMusic }) {
  return (
    <>
      <motion.button
        className={`fab fab-music${playing ? ' playing' : ''}`}
        onClick={onToggleMusic}
        aria-label={playing ? 'Pause music' : 'Play music'}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        {playing ? <FaMusic className="spin" /> : <FaPlay className="play-icon" />}
      </motion.button>

      <motion.a
        className="fab fab-wa"
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: 'spring' }}
      >
        <FaWhatsapp />
      </motion.a>
    </>
  );
}
