import { computed, ref } from 'vue';

// 外部から使えるようにexportする
export const useTodoList = () => {
  // ローカルストレージにtodoListが存在していたらparseし
  // なければundefinedになる為、空配列をセット
  const todoListRef = ref([]);
  const ls = localStorage.todoList;
  todoListRef.value = ls ? JSON.parse(ls) : [];

  // TodoListからIDを元にTODO情報を取得
  const findById = (id) => {
    return todoListRef.value.find((todo) => todo.id === id);
  };

  // TodoListからIDを元にインデックスを取得
  const findIndexById = (id) => {
    return todoListRef.value.findIndex((todo) => todo.id === id);
  };

  // 追加処理
  const add = (task) => {
    // IDを簡易的にミリ秒で登録
    const id = new Date().getTime();
    console.log(id);

    // 配列に入力TODOを格納
    todoListRef.value.push({ id: id, task: task, checked: false });

    // ローカルストレージに登録
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // 編集処理
  const editId = ref(-1);
  const show = (id) => {
    const todo = findById(id);
    editId.value = id;
    return todo.task;
  };

  // 変更処理
  const edit = (task) => {
    // Todo情報を取得
    const todo = findById(editId.value);
    // インデックスを取得
    const idx = findIndexById(editId.value);
    // 対象のタスクを上書き
    todo.task = task;
    // splice関数でインデックスを元に対象オブジェクトを置き換え
    todoListRef.value.splice(idx, 1, todo);
    // ローカルストレージに保存
    localStorage.todoList = JSON.stringify(todoListRef.value);
    editId.value = -1;
  };

  // 削除処理
  const del = (id) => {
    // 編集対象となるTODOを取得
    const todo = findById(id);

    // TODOリストから編集対象のインデックスを取得
    const idx = findIndexById(id);

    const delMsg = '「' + todo.task + '」を削除しますか？';
    if (!confirm(delMsg)) return;

    // splice関数でインデックスを元に対象オブジェクトを削除
    todoListRef.value.splice(idx, 1);

    // ローカルストレージに保存
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // チェックボタン押下
  const check = (id) => {
    const todo = findById(id);
    const idx = findIndexById(id);
    todo.checked = !todo.checked;
    // splice関数でインデックスを元に対象オブジェクトを置き換え
    todoListRef.value.splice(idx, 1, todo);
    // ローカルストレージに保存
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  const countFin = computed(() => {
    // todo.checkedは「true/false」が入っているため、trueのtodoが返る。
    // console.log('computed');
    const finArr = todoListRef.value.filter((todo) => todo.checked);
    return finArr.length;
  });
  return { todoListRef, add, show, edit, del, check, countFin };
};
