export default function Header({ title, description, imageURL }) {
  return (
    <>
      <header className="py-2 m-3">
        <div className="header-container container-fluid rounded-4 p-5 d-flex">
          <div className="d-flex flex-column justify-content-center text-white flex-grow-1">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="w-75 text-end">
            <img src={imageURL} alt="Header Image" />
          </div>
        </div>
      </header>
    </>
  );
}
