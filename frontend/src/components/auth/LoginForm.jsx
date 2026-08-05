import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  useLocation,
  useNavigate,
} from "react-router";
import toast from "react-hot-toast";

import { login } from "@/services/authService";
import PasswordInput from "./PasswordInput";
import useAuth from "@/hooks/useAuth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const { refreshUser } = useAuth();

  const from =
    location.state?.from?.pathname ||
    "/dashboard";

  const onSubmit = async (data) => {
    try {
      const result = await login(data);

      localStorage.setItem(
        "accessToken",
        result.token
      );

      await refreshUser();

      toast.success(result.message);

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <Input
          type="email"
          placeholder="you@example.com"
          {...register("email", {
            required:
              "Email is required",
            pattern: {
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message:
                "Invalid email",
            },
          })}
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">
            Password
          </label>

          <button
            type="button"
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            Forgot Password?
          </button>
        </div>

        <PasswordInput
          register={register}
          error={errors.password}
        />
      </div>

      <Button
        type="submit"
        className="h-11 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Signing In..."
          : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;