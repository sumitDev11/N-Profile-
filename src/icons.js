import {
  FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaOm, FaTree, FaStar, FaSun, FaLeaf, FaRing,
  FaLanguage, FaFlag, FaGraduationCap, FaSchool, FaBook, FaTools, FaMale, FaFemale, FaUsers,
  FaHome, FaMoneyBillWave, FaCrown, FaRulerVertical,
} from 'react-icons/fa';

// Maps the icon names used in data.js to Font Awesome icons
export const iconMap = {
  user: FaUser,
  calendar: FaCalendarAlt,
  clock: FaClock,
  map: FaMapMarkerAlt,
  om: FaOm,
  tree: FaTree,
  star: FaStar,
  sun: FaSun,
  leaf: FaLeaf,
  ring: FaRing,
  language: FaLanguage,
  flag: FaFlag,
  grad: FaGraduationCap,
  school: FaSchool,
  book: FaBook,
  tools: FaTools,
  male: FaMale,
  female: FaFemale,
  users: FaUsers,
  home: FaHome,
  money: FaMoneyBillWave,
  crown: FaCrown,
  height: FaRulerVertical,
};

export const getIcon = (name) => iconMap[name] || FaStar;
