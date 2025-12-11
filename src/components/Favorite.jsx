import axios from "axios";
import { useEffect, useState } from "react";
// react icons
import { BsEmojiGrin } from "react-icons/bs";
import ShowWeather from "./ShowWeather";
import Loading from "./Loading";
const Favorite = ({ setweather, weather }) => {
  const API_KEY = "712148d49a5440f097b181649250712";
  const URL = "https://api.weatherapi.com/v1/forecast.json";
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
                key: API_KEY,
                days: 7,
                lang: "fa",
              },
            });

            return {
              data,
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
              setweather={setweather}
              allweather={weather}
              seterror={seterror}
            />
          ))
        ) : error ? null : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default Favorite;
