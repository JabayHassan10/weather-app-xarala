import React, { Component, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("Dakar");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let weatherEffect = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ceafa795dd2318e541619bb979c9ed99`
      );
      if (weatherEffect) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        weatherEffect = false;
      };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main === "Sunny") {
      emoji = "fa-sun";
    }
    if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-bolt";
    }
    if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    }
    if (data.weather[0].main === "Rain") {
      emoji = "fa-rain";
    }
    if (data.weather[0].main === "Snow") {
      emoji = "fa-snow";
    }
    if (data.weather[0].main === "Smog") {
      emoji = "fa-smog";
    } else {
      emoji = "fa-cloud";
    }
  } else {
    return <div>...Chargement</div>;
  }

  // Format Date
  
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleDateString("default", { month: "long" });
  let day = d.toLocaleDateString("default", { weekday: "long" });

  // Format Heure

  let time = d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (Event) => {
    Event.preventDefault();
    setSearch(input);
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div class="card text-white text-center border-0">
              <img
                src="https://images.unsplash.com/photo-1428948304740-392e214d312f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlLHdhdGVyfHx8fHx8MTY2NjYxNzE5Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600"
                class="card-img"
                alt="..."
              />
              <div class="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div class="input-group mb-5 w-75 mx-auto">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Rechercher une ville"
                      aria-label="Rechercher une ville"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      class="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-5">
                  <h2 class="card-title">{data.name}</h2>
                  <p class="card-text lead">
                    {day}, {date}, {month}, {year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">{data.main.temp.toFixed()}&deg;C</h1>
                  <p className="lead fw-bolder mb-2">{data.weather[0].main}</p>
                  <p className="lead">
                    Maximale {data.main.temp_max.toFixed()}&deg;C | Minimale {data.main.temp_min.toFixed()}&deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
