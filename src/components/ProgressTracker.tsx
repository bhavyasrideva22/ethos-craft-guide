import { Check } from "lucide-react";

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const ProgressTracker = ({ currentStep, totalSteps, steps }: ProgressTrackerProps) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-muted rounded-full">
          <div 
            className="h-2 bg-gradient-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="absolute -top-3 w-full flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground shadow-soft' 
                      : isCurrent 
                        ? 'bg-accent text-accent-foreground shadow-soft ring-2 ring-accent/20' 
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                <span className={`mt-2 text-xs font-medium text-center leading-tight ${
                  isCurrent ? 'text-accent-foreground' : 'text-muted-foreground'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Progress Text */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}
        </p>
      </div>
    </div>
  );
};