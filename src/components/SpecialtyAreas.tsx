import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Brain, Heart, Users, Baby, Briefcase, Shield, Sparkles, ArrowRight, Coffee, Moon, Apple, Rainbow } from "lucide-react";
import { useState } from "react";
import { AssessmentModal } from "./AssessmentModal"; // Add this import

export function SpecialtyAreas() {
  const [showMore, setShowMore] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false); // Add this state

  // Replace the openAssessment function
  const openAssessment = () => {
    setIsAssessmentOpen(true);
  };

  const specialties = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Anxiety & Depression",
      description: "Evidence-based treatments for anxiety disorders, depression, and mood-related challenges.",
      therapists: 45,
      color: "from-blue-500 to-purple-600",
      features: ["CBT", "Mindfulness", "EMDR"]
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Couples Therapy",
      description: "Relationship counseling to improve communication, resolve conflicts, and strengthen bonds.",
      therapists: 28,
      color: "from-pink-500 to-red-600",
      features: ["Gottman Method", "EFT", "Imago Therapy"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Family Therapy",
      description: "Family-focused interventions to improve dynamics and resolve intergenerational issues.",
      therapists: 32,
      color: "from-green-500 to-teal-600",
      features: ["Systemic Therapy", "Narrative Therapy", "Solution-Focused"]
    },
    {
      icon: <Baby className="h-8 w-8" />,
      title: "Child & Teen",
      description: "Specialized care for children and adolescents facing developmental and behavioral challenges.",
      therapists: 38,
      color: "from-yellow-500 to-orange-600",
      features: ["Play Therapy", "ABA", "Developmental Support"]
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Work & Career",
      description: "Professional guidance for workplace stress, career transitions, and work-life balance.",
      therapists: 22,
      color: "from-indigo-500 to-blue-600",
      features: ["Burnout Recovery", "Career Coaching", "Leadership"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trauma & PTSD",
      description: "Specialized trauma-informed care for processing difficult experiences and healing.",
      therapists: 26,
      color: "from-purple-500 to-pink-600",
      features: ["EMDR", "Somatic Therapy", "CPT"]
    }
  ];

  const additionalSpecialties = [
    {
      icon: <Coffee className="h-8 w-8" />,
      title: "Addiction Recovery",
      description: "Comprehensive support for substance abuse, behavioral addictions, and recovery journey.",
      therapists: 19,
      color: "from-orange-500 to-red-600",
      features: ["12-Step Support", "Motivational Interviewing", "Relapse Prevention"]
    },
    {
      icon: <Moon className="h-8 w-8" />,
      title: "Sleep & Insomnia",
      description: "Specialized treatment for sleep disorders, insomnia, and sleep hygiene improvement.",
      therapists: 15,
      color: "from-indigo-500 to-purple-600",
      features: ["CBT-I", "Sleep Hygiene", "Relaxation Techniques"]
    },
    {
      icon: <Apple className="h-8 w-8" />,
      title: "Eating Disorders",
      description: "Evidence-based treatment for anorexia, bulimia, binge eating, and body image issues.",
      therapists: 23,
      color: "from-pink-500 to-purple-600",
      features: ["DBT", "FBT", "Nutritional Counseling"]
    },
    {
      icon: <Rainbow className="h-8 w-8" />,
      title: "LGBTQ+ Support",
      description: "Affirming therapy for LGBTQ+ individuals, couples, and families navigating identity and community.",
      therapists: 21,
      color: "from-purple-500 to-pink-600",
      features: ["Affirming Care", "Identity Exploration", "Family Support"]
    }
  ];

  const displayedSpecialties = showMore 
    ? [...specialties, ...additionalSpecialties] 
    : specialties;

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full mb-6">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
              Our Therapy Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the right therapeutic approach for your unique needs. Our therapists are trained in cutting-edge methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedSpecialties.map((specialty, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden relative"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${specialty.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <CardHeader className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${specialty.color} rounded-full mb-4 text-white transform group-hover:scale-110 transition-transform duration-300`}>
                    {specialty.icon}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {specialty.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {specialty.therapists} Therapists
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="relative">
                  <CardDescription className="mb-4 leading-relaxed">
                    {specialty.description}
                  </CardDescription>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm text-gray-900 mb-2">Treatment Approaches:</h4>
                      <div className="flex flex-wrap gap-1">
                        {specialty.features.map((feature, featureIndex) => (
                          <Badge 
                            key={featureIndex} 
                            variant="outline" 
                            className="text-xs group-hover:border-primary group-hover:text-primary transition-colors duration-300"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-all duration-300 mt-4 font-bold"
                    >
                      Find Therapists
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Show More Button */}
          <div className="text-center mt-12">
            <Button 
              onClick={() => setShowMore(!showMore)}
              variant="outline"
              size="lg"
              className="font-bold"
            >
              {showMore ? "Show Less Areas" : "Show More Areas"}
              <ArrowRight className={`h-4 w-4 ml-2 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`} />
            </Button>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-pink-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl mb-4">Not Sure Which Therapy Area You Need?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Take our quick assessment to get matched with the right therapeutic 
                approach and the right therapist.
              </p>
              <Button size="lg" variant="secondary" className="font-bold" onClick={openAssessment}>
                Take an Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Add the Assessment Modal */}
      <AssessmentModal 
        isOpen={isAssessmentOpen} 
        onClose={() => setIsAssessmentOpen(false)} 
      />
    </>
  );
}