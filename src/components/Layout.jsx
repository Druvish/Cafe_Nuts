import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-cafe-cream-light text-cafe-charcoal font-sans selection:bg-cafe-terracotta selection:text-cafe-cream-light">
      <ScrollToTop />
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
