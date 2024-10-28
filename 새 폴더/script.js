// DOM 요소 선택
const addButton = document.getElementById('addButton');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// 할 일 추가 함수
function addTodo() {
    const todoText = todoInput.value.trim(); // 입력값의 앞뒤 공백 제거
    if (todoText) {
        const li = createTodoItem(todoText);
        todoList.appendChild(li);
        todoInput.value = ''; // 입력창 초기화
    } else {
        alert("할 일을 입력하세요."); // 입력값이 없을 경우 경고
    }
}

// 할 일 항목 생성 함수
function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `${text} <button class="deleteButton">삭제</button>`;
    
    // 삭제 버튼 이벤트 리스너 추가
    const deleteButton = li.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(li); // 항목 삭제
    });

    return li; // 생성된 항목 반환
}

// 이벤트 리스너 추가
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { // Enter 키로도 추가 가능
        addTodo();
    }
});

