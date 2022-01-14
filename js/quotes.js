// 명언을 array형태로 저장해놓음
const quotes = [
  // 각각의 요소는 객체형태로 저장되어있다
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote:
      "The world is a book and those who do not travel read only one page.",
    author: "Saint Augustine",
  },
  {
    quote: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
  },
  {
    quote: "To Travel is to Live",
    author: "Hans Christian Andersen",
  },
  {
    quote: "Only a life lived for others is a life worthwhile.",
    author: "Albert Einstein",
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
  },
  {
    quote: "Never go on trips with anyone you do not love.",
    author: "Hemmingway",
  },
  {
    quote: "We wander for distraction, but we travel for fulfilment.",
    author: "Hilaire Belloc",
  },
  {
    quote: "Travel expands the mind and fills the gap.",
    author: "Sheda Savage",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;

/* 
== to do ==
1. quotes array 안에 있는 element에 접근
quotes[index].quote
quotes[index].author
2. 0-9까지의 숫자를 랜덤하게 주는 function 
- Math Module 사용하기
- Math.random(): 0~1사이의 실수를 무작위로 출력
- Math.random() * 10: 0~10사이의 실수를 무작위로 출력
- Index는 정수여야 하기 때문에 소수점 삭제

=== 소수점 삭제 ===

1. Math.round() : 반올림
  - Math.round(1.1) -> 1
  - Math.round(1.5) -> 2
2. Math.ceil() : 올림
  - 숫자를 천장(ceil)까지 높여준다
  - Math.ceil(1.1) -> 2
  - Math.ceil(1.0) -> 1
3. Math.floor() : 내림
  - 마루(=바닥, floor)까지 숫자를 내려준다
  - Math.floor(1.01) -> 1
  - Math.floor(1.9) -> 1

여기서 우리는 9.32442342 -> 10이되면 안되기 때문에
내림 메서드를 활용 할 것이다
*/
