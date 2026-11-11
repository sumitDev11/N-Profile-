import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import {
  FaBuilding, FaCheckCircle, FaTint, FaSolarPanel, FaBriefcase, FaArrowUp, FaCalendarAlt,
  FaRupeeSign, FaMapMarkedAlt, FaBusinessTime, FaLandmark,
} from 'react-icons/fa';
import Reveal from './Reveal.jsx';

const statIcons = [FaRupeeSign, FaMapMarkedAlt, FaBusinessTime, FaLandmark];
const projectIcons = { water: FaTint, solar: FaSolarPanel };

const yearsSince = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  const now = new Date();
  return Math.floor((now.getFullYear() * 12 + now.getMonth() - (y * 12 + (m - 1))) / 12);
};

function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(to);
      return;
    }
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduced]);

  return (
    <>
      <span ref={ref} className="count-anim">{n}</span>
      <span className="count-final">{to}</span>
    </>
  );
}

function Stats({ stats }) {
  return (
    <div className="cr-stats">
      {stats.map((s, i) => {
        const Icon = statIcons[i % statIcons.length];
        const value = s.experienceSince ? yearsSince(s.experienceSince) : s.value;
        return (
          <Reveal key={s.label} className="cr-stat" delay={i * 0.1}>
            <span className="cr-stat-icon">
              <Icon />
            </span>
            <strong className="cr-stat-num">
              {s.prefix}
              <Counter to={value} />
              {s.suffix}
            </strong>
            <span className="cr-stat-label">{s.label}</span>
          </Reveal>
        );
      })}
    </div>
  );
}

function RoleCard({ job }) {
  const PIcon = projectIcons[job.projectIcon] || FaBriefcase;
  return (
    <div className={`cr-card${job.current ? ' current' : ''}`}>
      <div className="cr-inner">
        <div className="cr-head">
          <div>
            {job.current && (
              <span className="cr-live">
                <i /> Current Role
              </span>
            )}
            <h3 className="cr-role">{job.role}</h3>
            <p className="cr-company">
              <FaBuilding /> {job.company}
            </p>
          </div>
          <span className="cr-period">
            <FaCalendarAlt /> {job.period}
          </span>
        </div>

        {job.projectValue && (
          <div className="cr-project">
            <span className="cr-project-icon">
              <PIcon />
            </span>
            <div className="cr-project-text">
              <strong className="cr-amount">{job.projectValue}</strong>
              <span className="cr-pname">{job.projectName}</span>
              {job.projectDetail && <span className="cr-pdetail">{job.projectDetail}</span>}
            </div>
          </div>
        )}

        {job.duties?.length > 0 ? (
          <ul className="cr-duties">
            {job.duties.map((d) => (
              <li key={d}>
                <FaCheckCircle /> {d}
              </li>
            ))}
          </ul>
        ) : (
          <p className="cr-desc">{job.description}</p>
        )}
      </div>
    </div>
  );
}

export default function CareerShowcase({ jobs, stats }) {
  return (
    <div className="career">
      {stats?.length > 0 && <Stats stats={stats} />}

      <div className="cr-ladder">
        {jobs.map((job, i) => (
          <div key={job.role + job.period} className="cr-rung">
            {i > 0 && (
              <Reveal className="cr-promo" delay={0.1}>
                <span className="cr-promo-line" />
                <span className="cr-promo-badge">
                  <FaArrowUp /> Promoted
                </span>
                <span className="cr-promo-line" />
              </Reveal>
            )}
            <Reveal delay={0.1}>
              <RoleCard job={job} />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
