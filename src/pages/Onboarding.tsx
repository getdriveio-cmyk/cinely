import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import SEO from '@/components/SEO';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
  'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
];

const RATINGS = [
  { value: 'G', label: 'G - General Audiences' },
  { value: 'PG', label: 'PG - Parental Guidance' },
  { value: 'PG-13', label: 'PG-13 - Parents Strongly Cautioned' },
  { value: 'R', label: 'R - Restricted' },
  { value: 'NC-17', label: 'NC-17 - Adults Only' }
];

const Onboarding = () => {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>('PG-13');
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const progress = (step / 3) * 100;

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Update user profile with onboarding data
      await updateProfile({
        onboardingAt: new Date()
      });

      // In a real app, you would also save preferences to the database
      console.log('Onboarding completed:', {
        genres: selectedGenres,
        rating: selectedRating,
        emailOptIn
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedGenres.length >= 3;
      case 2:
        return selectedRating !== '';
      case 3:
        return true; // Email opt-in is optional
      default:
        return false;
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    // If user has already completed onboarding, redirect to dashboard
    if (user && profile?.onboardingAt) {
      navigate('/dashboard');
      return;
    }
  }, [user, profile, navigate]);

  // Don't render if no user or if onboarding already completed
  if (!user || profile?.onboardingAt) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <SEO
        title="Welcome to Cinely - Set Up Your Profile"
        description="Personalize your streaming experience"
        noindex={true}
      />
      
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Welcome to Cinely!</h1>
              <p className="text-muted-foreground">
                Let's personalize your streaming experience
              </p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              Step {step} of 3
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step 1: Genre Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">What genres do you enjoy?</h2>
                <p className="text-muted-foreground">
                  Select at least 3 genres to get better recommendations
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {GENRES.map((genre) => (
                  <Badge
                    key={genre}
                    variant={selectedGenres.includes(genre) ? "default" : "outline"}
                    className="cursor-pointer p-2 justify-center"
                    onClick={() => handleGenreToggle(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                {selectedGenres.length} selected (minimum 3)
              </p>
            </div>
          )}

          {/* Step 2: Rating Preference */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Content Rating Preference</h2>
                <p className="text-muted-foreground">
                  Choose the highest rating you're comfortable with
                </p>
              </div>
              
              <div className="space-y-2">
                {RATINGS.map((rating) => (
                  <div
                    key={rating.value}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRating === rating.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedRating(rating.value)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedRating === rating.value}
                        readOnly
                      />
                      <span className="font-medium">{rating.value}</span>
                      <span className="text-muted-foreground">{rating.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Email Opt-in */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Stay Updated</h2>
                <p className="text-muted-foreground">
                  Get notified about new releases and recommendations
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email-opt-in"
                    checked={emailOptIn}
                    onCheckedChange={(checked) => setEmailOptIn(checked as boolean)}
                  />
                  <label htmlFor="email-opt-in" className="text-sm">
                    Send me email updates about new releases and personalized recommendations
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  You can change this preference anytime in your account settings.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
            >
              {step === 3 ? 'Complete Setup' : 'Next'}
              {step < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
