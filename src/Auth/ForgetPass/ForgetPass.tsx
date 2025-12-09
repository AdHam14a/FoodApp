import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPass() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmitHandler = async(data) => {
    try {
      const res = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request", data);
      toast.success(`${res.data.message}`);
      navigate("/change-pass");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <div className="title mt-3 mb-4">
        <h4>Forgot Your Password?</h4>
        <p className="text-muted">
          No worries! Please enter your email and we will send a password reset
          link{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <div className="input-group mb-5">
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
        </div>
        <div>
            <button className="buttons btn w-100 mt-4 mb-3">Submit</button>
          </div>
      </form>
    </>
  );
}
