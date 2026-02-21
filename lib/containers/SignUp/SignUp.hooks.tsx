import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "@cookeasy/api";
import { isAxiosError } from "axios";

export const useSignUpHooks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const validationSchemas = [
    Yup.object({
      name: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required("Name is required"),

      email: Yup.string().email("Invalid email").required("Email is required"),

      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/[A-Z]/, "Must contain one uppercase letter")
        .matches(/[a-z]/, "Must contain one lowercase letter")
        .matches(/[0-9]/, "Must contain one number")
        .matches(/[!@#~$%^&*()+|_]/, "Must contain one special character")
        .required("Password is required"),
    }),

    Yup.object({
      gender: Yup.string()
        .oneOf(["M", "F", "O"], "Invalid gender")
        .required("Please select your gender"),

      dob: Yup.date()
        .max(new Date(), "Date cannot be in the future")
        .required("Date of birth is required"),
    }),

    Yup.object({
      levelOfCooking: Yup.string()
        .oneOf(
          ["Novice", "Intermediate", "Proficient", "Expert"],
          "Invalid cooking level",
        )
        .required("Please select your skill level"),
    }),
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      dob: "",
      levelOfCooking: "",
    },

    validationSchema: validationSchemas[activeStep],

    onSubmit: async (values, { setSubmitting }) => {
      if (activeStep < 2) {
        setActiveStep((prev) => prev + 1);
        return;
      }

      try {
        await api.post("/signup", values);

        toast.success("Signup successful 🎉");
        router.push("/login");
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 409) {
          toast.error("Email already exists");
        } else {
          toast.error("Something went wrong.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return {
    formik,
    activeStep,
    handleBack,
    isLastStep: activeStep === 2,
  };
};
