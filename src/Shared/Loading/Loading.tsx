import { RotatingSquare } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <RotatingSquare
          visible={true}
          height="100"
          width="100"
          color="#4aa35a"
          ariaLabel="rotating-square-loading"
        />
      </div>
    </>
  );
}
