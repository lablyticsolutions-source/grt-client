import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft, ChevronRight, MessageCircle, Video, Headphones } from "lucide-react";
import carouselImage from 'figma:asset/ecf82f93981fcb70e19b2eb8c979644b7356ff52.png';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookingModal } from "./BookingModal";

interface TherapySessionsCarouselProps {
  onNavigateToPayment?: (details: {
    therapistName?: string;
    sessionType?: string;
    date?: string;
    time?: string;
    amount?: string;
  }) => void;
}

export function TherapySessionsCarousel({ onNavigateToPayment }: TherapySessionsCarouselProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSessionType, setSelectedSessionType] = useState<string>("");

  const handleBookSession = (sessionType: string) => {
    setSelectedSessionType(sessionType);
    setIsBookingModalOpen(true);
  };

  const sessions = [
    {
      id: 1,
      type: "chat",
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Comfort through conversation",
      subtitle: "Chat-based therapy sessions",
      description: "Share at your own pace and get the support you need, wherever you are.",
      buttonText: "Book a Chat Session",
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      image: "https://media.licdn.com/dms/image/sync/v2/D5627AQGyZt8Gw1yDzg/articleshare-shrink_800/articleshare-shrink_800/0/1735922581447?e=2147483647&v=beta&t=nqLa70IHNvFszXL2-8IK3xU_0drf0q0Y-iWY20Zz0o8"
    },
    {
      id: 2,
      type: "video",
      icon: <Video className="h-6 w-6" />,
      title: "Talk it out face-to-face",
      subtitle: "Video sessions for personal connection",
      description: "Connect face-to-face and feel truly heard through professional care.",
      buttonText: "Book a Video Session",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      image: "https://www.apa.org/images/hero-telepsychology-updated-guidelines-series_tcm7-339042.jpg"
    },
    {
      id: 3,
      type: "audio",
      icon: <Headphones className="h-6 w-6" />,
      title: "Be heard, anytime",
      subtitle: "Audio sessions for voice-only therapy",
      description: "Share your thoughts without being seen while getting professional support.",
      buttonText: "Book an Audio Session",
      color: "from-purple-400 to-purple-400",
      bgColor: "bg-purple-50",
      image: "https://us-east-1.graphassets.com/AXS6ETuEAQTqlWfGTNqWMz/D2bQPdwiR762XURKquJu"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sessions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sessions.length) % sessions.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl text-gray-900 mb-4 text-[30px]">
            Choose Your Therapy Style
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the therapy format that feels right for you.
          </p>
        </div>

        <div className="relative">
          {/* Main Carousel Container */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {sessions.map((session, index) => (
                <div key={session.id} className="w-full flex-shrink-0">
                  <Card className={`mx-4 ${session.bgColor} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px] lg:min-h-[400px]">
                        {/* Content Side */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${session.color} text-white mb-6 w-fit`}>
                            {session.icon}
                          </div>
                          
                          <h3 className="text-2xl lg:text-3xl xl:text-4xl text-gray-900 mb-4">
                            {session.title}
                          </h3>
                          
                          <p className="text-lg lg:text-xl text-gray-700 mb-4">
                            {session.subtitle}
                          </p>
                          
                          <p className="text-gray-600 mb-8 leading-relaxed text-base lg:text-lg">
                            {session.description}
                          </p>
                          
                          <Button 
                            size="lg" 
                            className={`bg-gradient-to-r ${session.color} hover:opacity-90 text-white border-0 w-fit font-bold px-8 py-4 text-lg`}
                            onClick={() => {
                              window.location.href = "https://account.lablyticsolutions.com/client-login";
                            }}
                          >
                            {session.buttonText}
                          </Button>
                        </div>

                        {/* Image Side */}
                        <div className="relative overflow-hidden lg:rounded-r-xl h-[300px] lg:h-full">
                          <ImageWithFallback
                            src={session.image}
                            alt={`${session.title} therapy session`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl z-10"
            aria-label="Previous session type"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl z-10"
            aria-label="Next session type"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-6 space-x-3">
          {sessions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedSessionType("");
        }}
        defaultSessionType={selectedSessionType}
        onNavigateToPayment={onNavigateToPayment}
      />
    </section>
  );
}
