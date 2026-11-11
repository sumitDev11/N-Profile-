import { FaGem } from 'react-icons/fa';
import Reveal from './Reveal.jsx';

export function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span className="divider-line" />
      <FaGem className="divider-gem" />
      <span className="divider-line right" />
    </div>
  );
}

export default function Title({ title, subtitle }) {
  return (
    <Reveal className="title">
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      <Divider />
    </Reveal>
  );
}
