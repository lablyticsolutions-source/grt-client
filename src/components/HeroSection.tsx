import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "./BookingModal";
import exampleImage from 'figma:asset/f928b12e36c114bfc4fb6415e7b43a0d6020b5a0.png';

interface HeroSectionProps {
  onNavigateToPayment?: (details: {
    therapistName?: string;
    sessionType?: string;
    date?: string;
    time?: string;
    amount?: string;
  }) => void;
}

export function HeroSection({ onNavigateToPayment }: HeroSectionProps = {}) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${exampleImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
        <div className="space-y-8 sm:space-y-10">
          {/* Main Heading */}
          <div className="space-y-8 sm:space-y-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl text-white tracking-tight break-words font-bold">
             Gentle Rise Therapy
            </h1>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl text-white break-words text-center font-semibold leading-snug mt-2">
             Your Path to Healing Starts Here
            </h2>
          </div>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-white/90 leading-relaxed mx-auto max-w-xl px-2">
            At Gentle Rise Therapy, we believe everyone deserves compassionate mental health support. 
            Connect safely and privately with professional counselors anytime, via chat, voice, or video. 
            You’re not alone—help is just a click away.
          </p>
          
          {/* Tagline */}
          <div className="max-w-xl mx-auto">
            <p className="text-lg sm:text-2xl text-white/95 flex items-center justify-center gap-2 mt-2">
              Healing with love and professional care
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md mx-auto px-2">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Book a Session
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto bg-white/90 text-gray-900 border-white hover:bg-white rounded-full px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Start a Chat
            </Button>
          </div>
        </div>
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
