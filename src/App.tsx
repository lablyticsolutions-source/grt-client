import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { TherapySessionsCarousel } from "./components/TherapySessionsCarousel";
import { PromoBanner } from "./components/PromoBanner";
import { SpecialtyAreas } from "./components/SpecialtyAreas";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { TherapistShowcase } from "./components/TherapistShowcase";
import { StatsCounter } from "./components/StatsCounter";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { CrisisResources } from "./components/CrisisResources";
import { Footer } from "./components/Footer";
import { SocialMediaIcons } from "./components/SocialMediaIcons";
import { PaymentPage } from "./components/PaymentPage";
import { TherapistDetailPage } from "./components/TherapistDetailPage";
import { TherapistRegistrationPage } from "./components/TherapistRegistrationPage";
import './styles/globals.css';

interface SessionDetails {
  therapistName?: string;
  sessionType?: string;
  date?: string;
  time?: string;
  amount?: string;
}

interface Therapist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  experience: string;
  languages: string[];
  location: string;
  price: string;
  image: string;
  description?: string;
  approach?: string[];
  credentials?: string[];
  availability?: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
  loginMethod: 'email' | 'social';
  socialProvider?: 'google' | 'facebook' | 'twitter' | 'apple';
  profileCompleted?: boolean;
}

export default function App() {
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showTherapistDetail, setShowTherapistDetail] = useState(false);
  const [showTherapistRegistration, setShowTherapistRegistration] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | undefined>(undefined);
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigateToPayment = (details: SessionDetails) => {
    setSessionDetails(details);
    setShowPaymentPage(true);
    setShowTherapistDetail(false);
    setShowTherapistRegistration(false);
    // Scroll to top when payment page opens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTherapistDetails = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setShowTherapistDetail(true);
    setShowTherapistRegistration(false);
    // Scroll to top when detail page opens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowTherapistRegistration = () => {
    setShowTherapistRegistration(true);
    setShowPaymentPage(false);
    setShowTherapistDetail(false);
    // Scroll to top when registration page opens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBooking = () => {
    setShowPaymentPage(false);
    setSessionDetails(undefined);
  };

  const handleBackToTherapists = () => {
    setShowTherapistDetail(false);
    setSelectedTherapist(undefined);
  };

  const handleBackFromTherapistRegistration = () => {
    setShowTherapistRegistration(false);
  };

  const handleCompletePayment = () => {
    setShowPaymentPage(false);
    // Payment completed - return to main page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData: User) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    // User logged in - stay on main page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setShowPaymentPage(false);
    setShowTherapistDetail(false);
    setShowTherapistRegistration(false);
    setSessionDetails(undefined);
    setSelectedTherapist(undefined);
  };

  if (showTherapistRegistration) {
    return (
      <TherapistRegistrationPage
        onBack={handleBackFromTherapistRegistration}
      />
    );
  }

  if (showPaymentPage) {
    return (
      <div className="min-h-screen bg-white">
        <PaymentPage 
          sessionDetails={sessionDetails} 
          onBack={handleBackToBooking}
          onCompletePayment={handleCompletePayment}
        />
      </div>
    );
  }

  if (showTherapistDetail) {
    return (
      <TherapistDetailPage
        therapist={selectedTherapist}
        onBack={handleBackToTherapists}
        onNavigateToPayment={handleNavigateToPayment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onLogin={handleLogin} currentUser={currentUser} onLogout={handleLogout} />
      <main>
        <HeroSection onNavigateToPayment={handleNavigateToPayment} />
        <FeaturesSection />
        <TherapySessionsCarousel onNavigateToPayment={handleNavigateToPayment} />
        <PromoBanner />
        <SpecialtyAreas />
        <HowItWorksSection />
        <TherapistShowcase 
          onNavigateToPayment={handleNavigateToPayment}
          onViewTherapistDetails={handleViewTherapistDetails}
        />
        <StatsCounter />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <CrisisResources />
      </main>
      <Footer onShowTherapistRegistration={handleShowTherapistRegistration} />
      {/* Fixed social media icons that appear on all pages 
      <SocialMediaIcons position="fixed" orientation="vertical" /> */}
    </div>
  );
}
