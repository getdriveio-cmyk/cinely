import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, FileText, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { getBreadcrumbStructuredData } from "@/utils/structuredData";

const Terms = () => {
  const lastUpdated = "December 15, 2024";

  const breadcrumbStructuredData = getBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" }
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Terms of Service - Cinely Streaming Platform"
        description="Read Cinely's terms of service and user agreement. Understand your rights and responsibilities when using our streaming platform."
        keywords={[
          "terms of service",
          "user agreement",
          "terms and conditions",
          "legal terms",
          "service agreement",
          "user rights",
          "platform rules",
          "streaming terms",
          "legal document",
          "terms of use"
        ]}
        canonical="/terms"
        structuredData={breadcrumbStructuredData}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
              <Scale className="w-5 h-5 text-white mr-2" />
              <span className="text-sm font-medium text-white">Terms of Service</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Terms of Service
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Please read these terms carefully before using Cinely. By using our service, you agree to be bound by these terms.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Fair Usage</h3>
              <p className="text-muted-foreground text-sm">
                Reasonable terms that protect both you and our service
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Clear Guidelines</h3>
              <p className="text-muted-foreground text-sm">
                Transparent rules about what you can and cannot do
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              
              {/* Introduction */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Agreement to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service ("Terms") govern your use of Cinely's streaming service and website 
                  (collectively, the "Service") operated by Cinely Inc. ("us", "we", or "our").
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                  with any part of these terms, then you may not access the Service.
                </p>
              </Card>

              {/* Service Description */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Service Description</h2>
                <p className="text-muted-foreground mb-4">
                  Cinely is a streaming service that provides access to movies, TV shows, and other video content. 
                  Our service includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Free tier with advertisements</li>
                  <li>Premium tier with ad-free viewing and additional features</li>
                  <li>Access to our content library across multiple devices</li>
                  <li>Personalized recommendations and user profiles</li>
                </ul>
              </Card>

              {/* User Accounts */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
                <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must be at least 13 years old to create an account</li>
                  <li>One account per person; sharing accounts is prohibited</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Account Security</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                </ul>
              </Card>

              {/* Subscription and Payment */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Subscription and Payment</h2>
                <h3 className="text-xl font-semibold mb-3">Free Service</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Our free tier is available at no cost with advertisements</li>
                  <li>No credit card required for free service</li>
                  <li>Free service may have limitations on content access and features</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Premium Service</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Premium subscription requires payment of applicable fees</li>
                  <li>Fees are billed in advance on a monthly or annual basis</li>
                  <li>All fees are non-refundable except as required by law</li>
                  <li>We may change subscription fees with 30 days' notice</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Cancellation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You may cancel your subscription at any time</li>
                  <li>Cancellation takes effect at the end of your current billing period</li>
                  <li>No refunds for partial billing periods</li>
                </ul>
              </Card>

              {/* Acceptable Use */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Acceptable Use Policy</h2>
                <p className="text-muted-foreground mb-4">You agree not to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Use the Service for any unlawful purpose or in violation of any laws</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                  <li>Use automated means to access the Service without permission</li>
                  <li>Share your account credentials with others</li>
                  <li>Download, copy, or distribute content without authorization</li>
                  <li>Use the Service to transmit harmful or malicious code</li>
                  <li>Violate any intellectual property rights</li>
                </ul>
              </Card>

              {/* Content and Intellectual Property */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Content and Intellectual Property</h2>
                <h3 className="text-xl font-semibold mb-3">Our Content</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>All content on our Service is owned by us or our licensors</li>
                  <li>Content is provided for personal, non-commercial use only</li>
                  <li>You may not copy, distribute, or create derivative works</li>
                  <li>Content availability may change without notice</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">User-Generated Content</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You retain ownership of content you submit to us</li>
                  <li>You grant us a license to use your content to provide the Service</li>
                  <li>You are responsible for ensuring you have rights to any content you submit</li>
                </ul>
              </Card>

              {/* Privacy */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                  your information when you use our Service. By using our Service, you agree to the collection 
                  and use of information in accordance with our Privacy Policy.
                </p>
              </Card>

              {/* Disclaimers and Limitations */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Disclaimers and Limitations of Liability</h2>
                <h3 className="text-xl font-semibold mb-3">Service Availability</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>We strive to provide continuous service but cannot guarantee 100% uptime</li>
                  <li>We may modify, suspend, or discontinue the Service at any time</li>
                  <li>Content may be removed or unavailable without notice</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Cinely shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including without limitation, loss of profits, data, 
                  use, goodwill, or other intangible losses.
                </p>
              </Card>

              {/* Termination */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Termination</h2>
                <p className="text-muted-foreground mb-4">We may terminate or suspend your account immediately, without prior notice, for:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Violation of these Terms of Service</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Non-payment of subscription fees</li>
                  <li>Any other reason at our sole discretion</li>
                </ul>
                <p className="text-muted-foreground">
                  Upon termination, your right to use the Service will cease immediately, and we may delete your account and data.
                </p>
              </Card>

              {/* Changes to Terms */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of any material 
                  changes by email or through the Service. Your continued use of the Service after such modifications 
                  constitutes acceptance of the updated Terms.
                </p>
              </Card>

              {/* Governing Law */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, 
                  without regard to its conflict of law provisions. Any disputes arising from these Terms or your use 
                  of the Service shall be resolved in the courts of Delaware.
                </p>
              </Card>

              {/* Contact Information */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> legal@cinely.com</p>
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
          <h2 className="text-3xl font-bold mb-6">Questions about our terms?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our legal team is available to help clarify any questions you may have about these terms and conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Contact Legal Team
            </Button>
            <Button size="lg" variant="outline">
              Read Privacy Policy
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
