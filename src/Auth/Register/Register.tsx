import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IRegisterForm {
  userName: string;
  email: string;
  country: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [togglePass, setTogglePass] = useState(false);
  const [toggleConfirmedPass, setToggleConfirmedPass] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegisterForm>();

  const pass = useWatch({ control, name: "password" });

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("country", data.country);
      formData.append("phoneNumber", data.phoneNumber.toString());
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Registration Successful");
      reset();
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error(
          (axiosError.response.data as { message: string }).message
        );
      } else {
        toast.error("An unknown error occurred during registration.");
      }
    }
  };
  return (
    <>
      <div className="title mt-3 mb-4">
        <h4>Register</h4>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="mt-3">
              <input
                type="text"
                placeholder="User Name"
                className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                  errors.userName ? "is-invalid" : ""
                }`}
                {...register("userName", {
                  required: "You must enter your username",
                })}
              />
              {errors.userName && (
                <span className="text-danger small ms-1">
                  {errors.userName.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mt-3">
              <input
                type="email"
                placeholder="Email"
                className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                  errors.email ? "is-invalid" : ""
                }`}
                {...register("email", {
                  required: "You must enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-danger small ms-1">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mt-3">
              <input
                type="text"
                placeholder="Country"
                className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                  errors.country ? "is-invalid" : ""
                }`}
                {...register("country", {
                  required: "You must enter your country",
                })}
              />
              {errors.country && (
                <span className="text-danger small ms-1">
                  {errors.country.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mt-3">
              <input
                type="text"
                placeholder="Phone Number"
                className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                  errors.phoneNumber ? "is-invalid" : ""
                }`}
                {...register("phoneNumber", {
                  required: "You must enter your phone number",
                })}
              />
              {errors.phoneNumber && (
                <span className="text-danger small ms-1">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mt-3 position-relative">
              <input
                type={togglePass ? "text" : "password"}
                placeholder="Password"
                className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password", {
                  required: "You must enter your password",
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
              {errors.password && (
                <span className="text-danger small ms-1">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mt-3 position-relative">
              <input
                type={toggleConfirmedPass ? "text" : "password"}
                placeholder="Confirm Password"
                className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                {...register("confirmPassword", {
                  required: "You must confirm your password",
                  validate: (value) =>
                    value === pass || "Password doesn't match",
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
              {errors.confirmPassword && (
                <span className="text-danger small ms-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Link to="/" className="text-decoration-none random-text">
            Login Now?
          </Link>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn w-100 py-2 fw-bold rounded-3"
            style={{
              backgroundColor: "#009247",
              borderColor: "#009247",
              color: "white",
            }}
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}
