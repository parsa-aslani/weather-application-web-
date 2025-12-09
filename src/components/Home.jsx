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
// set jsx
const Home = () => {
  const API_KEY = "34af916d0ad9927afcf6e984258a2ab2";
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  // state
  const [city, setcity] = useState("");
  const [weather, setweather] = useState(null);
  const [error, seterror] = useState(null);
  const [sunrise, setsunrise] = useState(null);
  const [sunset, setsunset] = useState(null);
  // get data
  const fetch_wether = async () => {
    if (!navigator.onLine) {
      seterror("اینترنتت رو چک کن");
      setcity("");
      setweather(null);
      setsunrise(null);
      setsunset(null);
      return;
    }
    seterror(null);
    try {
      const { data } = await axios.get(`${URL}`, {
        params: {
          q: city,
          units: "metric",
          appid: API_KEY,
          lang: "fa",
        },
      });

      const getsunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
        "fa-IR",
        {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Tehran",
        }
      );

      const getsunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(
        "fa-IR",
        {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Tehran",
        }
      );
      setsunrise(getsunrise);
      setsunset(getsunset);
      setweather(data);
      setcity("");
    } catch (err) {
      seterror("شهری که دنبالشی رو پیدا نکردم");
      setcity("");
      setweather(null);
      setsunrise(null);
      setsunset(null);
    }
  };
  // check city
  const checkcity = () => {
    if (city) {
      fetch_wether();
    } else {
      toast.error("مطفا نام شهر را وارد کنید");
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
        {error ? (
          <div className="error">
            <h2 className="error-text">
              {error} <BsEmojiGrin className="error-icon" />
            </h2>
          </div>
        ) : null}
        {weather ? (
          <ShowWeather
            showaddfavorite={true}
            sunrise={sunrise}
            sunset={sunset}
            weather={weather}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Home;
