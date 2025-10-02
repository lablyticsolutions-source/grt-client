import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Check, X, Phone, Video } from "lucide-react";
import { Button } from "./ui/button";

interface OnlineTherapyComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnlineTherapyComparisonModal({ isOpen, onClose }: OnlineTherapyComparisonModalProps) {
  const comparisonData = [
    {
      feature: "Provided by a credentialed therapist",
      online: true,
      inOffice: true,
      icon: null
    },
    {
      feature: "In-office visits",
      online: false,
      inOffice: true,
      icon: null
    },
    {
      feature: "Messaging any time",
      online: true,
      inOffice: false,
      icon: null
    },
    {
      feature: "Chat sessions",
      online: true,
      inOffice: false,
      icon: null
    },
    {
      feature: "Phone sessions",
      online: true,
      inOffice: false,
      icon: "phone"
    },
    {
      feature: "Video sessions",
      online: true,
      inOffice: false,
      icon: "video"
    },
    {
      feature: "Easy scheduling",
      online: true,
      inOffice: false,
      icon: null
    },
    {
      feature: "Worksheets (Growth Paths)",
      online: true,
      inOffice: false,
      icon: null
    },
    {
      feature: "Group sessions",
      online: true,
      inOffice: false,
      icon: null
    },
    {
      feature: "Smart provider matching",
      online: true,
      inOffice: false,
      icon: null
    },
    {
      feature: "Easy to switch providers",
      online: true,
      inOffice: false,
      icon: null
    }
  ];

  const renderCheckIcon = (hasFeature: boolean, icon?: string | null) => {
    if (!hasFeature) {
      return <X className="h-5 w-5 text-red-500" />;
    }

    if (icon === "phone") {
      return (
        <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
          <Phone className="h-3 w-3 text-green-600" />
        </div>
      );
    }

    if (icon === "video") {
      return (
        <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
          <Video className="h-3 w-3 text-green-600" />
        </div>
      );
    }

    return <Check className="h-5 w-5 text-green-500" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Why Choose Online Therapy over In-office Therapy?
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Compare the benefits and features of online therapy vs traditional in-office therapy
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Comparison Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b">
              <div className="p-4">
                <h3 className="font-semibold text-gray-700">Features</h3>
              </div>
              <div className="p-4 text-center border-l bg-green-50">
                <h3 className="font-semibold text-green-700">🌟 Online Therapy</h3>
                <p className="text-sm text-green-600 mt-1">Gentle Rise Therapy</p>
              </div>
              <div className="p-4 text-center border-l">
                <h3 className="font-semibold text-gray-700">In-office</h3>
                <p className="text-sm text-gray-500 mt-1">Traditional Therapy</p>
              </div>
            </div>

            {comparisonData.map((item, index) => (
              <div key={index} className="grid grid-cols-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                <div className="p-4">
                  <span className="text-gray-700">{item.feature}</span>
                </div>
                <div className="p-4 text-center border-l bg-green-50/30 flex justify-center items-center">
                  {renderCheckIcon(item.online, item.icon)}
                </div>
                <div className="p-4 text-center border-l flex justify-center items-center">
                  {renderCheckIcon(item.inOffice)}
                </div>
              </div>
            ))}

            {/* Cost Comparison */}
            <div className="grid grid-cols-3 border-b-0 bg-blue-50">
              <div className="p-4">
                <span className="font-semibold text-gray-800">Cost</span>
              </div>
              <div className="p-4 text-center border-l bg-green-100">
                <div className="font-bold text-green-700">$36.59/week*</div>
                <div className="text-xs text-green-600 mt-1">Affordable weekly rate</div>
              </div>
              <div className="p-4 text-center border-l">
                <div className="font-bold text-gray-700">Avg. $150 per session**</div>
                <div className="text-xs text-gray-500 mt-1">Per session fee</div>
              </div>
            </div>
          </div>

          {/* Key Benefits Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Key Advantages of Online Therapy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">24/7 Accessibility</h4>
                  <p className="text-sm text-gray-600">Connect with your therapist anytime, anywhere</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Cost-Effective</h4>
                  <p className="text-sm text-gray-600">Significantly lower cost than traditional therapy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Multiple Communication Options</h4>
                  <p className="text-sm text-gray-600">Chat, phone, video - choose what works best for you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">No Commute Required</h4>
                  <p className="text-sm text-gray-600">Save time and money on travel to appointments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600">
              * Weekly rate based on our most popular subscription plan. Prices may vary based on your selected plan and therapist.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              ** Average cost of traditional in-person therapy sessions in the United States. Individual costs may vary by location and provider.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button 
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
            >
              Get Started with Online Therapy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}