import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search, HelpCircle, MessageCircle, Mail, Phone, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      faqs: [
        {
          question: "How do I sign up for Cinely?",
          answer: "Signing up is easy! Just click 'Get Started Free' on our homepage, enter your email address, and you'll be ready to start watching in seconds. No credit card required for our free tier."
        },
        {
          question: "What's the difference between Free and Premium?",
          answer: "Our Free tier includes 10,000+ movies and shows with short ad breaks. Premium removes all ads, adds 4K/HDR support, Dolby Atmos audio, offline downloads, and early access to new releases."
        },
        {
          question: "Can I watch on multiple devices?",
          answer: "Yes! You can stream on unlimited devices with both Free and Premium plans. Premium also includes offline downloads on mobile devices."
        }
      ]
    },
    {
      title: "Account & Billing",
      icon: "💳",
      faqs: [
        {
          question: "How do I upgrade to Premium?",
          answer: "You can upgrade anytime from your account settings or by clicking 'Upgrade to Premium' on any page. Changes take effect immediately."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Absolutely! You can cancel your Premium subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and digital wallets like Apple Pay and Google Pay."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: "🔧",
      faqs: [
        {
          question: "Why is my video buffering?",
          answer: "Buffering can be caused by slow internet connection. Try reducing video quality in settings, check your internet speed, or restart your device and router."
        },
        {
          question: "What devices are supported?",
          answer: "Cinely works on smartphones, tablets, computers, smart TVs, gaming consoles, and streaming devices. We support iOS, Android, Windows, macOS, and most smart TV platforms."
        },
        {
          question: "How do I download content for offline viewing?",
          answer: "Offline downloads are available for Premium subscribers on mobile devices. Look for the download icon next to movies and shows, then tap to download."
        }
      ]
    }
  ];

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageCircle className="w-6 h-6" />,
      availability: "24/7 Available",
      responseTime: "Usually responds in minutes",
      badge: "Recommended"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: <Mail className="w-6 h-6" />,
      availability: "24/7 Available",
      responseTime: "Usually responds within 24 hours",
      badge: null
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team",
      icon: <Phone className="w-6 h-6" />,
      availability: "Mon-Fri 9AM-6PM EST",
      responseTime: "Immediate response",
      badge: "Premium Only"
    }
  ];

  const quickLinks = [
    { title: "Account Settings", href: "/account" },
    { title: "Billing Information", href: "/billing" },
    { title: "Download App", href: "/download" },
    { title: "System Requirements", href: "/requirements" },
    { title: "Report a Problem", href: "/report" },
    { title: "Feature Requests", href: "/feedback" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
              <HelpCircle className="w-5 h-5 text-white mr-2" />
              <span className="text-sm font-medium text-white">Help Center</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              How can we help?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Find answers to common questions, get technical support, or contact our team. 
              We're here to help you get the most out of Cinely.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer group">
                <div className="text-2xl mb-2">🔗</div>
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {link.title}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-12 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Get Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/30 transition-colors">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-muted-foreground mb-4">{option.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{option.availability}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4" />
                    <span>{option.responseTime}</span>
                  </div>
                </div>
                {option.badge && (
                  <Badge className="mb-4" variant={option.badge === "Recommended" ? "default" : "secondary"}>
                    {option.badge}
                  </Badge>
                )}
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border border-border rounded-lg px-6">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-semibold">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Still need help?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our support team is standing by to help you with any questions or issues. 
            Don't hesitate to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Live Chat
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
