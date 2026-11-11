import Reveal from './Reveal.jsx';
import { getIcon } from '../icons.js';

export default function InfoGrid({ items, wide = false, single = false }) {
  return (
    <div className={`info-grid${wide ? ' wide' : ''}${single ? ' single' : ''}`}>
      {items.map((it, i) => {
        const Icon = getIcon(it.icon);
        return (
          <Reveal key={it.label} delay={(i % 4) * 0.08} className="glass info-card">
            <div className="info-icon">
              <Icon />
            </div>
            <div className="info-text">
              <span className="info-label">{it.label}</span>
              <span className="info-value">{it.value}</span>
              {it.note && <span className="info-note">{it.note}</span>}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
