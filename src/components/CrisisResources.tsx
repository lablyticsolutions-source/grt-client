import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Phone, MessageSquare, AlertTriangle, Clock } from "lucide-react";

export function CrisisResources() {
  const resources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support",
      icon: <Phone className="h-5 w-5" />
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 text-based support",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "For immediate emergencies",
      icon: <AlertTriangle className="h-5 w-5" />
    }
  ];

  return (
    <section id="crisis-support" className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Alert className="border-red-400 bg-red-50/10 backdrop-blur-sm mb-8">
          <AlertTriangle className="h-5 w-5 text-red-200" />
          <AlertDescription className="text-red-100">
            <strong>Crisis Support Available 24/7:</strong> If you're experiencing thoughts of self-harm or suicide, immediate help is available. You are not alone.
          </AlertDescription>
        </Alert>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl mb-4">
            Immediate Crisis Support
          </h2>
          <p className="text-red-100 max-w-2xl mx-auto text-lg">
            If you're in crisis or need immediate support, these resources are available 24/7. Don't wait – reach out now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-lg mb-2">{resource.name}</h3>
                <p className="text-2xl mb-2 text-red-100">{resource.number}</p>
                <p className="text-sm text-red-200 mb-4">{resource.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}