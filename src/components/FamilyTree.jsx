import { FaCrown, FaMale, FaFemale, FaUserGraduate, FaStar, FaHome } from 'react-icons/fa';
import Reveal from './Reveal.jsx';

const personIcon = (p) => (/^(mrs|ms|smt)\b/i.test(p.name) ? FaFemale : FaMale);

function Person({ p }) {
  const Icon = personIcon(p);
  return (
    <div className="ft-person">
      <span className="ft-avatar">
        <Icon />
      </span>
      <div className="ft-ptext">
        {p.role && <span className="ft-role">{p.role}</span>}
        <span className="ft-name">{p.name}</span>
      </div>
    </div>
  );
}

function Kid({ k }) {
  return (
    <li className={`ft-kid${k.me ? ' me' : ''}`}>
      <span className="ft-kid-icon">{k.me ? <FaStar /> : <FaUserGraduate />}</span>
      <div className="ft-ptext">
        <span className="ft-name">
          {k.name}
          {k.me && <span className="ft-me">Me</span>}
          {k.role && !k.me && <span className="ft-tag">{k.role}</span>}
        </span>
        {k.note && <span className="ft-note">{k.note}</span>}
      </div>
    </li>
  );
}

export default function FamilyTree({ tree }) {
  return (
    <div className="ftree">
      <Reveal className="ft-root">
        <span className="ft-crest" aria-hidden="true">
          <FaCrown />
        </span>
        <span className="ft-heading">Grandparents</span>
        <div className="ft-couple-row">
          {tree.grandparents.map((p) => (
            <Person key={p.name} p={p} />
          ))}
        </div>
      </Reveal>

      <div className="ft-branches">
        {tree.branches.map((b, i) => (
          <Reveal key={b.parents[0].name} className={`ft-branch${b.main ? ' main' : ''}`} delay={0.15 + i * 0.15}>
            <div className="ft-card">
              <span className="ft-heading">{b.title}</span>
              <div className="ft-couple">
                {b.parents.map((p) => (
                  <Person key={p.name} p={p} />
                ))}
              </div>
              {b.children?.length > 0 && (
                <>
                  <span className="ft-sub">{b.main ? 'Us' : 'Children'}</span>
                  <ul className="ft-kids">
                    {b.children.map((k) => (
                      <Kid key={k.name} k={k} />
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {tree.nativePlace && (
        <Reveal className="ft-native" delay={0.3}>
          <span className="ft-native-label">
            <FaHome /> Native Place
          </span>
          <strong>{tree.nativePlace.trim()}</strong>
        </Reveal>
      )}
    </div>
  );
}
