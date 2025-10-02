import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, MapPin, Calendar, Video } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookingModal } from "./BookingModal";
import { useState } from "react";

interface TherapistShowcaseProps {
  onNavigateToPayment?: (details: {
    therapistName?: string;
    sessionType?: string;
    date?: string;
    time?: string;
    amount?: string;
  }) => void;
  onViewTherapistDetails?: (therapist: {
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
  }) => void;
}

export function TherapistShowcase({ onNavigateToPayment, onViewTherapistDetails }: TherapistShowcaseProps = {}) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const therapists = [
    {
      id: "1",
      name: "Dr. Sarah Chen ",
      title: "Therapist",
      specialties: ["Anxiety", "Depression", "CBT"],
      rating: 4.9,
      reviews: 127,
      location: "California",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRvY3RvcnxlbnwxfHx8fDE3NTU1MTY2NTd8MA&ixlib=rb-4.1.0&q=80&w=400",
      bio: "Specializing in anxiety and depression with a focus on cognitive behavioral therapy techniques.",
      experience: "12 years",
      languages: ["English"],
      price: "$50 per session",
      description: "Dr. Sarah Chen is a licensed therapist with extensive experience in treating anxiety and depression. She uses evidence-based techniques, including cognitive behavioral therapy (CBT), to help her clients manage their symptoms and improve their overall well-being.",
      approach: ["CBT", "Mindfulness", "Behavioral Therapy"],
      credentials: ["PhD in Psychology", "Licensed Therapist"],
      availability: "Available for appointments on weekdays."
    }, 
    {
      id: "2",
      name: "Dr. Michael Rodriguez",
      title: "Therapist",
      specialties: ["Couples Therapy", "Family", "Trauma"],
      rating: 4.8,
      reviews: 89,
      location: "Texas",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBkb2N0b3J8ZW58MXx8fHwxNzU1NTEyNjk4fDA&ixlib=rb-4.1.0&q=80&w=400",
      bio: "Helping couples and families navigate challenges through evidence-based therapeutic approaches.",
      experience: "8 years",
      languages: ["English", "Spanish"],
      price: "$60 per session",
      description: "Dr. Michael Rodriguez is a licensed therapist with expertise in couples therapy, family therapy, and trauma treatment. He uses evidence-based approaches to help his clients resolve conflicts and improve their relationships.",
      approach: ["Couples Therapy", "Family Therapy", "Trauma-Informed Care"],
      credentials: ["PhD in Psychology", "Licensed Therapist"],
      availability: "Available for appointments on weekdays."
    },
    {
      id: "3",
      name: "Dr. Emily Watson",
      title: "Therapist",
      specialties: ["Teen Counseling", "ADHD", "Life Coaching"],
      rating: 5.0,
      reviews: 156,
      location: "New York",
      image: "https://images.unsplash.com/photo-1594824804732-ca8db0a7a8f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTU1MTY3Mjh8MA&ixlib=rb-4.1.0&q=80&w=400",
      bio: "Supporting teenagers and young adults through life transitions and personal growth challenges.",
      experience: "15 years",
      languages: ["English"],
      price: "$70 per session",
      description: "Dr. Emily Watson is a licensed therapist with a focus on teen counseling, ADHD, and life coaching. She helps her clients navigate life transitions and personal growth challenges.",
      approach: ["Teen Counseling", "ADHD Management", "Life Coaching"],
      credentials: ["PhD in Psychology", "Licensed Therapist"],
      availability: "Available for appointments on weekdays."
    }
  ];

  return (
    <div>
      {/* Therapist section removed */}
    </div>
  );
}