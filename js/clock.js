// h2와 id를 함께 사용하는 방법도 있다
const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  // number -> String으로 변환할 때에는 String(number) 함수사용
  // string.padStart(글자수, 만약 2글자가 아니면 앞에 추가할 문자)
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock(); // 브라우저 켜자마자 실행
setInterval(getClock, 1000); // 1초마다 재실행

/* 
=== interval ===
매번 일어나야 하는 무언가 
만약 5초마다 hello라고 콘솔을 찍히게 하고 싶다면
setInterval(내가 실행할 함수, function을 호출할 간격->ms단위로)
1초 = 1000ms

function sayHello() {
  console.log('Hello');
}
setInterval(sayHello, 5000);

=== timeout ===
setTimeout(function, 기다릴 시간 ms단위);


=== Date object ===
const date = new Date();
해당 메서드를 실행할 때마다 새로운 시간을 가져온다
date.getDate(); // 오늘 날짜
date.getDay(); //요일을 숫자로 표기
date.getHours(); // 시
date.getMinutes(); // 분
date.getSeconds(); // 초
*/

function getClockTest() {
  const date = new Date();
  console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)  
}
setInterval(getClockTest, 1000);

/* 
=== 문제점 ===
1. 10:10:0 같이 표시될 때도 있다
  - String이 언제나 2글자로 표시되도록
  - padStart() 메서드
2. 브라우저를 새로고침했을 때 1초가 지나야 시간을 보여준다
  - 웹사이트가 load되자마다 getClock()함수를 실행하고
  - 매 초마다 다시 실행하게 하면 된다
*/ 
