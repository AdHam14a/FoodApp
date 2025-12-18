import nodata from "../../assets/NoData.png";

export default function NoData() {
  return (
    <>
      <div className="my-3">
        <img src={nodata} alt="no-data" />
        <p className="mt-4 fw-medium">No Data !</p>
      </div>
    </>
  );
}
