<script setup>
import { ref } from 'vue';
import { useTodoList } from '/src/composables/useToDoList';
import BaseButton from './BaseButton.vue';
import AddButton from './AddButton.vue';

const todoRef = ref('');
const isEditRef = ref(false);

const { todoListRef, add, show, edit, del, check, countFin } = useTodoList();

const addTodo = () => {
  add(todoRef.value);
  // 登録後は入力欄を空にする
  todoRef.value = '';
};

const showTodo = (id) => {
  todoRef.value = show(id);
  isEditRef.value = true;
};

const editTodo = () => {
  edit(todoRef.value);
  isEditRef.value = false;
  todoRef.value = '';
};

const deleteTodo = (id) => {
  del(id);
};

const changeCheck = (id) => {
  check(id);
};

const countFinMethod = () => {
  // console.log('method');
  const finArr = todoListRef.value.filter((todo) => todo.checked);
  return finArr.length;
};
</script>

<template>
  <!-- <BaseButton /> -->
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todoRef"
      placeholder="+ TODOを入力"
    />
    <BaseButton color="green" @on-click="editTodo" v-if="isEditRef"
      >変更</BaseButton
    >
    <AddButton @add-click="addTodo" v-else>追加</AddButton>
    <div class="box_list">
      <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
        <div class="todo" :class="{ fin: todo.checked }">
          <input
            type="checkbox"
            class="check"
            @change="changeCheck(todo.id)"
            :checked="todo.checked"
          />
          <label>{{ todo.task }}</label>
        </div>
        <div class="btns">
          <BaseButton color="green" @on-click="showTodo">編</BaseButton>
          <BaseButton color="pink" @on-click="deleteTodo">削</BaseButton>
        </div>
      </div>
    </div>
  </div>
  <div class="finCount">
    <span>完了　：{{ countFin }}</span>
    <br />
    <span>未完了：{{ todoListRef.length - countFinMethod() }}</span>
  </div>
</template>

<style scoped>
.box_input {
  margin-top: 20px;
}
.todo_input {
  width: 300px;
  margin-right: 8px;
  padding: 8px;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}
/* .btn {
  padding: 8px;
  background-color: #03a9f4;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
} */
.box_list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.todo_list {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  width: 300px;
}

.check {
  border: 1px solid red;
  transform: scale(1.6);
  margin: 0 16px 2px 6px;
}

.btns {
  display: flex;
  gap: 4px;
}

/* .green {
  background-color: #00c853;
} */
/* .pink {
  background-color: #ff4081;
} */
.fin {
  text-decoration: line-through;
  background-color: #ddd;
  color: #777;
}
.finCount {
  margin-top: 8px;
  font-size: 0.8em;
}
</style>
