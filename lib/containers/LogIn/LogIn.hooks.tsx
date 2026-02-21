import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "@cookeasy/api";
import { isAxiosError } from "axios";

export const useLogInHooks = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await api.post("/login", values);

        toast.success("Login successful");

        router.push("/dashboard");
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 401) {
          toast.error("Invalid email or password");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
    isLoading: formik.isSubmitting,
  };
};
