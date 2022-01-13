// querySelector: id, class 모두 검색 가능
const loginForm = document.querySelector("#login-form");
// const loginForm = document.getElementById("login-form");

const loginInput = document.querySelector("#login-form input");
// loginForm은 HTML element이기 때문에 => HTML element 안을 바로 검색 할 수 있다
// document대신 위에서 작성한 loginForm에서 검색할 수도 있다 (정밀검사)
// const loginInput = loginForm.querySelector('input');
// const loginButton = loginForm.querySelector("button");

/* 
=== input values 저장 ===
function handleLoginBtnClick() {
  console.dir(loginInput); 를 통해 console창에서 확인해보면
  console.log(loginInput.value); 로 하면 되는 걸 알 수 잇다
}
loginButton.addEventListener("click", handleLoginBtnClick);

=== input value 유효성검사: 빈값인지 너무 길지는 않는지 ===
function handleLoginBtnClick() {
  const username = loginInput.value;
  if (username === "") {
    alert("Please write your name.")
  } else if (username.length > 15) {
    alert("Your name is too long.")
  }
}

이렇게 자바스크립트를 활용해서 유효성검사를 해도 좋지만
이왕이면 더 쉬운 방법으로 검사할 수 있도록 해보자!

input의 required속성과 maxlength="15" 속성을 추가하면
위와 같은 자바스크립트 로직은 필요없게 된다

이렇게 input 혼자서 유효성검사를 할 수 있으려면
input이 form 안에 있어야 한다

=== 로직 정리 ===
<form id="login-form">
  <input required maxlength="15" type="text" placeholder="생략..." />
  <input type="submit" value="Login" />
</form>

function handleLoginBtnClick() {
  const username = loginInput.value;
  console.log(username);
}
*/

/* 
=== login button을 눌렀을 때 새로고침되고 URL에 정보가 저장됨 ===
formd에서 submit 하기 때문에 웹사이트를 재시작시킨다
input 안에 있는 button을 누르거나, type이 submit인 input을 누르면
내가 입력한 값을 form이 submit한다.

form 안에 있는 모든 input창에 입력하고 enter를 누르기만 해도
form은 submit되기 때문에 (더이상의 input이 없다면)
더 이상 버튼을 클릭하는 것에 신경 쓸 필요가 없다
-> 따라서 우리의 관심사를 form가 submit하는것에 집중하면 된다

즉, 브라우저가 새로고침하지 않고 user 정보를 저장하도록 하면 된다
loginForm.addEventListener("submit", handleLoginBtnClick);
이로써 form을 submit했을 때 입력값을 받아내는 건 해냈지만,
브라우저는 enter를 누를 때 새로고침을 하고 form을 submit하도록 구현해놨기 때문에
브라우저가 새로고침을 하는 것은 막지 못했다

=== addventListener("event", function()) vs addventListener("event", function) ===
loginForm.addEventListener("submit", handleLoginBtnClick());
라고 작성하는 순간, 브라우저가 (이벤트가 실행되던 신경쓰지 않고)
function을 자동으로 즉시실행한다는 뜻인데 우리는 바로 실행하는 것을 원치 않기 때문에
() 없이 => loginForm.addEventListener("submit", handleLoginBtnClick); 라고 작성한다
submit event가 발생하면 브라우저가 알아서 handleLoginBtnClick function을 실행시켜준다

=== EventListener function 기능 자세히===
자세히 말하자면,
브라우저는 우선 handleLoginBtnClick function을 호출하기 때문에
브라우저가 function을 실행시키고 있긴 하지만 handleLoginBtnClick()의 소괄호 안에서
나에게 정보를 준다 handleLoginBtnClick(information)
브라우저는 브라우저 내에서 event로부터 정보를 잡아내서
handleLoginBtnClick fucntion 실행버튼을 누른다

이를 확인하기 위해서는 함수 괄호 안에 내용을 넣어보면 되는데,
(무슨 이름으로 지어줄지는 상관없다)
function handleLoginBtnClick(potato) {
  potato.preventDefault();
  console.log(potato);
  // 잠시 주석으로 지워보기 
  // const username = loginForm.value;
  // console.log(username);
}

loginForm.addEventListener("submit", handleLoginBtnClick);
했을 때 handleLoginBtnClick()에
첫번째 argument로써 추가적인 정보를 가진 채 호출하게 될 것이다
브라우저가 우리에게 주는 정보를 확인하기 위해 handleLoginBtnClick(potato)를 실행해보면 확인이 가능하다

[parameter vs argument](http://taewan.kim/tip/argument_parameter/)

즉, handleLoginBtnClick function이 하나의 argument를 받도록 하고
그러한 argument를 JavaScript로 넘겨주었다
= 누군가 form을 submit하면 -> JavaScript가 handleLoginBtnClick function을
호출하도록 한다.

loginForm.addEventListener("submit", handleLoginBtnClick);
여기서 JavaScript는 handleLoginBtnClick function의 첫번째 argument로 
발생한 일에 대해 내가 필요로 할만한 정보들을 준다

따라서 모든 EventListener function의 첫번째 argument는 항상
지금 막 벌어진 일에 대한 정보가 들어갈 것이다
그래서 우리는 그러한 정보가 들어갈 argument 자리만 만들어주면
알아서 채워질 것이다

function handleLoginBtnClick(potato) {
  potato.preventDefault();
  console.log(potato);
}

handleLoginBtnClick함수에서는 argument에 preventDefault 함수를 호출했는데
preventDefault function: 어떤 event의 기본 행동이던지 발생되지 않도록 막아주는 역할
여기서 말하는 기본 행동이란, 어떤 function에 대해 브라우저가 기본적으로 수행하는 동작이다.
따라서 handleLoginBtnClick함수에서 preventDefault함수를 추가함으로써 
form을 submit했을 때 브라우저가 새로고침을 하는 동작을 막아준다.
-> EventListener 함수의 첫번째 argument 안에 있는 기본적은 function이다.

***** EventListener에 어떠한 function을 추가하던지
JavaScript에서는 공짜로 첫번째 argument로 발생된 event에 대한 정보를 준다.
첫번째 argument 자리를 만들지 않아도 event에 대한 정보를 받지 않는다는 말이기 때문에
호출하는데에 있어서 상관이 없다
-> 그래서 보통 이러한 argument의 변수명을 event라고 지어준다

=== 로직정리 ===
function handleLoginBtnClick(event) {
  event.preventDefault();
  console.log(loginInput.value);
}

버튼을 클릭해도 새로고침이 안되고 console에 입력한 값이 나오는 것을 확인할 수 있다
이렇게 우리가 submit event를 컨트롤하게 되었는데
submit event가 발생했을 때 JavaScript는 handleLoginBtnClick 함수를 호출하고
이 때 event object를 argument로 주고 우리는 이러한 event object의 기본적인 함수를 통해
eventListener function의 기본 동작이 실행되는 것을 막아줄 수 있다.

*/

const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}
