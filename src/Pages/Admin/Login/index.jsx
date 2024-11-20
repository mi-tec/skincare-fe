import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [errorLogin, setErrorLogin] = React.useState("");
  const [successLogin, setSuccessLogin] = React.useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    setSuccessLogin("");
    setErrorLogin("");
    try {
      const _response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/admin/auth/login`,
        { ...values },
      );

      if (_response?.data?.status === 1) {
        sessionStorage.setItem(
          "accessToken",
          _response?.data?.data?.accessToken,
        );
        sessionStorage.setItem(
          "user",
          JSON.stringify(_response?.data?.data?.user),
        );

        navigate("/admin-dashboard");
      }
    } catch (error) {
      setErrorLogin(error?.response?.data?.msg);
    }
  }

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-center">
                Login
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="flex flex-col spacing-y-5">
                  <input
                    type={"text"}
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("username", {
                      required: "Username is required",
                    })}
                    placeholder="Username"
                  />
                  {errors.username && (
                    <span className="text-rose-600 text-sm mt-1">{`${errors.username.message}`}</span>
                  )}
                </div>

                <div className="flex flex-col spacing-y-5">
                  <input
                    type={"password"}
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("password", {
                      required: "Password is required",
                    })}
                    placeholder="password"
                  />
                  {errors.password && (
                    <span className="text-rose-600 text-sm mt-1">{`${errors.password.message}`}</span>
                  )}
                </div>

                <div className="flex flex-col spacing-y-5">
                  <select
                    name="cars"
                    id="cars"
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("adminType", {
                      required: "Admin Type is required",
                    })}
                  >
                    <option value="">Please Select</option>
                    <option value="nurse">Nurse</option>
                    <option value="doctor">Doctor</option>
                  </select>
                  {errors.adminType && (
                    <span className="text-rose-600 text-sm mt-1">{`${errors.adminType.message}`}</span>
                  )}
                </div>

                <input
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                />
              </form>
              {errorLogin !== "" && (
                <div className={`text-white rounded-md bg-red-600 px-4 py-2`}>
                  {errorLogin}
                </div>
              )}
              {successLogin !== "" && (
                <div className={`text-white rounded-md bg-green-600 px-4 py-2`}>
                  {successLogin}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
