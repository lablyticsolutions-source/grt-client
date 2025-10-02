import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { HelpCircle, MessageCircle, Phone } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { useState } from "react";

export function FAQSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const faqs = [
    {
      question: "What is Gentle Rise Therapy, and how does it work?",
      answer: "Gentle Rise Therapy connects you with licensed therapists online for confidential, supportive sessions."
    },
    {
      question: "Can I start therapy from anywhere?",
      answer: "Yes, you can access sessions from anywhere with an internet connection."
    },
    {
      question: "How do I know if Gentle Rise is right for me?",
      answer: "If you’re seeking emotional support, stress relief, or long-term growth, Gentle Rise may be a good fit."
    },
    {
      question: "Is my information safe and confidential?",
      answer: "Absolutely—your privacy is protected with secure and confidential platforms."
    },
    {
      question: "How quickly can I book a session?",
      answer: "You can usually schedule your first session within a short time after signing up."
    },
    {
      question: "What issues can I discuss in therapy?",
      answer: "You can talk about stress, anxiety, relationships, self-growth, and more."
    },
    {
      question: "Do I need special equipment for online therapy?",
      answer: "No, just a phone, tablet, or computer with internet access is enough."
    },
    {
      question: "Can I choose my therapist?",
      answer: "Yes, you can select your therapist, or we can recommend one for you."
    },
    {
      question: "What mediums are available for sessions?",
      answer: "You can connect through video, audio, or chat-based sessions."
    },
    {
      question: "How do I pick the right counsellor?",
      answer: "Browse therapist profiles and choose based on expertise and comfort."
    }
  ];

  return (
    <section id="faqs" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about online therapy, our platform, and what to expect from your mental health journey.
          </p>
        </div>

        <Card className="mb-8 border-0 shadow-lg relative overflow-hidden">
          {/* TBU Watermark Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
            <div 
              className="select-none whitespace-nowrap"
              style={{
                fontSize: '8rem',
                fontWeight: '900',
                transform: 'rotate(-45deg)',
                letterSpacing: '0.2em',
                color: 'rgba(239, 68, 68, 0.15)',
                textShadow: '0 0 30px rgba(239, 68, 68, 0.1)'
              }}
            >
              TBU
            </div>
          </div>
          
          <CardContent className="p-0 relative" style={{ zIndex: 1 }}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <AccordionTrigger className="text-left p-6 hover:bg-gray-50 transition-colors duration-200 hover:no-underline">
                    <span className="text-gray-900 pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
  );
}