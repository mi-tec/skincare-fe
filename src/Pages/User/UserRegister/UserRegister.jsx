import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [errorRegister, setErrorRegister] = React.useState("");
  const [successRegister, setSuccessRegister] = React.useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const _accessToken = sessionStorage.getItem("accessToken");

    if (_accessToken) {
      navigate("/user-dashboard");

      return;
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    setSuccessRegister("");
    setErrorRegister("");
    try {
      const _response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/v1/user/auth/register`, { ...values });

      if (_response?.data?.status === 1) {
        setSuccessRegister(`Registration Is Success. Please Login`);
      }
    } catch (error) {
      setErrorRegister(error?.response?.data?.msg);
    }
  }

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link to="/user-login" className={"absolute right-4 top-4 md:right-8 md:top-8"}>
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-center">Register</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="flex flex-col spacing-y-5">
                  <input
                    type={"text"}
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("username", { required: "Username is required" })}
                    placeholder="Username"
                  />
                  {errors.username && (
                    <span className="text-rose-600 text-sm mt-1">{`${errors.username.message}`}</span>
                  )}
                </div>

                <div className="flex flex-col spacing-y-5">
                  <input
                    type={"email"}
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                  />
                  {errors.email && <span className="text-rose-600 text-sm mt-1">{`${errors.email.message}`}</span>}
                </div>

                <div className="flex flex-col spacing-y-5">
                  <input
                    type={"text"}
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("number", { required: "Contact Number is required" })}
                    placeholder="Contact Number"
                  />
                  {errors.number && <span className="text-rose-600 text-sm mt-1">{`${errors.number.message}`}</span>}
                </div>

                <div className="flex flex-col spacing-y-5">
                  <input
                    type={"text"}
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("nic", { required: "NIC is required" })}
                    placeholder="NIC"
                  />
                  {errors.nic && <span className="text-rose-600 text-sm mt-1">{`${errors.nic.message}`}</span>}
                </div>

                <div className="flex flex-col spacing-y-5">
                  <input
                    type={"text"}
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("country", { required: "Country is required" })}
                    placeholder="Country"
                  />
                  {errors.country && <span className="text-rose-600 text-sm mt-1">{`${errors.country.message}`}</span>}
                </div>

                <div className="flex flex-col spacing-y-5">
                  <input
                    type={"password"}
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("password", { required: "Password is required" })}
                    placeholder="password"
                  />
                  {errors.password && (
                    <span className="text-rose-600 text-sm mt-1">{`${errors.password.message}`}</span>
                  )}
                </div>

                <div className="flex flex-col spacing-y-5">
                  <input
                    type={"password"}
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Your passwords do no match";
                        }
                      },
                    })}
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <span className="text-rose-600 text-sm mt-1">{`${errors.confirmPassword.message}`}</span>
                  )}
                </div>

                <input
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                />
              </form>
              {errorRegister !== "" && (
                <div className={`text-white rounded-md bg-red-600 px-4 py-2`}>{errorRegister}</div>
              )}
              {successRegister !== "" && (
                <div className={`text-white rounded-md bg-green-600 px-4 py-2`}>{successRegister}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
