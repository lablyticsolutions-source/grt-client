import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImage from "figma:asset/7e093b597814e81e5f40b599b83e7a308d22d8d7.png";
import { LoginModal } from "./LoginModalUpdated";
import { SignUpModal } from "./SignUpModalUpdated";
import { NavigationDropdown } from "./NavigationDropdown";

interface User {
  id: string;
  email: string;
  name?: string;
  loginMethod: 'email' | 'social';
  socialProvider?: 'google' | 'facebook' | 'twitter' | 'apple';
  profileCompleted?: boolean;
}

interface HeaderProps {
  onLogin?: (userData: User) => void;
  currentUser?: User | null;
  onLogout?: () => void;
}

export function Header({ onLogin, currentUser, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const navigationData = {
    home: [
      { name: "Overview / Welcome", href: "#home", description: "Learn about our therapy platform" },
      { name: "Latest Blog Posts", href: "#blog", description: "Mental health insights and updates" }
    ],
    resources: [
      { name: "Articles & Guides", href: "#articles", description: "Expert mental health resources" },
      { name: "Self-Help Tools", href: "#tools", description: "Interactive wellness activities" },
      { name: "Mental Health Topics", href: "#topics", description: "Anxiety, Depression, Stress & more" },
      { name: "Crisis Hotlines", href: "#crisis-support", description: "Emergency support resources" },
      { name: "FAQs", href: "#faqs", description: "Common questions answered" }
    ],
    aboutUs: [
      { name: "Our Mission & Values", href: "#mission", description: "What drives our therapy approach" },
      { name: "Testimonials", href: "#testimonials", description: "Success stories from clients" },
      { name: "Careers", href: "#careers", description: "Join our mental health team" },
      { name: "Contact Information", href: "#contact", description: "Get in touch with us" }
    ]
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a 
                href="#home" 
                className="block transition-opacity hover:opacity-80"
                onClick={() => {
                  // Scroll to top of page
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <img 
                  src={logoImage} 
                  alt="Gentle Rise Therapy" 
                  className="h-10 w-auto cursor-pointer"
                />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-14">
            <NavigationDropdown
              title="Home"
              items={navigationData.home}
            />
            <NavigationDropdown
              title="Resources"
              items={navigationData.resources}
            />
            <NavigationDropdown
              title="About Us"
              items={navigationData.aboutUs}
            />
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">Welcome, {currentUser.name || currentUser.email}</span>
                <Button 
                  className="bg-black text-white border-black hover:bg-gray-800 font-bold"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg cursor-pointer font-bold"
                  onClick={() => {
                    window.location.href = "https://account.lablyticsolutions.com/client-login";
                  }}
                >
                  Login
                </Button>
                
                <Button
                  className="custom-button"
                  onClick={() => {
                    window.location.href = "https://account.lablyticsolutions.com/client-signup";
                  }}
                >
                  Sign Up
              </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3 border-t border-gray-100">
              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-semibold text-gray-900">Home</div>
                {navigationData.home.map((item, index) => (
                  <a
                    key={`mobile-home-${item.name}-${index}`}
                    href={item.href}
                    className="block px-6 py-2 text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-semibold text-gray-900">Resources</div>
                {navigationData.resources.map((item, index) => (
                  <a
                    key={`mobile-resources-${item.name}-${index}`}
                    href={item.href}
                    className="block px-6 py-2 text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-semibold text-gray-900">About Us</div>
                {navigationData.aboutUs.map((item, index) => (
                  <a
                    key={`mobile-about-${item.name}-${index}`}
                    href={item.href}
                    className="block px-6 py-2 text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                {currentUser ? (
                  <div className="px-3 space-y-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Welcome,</p>
                      <p className="font-medium text-gray-900">{currentUser.name || currentUser.email}</p>
                    </div>
                    <Button 
                      className="w-full bg-black text-white hover:bg-gray-800 font-bold"
                      onClick={() => {
                        onLogout?.();
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 px-3">
                    <Button 
                      variant="outline" 
                      className="w-full bg-black text-white border-black hover:bg-gray-800 font-bold"
                      onClick={() => {
                        setIsLoginModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      className="w-full bg-black text-white hover:bg-gray-800 font-bold"
                      onClick={() => {
                        setIsSignUpModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Login Modal */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToSignUp={() => {
            setIsLoginModalOpen(false);
            setIsSignUpModalOpen(true);
          }}
          onLogin={onLogin}
        />

        {/* Sign Up Modal */}
        <SignUpModal 
          isOpen={isSignUpModalOpen} 
          onClose={() => setIsSignUpModalOpen(false)}
          onSwitchToLogin={() => {
            setIsSignUpModalOpen(false);
            setIsLoginModalOpen(true);
          }}
          onLogin={onLogin}
        />
      </div>
    </header>
  );
}
