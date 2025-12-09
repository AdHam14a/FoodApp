import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IResetPasswordForm {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

export default function ChangePass() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IResetPasswordForm>();

  const navigate = useNavigate();

  const pass = watch("password");

  const onSubmitHandler = async (data: IResetPasswordForm) => {
    try {
      const res = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      console.log(res);
      toast.success("You've changed your password successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="title mt-3 mb-4">
        <h3>Reset Password</h3>
        <p className="text-muted">Please Enter Your Otp or Check Your Inbox</p>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            aria-label="email"
            aria-describedby="basic-addon1"
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
          <div className="alert alert-danger p-2">{errors.email.message}</div>
        )}

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock"></i>{" "}
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="OTP"
            aria-label="OTP"
            aria-describedby="basic-addon1"
            {...register("seed", {
              required: "You must enter your otp",
            })}
          />
        </div>
        {errors.seed && (
          <div className="alert alert-danger p-2">{errors.seed.message}</div>
        )}

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock"></i>{" "}
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            aria-label="password"
            aria-describedby="basic-addon1"
            {...register("password", {
              required: "You must enter your password",
            })}
          />
        </div>
        {errors.password && (
          <div className="alert alert-danger p-2">
            {errors.password.message}
          </div>
        )}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock"></i>{" "}
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            aria-label="password"
            aria-describedby="basic-addon1"
            {...register("confirmPassword", {
              required: "You must confirm your password",
              validate: (value) => value === pass || "Password doesn't match",
            })}
          />
        </div>
        {errors.confirmPassword && (
          <div className="alert alert-danger p-2">
            {errors.confirmPassword.message}
          </div>
        )}

        <div>
          <button className="buttons btn w-100 mt-4 mb-3">
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
}
