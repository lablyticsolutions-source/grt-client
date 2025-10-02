import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { FileText, AlertTriangle, Clock, CreditCard, Shield, Users } from "lucide-react";

interface TermsAndConditionsPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsAndConditionsPage({ isOpen, onClose }: TermsAndConditionsPageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            Terms and Conditions - Gentle Rise Therapy
          </DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            <div className="prose prose-sm max-w-none">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
                <p className="text-blue-800 font-medium">
                  Please read these Terms and Conditions carefully before using Gentle Rise Therapy services. By using our platform, you agree to be bound by these terms.
                </p>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      By accessing and using Gentle Rise Therapy services, you accept and agree to be bound by the terms and provision of this agreement. These Terms and Conditions apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and contributors of content.
                    </p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">2. Service Description</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-3">
                      Gentle Rise Therapy provides an online platform that connects users with licensed mental health professionals for therapy sessions. Our services include:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Individual, couples, family, and group therapy sessions</li>
                      <li>Video, audio, and text-based communication with therapists</li>
                      <li>Therapist matching based on your preferences and needs</li>
                      <li>Secure messaging and appointment scheduling</li>
                      <li>Mental health resources and educational content</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">3. Eligibility</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-yellow-800 mb-2">
                      To use our services, you must:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-yellow-700">
                      <li>Be at least 13 years of age (users under 18 require parental consent)</li>
                      <li>Provide accurate and complete registration information</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Not have been previously banned from our platform</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">4. User Responsibilities</h3>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-red-800 mb-2">
                      As a user, you agree to:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-red-700">
                      <li>Provide truthful and accurate information about your mental health</li>
                      <li>Attend scheduled appointments or provide adequate notice for cancellations</li>
                      <li>Respect your therapist and other users</li>
                      <li>Not share your account with others</li>
                      <li>Not use the service for any illegal or harmful activities</li>
                      <li>Report any technical issues or safety concerns immediately</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">5. Platform Limitations</h3>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="text-orange-800 font-medium mb-2">Important Notice:</p>
                    <p className="text-orange-700 mb-3">
                      Gentle Rise Therapy is not a crisis intervention service. If you are experiencing a mental health emergency, please:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-orange-700">
                      <li>Call 911 or go to your nearest emergency room</li>
                      <li>Contact the National Suicide Prevention Lifeline: 988</li>
                      <li>Call the Crisis Text Line: Text HOME to 741741</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">6. Payment Terms</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Pricing and Billing:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-3">
                      <li>Session fees are charged according to your chosen plan</li>
                      <li>Payment is due at the time of booking unless otherwise arranged</li>
                      <li>We accept major credit cards, debit cards, and some insurance plans</li>
                      <li>All prices are in USD and include applicable taxes</li>
                    </ul>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Cancellation Policy:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Cancel at least 24 hours in advance for a full refund</li>
                      <li>Cancellations within 24 hours may be subject to a fee</li>
                      <li>No-shows will be charged the full session fee</li>
                      <li>Emergency situations will be handled on a case-by-case basis</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">7. Scheduling and Attendance</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Sessions are scheduled based on therapist availability</li>
                      <li>We recommend booking sessions at least 48 hours in advance</li>
                      <li>Late arrivals may result in shortened sessions</li>
                      <li>Repeated no-shows may result in account suspension</li>
                      <li>Technical difficulties should be reported immediately</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">8. Privacy and Confidentiality</h3>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-green-800 mb-3">
                      We are committed to maintaining the confidentiality of your therapy sessions and personal information in accordance with HIPAA and other applicable privacy laws.
                    </p>
                    <p className="text-green-700">
                      Confidentiality may be broken only in cases of:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-green-700 mt-2">
                      <li>Imminent risk of harm to yourself or others</li>
                      <li>Suspected child or elder abuse</li>
                      <li>Court-ordered disclosure</li>
                      <li>Your written consent to share information</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">9. Intellectual Property</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-3">
                      All content on the Gentle Rise Therapy platform, including but not limited to text, graphics, logos, images, and software, is the property of Gentle Rise Therapy or its content suppliers and is protected by copyright and other intellectual property laws.
                    </p>
                    <p className="text-gray-700">
                      You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">10. Limitation of Liability</h3>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-red-800 mb-3">
                      Gentle Rise Therapy and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                    </p>
                    <p className="text-red-700">
                      Our total liability for any claims related to our services shall not exceed the amount you paid for services in the 12 months preceding the claim.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">11. Termination</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-3">
                      Either party may terminate this agreement at any time:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li><strong>By you:</strong> You may delete your account at any time through your account settings</li>
                      <li><strong>By us:</strong> We may suspend or terminate accounts for violations of these terms</li>
                      <li><strong>Effect:</strong> Upon termination, you will lose access to all account features and data</li>
                      <li><strong>Refunds:</strong> Unused session credits may be refunded per our refund policy</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">12. Dispute Resolution</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-blue-800 mb-3">
                      Any disputes arising from these terms or your use of our services will be resolved through binding arbitration rather than in court, except where prohibited by law.
                    </p>
                    <p className="text-blue-700">
                      This agreement is governed by the laws of the United States and the state where our headquarters are located.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">13. Changes to Terms</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      We reserve the right to modify these terms at any time. We will notify users of material changes via email or platform notification. Your continued use of our services after such modifications constitutes acceptance of the updated terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">14. Severability</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      If any provision of these terms is found to be unenforceable or invalid, the remaining provisions will continue to be valid and enforceable to the fullest extent permitted by law.
                    </p>
                  </div>
                </section>

                <section className="bg-blue-100 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Contact Information</h3>
                  <p className="text-blue-800 mb-3">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="space-y-2 text-blue-700">
                    <p><strong>Email:</strong> legal@gentlerisetherapy.com</p>
                    <p><strong>Phone:</strong> 1-800-THERAPY (1-800-843-7279)</p>
                    <p><strong>Address:</strong> Gentle Rise Therapy, 123 Wellness St, Suite 456, Therapy City, TC 12345</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClose}>
            I Agree
          </Button>
        </div>
       </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}