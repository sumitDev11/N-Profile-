import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactLenis } from 'lenis/react';
import { MotionConfig } from 'motion/react';
import App from './App.jsx';
import './index.css';

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: reduced ? 1 : 0.1, smoothWheel: !reduced }}>
        <App />
      </ReactLenis>
    </MotionConfig>
  </StrictMode>
);
