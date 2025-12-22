import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

interface ICatForm {
  name: string; 
}

interface CategoryDataProps {
  show: boolean;
  handleClose: () => void;
  refreshList: () => void; 
}

export default function CategoryData({ show, handleClose, refreshList }: CategoryDataProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICatForm>();

  const onSubmit = async (data: ICatForm) => {
    try {
      await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Category Added Successfully");
      reset(); 
      refreshList();
      handleClose(); 
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
    <Modal show={show} onHide={handleClose} centered >
      <Modal.Header className="border-0 px-4 pt-4 d-flex justify-content-between align-items-center">
        <Modal.Title className="fw-bold">Add Category</Modal.Title>
        <div 
          onClick={handleClose}
          className="d-flex justify-content-center align-items-center"
          style={{
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            border: '1px solid #dc3545',
            borderRadius: '50%',
            color: '#dc3545'
          }}
        >
          <i className="fa-solid fa-xmark" style={{ fontSize: '14px' }}></i>
        </div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="px-4 py-3">
          <div className="mt-4">
            <input
              type="text"
              placeholder="Category Name"
              className={`form-control border-0 bg-light py-3 px-3 shadow-none ${errors.name ? 'is-invalid' : ''}`}
              {...register("name", { required: "Category name is required" })}
            />
            {errors.name && (
              <span className="text-danger small ms-1">{errors.name.message}</span>
            )}
          </div>
        </Modal.Body>

        {/* Footer with Green Save Button */}
        <Modal.Footer className="border-0 px-4 pb-4 mt-3">
          <Button
            type="submit"
            variant="success"
            className="px-5 py-2 fw-bold rounded-3"
            style={{ backgroundColor: '#009247', borderColor: '#009247' }}
          >
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}