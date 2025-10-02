import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Heart, Brain, Users, Baby, Briefcase, Shield, Coffee, Moon, Apple, Rainbow, Sparkles } from "lucide-react";

interface AssessmentPageProps {
  onBack?: () => void;
}

interface QuestionData {
  id: string;
  question: string;
  type: 'radio' | 'select' | 'slider';
  options?: string[];
  section: string;
}

interface TherapyArea {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  keywords: string[];
}

export function AssessmentPagePaymentStyle({ onBack }: AssessmentPageProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<TherapyArea[]>([]);

  const therapyAreas: TherapyArea[] = [
    {
      id: 'anxiety',
      name: 'Anxiety & Depression',
      description: 'Learn to manage worry, panic, and stress with healthier coping tools.',
      icon: <Brain className="h-6 w-6" />,
      color: 'from-blue-500 to-purple-600',
      keywords: ['anxious', 'nervous', 'edge', 'sadness', 'sleep', 'tired', 'stressed', 'low']
    },
    {
      id: 'couples',
      name: 'Couples Therapy',
      description: 'Improve communication, rebuild trust, and strengthen your relationship.',
      icon: <Heart className="h-6 w-6" />,
      color: 'from-pink-500 to-red-600',
      keywords: ['relationship', 'partner', 'stress', 'married', 'separated', 'divorced']
    },
    {
      id: 'family',
      name: 'Family Therapy',
      description: 'Resolve conflicts, improve understanding, and build healthier family dynamics.',
      icon: <Users className="h-6 w-6" />,
      color: 'from-green-500 to-teal-600',
      keywords: ['family', 'conflicts', 'challenges', 'living', 'with family']
    },
    {
      id: 'child-teen',
      name: 'Child & Teen Counseling',
      description: 'Support for emotional, behavioral, and school-related challenges in young people.',
      icon: <Baby className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-600',
      keywords: ['student', 'young', 'teen', 'child']
    },
    {
      id: 'work-career',
      name: 'Work & Career Issues',
      description: 'Navigate stress, burnout, job transitions, or workplace challenges.',
      icon: <Briefcase className="h-6 w-6" />,
      color: 'from-indigo-500 to-blue-600',
      keywords: ['job', 'work', 'career', 'employed', 'unemployed', 'stress', 'burnout', 'workplace']
    },
    {
      id: 'trauma',
      name: 'Trauma & PTSD',
      description: 'Heal from past experiences and build resilience for the future.',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-600',
      keywords: ['traumatic', 'event', 'affects', 'ptsd', 'past']
    },
    {
      id: 'addiction',
      name: 'Addiction Recovery',
      description: 'Guidance and support to break free from substance or behavioral addictions.',
      icon: <Coffee className="h-6 w-6" />,
      color: 'from-orange-500 to-red-600',
      keywords: ['alcohol', 'substances', 'addictive', 'gaming', 'gambling', 'addiction']
    },
    {
      id: 'sleep',
      name: 'Insomnia & Sleep Issues',
      description: 'Develop strategies to improve sleep patterns and restore rest.',
      icon: <Moon className="h-6 w-6" />,
      color: 'from-indigo-500 to-purple-600',
      keywords: ['sleep', 'insomnia', 'falling asleep', 'staying asleep', 'tired']
    },
    {
      id: 'eating',
      name: 'Eating Disorders',
      description: 'Specialized support for body image, eating habits, and healthy recovery.',
      icon: <Apple className="h-6 w-6" />,
      color: 'from-pink-500 to-purple-600',
      keywords: ['eating', 'food', 'body image', 'habits']
    },
    {
      id: 'lgbtq',
      name: 'LGBTQ+ Affirmative Therapy',
      description: 'A safe, supportive space for exploring identity, relationships, and mental health.',
      icon: <Rainbow className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-600',
      keywords: ['lgbtq', 'identity', 'affirmative', 'support']
    },
    {
      id: 'stress',
      name: 'Stress Management',
      description: 'Learn techniques to reduce stress and build emotional balance.',
      icon: <Sparkles className="h-6 w-6" />,
      color: 'from-green-500 to-blue-600',
      keywords: ['stress', 'overwhelmed', 'balance', 'coping']
    },
    {
      id: 'self-esteem',
      name: 'Self-Esteem & Personal Growth',
      description: 'Build confidence, self-worth, and a stronger sense of self.',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'from-yellow-500 to-green-600',
      keywords: ['self-esteem', 'confidence', 'growth', 'worth', 'low']
    }
  ];

  const sections = [
    {
      title: "Personal Details",
      description: "Help us understand your background and preferences",
      questions: [
        {
          id: 'marital-status',
          question: 'Marital / Relationship Status:',
          type: 'radio',
          options: ['Single', 'Married', 'In a relationship', 'Separated / Divorced', 'Widowed'],
          section: 'personal'
        },
        {
          id: 'living-situation',
          question: 'Living Situation:',
          type: 'radio',
          options: ['With family', 'With partner', 'Alone'],
          section: 'personal'
        },
        {
          id: 'employment',
          question: 'Employment Status:',
          type: 'radio',
          options: ['Employed (full-time/part-time)', 'Self-employed', 'Student', 'Unemployed', 'Retired'],
          section: 'personal'
        },
        {
          id: 'therapist-gender',
          question: 'Preferred therapist gender (optional):',
          type: 'radio',
          options: ['Male', 'Female', 'No preference'],
          section: 'personal'
        }
      ]
    },
    {
      title: "Mood & Mental Health",
      description: "Tell us about your current emotional well-being",
      questions: [
        {
          id: 'anxiety-frequency',
          question: 'How often have you felt nervous, anxious, or on edge recently?',
          type: 'radio',
          options: ['Never', 'Sometimes', 'Often', 'Nearly every day'],
          section: 'mood'
        },
        {
          id: 'sadness-frequency',
          question: 'Have you been experiencing sadness or loss of interest in activities?',
          type: 'radio',
          options: ['Never', 'Sometimes', 'Often', 'Nearly every day'],
          section: 'mood'
        },
        {
          id: 'sleep-issues',
          question: 'Do you struggle with sleep (falling asleep, staying asleep, or waking up tired)?',
          type: 'radio',
          options: ['Yes', 'No', 'Sometimes'],
          section: 'mood'
        },
        {
          id: 'trauma-experience',
          question: 'Have you experienced a traumatic event that still affects you?',
          type: 'radio',
          options: ['Yes', 'No'],
          section: 'mood'
        }
      ]
    },
    {
      title: "Relationships & Social Life",
      description: "Share about your relationships and social connections",
      questions: [
        {
          id: 'relationship-stress',
          question: 'Are you currently experiencing stress in your relationship with your partner?',
          type: 'radio',
          options: ['Yes', 'No', 'Not applicable'],
          section: 'relationships'
        },
        {
          id: 'family-conflicts',
          question: 'Are there conflicts or challenges within your family?',
          type: 'radio',
          options: ['Yes', 'No'],
          section: 'relationships'
        },
        {
          id: 'social-disconnection',
          question: 'Do you often feel disconnected or unsupported socially?',
          type: 'radio',
          options: ['Yes', 'No'],
          section: 'relationships'
        }
      ]
    },
    {
      title: "Behavior & Lifestyle",
      description: "Help us understand your lifestyle and any challenges",
      questions: [
        {
          id: 'addiction-issues',
          question: 'Do you struggle with alcohol, substances, or addictive behaviors (gaming, internet, gambling, etc.)?',
          type: 'radio',
          options: ['Yes', 'No'],
          section: 'behavior'
        },
        {
          id: 'work-stress',
          question: 'Do you face stress related to your job, studies, or career uncertainty?',
          type: 'radio',
          options: ['Yes', 'No'],
          section: 'behavior'
        },
        {
          id: 'eating-issues',
          question: 'Do you have difficulties with eating habits, body image, or food-related stress?',
          type: 'radio',
          options: ['Yes', 'No'],
          section: 'behavior'
        }
      ]
    },
    {
      title: "Identity & Personal Growth",
      description: "Tell us about your personal development needs",
      questions: [
        {
          id: 'lgbtq-support',
          question: 'Do you identify as LGBTQ+ and would like affirmative therapy support?',
          type: 'radio',
          options: ['Yes', 'No'],
          section: 'identity'
        },
        {
          id: 'self-esteem',
          question: 'Do you often feel low self-esteem or struggle with confidence?',
          type: 'radio',
          options: ['Yes', 'No'],
          section: 'identity'
        }
      ]
    },
    {
      title: "Overall Check",
      description: "One final question about your current state",
      questions: [
        {
          id: 'wellbeing-scale',
          question: 'What is your current overall well-being on a scale of 1–10?',
          type: 'slider',
          section: 'overall'
        }
      ]
    }
  ];

  const currentQuestions = sections[currentSection]?.questions || [];
  const totalQuestions = sections.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (questionId: string, value: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateRecommendations = () => {
    const scores: Record<string, number> = {};
    
    // Initialize scores
    therapyAreas.forEach(area => {
      scores[area.id] = 0;
    });

    // Score based on answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const answerString = String(answer).toLowerCase();
      
      therapyAreas.forEach(area => {
        area.keywords.forEach(keyword => {
          if (answerString.includes(keyword.toLowerCase()) || 
              (questionId.includes(keyword.toLowerCase()) && (answer === 'Yes' || answer === 'Often' || answer === 'Nearly every day'))) {
            scores[area.id] += 1;
          }
        });
      });
    });

    // Special scoring logic
    if (answers['anxiety-frequency'] === 'Often' || answers['anxiety-frequency'] === 'Nearly every day') {
      scores.anxiety += 3;
    }
    if (answers['sadness-frequency'] === 'Often' || answers['sadness-frequency'] === 'Nearly every day') {
      scores.anxiety += 2;
    }
    if (answers['sleep-issues'] === 'Yes') {
      scores.sleep += 2;
      scores.anxiety += 1;
    }
    if (answers['trauma-experience'] === 'Yes') {
      scores.trauma += 3;
    }
    if (answers['relationship-stress'] === 'Yes') {
      scores.couples += 3;
    }
    if (answers['family-conflicts'] === 'Yes') {
      scores.family += 2;
    }
    if (answers['addiction-issues'] === 'Yes') {
      scores.addiction += 3;
    }
    if (answers['work-stress'] === 'Yes') {
      scores['work-career'] += 2;
    }
    if (answers['eating-issues'] === 'Yes') {
      scores.eating += 3;
    }
    if (answers['lgbtq-support'] === 'Yes') {
      scores.lgbtq += 3;
    }
    if (answers['self-esteem'] === 'Yes') {
      scores['self-esteem'] += 2;
    }
    if (answers['wellbeing-scale'] && (answers['wellbeing-scale'] as number) <= 4) {
      scores.anxiety += 2;
      scores['self-esteem'] += 1;
    }

    // Get top 3 recommendations
    const sortedAreas = therapyAreas
      .map(area => ({ ...area, score: scores[area.id] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setRecommendations(sortedAreas);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      calculateRecommendations();
      setShowResults(true);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const isCurrentSectionComplete = () => {
    return currentQuestions.every(q => answers[q.id] !== undefined);
  };

  const handleBookSession = () => {
    // This would trigger the booking modal or navigate to booking
    alert("This would open the booking modal for the selected therapy area.");
  };

  const handleBrowseTherapists = () => {
    // This would navigate to therapist listing
    alert("This would navigate to the therapist listing page.");
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-teal-50 to-rose-50 bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Back Button */}
            {onBack && (
              <div className="mb-6">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Home</span>
                </button>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Assessment Results</h1>
              <p className="text-gray-600">Based on your responses, here are our top therapy recommendations</p>
            </div>

            {/* Progress Summary */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">Assessment Complete</span>
                <Badge className="bg-green-500 text-white">✓ {totalQuestions}/{totalQuestions}</Badge>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-blue-700 mt-1">All sections completed successfully</p>
            </div>

            {/* Recommendations */}
            <div className="space-y-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Recommended Therapy Areas</h3>
              
              {recommendations.map((area, index) => (
                <div
                  key={area.id}
                  className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${area.color} rounded-full text-white flex-shrink-0`}>
                      {area.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          #{index + 1} {area.name}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          Score: {area.score}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{area.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBookSession}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleBookSession}
                className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium"
              >
                Book Your First Session
              </Button>
              
              <Button
                onClick={handleBrowseTherapists}
                variant="outline"
                className="w-full py-3 text-lg font-medium border-2"
              >
                Browse All Therapists
              </Button>
            </div>

            {/* Next Steps Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Your assessment results will help match you with the right therapist for your needs.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-rose-50 bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Back Button */}
          {onBack && (
            <div className="mb-6">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Home</span>
              </button>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Mental Health Assessment</h1>
            <p className="text-gray-600">Help us find the right therapy approach for you</p>
            
            {/* Progress Indicator */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">Assessment Progress</span>
                <Badge variant="secondary" className="text-xs">
                  {answeredQuestions}/{totalQuestions} Questions
                </Badge>
              </div>
              <Progress value={progress} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-blue-700">
                <span>Section {currentSection + 1} of {sections.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          </div>

          {/* Current Section Header */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {sections[currentSection]?.title}
            </h2>
            <p className="text-gray-600">{sections[currentSection]?.description}</p>
          </div>

          {/* Questions */}
          <div className="space-y-6 mb-8">
            {currentQuestions.map((question, index) => (
              <div key={question.id} className="space-y-3">
                <Label className="font-medium text-gray-900 block">
                  {index + 1}. {question.question}
                </Label>
                
                {question.type === 'radio' && (
                  <RadioGroup
                    value={String(answers[question.id] || '')}
                    onValueChange={(value) => handleAnswer(question.id, value)}
                    className="space-y-2"
                  >
                    {question.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                        <Label 
                          htmlFor={`${question.id}-${option}`} 
                          className="cursor-pointer text-gray-700 hover:text-gray-900"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                
                {question.type === 'select' && (
                  <Select
                    value={String(answers[question.id] || '')}
                    onValueChange={(value) => handleAnswer(question.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please select an option..." />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {question.type === 'slider' && (
                  <div className="space-y-4">
                    <Slider
                      value={[Number(answers[question.id]) || 5]}
                      onValueChange={(value) => handleAnswer(question.id, value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>1 (Very poor)</span>
                      <span className="font-semibold text-blue-600">
                        Current: {answers[question.id] || 5}
                      </span>
                      <span>10 (Excellent)</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevSection}
              disabled={currentSection === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="text-sm text-gray-500">
              {currentSection + 1} of {sections.length}
            </div>
            
            <Button
              onClick={nextSection}
              disabled={!isCurrentSectionComplete()}
              className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSection === sections.length - 1 ? 'Get Results' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Your responses are confidential and will help us recommend the most suitable therapy approach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}