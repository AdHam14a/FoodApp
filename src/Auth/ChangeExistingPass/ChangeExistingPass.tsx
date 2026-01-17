import type { AxiosError } from "axios";
import axios from "axios";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IChangePass {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangeExistingPass() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IChangePass>();

  const pass = useWatch({ control, name: "confirmNewPassword" });

  const [togglePass, setTogglePass] = useState(false);
  const [toggleConfirmedPass, setToggleConfirmedPass] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: IChangePass) => {
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data
      );
      console.log(response);
      toast.success("You've changed your password successfully");
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error((axiosError.response.data as { message: string }).message);
      } else {
        toast.error("An unknown error occurred during request.");
      }
    }
  };
  return (
    <>
      <div className="title mt-3 mb-4">
        <h4>Change Your Password</h4>
        <p className="text-muted">Enter your details below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-mobile"></i>{" "}
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your old password"
              aria-label="old password"
              aria-describedby="basic-addon1"
              {...register("oldPassword", {
                required: "You must enter your old password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>
          {errors.oldPassword && (
            <div className="alert alert-danger p-2">
              {errors.oldPassword.message}
            </div>
          )}

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>{" "}
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your new password"
              aria-label="new password"
              aria-describedby="basic-addon1"
              {...register("newPassword", {
                required: "You must enter your new password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              className="position-absolute toggleIcon"
              onClick={() => setTogglePass(!togglePass)}
              style={{
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              {togglePass ? (
                <i className="fa fa-eye-slash" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-eye" aria-hidden="true"></i>
              )}
            </span>
          </div>
          {errors.newPassword && (
            <div className="alert alert-danger p-2">
              {errors.newPassword.message}
            </div>
          )}

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>{" "}
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your confirmed new password"
              aria-label="confirm new password"
              aria-describedby="basic-addon1"
              {...register("confirmNewPassword", {
                required: "You must confirm your new password",
                validate: (value) => value === pass || "Password doesn't match",
              })}
            />
            <span
              className="position-absolute toggleIcon"
              onClick={() => setToggleConfirmedPass(!toggleConfirmedPass)}
              style={{
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              {toggleConfirmedPass ? (
                <i className="fa fa-eye-slash" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-eye" aria-hidden="true"></i>
              )}
            </span>
          </div>
          {errors.confirmNewPassword && (
            <div className="alert alert-danger p-2">
              {errors.confirmNewPassword.message}
            </div>
          )}

          <div>
            <button className="buttons btn w-100 mt-4 mb-3">Verify</button>
          </div>
        </div>
      </form>
    </>
  );
}
