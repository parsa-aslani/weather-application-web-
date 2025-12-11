// import
import sun from "../images/sun.gif";
import moon from "../images/moon.gif";
// react icons
import { FaWind } from "react-icons/fa6";
import { BsFillCompassFill } from "react-icons/bs";
import { IoWater, IoRainy } from "react-icons/io5";
import { FaCloudSun } from "react-icons/fa6";
// react toastify
import { toast } from "react-toastify";
import { format } from "date-fns-jalali";
import { useRef } from "react";
import Swal from "sweetalert2";
const ShowWeather = ({
  weather,
  showaddfavorite,
  setweather,
  allweather,
  seterror,
}) => {
  const scroolref = useRef(null);
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
  // get uv
  const getuvdescription = (uv) => {
    if (uv < 2) return "کم";
    if (uv < 5) return "متوسط";
    if (uv < 7) return "زیاد";
    if (uv > 7) return "خیلی زیاد";
  };
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
  // show remove alert
  const removealert = (city) => {
    Swal.fire({
      title: "ایا از حذف شهر اطمینان دارید ؟",
      icon: "question",
      showCancelButton: true,
      showCloseButton: true,
      cancelButtonText: "انصراف",
      confirmButtonText: "تایید",
      confirmButtonColor: "#489b59ff",
      cancelButtonColor: "#bd3e3eff",
    }).then((result) => {
      if (result.isConfirmed) {
        removefavorite(city);
      }
    });
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
          (cities) => cities.data.location.name !== city
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
        <h1 className="city-name">
          {weather.location.name}
          <span className="country-name">({weather.location.country})</span>
        </h1>
      </div>
      {showaddfavorite ? (
        <button
          className="add-to-favorite"
          onClick={() => addfavorite(weather.location.name)}
        >
          افزودن به علاقه مندی
        </button>
      ) : (
        <button
          className="add-to-favorite"
          onClick={() => removealert(weather.location.name)}
        >
          حذف از علاقه مندی
        </button>
      )}

      <div className="main-weather">
        <div>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="weather-img"
          />
          <p className="weather-description">
            {weather.current.condition.text}
          </p>
        </div>
        <div className="temp-box">
          <div className="temp">
            <sup className="deg-icon">&deg;C</sup>
            <h1 className="temp-number">
              {Math.round(weather.current.temp_c)}
            </h1>
          </div>
          <p className="min-max-temp">
            {weather.forecast.forecastday[0].day.mintemp_c}&deg; <span>/</span>
            {weather.forecast.forecastday[0].day.maxtemp_c}&deg;
          </p>
          <h4 className="feels_like">
            دمای محسوس: &deg;{Math.round(weather.current.feelslike_c)}
          </h4>
        </div>
      </div>
      <div className="next-days-weathers">
        {weather.forecast.forecastday.map((forecastday, index) => (
          <div key={index} className="nexts-day">
            <div style={{ margin: "auto 0", textAlign: "start" }}>
              <p className="next-day-date">
                {format(new Date(forecastday.date), "yyyy/MM/dd")}
              </p>
              <p className="next-day-discription">
                {forecastday.day.condition.text}
              </p>
            </div>
            <div className="next-day-informations">
              <div>
                <p className="next-day-rainvalue">
                  <IoWater />
                  {forecastday.day.totalprecip_mm} mm
                </p>
                <p className="min-max-temp">
                  {Math.round(forecastday.day.mintemp_c)}&deg; <span>/</span>
                  {Math.round(forecastday.day.maxtemp_c)}&deg;
                </p>
              </div>
              <img
                src={forecastday.day.condition.icon}
                alt={forecastday.day.condition.text}
                className="next-day-img"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="hour-weather-box">
        <h2 className="hour-weathers-title">اب و هوای ساعتی</h2>
        <div
          ref={scroolref}
          className="hour-weathers"
          onWheel={(e) => {
            e.preventDefault();
            scroolref.current.scrollLeft += e.deltaY * 2.5;
            scroolref.current.style.scrollBehavior += "smooth";
          }}
        >
          {weather.forecast.forecastday[0].hour.map((hour, index) => (
            <div key={index} className="hour-data">
              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                className="hour-image"
              />
              <h4 className="hour-time">
                {hour.time.split(" ")[1].split(":")[0]}
              </h4>
              <h4 className="hour-temp">{hour.temp_c}&deg;</h4>
              <p className="hour-rain">بارش : {hour.precip_mm} mm</p>
            </div>
          ))}
        </div>
      </div>
      <div className="weather-sunset-sunrise">
        <div className="sunrise-box">
          <img src={sun} alt="طلوع" className="sunrise-img" />
          <h3 className="sunrise-time">
            طلوع : {weather.forecast.forecastday[0].astro.sunrise}
          </h3>
        </div>
        <div className="sunset-box">
          <img src={moon} alt="غروب" className="sunset-img" />
          <h3 className="sunset-time">
            غروب : {weather.forecast.forecastday[0].astro.sunset}
          </h3>
        </div>
      </div>
      <div className="another-data">
        <div className="another-data-box">
          <h2 className="another-data-title">اطلاعات اب و هوایی</h2>
          <div className="weather-informations">
            <p className="weather-information">
              <IoWater className="weather-information-icon" /> رطوبت هوا :{" "}
              <span>{weather.current.humidity}%</span>
            </p>
            <p className="weather-information">
              <FaCloudSun className="weather-information-icon" />
              مقدار پوشش ابر : <span>{weather.current.cloud}%</span>
            </p>
            <p className="weather-information">
              <FaWind className="weather-information-icon" /> سرعت باد :{" "}
              <span>{weather.current.wind_kph}km/h</span>
            </p>
            <p className="weather-information">
              <BsFillCompassFill className="weather-information-icon" /> جهت باد
              : <span>{getWindDirection(weather.current.wind_degree)}</span>
            </p>
            <p className="weather-information">
              <BsFillCompassFill className="weather-information-icon" /> شاخص uv
              خورشید : <span>{getuvdescription(weather.current.uv)}</span>
            </p>
            <p className="weather-information">
              <IoRainy className="weather-information-icon" /> بارش در 1 ساعت :
              <span>{weather.current.precip_mm} mm</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowWeather;
