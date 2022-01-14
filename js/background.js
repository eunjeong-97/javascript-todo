const images = ["0.jpeg", "1.jpeg", "2.jpeg"];

// 0-2 랜덤한 숫자 -> images 배열에서 요소 꺼내기
const chosenImage = images[Math.floor(Math.random() * images.length)];

// javascript를 통해 html요소 추가
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;

// body 안에 bgImage요소 추가
// appendChild는 맨 마지막에 추가하는 것 같다
document.body.appendChild(bgImage);
