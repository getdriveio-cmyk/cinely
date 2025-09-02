import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Database, UserCheck, FileText } from "lucide-react";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { getBreadcrumbStructuredData } from "@/utils/structuredData";

const Privacy = () => {
  const lastUpdated = "December 15, 2024";

  const breadcrumbStructuredData = getBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" }
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Privacy Policy - How Cinely Protects Your Data"
        description="Learn how Cinely collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights."
        keywords={[
          "privacy policy",
          "data protection",
          "personal information",
          "privacy rights",
          "data security",
          "user privacy",
          "information collection",
          "data usage",
          "privacy practices",
          "GDPR compliance"
        ]}
        canonical="/privacy"
        structuredData={breadcrumbStructuredData}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
              <Shield className="w-5 h-5 text-white mr-2" />
              <span className="text-sm font-medium text-white">Privacy Policy</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Last updated: {lastUpdated}
            </Badge>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Transparent</h3>
              <p className="text-muted-foreground text-sm">
                We clearly explain what data we collect and why
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure</h3>
              <p className="text-muted-foreground text-sm">
                Your data is protected with industry-standard security
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Your Control</h3>
              <p className="text-muted-foreground text-sm">
                You can manage and delete your data anytime
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              
              {/* Introduction */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Cinely, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                  streaming service and website.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  By using Cinely, you agree to the collection and use of information in accordance with this policy. 
                  If you do not agree with our policies and practices, please do not use our service.
                </p>
              </Card>

              {/* Information We Collect */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Database className="w-6 h-6 text-primary" />
                  Information We Collect
                </h2>
                
                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Name and email address when you create an account</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Profile information and preferences</li>
                  <li>Communication preferences and customer service interactions</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Usage Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Content you watch, search for, and interact with</li>
                  <li>Device information and technical specifications</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Log files and analytics data</li>
                  <li>Performance and error information</li>
                  <li>Advertising and marketing data</li>
                </ul>
              </Card>

              {/* How We Use Information */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide and maintain our streaming service</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Personalize your viewing experience and recommendations</li>
                  <li>Communicate with you about your account and our service</li>
                  <li>Improve our service and develop new features</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </Card>

              {/* Information Sharing */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>With service providers who assist us in operating our platform</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                  <li>With your explicit consent</li>
                </ul>
              </Card>

              {/* Data Security */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, 
                  and regular security audits.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive 
                  to protect your information, we cannot guarantee absolute security.
                </p>
              </Card>

              {/* Your Rights */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Your Rights and Choices</h2>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Object to certain processing activities</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  To exercise these rights, please contact us at privacy@cinely.com or through our contact form.
                </p>
              </Card>

              {/* Cookies */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver 
                  personalized content. You can control cookie settings through your browser preferences.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Essential cookies are necessary for the service to function, while optional cookies help us improve 
                  your experience and provide relevant advertising.
                </p>
              </Card>

              {/* Children's Privacy */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal 
                  information from children under 13. If you are a parent or guardian and believe your child has provided 
                  us with personal information, please contact us immediately.
                </p>
              </Card>

              {/* Changes to Policy */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                  new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this 
                  Privacy Policy periodically for any changes.
                </p>
              </Card>

              {/* Contact Information */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> privacy@cinely.com</p>
                  <p><strong>Address:</strong> 123 Streaming St, Digital City, DC 12345</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Questions about your privacy?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our privacy team is here to help. Contact us if you have any questions or concerns about how we handle your data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Contact Privacy Team
            </Button>
            <Button size="lg" variant="outline">
              Manage Your Data
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
