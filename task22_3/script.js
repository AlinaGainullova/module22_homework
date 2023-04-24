const screen = document.querySelector("#screen");
const coordinates = document.querySelector("#coordinates");
const btn = document.querySelector(".j-btn-test");

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