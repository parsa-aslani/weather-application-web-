import axios from "axios";
import { useEffect, useState } from "react";
// react icons
import { BsEmojiGrin } from "react-icons/bs";
import ShowWeather from "./ShowWeather";
const Favorite = ({ setweather, weather }) => {
  const API_KEY = "34af916d0ad9927afcf6e984258a2ab2";
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const [error, seterror] = useState(null);
  useEffect(() => {
    const getsities = async () => {
      const getfavorite = localStorage.getItem("favorite");

      if (!navigator.onLine) {
        seterror("اینترنتت رو چک کن");
        return;
      }
      if (!getfavorite) {
        seterror("شهر مورد علاقه‌ای وجود ندارد");
        return;
      }

      const previouscities = JSON.parse(getfavorite);

      try {
        const results = await Promise.all(
          previouscities.map(async (city) => {
            const { data } = await axios.get(URL, {
              params: {
                q: city,
                units: "metric",
                appid: API_KEY,
                lang: "fa",
              },
            });

            return {
              data,
              sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(
                "fa-IR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Asia/Tehran",
                }
              ),
              sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(
                "fa-IR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Asia/Tehran",
                }
              ),
            };
          })
        );

        setweather(results);
      } catch (err) {
        seterror("دریافت اطلاعات با مشکل مواجه شد");
      }
    };

    getsities();
  }, []);
  return (
    <div
      style={{ height: weather ? "auto" : "100vh" }}
      className="favorite-image"
    >
      <div className="favorite-container">
        {error ? (
          <div className="error">
            <h2 className="error-text">
              {error} <BsEmojiGrin className="error-icon" />
            </h2>
          </div>
        ) : null}
        {weather ? (
          weather.map((city, index) => (
            <ShowWeather
              key={index}
              showaddfavorite={false}
              weather={city.data}
              sunrise={city.sunrise}
              sunset={city.sunset}
              setweather={setweather}
              allweather={weather}
              seterror={seterror}
            />
          ))
        ) : error ? null : (
          <div className="loader-background">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Favorite;
