import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { BookingModal } from "./BookingModal";
import bannerImage from '../assets/f928b12e36c114bfc4fb6415e7b43a0d6020b5a0.png';

interface HeroSectionProps {
  onNavigateToPayment?: (details: {
    therapistName?: string;
    sessionType?: string;
    date?: string;
    time?: string;
    amount?: string;
  }) => void;
}

// Responsive hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export function HeroSection({ onNavigateToPayment }: HeroSectionProps = {}) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Banner height: smaller on mobile
  const bannerHeight = isMobile ? "h-48" : "h-64";
  // The overlay and content are absolutely positioned

  return (
    <section id="home" className={`w-full flex flex-col items-center justify-center`}>
      <div className={`relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-md ${bannerHeight}`}>
        {/* Banner image - fills box, crops excess, like screenshots */}
        <img
          src={bannerImage}
          alt="Gentle Rise Therapy Banner"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Welcome to Gentle Rise Therapy</h1>
          <p className="text-base sm:text-lg text-white font-medium mb-2 text-center max-w-xl">
            A safe, supportive space for your healing journey. Join our community of dedicated therapists and caring professionals.
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3 justify-center mt-4">
        <Button
          size="lg"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-sm"
          onClick={() => setIsBookingModalOpen(true)}
        >
          Sign Up
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="bg-white text-blue-600 border border-blue-600 font-semibold px-6 py-2 rounded-md shadow-sm"
          onClick={() => setIsBookingModalOpen(true)}
        >
          Login
        </Button>
      </div>
      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onNavigateToPayment={onNavigateToPayment}
      />
    </section>
  );
}
