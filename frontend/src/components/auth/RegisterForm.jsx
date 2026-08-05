import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import PasswordInput from "./PasswordInput";
import { register as registerUser } from "@/services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;

      const result = await registerUser(data);

      toast.success(result.message);

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Full Name */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <Input
          placeholder="Enter your full name"
          {...register("full_name", {
            required: "Full name is required",
            minLength: {
              value: 3,
              message:
                "Minimum 3 characters",
            },
          })}
        />

        {errors.full_name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.full_name.message}
          </p>
        )}
      </div>

      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Phone
        </label>

        <Input
          placeholder="01XXXXXXXXX"
          {...register("phone", {
            required: "Phone is required",
          })}
        />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* NID */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          NID
        </label>

        <Input
          placeholder="National ID"
          {...register("nid")}
        />
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <PasswordInput
          register={register}
          error={errors.password}
        />
      </div>

      {/* Confirm Password */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Confirm Password
        </label>

        <Input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required:
              "Confirm password is required",
            validate: (value) =>
              value === password ||
              "Passwords do not match",
          })}
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Creating..."
          : "Create Account"}
      </Button>

    
    </form>
  );
};

export default RegisterForm;