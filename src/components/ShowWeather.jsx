// import
import sun from "../images/sun.gif";
import moon from "../images/moon.gif";
// react icons
import { FaWind } from "react-icons/fa6";
import { BsFillCompassFill } from "react-icons/bs";
import { IoWater, IoSnow, IoRainy } from "react-icons/io5";
import { FaCloudSun } from "react-icons/fa6";
// react toastify
import { toast } from "react-toastify";
const ShowWeather = ({
  weather,
  showaddfavorite,
  sunrise,
  sunset,
  setweather,
  allweather,
  seterror,
}) => {
  // get Wind Direction
  function getWindDirection(deg) {
    if (deg >= 337.5 || deg < 22.5) return "شمال";
    if (deg >= 22.5 && deg < 67.5) return "شمال‌شرق";
    if (deg >= 67.5 && deg < 112.5) return "شرق";
    if (deg >= 112.5 && deg < 157.5) return "جنوب‌شرق";
    if (deg >= 157.5 && deg < 202.5) return "جنوب";
    if (deg >= 202.5 && deg < 247.5) return "جنوب‌غرب";
    if (deg >= 247.5 && deg < 292.5) return "غرب";
    if (deg >= 292.5 && deg < 337.5) return "شمال‌غرب";
  }
  // add favorite
  const addfavorite = async (city) => {
    const getfavorite = localStorage.getItem("favorite");
    if (!getfavorite) {
      localStorage.setItem("favorite", JSON.stringify([city]));
      toast.success("شهر به علاقه مندی ها افزوده شد");
    } else {
      const previouscities = JSON.parse(getfavorite);
      if (previouscities.length < 10) {
        const existsity = previouscities.find((cities) => cities === city);
        if (!existsity) {
          previouscities.push(city);
          localStorage.setItem("favorite", JSON.stringify(previouscities));
          toast.success("شهر به علاقه مندی ها افزوده شد");
        } else {
          toast.info("این شهر در علاقه مندی ها وجود دارد");
        }
      } else {
        toast.error("حداکثر تعداد شهر مورد علاقه 7 است");
      }
    }
  };
  // remove favorite
  const removefavorite = (city) => {
    const getfavorite = localStorage.getItem("favorite");

    if (getfavorite) {
      const previouscities = JSON.parse(getfavorite);
      if (previouscities.length !== 1) {
        const copyweather = [...allweather];
        const notdeletedcities = previouscities.filter(
          (cities) => cities !== city
        );
        const notdeletedweather = copyweather.filter(
          (cities) => cities.data.name !== city
        );
        localStorage.setItem("favorite", JSON.stringify(notdeletedcities));
        setweather(notdeletedweather);
      } else {
        localStorage.removeItem("favorite");
        setweather(null);
        seterror("شهر مورد علاقه‌ای وجود ندارد");
      }
      toast.success("شهر با موفقیت حذف شد");
    }
  };
  return (
    <div className="weather">
      <div className="weather-head">
        <h3 className="country-name">{weather.sys.country}</h3>
        <h1 className="city-name">{weather.name}</h1>
      </div>
      {showaddfavorite ? (
        <button
          className="add-to-favorite"
          onClick={() => addfavorite(weather.name)}
        >
          افزودن به علاقه مندی
        </button>
      ) : (
        <button
          className="add-to-favorite"
          onClick={() => removefavorite(weather.name)}
        >
          حذف از علاقه مندی
        </button>
      )}

      <div className="main-weather">
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="weather-img"
          />
          <p className="weather-description">
            {weather.weather[0].description}
          </p>
        </div>
        <div className="temp-box">
          <div className="temp">
            <sup className="deg-icon">&deg;C</sup>
            <h1 className="temp-number">{Math.round(weather.main.temp)}</h1>
          </div>
          <h4 className="feels_like">
            دمای محسوس: &deg;{Math.round(weather.main.feels_like)}
          </h4>
        </div>
      </div>
      {sunrise ? (
        <div className="weather-sunset-sunrise">
          <div className="sunrise-box">
            <img src={sun} alt={sunrise} className="sunrise-img" />
            <h3 className="sunrise-time">طلوع : {sunrise}</h3>
          </div>
          <div className="sunset-box">
            <img src={moon} alt={sunset} className="sunset-img" />
            <h3 className="sunset-time">غروب : {sunset}</h3>
          </div>
        </div>
      ) : null}
      <div className="another-data">
        <div className="another-data-box">
          <h2 className="another-data-title">اطلاعات اب و هوایی</h2>
          <div className="weather-informations">
            <p className="weather-information">
              <IoWater className="weather-information-icon" /> رطوبت هوا :{" "}
              <span>{weather.main.humidity}%</span>
            </p>
            <p className="weather-information">
              <FaCloudSun className="weather-information-icon" />
              مقدار پوشش ابر : <span>{weather.clouds.all}%</span>
            </p>
            <p className="weather-information">
              <FaWind className="weather-information-icon" /> سرعت باد :{" "}
              <span>{weather.wind.speed}km/h</span>
            </p>
            <p className="weather-information">
              <BsFillCompassFill className="weather-information-icon" /> جهت باد
              : <span>{getWindDirection(weather.wind.deg)}</span>
            </p>
            <p className="weather-information">
              <IoSnow className="weather-information-icon" /> بارش برف در 1 ساعت
              : <span>{weather.snow ? weather.snow["1h"] : 0} mm</span>
            </p>
            <p className="weather-information">
              <IoRainy className="weather-information-icon" /> بارش باران در 1
              ساعت : <span>{weather.rain ? weather.rain["1h"] : 0} mm</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowWeather;
