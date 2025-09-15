import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Hammer, Heart, Search, Users, Palette, Scale } from "lucide-react";

interface PurposeArchetypeSectionProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const archetypeStatements = [
  {
    id: "builder",
    statement: "I find deep satisfaction in building and creating things that last.",
    archetype: "Builder",
    icon: Hammer,
  },
  {
    id: "healer",
    statement: "Helping others heal and grow is my calling.",
    archetype: "Healer", 
    icon: Heart,
  },
  {
    id: "seeker",
    statement: "I am constantly driven to explore new ideas and experiences.",
    archetype: "Seeker",
    icon: Search,
  },
  {
    id: "guide",
    statement: "Guiding others toward clarity and wisdom motivates me.",
    archetype: "Guide",
    icon: Users,
  },
  {
    id: "creator",
    statement: "I express myself best through original and imaginative work.",
    archetype: "Creator",
    icon: Palette,
  },
  {
    id: "justice-seeker",
    statement: "I am compelled to fight for justice and fairness in my community.",
    archetype: "Justice-Seeker",
    icon: Scale,
  },
];

const archetypeSymbols = [
  { id: "builder", name: "Builder", symbol: "🔨", description: "Creating lasting impact" },
  { id: "healer", name: "Healer", symbol: "❤️", description: "Nurturing growth" },
  { id: "seeker", name: "Seeker", symbol: "🔍", description: "Exploring possibilities" },
  { id: "guide", name: "Guide", symbol: "🧭", description: "Leading others" },
  { id: "creator", name: "Creator", symbol: "🎨", description: "Expressing imagination" },
  { id: "justice-seeker", name: "Justice-Seeker", symbol: "⚖️", description: "Fighting for fairness" },
];

export const PurposeArchetypeSection = ({ onNext, onBack }: PurposeArchetypeSectionProps) => {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [symbolChoice, setSymbolChoice] = useState<string>("");

  const handleRatingChange = (statementId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [statementId]: rating }));
  };

  const canProceed = Object.keys(ratings).length === archetypeStatements.length && 
                   symbolChoice !== "";

  const handleNext = () => {
    if (canProceed) {
      onNext({
        ratings,
        symbolChoice,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Purpose Archetype Identification</h1>
          <p className="text-lg text-muted-foreground">
            Discover your intrinsic motivational patterns and life purpose drivers
          </p>
        </div>

        <div className="space-y-8">
          {/* Likert Scale Ratings */}
          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-semibold mb-6">How much do you agree with these statements?</h2>
            <div className="space-y-8">
              {archetypeStatements.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-lg mb-3">{item.statement}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">Strongly Disagree</span>
                          <RadioGroup
                            value={ratings[item.id]?.toString() || ""}
                            onValueChange={(value) => handleRatingChange(item.id, parseInt(value))}
                            className="flex gap-6"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <RadioGroupItem value={rating.toString()} id={`${item.id}-${rating}`} />
                                <Label 
                                  htmlFor={`${item.id}-${rating}`}
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  {rating}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <span className="text-sm text-muted-foreground">Strongly Agree</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Symbol Choice */}
          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-semibold mb-6">Choose Your Life Purpose Symbol</h2>
            <p className="mb-6 text-muted-foreground">
              Which symbol best represents what drives your life's purpose?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {archetypeSymbols.map((symbol) => (
                <Button
                  key={symbol.id}
                  variant={symbolChoice === symbol.id ? "default" : "outline"}
                  onClick={() => setSymbolChoice(symbol.id)}
                  className="h-24 flex flex-col items-center gap-2 p-4"
                >
                  <span className="text-2xl">{symbol.symbol}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{symbol.name}</div>
                    <div className="text-xs opacity-75">{symbol.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-gradient-primary hover:opacity-90 text-white"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};