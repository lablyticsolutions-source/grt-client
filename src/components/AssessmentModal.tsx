import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { CustomRadioGroup } from "./CustomRadioGroup";
import { Heart, Brain, Users, Baby, Briefcase, Shield, Coffee, Moon, Apple, Rainbow, Sparkles, CheckCircle, ArrowRight, ArrowLeft, ArrowDown, X } from "lucide-react";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TherapyArea {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  keywords: string[];
}

export function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
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
          id: 'religious-background',
          question: 'Religious / Spiritual Background:',
          type: 'select',
          options: ['Christian', 'Muslim', 'Hindu', 'Sikh', 'Jain', 'Buddhist', 'Spiritual but not religious', 'Other', 'Prefer not to say'],
          section: 'personal'
        },
        {
          id: 'therapist-religious',
          question: 'Do you prefer a therapist who understands or shares your religious/spiritual background?',
          type: 'radio',
          options: ['Yes', 'No', 'Neutral'],
          section: 'personal'
        },
        {
          id: 'therapist-gender',
          question: 'Preferred therapist gender (optional):',
          type: 'radio',
          options: ['Male', 'Female', 'No preference'],
          section: 'personal'
        },
        {
          id: 'language',
          question: 'Preferred language for sessions:',
          type: 'select',
          options: ['English', 'Spanish', 'French', 'German', 'Italian', 'Other'],
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
          id: 'job-changes',
          question: 'Have you recently experienced job loss or major work changes?',
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

  const handleClose = () => {
    setCurrentSection(0);
    setAnswers({});
    setShowResults(false);
    setRecommendations([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-gradient-to-r from-purple-100 to-rose-100 bg-opacity-100 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[95vh] custom-scrollbar overflow-y-auto relative">
        {/* Global Close Button - Always visible */}
        <Button 
          variant="ghost" 
          onClick={handleClose} 
          className="absolute top-4 right-4 h-8 w-8 p-0 z-20 bg-white/90 hover:bg-white rounded-full shadow-sm border border-gray-200"
        >
          <X className="h-4 w-4 text-gray-600" />
        </Button>

        {/* Landing Section */}
        <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-t-lg overflow-hidden">
          {/* Close Button - Positioned absolutely */}
          <Button 
            variant="ghost" 
            onClick={handleClose} 
            className="absolute top-4 right-4 h-8 w-8 p-0 z-10 bg-white/80 hover:bg-white rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Two Column Layout */}
          
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm">Start Assessment</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Assessment Content - Behind Landing Section */}
        <div className="bg-white">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold">Mental Health Assessment</h2>
              <p className="text-gray-600 mt-1">Get personalized therapy recommendations</p>
            </div>
          </div>

          <div className="p-6">
            {showResults ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Your Assessment Results</h3>
                  <p className="text-gray-600">Based on your responses, here are our recommendations:</p>
                </div>

                <div className="space-y-4">
                  {recommendations.map((area, index) => (
                    <Card key={area.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-4">
                          <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${area.color} rounded-full text-white`}>
                            {area.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              #{index + 1} Recommended: {area.name}
                            </CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              Match Score: {area.score}/10
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="mb-3">
                          {area.description}
                        </CardDescription>
                        <Button 
                          className="w-full justify-between"
                          onClick={() => {
                            window.location.href = "https://account.lablyticsolutions.com/client-login";
                          }}
                        >
                          Find {area.name} Therapists
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                    <h3 className="text-xl mb-3">Ready to Get Started?</h3>
                    <p className="text-blue-100 mb-4 max-w-2xl mx-auto">
                      Connect with qualified therapists who specialize in your recommended areas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        variant="secondary" 
                        className="font-medium"
                        onClick={() => {
                          window.location.href = "https://account.lablyticsolutions.com/client-login";
                        }}
                      >
                        Book a Session
                      </Button>
                      <Button 
                        variant="outline" 
                        className="font-medium text-black border-white hover:bg-white hover:text-blue-600"
                        onClick={() => {
                          window.location.href = "https://account.lablyticsolutions.com/client-login";
                        }}
                      >
                        Browse Therapists
                      </Button>
                    </div>

                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Progress */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">Assessment Progress</h3>
                    <Badge variant="secondary" className="text-sm">
                      {answeredQuestions}/{totalQuestions} Questions
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2 mb-2" />
                  <p className="text-sm text-gray-600">
                    Section {currentSection + 1} of {sections.length}: {sections[currentSection]?.title}
                  </p>
                </div>

                {/* Current Section */}
                <Card>
                  <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl">{sections[currentSection]?.title}</CardTitle>
                    <CardDescription className="text-blue-100">
                      {sections[currentSection]?.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-6">
                    {currentQuestions.map((question, index) => (
                      <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                        <Label className="text-base font-medium text-gray-900 mb-3 block">
                          {index + 1}. {question.question}
                        </Label>
                        
                        {question.type === 'radio' && (
                          <CustomRadioGroup
                            name={question.id}
                            options={question.options?.map((option, idx) => ({
                              id: `${question.id}-${idx}`,
                              label: option,
                              value: option
                            })) || []}
                            selectedValue={String(answers[question.id] || '')}
                            onChange={(value) => handleAnswer(question.id, value)}
                          />
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
                          <div className="space-y-3">
                            <Slider
                              value={[Number(answers[question.id]) || 1]}
                              onValueChange={(value) => handleAnswer(question.id, value[0])}
                              max={10}
                              min={1}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>1 (Very poor)</span>
                              <span className="font-medium text-blue-600">
                                Current: {answers[question.id] || 1}
                              </span>
                              <span>10 (Excellent)</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                  
                  <div className="flex justify-between items-center p-6 bg-gray-50 rounded-b-lg">
                    <Button
                      variant="outline"
                      onClick={prevSection}
                      disabled={currentSection === 0}
                      className="flex items-center space-x-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </Button>
                    
                    <div className="text-sm text-gray-600">
                      Section {currentSection + 1} of {sections.length}
                    </div>
                    
                    <Button
                      onClick={nextSection}
                      disabled={!isCurrentSectionComplete()}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600"
                    >
                      <span>{currentSection === sections.length - 1 ? 'Get Results' : 'Next'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
