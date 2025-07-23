import "./notfound.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full overflow-y-hidden bg-[#F2EEE8] pt-8">
      <div className="face">
        <div className="band">
          <div className="red"></div>
          <div className="white"></div>
          <div className="blue"></div>
        </div>
        <div className="eyes"></div>
        <div className="dimples"></div>
        <div className="mouth"></div>
      </div>

      <h1>Oops! Something went wrong!</h1>
      <Link to={"/"}>
        <div className="btn">Return to Home</div>
      </Link>
    </div>
  );
};

export default NotFoundPage;
