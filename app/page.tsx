'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';

// Import components
import { About, Badges, Contact, Experience, Hero, MyBook, Navbar } from "../src/components";
import FloatingButton from "../src/components/FloatingButton.jsx";
import { CookieConsent } from "../../components/ui/cookie-consent"; // Path relative to app/page.tsx
import bg from './bghero.jpeg'; // Path relative to app/page.tsx

const StarsCanvas = dynamic(() => import('../src/components/canvas/Stars.jsx'), {
  ssr: false,
  loading: () => null
});

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ensure window is defined (only run on client-side)
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia("(max-width: 500px)");
      setIsMobile(mediaQuery.matches);
      const handleMediaQueryChange = (event: any) => {
        setIsMobile(event.matches);
      };
      mediaQuery.addEventListener("change", handleMediaQueryChange);
      return () => {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
    }
  }, []);

  return (
    <div suppressHydrationWarning>
      <div className='relative z-0 bg-primary'>
        <header style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}>
          <Navbar />
          <Hero />
        </header>
        <main>
          <About />
          <Experience />
          <Badges />
          <MyBook />
          <FloatingButton />
        </main>
        <footer>
          <Contact />
          <CookieConsent />
        </footer>
        {/* Conditionally render StarsCanvas only on the client-side and when not mobile */}
        {typeof window !== 'undefined' && !isMobile ? <StarsCanvas /> : null}
      </div>
    </div>
  )
}