import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import "./CheckoutSteps.css";

function CheckoutSteps({ activeStep }) {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Details & Payment</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
  ];
  return (
    <Fragment>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        style={{ boxSizing: "border-box" }}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              icon={item.icon}
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
}

export default CheckoutSteps;
