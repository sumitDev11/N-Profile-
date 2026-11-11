import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { AnimatePresence } from 'motion/react';
import Intro from './components/Intro.jsx';
import SafeBoundary from './components/SafeBoundary.jsx';
import Hero from './components/Hero.jsx';
import Title from './components/Title.jsx';
import Reveal from './components/Reveal.jsx';
import InfoGrid from './components/InfoGrid.jsx';
import PersonalDetails from './components/PersonalDetails.jsx';
import FamilyTree from './components/FamilyTree.jsx';
import EducationJourney from './components/EducationJourney.jsx';
import CareerShowcase from './components/CareerShowcase.jsx';
import Gallery from './components/Gallery.jsx';
import Contact from './components/Contact.jsx';
import FloatingButtons from './components/FloatingButtons.jsx';
import {
  about, personal, education, career, careerStats, income, familyTree, partnerExpectations, footer, credit, media,
} from './data.js';

// The 3D scene is loaded separately so text & photos appear first on slow phones
const Scene3D = lazy(() => import('./Scene3D.jsx'));

export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const lenis = useLenis();

  // Lock scrolling until the biodata is opened
  useEffect(() => {
    document.documentElement.classList.toggle('locked', !opened);
    if (!lenis) return;
    if (opened) lenis.start();
    else lenis.stop();
  }, [opened, lenis]);

  const playMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio(media.song);
      audio.loop = true;
      audio.volume = 0.6;
      audio.addEventListener('play', () => setPlaying(true));
      audio.addEventListener('pause', () => setPlaying(false));
      audioRef.current = audio;
    }
    audioRef.current.play().catch(() => setPlaying(false));
  };

  const handleOpen = () => {
    setOpened(true);
    window.scrollTo(0, 0);
    playMusic(); // must run inside the tap handler — browsers block autoplay
  };

  const toggleMusic = () => {
    if (audioRef.current && !audioRef.current.paused) audioRef.current.pause();
    else playMusic();
  };

  return (
    <>
      <div className="bg-pattern" aria-hidden="true" />
      <SafeBoundary>
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </SafeBoundary>

      <AnimatePresence>{!opened && <Intro key="intro" onOpen={handleOpen} />}</AnimatePresence>

      <main className="page">
        <Hero opened={opened} />

        <section className="section" id="about">
          <Title title="About Me" subtitle="a few words from my heart" />
          <Reveal className="glass text-box">
            <p>{about}</p>
          </Reveal>
        </section>

        <section className="section" id="personal">
          <Title title="Personal Details" />
          {/* To go back to the simple card grid, replace the next line with: <InfoGrid items={personal} /> */}
          <PersonalDetails items={personal} />
        </section>

        <section className="section" id="education">
          <Title title="Education" subtitle="every step of my learning journey" />
          {/* To go back to the simple card grid, replace the next line with: <InfoGrid items={education} wide /> */}
          <EducationJourney items={education} />
        </section>

        <section className="section" id="career">
          <Title title="Career" />
          {/* To go back to the simple timeline: import Timeline from './components/Timeline.jsx'
              and replace the next line with: <Timeline items={career} /> */}
          <CareerShowcase jobs={career} stats={careerStats} />
          <div className="income-wrap">
            <InfoGrid items={[income]} single />
          </div>
        </section>

        <section className="section" id="family">
          <Title title="Family Details" subtitle="the people who made me who I am" />
          <FamilyTree tree={familyTree} />
        </section>

        <section className="section" id="moments">
          <Title title="Moments" subtitle="tap a photo to view" />
          <Gallery photos={media.gallery} />
        </section>

        <section className="section" id="expectations">
          <Title title="Partner Expectations" />
          <Reveal className="glass text-box">
            <p>{partnerExpectations}</p>
          </Reveal>
        </section>

        <section className="section" id="contact">
          <Contact />
        </section>

        <footer className="footer">
          <span>{footer}</span>
          {credit?.name && (
            <p className="credit">
              {credit.text}{' '}
              <a href={credit.url} target="_blank" rel="noopener noreferrer">
                {credit.name}
              </a>
            </p>
          )}
        </footer>
      </main>

      {opened && <FloatingButtons playing={playing} onToggleMusic={toggleMusic} />}
    </>
  );
}
