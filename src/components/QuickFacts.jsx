import { FaBirthdayCake, FaRulerVertical, FaHardHat, FaMapMarkerAlt } from 'react-icons/fa';
import Reveal from './Reveal.jsx';
import TiltCard from './TiltCard.jsx';
import { profile } from '../data.js';

export function calcAge(dob) {
  const b = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
  return age;
}

export default function QuickFacts() {
  const facts = [
    { Icon: FaBirthdayCake, value: `${calcAge(profile.dob)} Years`, label: 'Age' },
    { Icon: FaRulerVertical, value: profile.height, label: 'Height' },
    { Icon: FaHardHat, value: 'Engineer', label: profile.experience },
    { Icon: FaMapMarkerAlt, value: profile.city, label: profile.state },
  ];

  return (
    <section className="facts" id="facts">
      {facts.map(({ Icon, value, label }, i) => (
        <Reveal key={label} delay={i * 0.1} className="fact-reveal">
          <TiltCard className="fact-card" max={14}>
            <Icon className="fact-icon" />
            <strong>{value}</strong>
            <span>{label}</span>
          </TiltCard>
        </Reveal>
      ))}
    </section>
  );
}
