import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      console.log(res);
      toast.success("You've logged in suuccessfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="title mt-3 mb-4">
        <h4>Log In</h4>
        <p className="text-muted">Welcome Back! Please enter your details</p>
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
              placeholder="Enter your E-mail"
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
              type="password"
              className="form-control"
              placeholder="Password"
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
          <div className="links d-flex justify-content-between">
            <Link to="/register" className="text-decoration-none text-black">
              Register Now?
            </Link>
            <Link
              to="/forget-pass"
              className="text-decoration-none random-text"
            >
              Forgot Password?
            </Link>
          </div>
          <div>
            <button className="buttons btn w-100 mt-4 mb-3">Login</button>
          </div>
        </div>
      </form>
    </>
  );
}
