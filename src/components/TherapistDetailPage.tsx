import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, MapPin, Languages, Video, Phone, MessageCircle, Star, Calendar, Clock, Award, BookOpen, Heart, User, CheckCircle } from "lucide-react";
import exampleImage from 'figma:asset/c5e929b2c28c9b2c582340948b66fffeea83ffeb.png';

interface TherapistDetailPageProps {
  therapist?: {
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
  };
  onBack: () => void;
  onNavigateToPayment: (details: any) => void;
}

export function TherapistDetailPage({ therapist, onBack, onNavigateToPayment }: TherapistDetailPageProps) {
  // Default therapist data based on the example image
  const defaultTherapist = {
    id: "arya-narendran",
    name: "Arya Narendran",
    title: "MSc Counselling Psychology",
    specialties: ["Motivation", "Procrastination", "Self Esteem", "Confidence", "Stress", "Anxiety", "Depression", "Relationships", "Workplace", "Academic Pressure"],
    rating: 4.8,
    experience: "8+ years",
    languages: ["English"],
    location: "Online Sessions Available",
    price: "$120/session",
    image: exampleImage,
    description: "Most big transformations come about from the hundreds of tiny, almost imperceptible, steps we take along the way.",
    approach: ["Person Centered", "Narrative", "SFBT", "CBT"],
    credentials: ["MSc Counselling Psychology", "Licensed Professional Counselor", "Certified CBT Therapist"],
    availability: "Available for sessions Monday-Friday, 9 AM - 6 PM"
  };

  const currentTherapist = therapist || defaultTherapist;

  const handleBookSession = () => {
    onNavigateToPayment({
      therapistName: currentTherapist.name,
      sessionType: "Individual Therapy Session",
      date: "Available",
      time: "Flexible",
      amount: currentTherapist.price
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Therapists</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Therapist Profile */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Header Card */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-30"></div>
              <CardContent className="relative pt-0 pb-6">
                {/* Profile Image */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16 relative z-10">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                      <img 
                        src={currentTherapist.image} 
                        alt={currentTherapist.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling!.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold" style={{display: 'none'}}>
                        {currentTherapist.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">{currentTherapist.name}</h1>
                    <p className="text-lg text-gray-600">{currentTherapist.title}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{currentTherapist.rating}</span>
                        <span>({Math.floor(Math.random() * 200) + 50} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>{currentTherapist.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{currentTherapist.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quote/Description */}
            {currentTherapist.description && (
              <Card>
                <CardContent className="p-6">
                  <blockquote className="text-lg italic text-gray-700 text-center">
                    "{currentTherapist.description}"
                  </blockquote>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    - {currentTherapist.name}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Expertise Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Expertise</span>
                </CardTitle>
                <CardDescription>
                  Areas of specialization and therapeutic focus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentTherapist.specialties.map((specialty, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Approach Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  <span>Approach</span>
                </CardTitle>
                <CardDescription>
                  Therapeutic methods and techniques used
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentTherapist.approach?.map((method, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      {method}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Credentials Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <span>Credentials & Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentTherapist.credentials?.map((credential, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{credential}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Session Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Book a Session</CardTitle>
                  <CardDescription>
                    Start your therapeutic journey today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Languages */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                      <Languages className="h-4 w-4 text-blue-500" />
                      <span>Languages</span>
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {currentTherapist.languages.map((language, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Session Modes */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Counseling Mode</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 p-2 border rounded-lg bg-blue-50 border-blue-200">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">Individual</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 border rounded-lg">
                        <Video className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Video</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 border rounded-lg">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Call</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 border rounded-lg">
                        <MessageCircle className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Chat</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>Availability</span>
                    </h4>
                    <p className="text-sm text-gray-600">{currentTherapist.availability}</p>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Session Fee</span>
                      <span className="text-xl font-bold text-gray-900">{currentTherapist.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">60-minute individual session</p>
                  </div>

                  {/* Book Button */}
                  <Button 
                    onClick={handleBookSession}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3"
                  >
                    Select Therapist
                  </Button>

                  {/* Additional Info */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Free 15-minute consultation call available
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h4 className="font-medium text-gray-900">Need Help?</h4>
                    <p className="text-sm text-gray-600">
                      Our support team is here to help you find the right therapist
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}