const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  // 필요한 변수를 저장한다!
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  // 브라우저가 해당 URL로 이동해서 응답을 얻는다
  // 개발자도구의 네트워크창에서 URL로 요청하고 응답하는 것을 확인할 수 있다
  // fetch는 promise의 일종인데, promise는 당장 일어나지 않고 시간이 좀 걸린뒤에 일어난다
  fetch(url)
    // 서버의 응답을 받을 때까지 기다린 다음에 실행하기 위해 then메서드를 사용한다
    // 자세한 설명은 wetube에서....
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

/* 
사용자의 위치를 가져오기 위해
navigator.geolocation.getCurrentPosition()
해당 메서드를 호출하면 브라우저가 위치좌표 `getCurrentPosition Position`를 준다
내가 위치하는 위도 `longitude` 와 경도 `latitude` 확인가능

getCurrentPosition(잘 되었을 때 실행될 함수, 에러가 발생했을 때 실행할 함수);
*/

/* 
위도와 경도를 통해 현재 위치에 대한 날씨데이터를 받을 API를 활용해야 한다

*/


navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

