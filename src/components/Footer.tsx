import { Heart } from "lucide-react";
import logoImage from "figma:asset/7e093b597814e81e5f40b599b83e7a308d22d8d7.png";
import { SocialMediaIcons } from "./SocialMediaIcons";

interface FooterProps {
  onShowTherapistRegistration?: () => void;
}

export function Footer({ onShowTherapistRegistration }: FooterProps) {
  const footerLinks = {
    services: [
      { name: "Individual Therapy", href: "#" },
      { name: "Couples Therapy", href: "#" },
      { name: "Family Therapy", href: "#" },
      { name: "Teen Counseling", href: "#" }
    ],
    support: [
      { name: "How It Works", href: "#how-it-works" },
      { name: "Crisis Resources", href: "#" },
      { name: "Insurance & Pricing", href: "#" }
    ],
    providers: [
      { name: "Join as Therapist", href: "#" },
      { name: "Provider Resources", href: "#" },
      { name: "Training & Support", href: "#" },
      { name: "Platform Guide", href: "#" }
    ],
    legal: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "HIPAA Compliance", href: "#" },
      { name: "Accessibility", href: "#" }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={logoImage} 
                alt="Gentle Rise Therapy" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white-300 text-xl mb-6 max-w-md">
              Gentle Rise Therapy.
            </p>
            <p className="text-white-300 mb-6 max-w-md">
              Professional online therapy services connecting you with licensed therapists for your mental health journey. Secure, confidential, and convenient.
            </p>
            {/* Updated social media icons */}
            <SocialMediaIcons 
              position="relative" 
              orientation="horizontal" 
              className="justify-start"
            />
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg text-white  mb-4">Therapy Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Provider Links */}
          <div>
            <h4 className="text-lg text-white mb-4">For Providers</h4>
            <ul className="space-y-3">
              {footerLinks.providers.map((link, index) => (
                <li key={index}>
                  {link.name === "Join as Therapist" ? (
                    <button 
                      onClick={onShowTherapistRegistration}
                      className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 Gentle Rise Therapy. All rights reserved. Licensed mental health services.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-300 text-sm mr-2">Healing with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-gray-300 text-sm ml-2">and professional care</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}