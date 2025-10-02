import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Mail, Phone, Clock } from "lucide-react";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { BookingModal } from "./BookingModal";
import Lottie from "lottie-react";

export function ContactSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  // Embedded Lottie animation data for yoga/meditation theme
  const yogaAnimationData = {
    "v": "5.5.2",
    "fr": 30,
    "ip": 0,
    "op": 180,
    "w": 400,
    "h": 400,
    "nm": "Yoga Meditation",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Outer Circle",
        "sr": 1,
        "ks": {
          "o": {"a": 1, "k": [
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [30]},
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 90, "s": [80]},
            {"t": 180, "s": [30]}
          ]},
          "r": {"a": 1, "k": [
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
            {"t": 180, "s": [360]}
          ]},
          "p": {"a": 0, "k": [200, 200, 0]},
          "a": {"a": 0, "k": [0, 0, 0]},
          "s": {"a": 1, "k": [
            {"i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]}, "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}, "t": 0, "s": [80, 80, 100]},
            {"i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]}, "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}, "t": 90, "s": [120, 120, 100]},
            {"t": 180, "s": [80, 80, 100]}
          ]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": {"a": 0, "k": [150, 150]},
                "p": {"a": 0, "k": [0, 0]},
                "nm": "Ellipse"
              },
              {
                "ty": "st",
                "c": {"a": 0, "k": [0.4, 0.2, 0.7, 1]},
                "o": {"a": 0, "k": 100},
                "w": {"a": 0, "k": 2},
                "lc": 1,
                "lj": 1,
                "ml": 4,
                "nm": "Stroke"
              }
            ],
            "nm": "Outer Ring",
            "np": 3,
            "cix": 2,
            "bm": 0,
            "ix": 1,
            "mn": "ADBE Vector Group",
            "hd": false
          }
        ],
        "ip": 0,
        "op": 180,
        "st": 0,
        "bm": 0
      },
      {
        "ddd": 0,
        "ind": 2,
        "ty": 4,
        "nm": "Inner Circle",
        "sr": 1,
        "ks": {
          "o": {"a": 1, "k": [
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [70]},
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 90, "s": [90]},
            {"t": 180, "s": [70]}
          ]},
          "r": {"a": 1, "k": [
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
            {"t": 180, "s": [-360]}
          ]},
          "p": {"a": 0, "k": [200, 200, 0]},
          "a": {"a": 0, "k": [0, 0, 0]},
          "s": {"a": 1, "k": [
            {"i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]}, "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}, "t": 0, "s": [100, 100, 100]},
            {"i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]}, "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}, "t": 90, "s": [110, 110, 100]},
            {"t": 180, "s": [100, 100, 100]}
          ]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": {"a": 0, "k": [80, 80]},
                "p": {"a": 0, "k": [0, 0]},
                "nm": "Ellipse"
              },
              {
                "ty": "fl",
                "c": {"a": 0, "k": [0.6, 0.4, 0.8, 0.4]},
                "o": {"a": 0, "k": 100},
                "r": 1,
                "bm": 0,
                "nm": "Fill"
              }
            ],
            "nm": "Inner Circle",
            "np": 3,
            "cix": 2,
            "bm": 0,
            "ix": 1,
            "mn": "ADBE Vector Group",
            "hd": false
          }
        ],
        "ip": 0,
        "op": 180,
        "st": 0,
        "bm": 0
      },
      {
        "ddd": 0,
        "ind": 3,
        "ty": 4,
        "nm": "Center Dot",
        "sr": 1,
        "ks": {
          "o": {"a": 1, "k": [
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [100]},
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 90, "s": [60]},
            {"t": 180, "s": [100]}
          ]},
          "r": {"a": 0, "k": 0},
          "p": {"a": 0, "k": [200, 200, 0]},
          "a": {"a": 0, "k": [0, 0, 0]},
          "s": {"a": 1, "k": [
            {"i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]}, "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}, "t": 0, "s": [100, 100, 100]},
            {"i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]}, "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}, "t": 90, "s": [120, 120, 100]},
            {"t": 180, "s": [100, 100, 100]}
          ]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": {"a": 0, "k": [20, 20]},
                "p": {"a": 0, "k": [0, 0]},
                "nm": "Ellipse"
              },
              {
                "ty": "fl",
                "c": {"a": 0, "k": [0.5, 0.3, 0.8, 1]},
                "o": {"a": 0, "k": 100},
                "r": 1,
                "bm": 0,
                "nm": "Fill"
              }
            ],
            "nm": "Center",
            "np": 3,
            "cix": 2,
            "bm": 0,
            "ix": 1,
            "mn": "ADBE Vector Group",
            "hd": false
          }
        ],
        "ip": 0,
        "op": 180,
        "st": 0,
        "bm": 0
      }
    ]
  };

  // Load the embedded animation, with a fallback to try a working public URL
  useEffect(() => {
    // Try to load a working public meditation animation first
    fetch("https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json")
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
        setAnimationLoaded(true);
      })
      .catch(error => {
        console.log("Failed to load external animation, using embedded fallback");
        // Use our embedded animation as fallback
        setAnimationData(yogaAnimationData);
        setAnimationLoaded(true);
      });
  }, []);

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="relative rounded-2xl bg-primary p-8 sm:p-16 overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl text-white mb-4">
                Ready to Begin Your Mental Health Journey?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Take the first step towards better mental health. Connect with experienced, licensed therapists who understand your unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book a Session
                </Button>
                <Button size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  Chat with Us
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-90"></div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl text-gray-900 mb-6">Get Started Today</h3>
            <p className="text-gray-600 mb-8">
              Have questions about our therapy services or need help finding the right therapist? Our support team is here to guide you every step of the way.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="text-gray-900">Email Support</p>
                  <p className="text-gray-600">support@gentlerisetherapy.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="text-gray-900">Phone Support</p>
                  <p className="text-gray-600">Toll Free: 1800-XXX-XXXX | 7X5 3XX XXX1</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="text-gray-900">Hours</p>
                  <p className="text-gray-600">Monday - Friday: 8am - 8pm EST<br />Weekend: 10am - 6pm EST</p>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="mt-8">
              <h4 className="text-lg text-gray-900 mb-4">Connect With Us</h4>
              <p className="text-gray-600 mb-4">
                Follow us on social media for mental health tips, community support, and updates.
              </p>
              <SocialMediaIcons 
                position="relative" 
                orientation="horizontal" 
                className="justify-start"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="w-full h-[500px] bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
                {animationLoaded && animationData ? (
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : animationLoaded ? (
                  // Fallback CSS animation if Lottie fails to load
                  <div className="flex flex-col items-center justify-center text-purple-600 space-y-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center animate-pulse">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Find Your Balance</p>
                  </div>
                ) : (
                  // Loading state
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Path to Wellness</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Your journey to better mental health starts with reaching out. We're here to support you every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}