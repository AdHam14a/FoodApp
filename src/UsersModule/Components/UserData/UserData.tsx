import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

interface IUserForm {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  userImage?: FileList;
}

interface UserDataProps {
  show: boolean;
  handleClose: () => void;
  refreshList: () => void;
}

export default function UserData({
  show,
  handleClose,
  refreshList,
}: UserDataProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IUserForm>();

  const password = watch("password");

  const appendToFormdata = (data: IUserForm) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    if (data.userImage && data.userImage[0]) {
      formData.append("userImage", data.userImage[0]);
    }
    return formData;
  };

  const onSubmit = async (data: IUserForm) => {
    try {
      const userData = appendToFormdata(data);
      await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("User Added Successfully");
      reset();
      refreshList();
      handleClose();
    } catch (error) {
      const axiosError = error as AxiosError;
      const message =
        (axiosError.response?.data as { message: string })?.message ||
        "Error occurred";
      toast.error(message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="border-0 px-4 pt-4 d-flex justify-content-between align-items-center">
        <Modal.Title className="fw-bold">Add User</Modal.Title>
        <div
          onClick={handleClose}
          className="d-flex justify-content-center align-items-center"
          style={{
            cursor: "pointer",
            width: "30px",
            height: "30px",
            border: "1px solid #dc3545",
            borderRadius: "50%",
            color: "#dc3545",
          }}
        >
          <i className="fa-solid fa-xmark" style={{ fontSize: "14px" }}></i>
        </div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="px-4 py-3">
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
                    required: "User name is required",
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
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
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

            <div className="col-md-6">
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Country"
                  className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                    errors.country ? "is-invalid" : ""
                  }`}
                  {...register("country", {
                    required: "Country is required",
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
                    required: "Phone number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <span className="text-danger small ms-1">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mt-3">
                <input
                  type="password"
                  placeholder="Password"
                  className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-danger small ms-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mt-3">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-danger small ms-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className="mt-3">
                <input
                  type="file"
                  accept="image/*"
                  className={`form-control border-0 bg-light py-3 px-3 shadow-none ${
                    errors.userImage ? "is-invalid" : ""
                  }`}
                  {...register("userImage")}
                />
                {errors.userImage && (
                  <span className="text-danger small ms-1">
                    {errors.userImage.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 pb-4 mt-3">
          <Button
            type="submit"
            variant="success"
            className="px-5 py-2 fw-bold rounded-3"
            style={{ backgroundColor: "#009247", borderColor: "#009247" }}
          >
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

