import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Users, Star, Calendar, Heart, Award, Clock } from "lucide-react";

export function StatsCounter() {
  const [counts, setCounts] = useState({
    therapists: 0,
    sessions: 0,
    satisfaction: 0,
    years: 0
  });

  const targetCounts = {
    therapists: 500,
    sessions: 25000,
    satisfaction: 98,
    years: 10
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    const counters = Object.keys(targetCounts).map(key => {
      const target = targetCounts[key as keyof typeof targetCounts];
      const increment = target / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counters[Object.keys(targetCounts).indexOf(key)]);
        }
        setCounts(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepTime);
    });

    return () => {
      counters.forEach(counter => clearInterval(counter));
    };
  }, []);

  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: counts.therapists,
      label: "Licensed Therapists",
      suffix: "+",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      value: counts.sessions,
      label: "Therapy Sessions Completed",
      suffix: "+",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: <Star className="h-8 w-8" />,
      value: counts.satisfaction,
      label: "Client Satisfaction Rate",
      suffix: "%",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: counts.years,
      label: "Years of Excellence",
      suffix: "+",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-full mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our commitment to excellence in mental health care is reflected in these meaningful numbers that represent real lives touched and transformed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full mb-6 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value.toLocaleString()}
                  </span>
                  <span className="text-2xl text-gray-300">{stat.suffix}</span>
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-white mr-2" />
              <span className="text-lg text-gray-300">Available 24/7</span>
            </div>
            <h3 className="text-2xl mb-4">Ready to Begin Your Journey?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of others who have found healing, growth, and renewed hope through our compassionate therapy services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}