interface IHeader {
  title: string;
  description: string;
  imageURL: string;
}

export default function Header({ title, description, imageURL }:IHeader) {
  return (
    <>
      <header className="py-1 m-2">
        <div className="header-container container-fluid rounded-4 p-5 d-flex">
          <div className="d-flex flex-column justify-content-center text-white ">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="w-75 text-end">
            <img src={imageURL} alt="Header Image" className="image-header" />
          </div>
        </div>
      </header>
    </>
  );
}
