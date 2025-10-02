import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Shield, Video, Clock, Star, FileText, Headphones } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Licensed Professionals",
      description: "All therapists are licensed, vetted professionals with extensive experience in their specialties."
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "Secure Video Sessions",
      description: "HIPAA-compliant video platform ensuring your privacy and confidentiality during sessions."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule, including evenings and weekends."
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Personalized Matching",
      description: "Our algorithm matches you with therapists based on your specific needs and preferences."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Progress Tracking",
      description: "Track your mental health journey with built-in tools and session notes."
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: "24/7 Support",
      description: "Access crisis support and resources whenever you need them, day or night."
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl text-gray-900">
            Why Choose Gentle Rise Therapy?
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We've built a platform that prioritizes your mental health journey with professional care, convenience, and confidentiality.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  {feature.icon}
                </div>
                <CardTitle className="mt-6">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}