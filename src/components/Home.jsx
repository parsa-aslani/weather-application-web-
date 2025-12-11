// import
import { useState } from "react";
import InstallButton from "./InstallAppBtrron";
import ShowWeather from "./ShowWeather";
// axios
import axios from "axios";
// react icons
import { BsEmojiGrin } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
// react router
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./Loading";
// set jsx
const Home = () => {
  const API_KEY = "712148d49a5440f097b181649250712";
  const URL = "https://api.weatherapi.com/v1/forecast.json";
  // state
  const [city, setcity] = useState("");
  const [weather, setweather] = useState(null);
  const [error, seterror] = useState(null);
  const [loader, setloader] = useState(false);
  // get data
  const fetch_wether = async () => {
    setweather(null);
    seterror(null);
    if (!navigator.onLine) {
      seterror("اینترنتت رو چک کن");
      setcity("");
      setweather(null);
      return;
    }
    seterror(null);
    try {
      setloader(true);
      const { data } = await axios.get(`${URL}`, {
        params: {
          q: city,
          key: API_KEY,
          days: 7,
          lang: "fa",
        },
      });
      setweather(data);
      setcity("");
      setloader(false);
    } catch (err) {
      seterror("شهری که دنبالشی رو پیدا نکردم");
      setcity("");
      setweather(null);
      setloader(false);
    }
  };
  // check city
  const checkcity = () => {
    if (city) {
      fetch_wether();
    } else {
      toast.error("لطفا نام شهر را وارد کنید");
    }
  };
  return (
    <div style={{ height: weather ? "auto" : "100vh" }} className="container">
      <div className="search-box">
        <div className="card">
          <h1 className="site-title">وب اپلیکیشن اب و هوا شناسی</h1>
          <div className="card-buttons">
            <InstallButton />
            <Link to="/favorite" className="install-button">
              شهر های مورد علاقه
            </Link>
          </div>
          <div className="search-input-box">
            <input
              type="text"
              placeholder="نام شهر ..."
              className="search-city"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? checkcity() : null)}
            />
            <button className="search-button" onClick={checkcity}>
              <IoSearchSharp />
            </button>
          </div>
        </div>
        {loader ? (
          <biv style={{ marginTop: "1.5rem" }}>
            <Loading />
          </biv>
        ) : error ? (
          <div className="error">
            <h2 className="error-text">
              {error} <BsEmojiGrin className="error-icon" />
            </h2>
          </div>
        ) : null}
        {weather ? (
          <ShowWeather showaddfavorite={true} weather={weather} />
        ) : null}
      </div>
    </div>
  );
};
export default Home;
