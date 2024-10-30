// WeatherAPI의 API 키
const apiKey = 'd4dc84593cc34178afe73800243010';

function getWeather() {
    const location = document.getElementById("location-input").value;
    const weatherResult = document.getElementById("weather-result");

    if (!location) {
        weatherResult.innerHTML = "<p>도시 이름을 입력해주세요.</p>";
        return;
    }

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=ko`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                weatherResult.innerHTML = `<p>날씨 정보를 가져올 수 없습니다. 도시 이름을 확인해주세요.</p>`;
            } else {
                weatherResult.innerHTML = `
                    <div class="weather-location">
                        <p><strong>${data.location.name}, ${data.location.region}</strong></p>
                    </div>
                    <div class="weather-info">
                        <div>
                            <img src="${data.current.condition.icon}" alt="날씨 아이콘">
                            <strong>${data.current.temp_c}°C</strong>
                            <p>${data.current.condition.text}</p>
                        </div>
                        <div>
                            <p>체감 온도</p>
                            <strong>${data.current.feelslike_c}°C</strong>
                        </div>
                    </div>
                    <div class="weather-details">
                        <p><strong>습도:</strong> ${data.current.humidity}%</p>
                        <p><strong>풍속:</strong> ${data.current.wind_kph} km/h</p>
                        <p><strong>자외선 지수:</strong> ${data.current.uv}</p>
                        <p><strong>강수량:</strong> ${data.current.precip_mm} mm</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            weatherResult.innerHTML = "<p>날씨 정보를 가져오는 도중 오류가 발생했습니다.</p>";
            console.error("Error fetching weather data:", error);
        });
}
