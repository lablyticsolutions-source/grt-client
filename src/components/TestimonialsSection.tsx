import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Jessica Chen",
      role: "Working Professional",
      content: "Gentle Rise Therapy gave me a safe space to open up. The support I received truly changed my life.",
      rating: 5,
      image: "J"
    },
    {
      name: "Michael Rodriguez",
      role: "Father of Two",
      content: "I never imagined counselling could be so convenient and comforting.",
      rating: 5,
      image: "M"
    },
    {
      name: "Sarah Williams",
      role: "College Student",
      content: "xxxxxxxxxxxxxxxxxxx",
      rating: 4,
      image: "S"
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl text-gray-900">
            Real Stories of Healing and Growth
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            See how Gentle Rise Therapy has helped people find the right therapeutic support and transform their mental health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white">{testimonial.image}</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}