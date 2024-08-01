import { useEffect } from 'react';
import { todoController } from '../../apis/todo-controller';

// 使用 React Hook: useEffect 工具, 其可在每次畫面渲染時, 向後端拿資料
// 在串接 API 的情境中，往往是在「畫面渲染」已經完成之後才發送 API 拿資料
// 拿到 API 回傳的資料後, 使用 useState 的 set 方法替換資料
const useGetTodos = (setTodos) => {
  useEffect(() => {
    // 使用 async 包裝 await 方法
    const getTodosAsync = async () => {
      try {
        const todos = await todoController.getTodos(); // 拿到資料
        // 替換資料
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    // 執行 async/await 方法
    getTodosAsync();
  }, [setTodos]);
};

export default useGetTodos;
