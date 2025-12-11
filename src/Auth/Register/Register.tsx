import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";

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

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterForm>();

  const pass = useWatch({control,name:"password"})

  const onSubmit = async (data: IRegisterForm) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
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
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-mobile"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="UserName"
                {...register("userName", {
                  required: "You must enter your username",
                })}
              />
            </div>
            {errors.userName && (
              <div className="alert alert-danger p-2 mt-1">
                {errors.userName.message}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-mobile"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                {...register("email", {
                  required: "You must enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter valid email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <div className="alert alert-danger p-2 mt-1">
                {errors.email.message}
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 ">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                {...register("country", {
                  required: "You must enter your country",
                })}
              />
            </div>
            {errors.country && (
              <div className="alert alert-danger p-2 mt-1">
                {errors.country.message}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-mobile"></i>
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="phoneNumber"
                {...register("phoneNumber", {
                  required: "You must enter your phone number",
                })}
              />
            </div>
            {errors.phoneNumber && (
              <div className="alert alert-danger p-2 mt-1">
                {errors.phoneNumber.message}
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 ">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={togglePass ? "text" : "password"}
                className="form-control"
                placeholder="New Password"
                {...register("password", {
                  required: "You must enter your password",
                })}
              />
              <span
                className="input-group-text toggleIcon"
                onClick={() => setTogglePass(!togglePass)}
              >
                {togglePass ? (
                  <i className="fa fa-eye-slash" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-eye" aria-hidden="true"></i>
                )}
              </span>
            </div>
            {errors.password && (
              <div className="alert alert-danger p-2 mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-mobile"></i>
              </span>
              <input
                type={toggleConfirmedPass ? "text" : "password"}
                className="form-control"
                placeholder="Confirm New Password"
                {...register("confirmPassword", {
                  required: "You must confirm your password",
                  validate: (value) =>
                    value === pass || "Password doesn't match",
                })}
              />
              <span
                className="input-group-text toggleIcon"
                onClick={() => setToggleConfirmedPass(!toggleConfirmedPass)}
              >
                {toggleConfirmedPass ? (
                  <i className="fa fa-eye-slash" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-eye" aria-hidden="true"></i>
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <div className="alert alert-danger p-2 mt-1">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-end ">
          <Link to="/" className="text-decoration-none random-text">
            Login Now?
          </Link>
        </div>

        <div>
          <button className="buttons btn w-100 mt-4 mb-2">Register</button>
        </div>
      </form>
    </>
  );
}
