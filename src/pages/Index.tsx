import { useState } from "react";
import { AssessmentIntro } from "@/components/AssessmentIntro";
import { ProgressTracker } from "@/components/ProgressTracker";
import { CoreValuesSection } from "@/components/CoreValuesSection";
import { PurposeArchetypeSection } from "@/components/PurposeArchetypeSection";

type AssessmentStep = "intro" | "values" | "purpose" | "meaning" | "pact" | "results";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("intro");
  const [assessmentData, setAssessmentData] = useState<any>({});

  const steps = [
    "Introduction",
    "Core Values",
    "Purpose Archetype", 
    "Meaning & Fulfillment",
    "PACT Framework",
    "Results"
  ];

  const stepMapping: Record<AssessmentStep, number> = {
    intro: 1,
    values: 2,
    purpose: 3,
    meaning: 4,
    pact: 5,
    results: 6,
  };

  const handleStepData = (stepName: string, data: any) => {
    setAssessmentData((prev: any) => ({
      ...prev,
      [stepName]: data,
    }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "intro":
        return (
          <AssessmentIntro 
            onStart={() => setCurrentStep("values")}
          />
        );
      
      case "values":
        return (
          <div className="space-y-8">
            <ProgressTracker 
              currentStep={stepMapping[currentStep]}
              totalSteps={6}
              steps={steps}
            />
            <CoreValuesSection
              onNext={(data) => {
                handleStepData("values", data);
                setCurrentStep("purpose");
              }}
              onBack={() => setCurrentStep("intro")}
            />
          </div>
        );
      
      case "purpose":
        return (
          <div className="space-y-8">
            <ProgressTracker 
              currentStep={stepMapping[currentStep]}
              totalSteps={6}
              steps={steps}
            />
            <PurposeArchetypeSection
              onNext={(data) => {
                handleStepData("purpose", data);
                // For now, we'll show a completion message
                alert("Assessment sections completed! Full implementation would continue to PACT Framework.");
              }}
              onBack={() => setCurrentStep("values")}
            />
          </div>
        );
      
      default:
        return (
          <AssessmentIntro 
            onStart={() => setCurrentStep("values")}
          />
        );
    }
  };

  return renderCurrentStep();
};

export default Index;
