import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <h1 className="error-title">ERROR404</h1>
        <p className="error-discription">صفحه مورد نظر یافت نشد.</p>
        <Link to="/" className="go-home-btn">برگشت به صفحه اصلی</Link>
      </div>
    </div>
  );
};
export default Error404;
