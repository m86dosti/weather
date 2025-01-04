      const apiKey = "f1bad747285341adb2ef020ec59586a0";
      const cities = [
        "تهران",
        "مشهد",
        "اصفهان",
        "شیراز",
        "تبریز",
        "اهواز",
        "قم",
        "کرج",
        "ارومیه",
        "زاهدان",
        "کرمان",
        "خرم‌آباد",
        "سنندج",
        "ساری",
        "بوشهر",
        "چالوس",
        "میاندوآب",
        "آستارا",
        "ایلام",
        "یکتا",
      ];

      function getWeatherByCity(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        return fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error("شهر یافت نشد");
          }
          return response.json();
        });
      }

      document
        .getElementById("get-weather")
        .addEventListener("click", function () {
          const city = document.getElementById("city-input").value.trim();
          if (city === "") {
            document.getElementById("weather-result").innerText =
              "لطفاً یک شهر وارد کنید.";
            document.getElementById("weather-result").style.display = "block";
            return;
          }

          getWeatherByCity(city)
            .then((data) => displayWeather(data))
            .catch((error) => {
              document.getElementById("weather-result").innerText =
                error.message;
              document.getElementById("weather-result").style.display = "block";
            });
        });

      function displayWeather(data) {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const iconCode = data.weather[0].icon;

        document.getElementById("weather-result").innerHTML = `  
                <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${weatherDescription}" class="weather-icon" />  
                <div>دما: ${temperature}°C</div>  
                <div>وضعیت: ${weatherDescription}</div>  
                <div>رطوبت: ${humidity}%</div>  
                <div>سرعت باد: ${windSpeed} m/s</div>  
            `;
        document.getElementById("weather-result").style.display = "block";
      }

      document
        .getElementById("city-input")
        .addEventListener("input", function () {
          const input = this.value.trim().toLowerCase();
          const suggestionsDiv = document.getElementById("suggestions");
          suggestionsDiv.innerHTML = "";
          if (input.length > 0) {
            const filteredCities = cities.filter((city) =>
              city.toLowerCase().includes(input)
            );

            filteredCities.forEach((city) => {
              const cityDiv = document.createElement("div");
              cityDiv.innerText = city;
              cityDiv.addEventListener("click", function () {
                document.getElementById("city-input").value = city;
                suggestionsDiv.innerHTML = "";
                suggestionsDiv.style.display = "none";
              });
              suggestionsDiv.appendChild(cityDiv);
            });

            if (filteredCities.length > 0) {
              suggestionsDiv.style.display = "block";
            } else {
              suggestionsDiv.style.display = "none";
            }
          } else {
            suggestionsDiv.style.display = "none";
          }
        });
