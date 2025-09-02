import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Play, Star, Clock, Users, Zap } from "lucide-react";
import { useState } from "react";
import { mockMovies } from "@/data/mockMovies";
import MovieCard from "@/components/MovieCard";

const WatchFree = () => {
  const [email, setEmail] = useState("");
  const freeMovies = mockMovies.slice(0, 4);

  const benefits = [
    {
      icon: <Play className="w-6 h-6" />,
      title: "10,000+ Movies & Shows",
      description: "Access our vast library of premium content completely free"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Watch Anytime",
      description: "Stream on any device, anywhere, anytime you want"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiple Profiles",
      description: "Create profiles for your entire family"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Access",
      description: "Start watching immediately - no credit card required"
    }
  ];

  const plans = [
    {
      name: "Free with Ads",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "10,000+ movies and TV shows",
        "Watch on any device", 
        "Multiple user profiles",
        "Short ad breaks",
        "1080p HD streaming"
      ],
      cta: "Start Watching Free",
      popular: false,
      gradient: "bg-gradient-to-br from-muted to-card"
    },
    {
      name: "Premium Ad-Free", 
      price: "$9.99",
      period: "month",
      description: "The ultimate viewing experience",
      features: [
        "Everything in Free",
        "Zero advertisements",
        "4K Ultra HD + HDR",
        "Dolby Atmos audio", 
        "Download for offline viewing",
        "Early access to new releases"
      ],
      cta: "Upgrade to Premium",
      popular: true,
      gradient: "bg-gradient-hero"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Cinely
          </a>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button variant="outline">Contact</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8">
              <Star className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">No Credit Card Required</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Watch Free
              </span>
              <br />
              <span className="text-foreground">Forever</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Stream thousands of movies and TV shows completely free. 
              Just a few short ads keep the content coming.
            </p>

            {/* Email Signup */}
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-lg"
                />
                <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 shadow-hero">
                  Get Started Free
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            Why Choose Cinely Free?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6 group-hover:bg-primary/30 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Start Watching These Hit Movies
            </h2>
            <p className="text-xl text-muted-foreground">
              These popular titles and thousands more are waiting for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {freeMovies.map((movie) => (
              <div key={movie.id} className="flex justify-center">
                <MovieCard movie={movie} size="md" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary">
              Browse Full Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Choose Your Experience
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade anytime for the premium experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative p-8 ${plan.gradient} border-2 ${
                plan.popular ? 'border-primary shadow-glow' : 'border-border'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-12 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-secondary hover:bg-secondary/90'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Is Cinely really free?",
                a: "Yes! Our free tier is completely free forever. You'll see a few short ads during your viewing experience, but there are no hidden fees or credit card requirements."
              },
              {
                q: "What's the difference between Free and Premium?",
                a: "Free includes ads and 1080p streaming. Premium removes all ads, adds 4K/HDR support, Dolby Atmos audio, offline downloads, and early access to new releases."
              },
              {
                q: "Can I upgrade or downgrade anytime?",
                a: "Absolutely! You can upgrade to Premium or downgrade to Free at any time. Changes take effect immediately."
              },
              {
                q: "How many devices can I watch on?",
                a: "Both Free and Premium allow streaming on unlimited devices, though Premium offers additional features like offline downloads on mobile devices."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Watching?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of viewers streaming their favorite content on Cinely. 
            No credit card required.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-semibold">
            Start Watching Free Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WatchFree;