const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

// 새로고침을 하게 되면 toDoList가 없어지기 때문에 별도로 저장을 해준다
// const toDos = []; 이 상태로만 사용하면 이전에 저장된 toDos는 기억하지 못한다
// 시작하기 전에 `localStorage에 있는 toDos` 를 toDos 배열에 저장해주면 해결할 수 있다
let toDos = [];

/* === JSON.stringfy() & JSON.parse() ===
localStorage에 toDos array를 업데이트를 하면 된다
localStorage에는 string형태로 저장이 되지만 우리는 array형태로 저장하고 싶다
JavaScript의 object나 array 같은 어떠한 object형 데이터이던 간에 
JSON.stringfy()은 해당하는 데이터 형태로 string으로 만들어준다
[1,2,3,4] -> "[1,2,3,4]"
반대로 이렇게 변환된 string을 원래의 형태로 돌리려면 JSON.parse() 메서드를 활용하면 된다
"[1,2,3,4]" -> [1,2,3,4]
*/
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// 삭제할 때마다 localStorage의 toDos를 업데이트해줘야 한다
function deleteToDo(event) {
  // event.target: event argument를 통해 누른 버튼에 해당하는 li요소를 찾는다
  const li = event.target.parentElement;
  // 화면상에서 toDoList 삭제
  li.remove();
  /* === localStorage에 있는 toDos array에서 item 지우는 법 ===
  
  */
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos(); // localStorage의 toDos 업데이트 (array -> string)
}

function paintToDo(newTodo) {
  const li = document.createElement('li'); // ul요소 안에 li요소 생성
  li.id = newTodo.id; // newTodo object의 id를 li요소의 id로 부여
  // li 요소 안에 글자와 삭제하는 버튼을 같이 만들고 싶기 때문에 span + button을 생성한다
  const span = document.createElement('span');
  span.innerText = newTodo.text;
  const button = document.createElement('button');
  button.innerText = '❌';
  // 여러개의 button이 있어도 동일한 deleteToDo함수를 호출한다
  button.addEventListener('click', deleteToDo);
  // li요소 안에 span와 button요소를 추가한다
  li.appendChild(span);
  li.appendChild(button);
  // 이렇게 추가된 li를 toDoList요소에 추가한다
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault(); // 브라우저 새로고침 막기
  // 입력값을 저장하고 input 비워주기: newTodo가 없어지는 건 아니다!
  const newTodo = toDoInput.value;
  toDoInput.value = '';

  /* == toTo -> object형태로 변환
  데이터베이스에 To Do 내용을 추가하는 로직에서 toDo를 object형태로 만들어준다
  페이지상에서는 어떤 데이터가 삭제되는지 알지만
  데이터상으로는 어떤 데이터가 삭제되는지 아직 모르기 때문에
  각각의 toDo에 id를 부여해서 구분해준다
  */
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

/* 
localStorage에 toDos 데이터가 존재한다면 
string형태의 localStorage.getItem(TODOS_KEY)를 원래의 형태로 돌려놓는다
그리고 array형태의 toDos에 그러한 데이터를 넣어주고

다만 여기서 아직 문제인 점은, 새로고침하고 새로 to do list를 작성해주면
기존의 localStorage에 저장된 toDos에 데이터가 추가되는 것이 아니라 
localStorage에는 새로 입력된 toDos만 저장되어있다 (예전 것은 없어짐)
*/
if (savedToDos !== null) {
  // 이전에 입력되고 localStorage에 저장된 toDos 복원
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  // array의 element 각각에 대해 paintToDo() function을 호출한다
  // array의 element에 대해 to do list를 그려줄 paintToDo() 함수를 호출한 것이다
  parsedToDos.forEach(paintToDo);
  // parsedToDos.forEach(item => function(item)); arrow function
} 
