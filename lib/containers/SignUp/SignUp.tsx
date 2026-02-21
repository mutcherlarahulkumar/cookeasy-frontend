import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Theme,
  SxProps,
  Grid,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useSignUpHooks } from "./SignUp.hooks";

const getStyles = () => ({
  root: {
    minHeight: "80vh", // Use 100vh to ensure it covers the full screen height
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Horizontal centering
    justifyContent: "center", // Vertical centering
    p: { xs: 2, md: 4 },
    // Optional: add a background color or image here if you want it to cover the whole screen
    bgcolor: "background.default",
  } as SxProps<Theme>,

  paper: {
    p: 4,
    maxWidth: 800,
    width: "100%", // Ensures it takes full width up to 800px
    mx: "auto",
    borderRadius: 4,
    // Add elevation or border to make the centered form pop
  } as SxProps<Theme>,
  stepIcon: { color: "secondary.main" },
  levelCard: (active: boolean): SxProps<Theme> => ({
    height: "100%", // Ensures all cards in a row are same height
    display: "flex",
    flexDirection: "column",
    border: "2px solid",
    borderColor: active ? "secondary.main" : "divider",
    bgcolor: active ? "secondary.light" : "background.paper",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: active ? 4 : 0,
    opacity: active ? 1 : 0.9,
    "&:hover": {
      borderColor: "secondary.main",
      opacity: 1,
    },
  }),
});

const cookingLevels = [
  {
    id: "Novice",
    label: "Novice",
    desc: "I can boil water/heat a jar of sauce.",
  },
  {
    id: "Intermediate",
    label: "Intermediate",
    desc: "I can follow a recipe and it tastes good.",
  },
  {
    id: "Proficient",
    label: "Proficient",
    desc: "I can make recipes better by changing technique.",
  },
  {
    id: "Expert",
    label: "Expert",
    desc: "I don't need recipes, I know how flavors work.",
  },
];

export default function SignUp() {
  const s = getStyles();
  const { formik, activeStep, handleBack, isLastStep } = useSignUpHooks();

  const steps = ["Account", "Personal", "Culinary Level"];

  return (
    <Box sx={s.root}>
      <Paper elevation={3} sx={s.paper}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          color="primary"
          sx={{ mb: 3 }}
        >
          Join Cook Easy
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={formik.handleSubmit}>
          {/* STEP 0: Account Info */}
          {activeStep === 0 && (
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Stack>
          )}

          {/* STEP 1: Personal Details */}
          {activeStep === 1 && (
            <Stack spacing={3}>
              <TextField
                select
                fullWidth
                label="Gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && !!formik.errors.gender}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="O">Other</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.dob}
                onChange={formik.handleChange}
                error={formik.touched.dob && !!formik.errors.dob}
                helperText={formik.touched.dob && formik.errors.dob}
              />
            </Stack>
          )}

          {/* STEP 2: Cooking Level - Refined Grid */}
          {activeStep === 2 && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Select your expertise:
              </Typography>
              <Grid container spacing={2}>
                {cookingLevels.map((lvl) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={lvl.id}>
                    <Card
                      sx={s.levelCard(formik.values.levelOfCooking === lvl.id)}
                      elevation={0}
                    >
                      <CardActionArea
                        sx={{ height: "100%" }}
                        onClick={() =>
                          formik.setFieldValue("levelOfCooking", lvl.id)
                        }
                      >
                        <CardContent sx={{ p: 2.5 }}>
                          <Typography
                            variant="h6"
                            fontWeight="700"
                            color="primary"
                            gutterBottom
                          >
                            {lvl.label}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ lineHeight: 1.4 }}
                          >
                            {lvl.desc}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {formik.touched.levelOfCooking &&
                formik.errors.levelOfCooking && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {formik.errors.levelOfCooking}
                  </Typography>
                )}
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ fontWeight: "bold" }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={formik.isSubmitting}
              sx={{ px: 4, fontWeight: "bold" }}
            >
              {isLastStep ? "Complete Sign Up" : "Next Step"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
