import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import axios from "axios";

function UserOnBoarding() {
  const [errorLogin, setErrorOnBoarding] = React.useState("");
  const [successLogin, setSuccessOnBoarding] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const _accessToken = sessionStorage.getItem("accessToken");
    const _userStorage = sessionStorage.getItem("user");

    if (!_accessToken) {
      navigate("/");

      return;
    }

    if (!_userStorage) {
      navigate("/");

      return;
    }

    const _user = JSON.parse(_userStorage);

    if (_user?.isOnBoarding === 0) {
      navigate("/user-dashboard");

      return;
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    const _userStorage = sessionStorage.getItem("user");

    const _user = JSON.parse(_userStorage);

    try {
      const _response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/v1/user/auth/onboarding`, {
        ...values,
        user: _user,
      });

      if (_response?.data?.status === 1) {
        _user.isOnBoarding = 0;
        sessionStorage.setItem("user", JSON.stringify(_user));
        setSuccessOnBoarding("Health Records saved. You will be redirect to Dashboard");
        navigate("/user-dashboard");

        return;
      }
    } catch (error) {
      setErrorOnBoarding(error?.response?.data?.msg);
    }
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[720px]">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-center">Fill To Continue</h1>
          <p className="text-center text-sm">Add NA if not available</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col spacing-y-5">
              <textarea
                className={
                  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                {...register("allergies", { required: "Allergies is required" })}
                placeholder="Allergies"
                rows="2"
              />
              {errors.allergies && <span className="text-rose-600 text-sm mt-1">{`${errors.allergies.message}`}</span>}
            </div>

            <div>
              <textarea
                className={
                  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                {...register("medications", { required: "Medications is required" })}
                placeholder="Medications"
                rows="2"
              />
              {errors.medications && (
                <span className="text-rose-600 text-sm mt-1">{`${errors.medications.message}`}</span>
              )}
            </div>

            <div>
              <textarea
                className={
                  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                {...register("skinConditions", { required: "Skin Conditions is required" })}
                placeholder="Skin Conditions"
                rows="2"
              />
              {errors.skinConditions && (
                <span className="text-rose-600 text-sm mt-1">{`${errors.skinConditions.message}`}</span>
              )}
            </div>

            <div className="flex flex-col spacing-y-5">
              <textarea
                className={
                  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                {...register("preTreatment", { required: "Previous / Ongoing Treatment is required" })}
                placeholder="Previous / Ongoing Treatment"
                rows="2"
              />
              {errors.preTreatment && (
                <span className="text-rose-600 text-sm mt-1">{`${errors.preTreatment.message}`}</span>
              )}
            </div>

            <div className="flex flex-col spacing-y-5">
              <textarea
                className={
                  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                {...register("insInfo", { required: "Insurance Information is required" })}
                placeholder="Insurance Information"
                rows="2"
              />
              {errors.insInfo && <span className="text-rose-600 text-sm mt-1">{`${errors.insInfo.message}`}</span>}
            </div>

            <div className="flex flex-col spacing-y-5">
              <input
                type={"text"}
                className={
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                {...register("emergencyContact", { required: "Emergency Contact is required" })}
                placeholder="Emergency Contact"
                maxLength="10"
              />
              {errors.emergencyContact && (
                <span className="text-rose-600 text-sm mt-1">{`${errors.emergencyContact.message}`}</span>
              )}
            </div>

            <div className="flex flex-col spacing-y-5">
              <input
                type={"text"}
                className={
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                {...register("consentFrom", { required: "Consent From is required" })}
                placeholder="Consent From"
                maxLength="10"
              />
              {errors.consentFrom && (
                <span className="text-rose-600 text-sm mt-1">{`${errors.consentFrom.message}`}</span>
              )}
            </div>

            <div className="flex flex-col spacing-y-5">
              <textarea
                className={
                  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                {...register("other")}
                placeholder="Other"
                rows="2"
              />
            </div>

            <input
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            />
          </form>
          {errorLogin !== "" && <div className={`text-white rounded-md bg-red-600 px-4 py-2`}>{errorLogin}</div>}
          {successLogin !== "" && <div className={`text-white rounded-md bg-green-600 px-4 py-2`}>{successLogin}</div>}
        </div>
      </div>
    </div>
  );
}

export default UserOnBoarding;
