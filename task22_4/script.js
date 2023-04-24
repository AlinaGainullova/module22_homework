const coordinates = document.querySelector("#coordinates");
const btn = document.querySelector(".j-btn-test");
const timezone = document.querySelector("#timezone");
const time = document.querySelector("#time");

// Вывод ошибки
const error = () => {
    coordinates.textContent = "Информация о местоположении недоступна";
};

// Вывод при успешном получении данных
const success = (position) => {
    console.log("position", position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    coordinates.textContent = `Ваши координаты: широта ${latitude} °, долгота ${longitude} °`;
    timezone.textContent = "Определяется временная зона";
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            timezone.textContent = data.timezone;
            time.textContent = data.date_time_txt;
        })
        .catch((error) => {
            timezone.textContent = "Не удается определить временную зону.";
            time.textContent = "";
            console.log("Не удается определить время");
        });
};

btn.addEventListener("click", () => {
    screen.textContent = `Ваш размер экрана: ${window.screen.width}x${window.screen.height}`;
    if (!navigator.geolocation) {
        coordinates.textContent = "Геолокация не поддерживается вашим браузером";
    } else {
        coordinates.textContent = "Определяется ваше местоположение";
        navigator.geolocation.getCurrentPosition(success, error);
    }
});


