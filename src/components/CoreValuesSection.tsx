import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CoreValuesSectionProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const valuePairs = [
  { left: "Autonomy", right: "Stability", key: "autonomy_stability" },
  { left: "Impact", right: "Recognition", key: "impact_recognition" },
  { left: "Collaboration", right: "Independence", key: "collaboration_independence" },
  { left: "Creativity", right: "Structure", key: "creativity_structure" },
];

const valueRankings = [
  "Autonomy", "Impact", "Stability", "Creativity", "Growth", 
  "Service", "Status", "Recognition", "Collaboration", "Independence", 
  "Security", "Adventure"
];

export const CoreValuesSection = ({ onNext, onBack }: CoreValuesSectionProps) => {
  const [pairChoices, setPairChoices] = useState<Record<string, string>>({});
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    innovation_rules: 50,
    helping_success: 50,
  });
  const [rankings, setRankings] = useState<string[]>([]);
  const [dilemmaChoice, setDilemmaChoice] = useState<string>("");

  const handlePairChoice = (key: string, choice: string) => {
    setPairChoices(prev => ({ ...prev, [key]: choice }));
  };

  const handleSliderChange = (key: string, value: number[]) => {
    setSliderValues(prev => ({ ...prev, [key]: value[0] }));
  };

  const handleRankingToggle = (value: string) => {
    if (rankings.includes(value)) {
      setRankings(rankings.filter(r => r !== value));
    } else if (rankings.length < 5) {
      setRankings([...rankings, value]);
    }
  };

  const canProceed = Object.keys(pairChoices).length === valuePairs.length && 
                   rankings.length === 5 && 
                   dilemmaChoice !== "";

  const handleNext = () => {
    if (canProceed) {
      onNext({
        pairChoices,
        sliderValues,
        rankings,
        dilemmaChoice,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Core Values Discovery</h1>
          <p className="text-lg text-muted-foreground">
            Let's explore what truly matters to you in your work and life
          </p>
        </div>

        <div className="space-y-8">
          {/* Paired Comparisons */}
          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-semibold mb-6">Which matters more to you?</h2>
            <div className="space-y-6">
              {valuePairs.map((pair) => (
                <div key={pair.key} className="space-y-3">
                  <p className="font-medium text-center">Choose what's more important:</p>
                  <div className="flex gap-4">
                    <Button
                      variant={pairChoices[pair.key] === pair.left ? "default" : "outline"}
                      onClick={() => handlePairChoice(pair.key, pair.left)}
                      className="flex-1 h-14 text-base"
                    >
                      {pair.left}
                    </Button>
                    <span className="flex items-center text-muted-foreground">vs</span>
                    <Button
                      variant={pairChoices[pair.key] === pair.right ? "default" : "outline"}
                      onClick={() => handlePairChoice(pair.key, pair.right)}
                      className="flex-1 h-14 text-base"
                    >
                      {pair.right}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Slider Preferences */}
          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-semibold mb-6">Rate Your Preferences</h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-medium">Freedom to innovate vs Clear guidelines and rules</p>
                <div className="px-4">
                  <Slider
                    value={[sliderValues.innovation_rules]}
                    onValueChange={(value) => handleSliderChange("innovation_rules", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>Freedom to innovate</span>
                    <span>Clear guidelines</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-medium">Helping others vs Achieving personal success</p>
                <div className="px-4">
                  <Slider
                    value={[sliderValues.helping_success]}
                    onValueChange={(value) => handleSliderChange("helping_success", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>Helping others</span>
                    <span>Personal success</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Dilemma Choice */}
          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-semibold mb-4">Career Dilemma</h2>
            <p className="mb-6 text-muted-foreground">
              You can have a job that offers high financial security but little creative freedom, 
              or one that's creatively fulfilling but financially unstable. Which would you choose?
            </p>
            <div className="flex gap-4">
              <Button
                variant={dilemmaChoice === "security" ? "default" : "outline"}
                onClick={() => setDilemmaChoice("security")}
                className="flex-1 h-14"
              >
                Financial Security
              </Button>
              <Button
                variant={dilemmaChoice === "creativity" ? "default" : "outline"}
                onClick={() => setDilemmaChoice("creativity")}
                className="flex-1 h-14"
              >
                Creative Fulfillment
              </Button>
            </div>
          </Card>

          {/* Top 5 Rankings */}
          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-semibold mb-4">Select Your Top 5 Values</h2>
            <p className="mb-6 text-muted-foreground">
              Choose exactly 5 values that are most important to you ({rankings.length}/5 selected)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {valueRankings.map((value) => (
                <Button
                  key={value}
                  variant={rankings.includes(value) ? "default" : "outline"}
                  onClick={() => handleRankingToggle(value)}
                  className="h-12 text-sm"
                  disabled={!rankings.includes(value) && rankings.length >= 5}
                >
                  {value}
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