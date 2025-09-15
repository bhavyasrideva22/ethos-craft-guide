import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Target, Heart, Compass } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent-foreground rounded-full text-sm font-medium">
            <Compass className="w-4 h-4" />
            Career Values & Purpose Assessment
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Ethical Comfort & Boundaries
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Purpose, Values & Career Alignment
          </p>
        </div>

        {/* Introduction Text */}
        <Card className="p-8 shadow-medium text-left max-w-3xl mx-auto">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Finding meaning in your career is more than just picking a job — it's about aligning what you do with 
              <span className="font-semibold text-primary"> who you truly are</span> and 
              <span className="font-semibold text-primary"> what you stand for</span>.
            </p>
            
            <p className="leading-relaxed">
              When your work reflects your core values and purpose, you feel energized, engaged, and fulfilled. 
              Conversely, when your career clashes with your ethical comfort or boundaries, you risk burnout, 
              dissatisfaction, and a sense of disconnection.
            </p>
            
            <p className="leading-relaxed">
              This assessment will help you uncover your deepest motivations, identify potential conflicts in your 
              work environment, and provide clarity on the kinds of careers and roles where you can thrive authentically. 
              Use these insights to make empowered decisions that honor your true self.
            </p>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Core Values Discovery</h3>
            <p className="text-sm text-muted-foreground">
              Identify and prioritize your fundamental values through interactive exercises
            </p>
          </Card>
          
          <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all duration-300">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold">Purpose Archetype</h3>
            <p className="text-sm text-muted-foreground">
              Discover your motivational archetype and intrinsic purpose drivers
            </p>
          </Card>
          
          <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all duration-300">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold">Career Alignment</h3>
            <p className="text-sm text-muted-foreground">
              Get personalized insights on roles and environments where you'll thrive
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-white px-8 py-4 text-lg font-semibold shadow-medium hover:shadow-strong transition-all duration-300"
          >
            Begin Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Takes approximately 15-20 minutes to complete
          </p>
        </div>
      </div>
    </div>
  );
};