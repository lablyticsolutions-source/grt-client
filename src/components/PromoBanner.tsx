import { useState } from 'react';

export function PromoBanner() {
  const [copied, setCopied] = useState(false);
  const promoCode = "BETTER10";

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = promoCode;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy text: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12">
      {/* Main promo banner with decorative border */}
      <div className="relative bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg p-8 text-center text-white shadow-lg z-10">
        {/* Decorative border pattern */}
        <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-lg m-2"></div>
 
      {/* Decorative circles on sides */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
        <div className="w-15 h-15 bg-white rounded-full"></div>
      </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-0">
        <div className="w-15 h-15 bg-white rounded-full"></div>
      </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Unlock Your Wellbeing With Gentle Rise Therapy
          </h2>
          <p className="text-lg md:text-xl mb-6 text-white/90">
            Get 10% Off On Your First Therapy Plan
          </p>
          
          {/* Promo code section */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="font-bold text-lg tracking-wider">{promoCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {copied ? "Copied!" : "Click To Copy"}
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full"></div>
        <div className="absolute top-8 right-6 w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-4 left-8 w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-6 right-4 w-3 h-3 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
}