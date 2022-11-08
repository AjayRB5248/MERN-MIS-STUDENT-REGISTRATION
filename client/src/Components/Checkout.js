import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./InfoForm";
import "./style.css";
import logo from "../assets/clg.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ACEM MIS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Basic Information", "College Details"];

function getStepContent(step, state, setState) {
  switch (step) {
    case 0:
      return <AddressForm state={state} setState={setState} />;
    case 1:
      return <PaymentForm state={state} setState={setState} />;

    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout() {
  const [state, setState] = React.useState({
    name: "",
    cid: "",
    email: "",
    profile:'',
    batch: "2075",
    faculty: "BCT",
    section: "A",
    location: "",
    gender: "Male",
    Dob: "",
    height: "",
    weight: "",
    bloodgroup: "",
    hometown: "",
    contact: "",
    fathername: "",
    mothername: "",
    fathercontact: "",
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 1) {
      let url= "http://localhost:5000/api/student"
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("cid", state.cid);
      formData.append("email", state.email);
      formData.append("profile", state.profile,state.profile.name);
      formData.append("batch", state.batch);
      formData.append("faculty", state.faculty);
      formData.append("section", state.section);
      formData.append("location", state.location);
      formData.append('gender',state.gender)
      formData.append('Dob',state.Dob)
      formData.append('height',state.height)
      formData.append('weight',state.weight)
      formData.append('bloodgroup',state.bloodgroup)
      formData.append('hometown',state.hometown)
      formData.append('contact',state.contact)
      formData.append('fathername',state.fathername)
      formData.append('mothername',state.mothername)
      formData.append('fathercontact',state.fathercontact)
console.log(state.profile, state.profile.name)
      try {
        const response = await axios.post(
          url,
          formData,
        );
        if(response.status===201){
        toast.success('Submitted Successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        }
      } catch (err) {
        console.log(err);
        toast.error('Something Went Wrong', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={logo}
              className="image"
              alt="Logo"
              width="30px"
              border-raius="50%"
            />
            <span className="heading">ACEM MIS</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Student Information
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your Information.
              </Typography>
              <Typography variant="subtitle1">
                Your information is collected for our Major project which is a
                College Management System.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, state, setState)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
