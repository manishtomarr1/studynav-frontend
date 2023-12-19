import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "University & Course Selection",
    description: `When it comes to choosing the right course and university for your UK education, I'm here to be your compass. I'll begin by understanding your past academic experiences and your areas of interest. By delving into your background, I'll recommend courses that align with your strengths and aspirations. Whether it's science, arts, business, or any other discipline, my aim is to guide you toward programs that resonate with your ambitions.

    `,
  },
  {
    label: "Application Process",
    description: `I'm here to guide you through the entire application process. From collecting essential documents, such as your academic transcripts and recommendation letters, to assisting you in creating a powerful Statement of Purpose (SOP) that showcases your ambitions and strengths, I'm committed to helping you present a compelling application.`,
  },
  {
    label: "Scholarships & Education Loan",
    description: ` I'll guide you through a variety of scholarship options, ranging from university-specific grants to external funding sources, ensuring you're well-informed about eligibility criteria and application timelines. Additionally, if you're considering education loans, especially if you're from India, I can provide valuable advice on reputable banks and financial institutions that offer student-friendly loan options.`,
  },
  {
    label: "Visa Process",
    description: `Embarking on your journey to study in the UK involves not only academic aspirations but also the practicalities of securing a visa. I'm here to be your guide through this crucial phase. Drawing from my experience, I'll walk you through the intricacies of the visa application process, ensuring you're well-prepared for success. From gathering the necessary documents and filling out the application forms correctly to providing tips on presenting a genuine intention to study, I'll share insights that have proven to be effective in securing visa approvals.`,
  },
  {
    label: "Accommodation",
    description: `Preparing for your study journey in the UK goes beyond academics – it involves ensuring a comfortable and secure living arrangement. I'm here to provide you with valuable guidance on booking accommodation before you even set foot in the UK. With my assistance, you'll navigate the process of selecting the right type of housing, whether it's university dormitories, private apartments, or homestays.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const buttonStyle = {
    backgroundColor: "#1f2937", // Replace with your desired button color
    "&:hover": {
      backgroundColor: "#931602", // Replace with your desired hover color
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box sx={{ maxWidth: 800 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "black",
                    // ... other custom styles
                  },
                  "& .MuiStepLabel-iconContainer": {
                    "& .MuiStepIcon-root": {
                      color: "#1f2937", // Change color for step index circle
                    },
                  },
                }}
              >
                <div className="text-xl font-semibold">{step.label}</div>
              </StepLabel>
              <StepContent>
                <Typography className="text-lg text-justify">
                  {step.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                  <Button
                      variant="contained"
                      onClick={handleNext}
                      style={buttonStyle} // Use inline style for button
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1, Color: "grey" }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography className="text-lg text-justify">
              That's all from my side - Let's Connect for more doubts.
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Read Again
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
