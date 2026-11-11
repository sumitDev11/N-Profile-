import { motion } from 'motion/react';
import Reveal from './Reveal.jsx';
import { getIcon } from '../icons.js';

const R = 34;
const C = 2 * Math.PI * R;

function ScoreRing({ item }) {
  const Icon = getIcon(item.icon);
  const hasScore = typeof item.score === 'number';
  const p = hasScore ? Math.max(0, Math.min(100, item.score)) / 100 : 1;
  const final = C * (1 - p);

  return (
    <div className={`edu-ring${hasScore ? '' : ' icon-only'}`}>
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <defs>
          <linearGradient id="eduGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset="0.5" stopColor="#d4af37" />
            <stop offset="1" stopColor="#8f6a1c" />
          </linearGradient>
        </defs>
        <circle className="edu-ring-bg" cx="40" cy="40" r={R} />
        <motion.circle
          className="edu-ring-fg"
          cx="40"
          cy="40"
          r={R}
          strokeDasharray={C}
          style={{ '--final': final }}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: final }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      <div className="edu-ring-center">
        {hasScore ? (
          <>
            <strong>{item.scoreText}</strong>
            <span>{item.scoreUnit}</span>
          </>
        ) : (
          <Icon className="edu-ring-icon" />
        )}
      </div>
    </div>
  );
}

export default function EducationJourney({ items }) {
  return (
    <div className="edu-stairs">
      {items.map((it, i) => {
        const Icon = getIcon(it.icon);
        return (
          <Reveal
            key={it.label}
            className={`edu-step${it.highlight ? ' highlight' : ''}`}
            delay={i * 0.15}
            style={{ '--step': i }}
          >
            <div className="edu-card">
              {it.highlight && <span className="edu-ribbon">{it.highlight}</span>}
              <ScoreRing item={it} />
              <div className="edu-info">
                <span className="edu-year">{it.year}</span>
                <h3 className="edu-title">
                  <Icon /> {it.label}
                </h3>
                {it.lines ? (
                  <ul className="edu-lines">
                    {it.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="edu-sub">{it.value}</p>
                )}
              </div>
            </div>
            <div className="edu-pillar" aria-hidden="true">
              <span>{String(i + 1).padStart(2, '0')}</span>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
