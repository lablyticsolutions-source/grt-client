import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Shield, Eye, Lock, Database, Share2, UserCheck } from "lucide-react";

interface PrivacyPolicyPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyPage({ isOpen, onClose }: PrivacyPolicyPageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden"> 
        <DialogHeader className="relative z-20">
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Privacy Policy - Gentle Rise Therapy
          </DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)] pr-4 relative z-20">
          <div className="space-y-6">
            <div className="prose prose-sm max-w-none">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
                <p className="text-blue-800 font-medium">
                  Your privacy is extremely important to us. This policy explains how we collect, use, and protect your personal information when you use Gentle Rise Therapy services.
                </p>
              </div>

              <div className="space-y-6">
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Information We Collect</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Personal Information:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Name, email address, phone number, and date of birth</li>
                      <li>Therapy session preferences and mental health information</li>
                      <li>Payment information (processed securely through encrypted systems)</li>
                      <li>Communication records with our therapists and support team</li>
                    </ul>
                    
                    <h4 className="font-medium text-gray-900 mb-2 mt-4">Technical Information:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>IP address, browser type, and device information</li>
                      <li>Usage patterns and session duration</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">How We Use Your Information</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>To provide and improve our therapy services</li>
                      <li>To match you with appropriate therapists</li>
                      <li>To process payments and manage your account</li>
                      <li>To communicate about appointments and services</li>
                      <li>To ensure platform safety and prevent fraud</li>
                      <li>To comply with legal and regulatory requirements</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Data Protection & Security</h3>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <ul className="list-disc pl-5 space-y-2 text-green-800">
                      <li>All data is encrypted in transit and at rest using industry-standard protocols</li>
                      <li>HIPAA-compliant security measures for all health information</li>
                      <li>Regular security audits and vulnerability assessments</li>
                      <li>Limited access controls - only authorized personnel can access your data</li>
                      <li>Secure backup and disaster recovery procedures</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Share2 className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Information Sharing</h3>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-medium text-red-800 mb-2">We DO NOT sell or rent your personal information to third parties.</h4>
                    <p className="text-red-700 mb-3">We only share information in these limited circumstances:</p>
                    <ul className="list-disc pl-5 space-y-1 text-red-700">
                      <li>With your assigned therapist for treatment purposes</li>
                      <li>With payment processors for transaction completion</li>
                      <li>When required by law or court order</li>
                      <li>In case of emergency to protect your safety</li>
                      <li>With your explicit written consent</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Your Rights</h3>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 mb-3">You have the right to:</p>
                    <ul className="list-disc pl-5 space-y-1 text-blue-700">
                      <li>Access and review your personal information</li>
                      <li>Request corrections to inaccurate data</li>
                      <li>Request deletion of your account and data</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Port your data to another service</li>
                      <li>File complaints with regulatory authorities</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Cookies and Tracking</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      We use cookies and similar technologies to improve your experience:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li><strong>Essential cookies:</strong> Required for platform functionality</li>
                      <li><strong>Analytics cookies:</strong> Help us understand usage patterns</li>
                      <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                    </ul>
                    <p className="text-gray-700 mt-2">
                      You can control cookie preferences through your browser settings.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Data Retention</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      We retain your information for as long as necessary to provide services and comply with legal obligations:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
                      <li>Account information: Until you delete your account</li>
                      <li>Therapy records: 7 years (as required by healthcare regulations)</li>
                      <li>Payment information: 5 years for tax and audit purposes</li>
                      <li>Marketing data: Until you opt-out or 2 years of inactivity</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Children's Privacy</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-yellow-800">
                      Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">International Users</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      If you are accessing our services from outside the United States, please note that your information may be transferred to, stored, and processed in the United States where our servers are located and our central database is operated.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Changes to This Policy</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      We may update this privacy policy from time to time. We will notify you of any material changes by email or through a prominent notice on our platform. Your continued use of our services after such modifications constitutes your acknowledgment of the modified policy.
                    </p>
                  </div>
                </section>

                <section className="bg-blue-100 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Contact Us</h3>
                  <p className="text-blue-800 mb-3">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-blue-700">
                    <p><strong>Email:</strong> privacy@gentlerisetherapy.com</p>
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
            I Understand
          </Button>
        </div>
       </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}