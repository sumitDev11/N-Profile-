import { FaUserTie, FaPhoneAlt, FaWhatsapp, FaFilePdf } from 'react-icons/fa';
import Reveal from './Reveal.jsx';
import { contact } from '../data.js';

export const waLink = () =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

export default function Contact() {
  const tel = `tel:${contact.phone.replace(/\s/g, '')}`;

  return (
    <Reveal className="contact-card">
      <h2 className="contact-title">Let's Connect</h2>
      <p className="contact-line">
        <FaUserTie /> {contact.person}
      </p>
      <p className="contact-line">
        <FaPhoneAlt /> <a href={tel}>{contact.phone}</a>
      </p>

      <div className="contact-actions">
        <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp /> WhatsApp
        </a>
        <a className="btn btn-gold" href={tel}>
          <FaPhoneAlt /> Call Now
        </a>
        <button className="btn btn-outline" onClick={() => window.print()}>
          <FaFilePdf /> Download PDF
        </button>
      </div>
    </Reveal>
  );
}
