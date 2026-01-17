import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IVerifyForm {
  email: string;
  code: string;
}

export default function VerifyAcc() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IVerifyForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: IVerifyForm) => {
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        data
      );
      console.log(response);
      toast.success("You've verified your account successfully");
      navigate("/login");
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
        <h4>Verify Account</h4>
        <p className="text-muted">Please Enter Your Otp or Check Your Inbox</p>
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
              placeholder="E-mail"
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
              aria-label="otp"
              aria-describedby="basic-addon1"
              {...register("code", {
                required: "You must enter your otp",
              })}
            />
            
          </div>
          {errors.code && (
            <div className="alert alert-danger p-2">
              {errors.code.message}
            </div>
          )}
          
          <div>
            <button className="buttons btn w-100 mt-4 mb-3">Send</button>
          </div>
        </div>
      </form>
    </>
  );
}
