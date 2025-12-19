import { Button, Modal } from "react-bootstrap";
import confirm from "../../assets/NoData.png";

interface ConfirmationProps {
  show: boolean;
  handleClose: () => void;
  deleteAction: () => void;
  title?: string;
}

export default function Confirmation({
  show,
  handleClose,
  deleteAction,
  title,
}: ConfirmationProps) {
  return (
    <Modal show={show} onHide={handleClose} centered >
      <Modal.Header closeButton className="border-0"></Modal.Header>

      <Modal.Body className="text-center px-4">
        <img
          src={confirm}
          alt="confirm"
          className="d-block mx-auto mt-3"
          style={{ width: "15rem" }}
        />
        <h3 className="my-3">Delete this {title}</h3>
        <p className="text-muted">
          Are you sure you want to delete this item? If you are sure, just click
          on delete.
        </p>
      </Modal.Body>

      <Modal.Footer className="border-0 d-flex justify-content-end pb-4">
        <Button
          variant="outline-danger"
          className="px-5"
          onClick={() => {
            deleteAction();
            handleClose();
          }}
        >
          Delete this item
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
