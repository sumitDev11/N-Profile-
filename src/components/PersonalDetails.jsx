import { motion } from 'motion/react';
import { FaIdCard, FaLeaf } from 'react-icons/fa';
import Reveal from './Reveal.jsx';
import { getIcon } from '../icons.js';
import { calcAge } from '../utils.js';
import { profile, rashiNames } from '../data.js';

function Row({ item }) {
  const Icon = getIcon(item.icon);
  const parts = item.chips
    ? item.value.split(',').map((s) => s.trim()).filter(Boolean)
    : null;
  return (
    <li className="pd-row">
      <span className="pd-gem">
        <Icon />
      </span>
      <div className="pd-text">
        <span className="pd-label">{item.label}</span>
        {parts ? (
          <span className="pd-chips">
            {parts.map((p) => (
              <span key={p} className={`pd-chip${/^etc\.?$/i.test(p) ? ' more' : ''}`}>
                {/^etc\.?$/i.test(p) ? '& more' : p}
              </span>
            ))}
          </span>
        ) : (
          <span className="pd-value">
            {item.value}
            {item.showAge && <em className="pd-age"> · {calcAge(profile.dob)} yrs</em>}
          </span>
        )}
      </div>
    </li>
  );
}

function Panel({ title, icon: Icon, items, delay }) {
  return (
    <Reveal className="glass pd-panel" delay={delay}>
      <span className="pd-corner tl" aria-hidden="true" />
      <span className="pd-corner br" aria-hidden="true" />
      <h3 className="pd-title">
        <Icon /> {title}
      </h3>
      <ul className="pd-list">
        {items.map((it) => (
          <Row key={it.label} item={it} />
        ))}
      </ul>
    </Reveal>
  );
}

function RashiWheel({ rashi, heritage }) {
  const idx = rashi ? rashiNames.indexOf(rashi.hindi) : -1;
  const finalRot = idx >= 0 ? -idx * 30 : 0; // bring the active rashi to the top

  return (
    <Reveal className="pd-center" delay={0.1}>
      <div className="rashi-wheel" style={{ '--final': `${finalRot}deg` }}>
        <span className="rashi-pointer" aria-hidden="true" />
        <motion.div
          className="rashi-ring"
          initial={{ rotate: finalRot + 240 }}
          whileInView={{ rotate: finalRot }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          {rashiNames.map((n, i) => {
            // names that end up on the lower half of the wheel are flipped so they read upright
            const shown = (((i * 30 + finalRot) % 360) + 360) % 360;
            const flip = shown > 90 && shown < 270;
            return (
              <span
                key={n}
                className={`rashi-name${i === idx ? ' active' : ''}${flip ? ' flip' : ''}`}
                style={{ '--a': `${i * 30}deg` }}
              >
                {n}
              </span>
            );
          })}
        </motion.div>
        <div className="rashi-core">
          <span className="rc-label">Rashi</span>
          <strong className="rc-hindi">{rashi?.hindi || rashi?.value}</strong>
          <span className="rc-en">{rashi?.value}</span>
        </div>
      </div>

      <div className="seal-row">
        {heritage.map((it, i) => {
          const Icon = getIcon(it.icon);
          return (
            <Reveal key={it.label} className="seal" delay={0.3 + i * 0.12}>
              <span className="seal-icon">
                <Icon />
              </span>
              <span className="seal-label">{it.label}</span>
              <span className="seal-value">{it.value}</span>
            </Reveal>
          );
        })}
      </div>
    </Reveal>
  );
}

export default function PersonalDetails({ items }) {
  const by = (g) => items.filter((it) => it.group === g);
  const rashi = items.find((it) => it.group === 'rashi');

  return (
    <div className="pd-grid">
      <Panel title="Basic Info" icon={FaIdCard} items={by('basic')} delay={0} />
      <RashiWheel rashi={rashi} heritage={by('heritage')} />
      <Panel title="Lifestyle" icon={FaLeaf} items={by('lifestyle')} delay={0.2} />
    </div>
  );
}
