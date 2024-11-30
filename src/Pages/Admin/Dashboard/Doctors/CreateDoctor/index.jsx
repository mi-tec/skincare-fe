import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";
import { mainServices } from "@/lib/content";

const CreateDoctor = () => {
  const [errorRegister, setErrorRegister] = React.useState("");
  const [successRegister, setSuccessRegister] = React.useState("");

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
      const _response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/doctors/create`,
        { ...values },
      );

      if (_response?.data?.status === -1) {
        setErrorRegister("Error creating user");
      }

      setSuccessRegister("Registration success");
    } catch (error) {
      setErrorRegister(error?.response?.data?.msg);
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">
        Create Doctor Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="gap-4 grid ">
        <div className="gap-4 grid grid-cols-3">
          <div className="flex flex-col spacing-y-5">
            <input
              type={"text"}
              className={
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              }
              {...register("fullName", {
                required: "Full Name is required",
              })}
              placeholder="Full Name"
            />
            {errors.fullName && (
              <span className="text-rose-600 text-sm mt-1">{`${errors.fullName.message}`}</span>
            )}
          </div>

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
              type={"text"}
              className={
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              }
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-rose-600 text-sm mt-1">{`${errors.email.message}`}</span>
            )}
          </div>

          <div className="flex flex-col spacing-y-5">
            <select
              name="permittedService"
              id="permittedService"
              className={
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              }
              {...register("permittedService", {
                required: "Permitted Service is required",
              })}
            >
              <option value="">Please Select</option>
              {mainServices.map((item, key) => {
                return (
                  <option value={item.slug} key={key}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            {errors.permittedService && (
              <span className="text-rose-600 text-sm mt-1">{`${errors.permittedService.message}`}</span>
            )}
          </div>
        </div>

        <div className="gap-4 grid grid-cols-3">
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
        </div>

        <input
          type="submit"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        />
      </form>
      {errorRegister !== "" && (
        <div className={`text-white rounded-md bg-red-600 px-4 py-2`}>
          {errorRegister}
        </div>
      )}
      {successRegister !== "" && (
        <div className={`text-white rounded-md bg-green-600 px-4 py-2`}>
          {successRegister}
        </div>
      )}
    </>
  );
};

export default CreateDoctor;
