import { useEffect, useState } from "react";
import { PaymentPage } from "./components/PaymentPage";

export default function PaymentApp() {
  const [sessionDetails, setSessionDetails] = useState(null);

  useEffect(() => {
    // Get session details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get('session');
    
    if (sessionParam) {
      try {
        const details = JSON.parse(decodeURIComponent(sessionParam));
        setSessionDetails(details);
      } catch (error) {
        console.error("Error parsing session details:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentPage sessionDetails={sessionDetails} />
    </div>
  );
}