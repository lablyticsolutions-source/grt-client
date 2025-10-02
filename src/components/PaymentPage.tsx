import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { CreditCard, Building2, Eye, EyeOff, Search, ChevronDown, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PaymentPageProps {
  sessionDetails?: {
    therapistName?: string;
    sessionType?: string;
    date?: string;
    time?: string;
    amount?: string;
  };
  onBack?: () => void;
  onCompletePayment?: () => void;
}

export function PaymentPage({ sessionDetails, onBack, onCompletePayment }: PaymentPageProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card");
  const [showCvv, setShowCvv] = useState(false);
  const [bankSearchQuery, setBankSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    country: "",
    termsAgreed: false,
    consentAgreed: false
  });

  // Bank data with actual bank logos from Unsplash
  const banks = [
    { 
      id: "barclays", 
      name: "Barclays", 
      icon: "https://www.earlycareers.scot/wp-content/uploads/2021/12/Barclays-Custom-1.png" 
    },
    { 
      id: "chase", 
      name: "Chase", 
      icon: "https://www.pngmart.com/files/23/Chase-Bank-Logo-PNG-HD.png" 
    },
    { 
      id: "bank-of-america", 
      name: "Bank of America", 
      icon: "https://choosechatt.com/wp-content/uploads/2020/12/BankOfAmerica.Logo_.png" 
    },
    { 
      id: "lloyds", 
      name: "Lloyds Bank", 
      icon: "https://www.lloydsbank.com/assets/lloyds-new-logo-brand-update.jpg" 
    },
    { 
      id: "wells-fargo", 
      name: "Wells Fargo", 
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Wells_Fargo_Logo_%282020%29.svg/2048px-Wells_Fargo_Logo_%282020%29.svg.png" 
    },
    { 
      id: "capital-one", 
      name: "Capital One", 
      icon: "https://download.logo.wine/logo/Capital_One/Capital_One-Logo.wine.png" 
    },
    { 
      id: "truist", 
      name: "Truist", 
      icon: "https://www.grandcentraldistrict.org/wp-content/uploads/2024/07/Screenshot-2024-07-19-at-10.48.26%E2%80%AFAM.png" 
    },
    { 
      id: "td-bank", 
      name: "TD Bank", 
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Toronto-Dominion_Bank_logo.svg/2288px-Toronto-Dominion_Bank_logo.svg.png" 
    },
    { 
      id: "pnc-bank", 
      name: "PNC Bank", 
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5QaXS7s8l_N-GE9FHAvUvYjBR9nAOXnsorg&s" 
    },
    { 
      id: "navy-federal", 
      name: "Navy Federal Credit Union", 
      icon: "https://media.licdn.com/dms/image/v2/D4E0BAQEkY6k_-EE3gA/company-logo_200_200/B4EZX3A0SNHMAM-/0/1743605941842/navy_federal_credit_union_logo?e=2147483647&v=beta&t=Xnyn60kYyV77Qjlga2tts3sWFueG2jpl_h9tRUqbB2A" 
    },
    { 
      id: "us-bank", 
      name: "US Bank", 
      icon: "https://media2.vault.com/14342444/210802_us-bancorp_logo.jpg" 
    },
    { 
      id: "usaa-bank", 
      name: "USAA Bank", 
      icon: "https://eu-images.contentstack.com/v3/assets/blt7dacf616844cf077/blt3aa794dc9fa12177/67991524b19afb5ef67b0d5e/USAA-1.jpg" 
    }
  ];

  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(bankSearchQuery.toLowerCase())
  );

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", 
    "France", "India", "Japan", "Brazil", "Mexico", "Spain", "Italy"
  ];

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setSelectedBank("");
    setBankSearchQuery("");
  };

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };

  const handleSubmit = () => {
    if (selectedPaymentMethod === "amazon-pay") {
      // Simulate redirect to Amazon Pay
      alert("Redirecting to Amazon Pay for secure payment processing...");
      return;
    }

    setIsProcessing(true);

    // Handle other payment methods
    console.log("Processing payment:", {
      method: selectedPaymentMethod,
      formData,
      selectedBank,
      sessionDetails
    });
    
    // Show success message and redirect to dashboard
    if (onCompletePayment) {
      // Simulate payment processing delay
      setTimeout(() => {
        setIsProcessing(false);
        onCompletePayment();
      }, 2000);
    } else {
      setTimeout(() => {
        setIsProcessing(false);
        alert("Payment processed successfully! You will be redirected to your booking confirmation.");
      }, 2000);
    }
  };

  const isFormValid = () => {
    if (selectedPaymentMethod === "card") {
      return formData.cardNumber && formData.expirationDate && formData.securityCode && 
             formData.country && formData.termsAgreed && formData.consentAgreed;
    } else if (selectedPaymentMethod === "bank") {
      return selectedBank && formData.termsAgreed && formData.consentAgreed;
    } else if (selectedPaymentMethod === "amazon-pay") {
      return formData.termsAgreed && formData.consentAgreed;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-rose-50 bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Back Button */}
          {onBack && (
            <div className="mb-6">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Booking</span>
              </button>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">Secure payment for your therapy session</p>
            {sessionDetails && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Session:</strong> {sessionDetails.sessionType} with {sessionDetails.therapistName}<br/>
                  <strong>Date & Time:</strong> {sessionDetails.date} at {sessionDetails.time}<br/>
                  <strong>Amount:</strong> {sessionDetails.amount || "$75.00"}
                </p>
              </div>
            )}
          </div>

          {/* Promo Section */}
          <div className="space-y-4 mb-8">
            {/* Video Sessions Upgrade */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex-1">
                  <p className="text-blue-700 font-medium">
                    Add weekly video sessions for $35 extra per week <span className="text-blue-600">(normally $55 extra)</span>
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Add video sessions
                </button>
              </div>
            </div>

            {/* Promo Code Offer */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex-1">
                <p className="text-gray-800 font-medium">
                  Use Code <span className="font-bold text-gray-900">25OFF7C</span> to save $25 your first month!
                </p>
              </div>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Have a Special Offer Code?
              </button>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Card Payment */}
              <button
                onClick={() => handlePaymentMethodSelect("card")}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  selectedPaymentMethod === "card"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CreditCard className="w-6 h-6 text-gray-700" />
                <span className="text-sm font-medium">Card</span>
              </button>

              {/* Bank Payment */}
              <button
                onClick={() => handlePaymentMethodSelect("bank")}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all relative ${
                  selectedPaymentMethod === "bank"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Building2 className="w-6 h-6 text-gray-700" />
                <span className="text-sm font-medium">Bank</span>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Get $5
                </div>
              </button>

              {/* Amazon Pay */}
              <button
                onClick={() => handlePaymentMethodSelect("amazon-pay")}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  selectedPaymentMethod === "amazon-pay"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-sm font-bold">pay</span>
                </div>
                <span className="text-sm font-medium">Amazon Pay</span>
              </button>

              {/* Cash App Pay */}
              <button
                onClick={() => handlePaymentMethodSelect("cash-app")}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  selectedPaymentMethod === "cash-app"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center">
                  <span className="text-sm font-bold">$</span>
                </div>
                <span className="text-sm font-medium">Cash App Pay</span>
              </button>
            </div>

            {/* Secure checkout info */}
            <div className="flex items-center gap-2 text-blue-600 mb-6">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Secure, fast checkout with Link</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Payment Form Based on Selected Method */}
          {selectedPaymentMethod === "card" && (
            <div className="space-y-6">
              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="1234 1234 1234 1234"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="pr-20"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="Amex" className="h-6" />
                  
                  </div>
                </div>
              </div>

              {/* Expiration and Security Code */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Expiration date</Label>
                  <Input
                    id="expirationDate"
                    placeholder="MM / YY"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, expirationDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="securityCode">Security code</Label>
                  <div className="relative">
                    <Input
                      id="securityCode"
                      type={showCvv ? "text" : "password"}
                      placeholder="CVV"
                      value={formData.securityCode}
                      onChange={(e) => {
                               const value = e.target.value;
                               if (/^\d{0,3}$/.test(value)) {
                                      setFormData(prev => ({ ...prev, securityCode: value }));
                            }
                          }}
                       maxLength={3}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCvv(!showCvv)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="India" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {selectedPaymentMethod === "bank" && (
            <div className="space-y-6">
              {/* Bank bonus banner */}
              <div className="bg-green-500 text-white p-4 rounded-lg flex items-center gap-2">
                <span className="text-sm">💰 Get $5 when you pay for the first time with your bank.</span>
                <button className="underline text-sm">See terms</button>
              </div>

              {/* Bank search */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search for your bank"
                    value={bankSearchQuery}
                    onChange={(e) => setBankSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Bank selection grid */}
              <div className="grid grid-cols-4 gap-4">
                {filteredBanks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleBankSelect(bank.id)}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                      selectedBank === bank.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={bank.icon} 
                        alt={bank.name} 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <span className="text-xs text-center">{bank.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedPaymentMethod === "amazon-pay" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-lg font-bold">pay</span>
                </div>
                <span className="text-lg">Amazon Pay selected.</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zM7 8a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span>After submission, you will be redirected to securely complete next steps.</span>
              </div>
            </div>
          )}

          {selectedPaymentMethod === "cash-app" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center">
                  <span className="text-sm font-bold">$</span>
                </div>
                <span className="text-lg">Cash App Pay selected.</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zM7 8a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span>After submission, you will be redirected to securely complete next steps.</span>
              </div>
            </div>
          )}

          {/* Terms and Conditions */}


          {/* Submit Button */}
          <div className="mt-8">
            <Button
              onClick={async () => {
                if (!isFormValid()) return;
                
                setIsProcessing(true);
                
                // Simulate payment processing
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                console.log("Payment completed successfully");
                setIsProcessing(false);
                
                // Payment completed - return to main page
                onCompletePayment?.();
              }}
              disabled={!isFormValid() || isProcessing}
              className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </div>
              ) : (
                "Complete Payment"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}