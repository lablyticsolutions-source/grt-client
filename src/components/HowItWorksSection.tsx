import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Search, UserCheck, Calendar, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "1. Find Your Therapist",
      description: "Browse our network of licensed therapists, filter by specialty, approach, and availability."
    },
    {
      icon: <UserCheck className="h-8 w-8 text-white" />,
      title: "2. Book a Consultation",
      description: "Schedule a brief consultation call to discuss your goals and ensure you're comfortable with your chosen therapist."
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "3. Schedule Sessions",
      description: "Book recurring therapy sessions at times that work for you, with flexible rescheduling options."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      title: "4. Start Your Journey",
      description: "Begin your personalized therapy sessions and track your progress with our integrated tools and resources."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl text-gray-900 mb-8">
              How Gentle Rise Therapy Works
            </h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                      {step.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="relative">
              <ImageWithFallback
                src="https://www.directsellingnews.com/wp-content/uploads/2025/02/shutterstock_2250909383_ADJ.jpg"
                alt="Professional therapy consultation session"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}