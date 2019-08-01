//チェックマークとゴミ箱マークのアイコン
let removeIcon = '<i class="far fa-trash-alt fa-lg"></i>';
let doneIcon = '<i class="far fa-check-circle fa-lg"></i>';

let data = {
  task :[],
  done : []
};

//もしデータが保存されていれば
if (localStorage.getItem('todoList')) {
  data = JSON.parse(localStorage.getItem('todoList'));
  //データを取り出す
}
console.log(data)
  //データを取り出す
// getItemで保存されたデータを取り出すことができる。好きな名前をつけて保存可能。('todoList'、（保存したいデータを入れる。）)

document.getElementById('add').addEventListener('click', function() {
  let value = document.getElementById('task').value;
  // console.log(value);
  // addTaskToDOM(value);これを下に移す。
  addTask(value);
  // console.log(data.task);
});

// --------------関数---------------

function addTask (value) {
  addTaskToDOM(value);
  document.getElementById('task').value = '';
  data.task.push(value);
  dataObjectUpdated();
}

function addTaskToDOM(text,isDone){
  let list;

  if (isDone) {
    list = document.getElementById('done');
  } else {
    list = document.getElementById('not-yet');
  }


  list = document.getElementById('not-yet');
  let task = document.createElement('li');
  task.textContent = text;

  let buttons = document.createElement('div');
  buttons.classList.add('buttons');

  //削除ボタンアイコンを作成
  let remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeIcon;

  //削除ボタンアイコンをクリックした時の動作を追加
  remove.addEventListener('click', removeTask);


  //完了ボタンを作成
  let done = document.createElement('button');
  done.classList.add('done');
  done.innerHTML = doneIcon;

  //完了ボタンを押した時の動作を追加
  done.addEventListener('click', doneTask);


  //DOMの組み立て
  buttons.appendChild(remove);
  buttons.appendChild(done)
  task.appendChild(buttons);

  //組み立てたDOMをインサート
  list.insertBefore(task, list.childNodes[0]);
}

//削除ボタンアイコンを押したとき
function removeTask() {
  let task = this.parentNode.parentNode;
  let id = task.parentNode.id;
  let value = task.textContent;

    //画面から削除
  task.remove();

  //ストレージから削除
  if (id === 'not-yet') {
    data.task.splice(data.task.indexOf(value), 1);
  } else {
    data.done.splice(data.done.indexOf(value), 1);
  }
  dataObjectUpdated();
}

//完了ボタンを押したとき
function doneTask() {
  let task = this.parentNode.parentNode;
  let id = task.parentNode.id;

  if (id !== 'not-yet') {
    return;
  }
  // returnは処理を終了するときに使う。

  let value = task.textContent;
  //完了一覧に追加
  let target = document.getElementById('done');
  target.insertBefore(task, target.childNodes[0]);

  //ストレージも更新
  data.task.splice(data.task.indexOf(value), 1);
  data.done.push(value);
  // console.log(date);
  dataObjectUpdated();
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// 出力する。of を使って繰り返し分のforから情報を取り出す。addTaskToDOMにて「notyet]の部分にリストをHTMLに追加している。
renderTodoList()
function renderTodoList() {
  //未完了タスクを一覧で表示
  for (let value of data.task) {
    addTaskToDOM(value);
  }
// doneタスクを一覧で表示
  for (let value of data.done){
    addTaskToDOM(value,true);
  }
}