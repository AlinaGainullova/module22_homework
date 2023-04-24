const wsUri = " wss://echo-ws-service.herokuapp.com";
const userMsg = document.querySelector('.user_msg');
const chatInput = document.querySelector('.chat_input');
const btnSend = document.querySelector('.btn_send');
const btnGeolocation = document.querySelector('.btn_geolocation');
const chatField =  document.querySelector('.chat_field');

function writeToScreen(message, position='flex-end') {
	let element = `
        <p class='message' style='align-self: ${position}'>
            ${message}
        </p>
    `;
	userMsg.innerHTML += element;
	chatField.scrollTop = chatField.scrollHeight;
  }

let websocket = new WebSocket(wsUri); 
websocket.onopen = function(evt) {
		console.log("CONNECTED");
	};
websocket.onmessage = function(evt) {
		writeToScreen(`${evt.data}`, 'flex-start');
	};
websocket.onerror = function(evt) {
		writeToScreen(`${evt.data}`, 'flex-start');
	};

btnSend.addEventListener('click', () => {
	let msg = chatInput.value;
	websocket.send(msg);
	writeToScreen(`${msg}`);
	chatInput.value = '';
  });

const error = () => {
	let errorTxt = 'Невозможно получить ваше местоположение';
	writeToScreen(errorTxt);
  };

const success = (position) => {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a class='maplink'  href='${mapLink}' target='_blank'>Ваша геолокация</a>`);
  };

btnGeolocation.addEventListener('click', () => {
	if (!navigator.geolocation) {
	  console.log('Geolocation не поддерживается вашим браузером');
	} else {
	  navigator.geolocation.getCurrentPosition(success, error);
	}
  });



