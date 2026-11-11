import { FaBriefcase } from 'react-icons/fa';
import Reveal from './Reveal.jsx';

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <Reveal key={it.period} delay={i * 0.15} className="tl-item">
          <span className="tl-dot" aria-hidden="true" />
          <div className="glass tl-card">
            <span className="tl-date">{it.period}</span>
            <h3 className="tl-role">
              <FaBriefcase /> {it.role}
            </h3>
            <p className="tl-company">{it.company}</p>
            <p className="tl-desc">{it.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
