import { Footer, Header, TodoCollection, TodoInput } from '@/components';
import { useEffect, useState } from 'react';
import { todoController } from '../apis/todo-controller';
import { useAuth } from '../contexts/AuthContext';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  // 掛載 AuthContext
  const { currentMember } = useAuth();

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    // 檢查 inputValue
    if (inputValue.length === 0) {
      return;
    }

    try {
      // 向後端拿資料
      const data = await todoController.createTodo({
        title: inputValue,
        isDone: false,
      });

      // 儲存 todo 資料
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });

      // 完成後清空 inputValue
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = async () => {
    // 當按下 Enter 鍵時, 要新增資料, 所以可以直接參考 handleAddTodo
    // 檢查 inputValue
    if (inputValue.length === 0) {
      return;
    }

    try {
      // 向後端拿資料
      const data = await todoController.createTodo({
        title: inputValue,
        isDone: false,
      });

      // 儲存 todo 資料
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });

      // 完成後清空 inputValue
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDone = async (id) => {
    // 取得目前正要編輯的資料
    const currentTodo = todos.find((todo) => todo.id === id);

    try {
      // 向後端拿資料
      const data = await todoController.patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });

      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: data.isDone,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        // 如果不是要編輯的對象, 記得把 isEdit 改成 false
        return { ...todo, isEdit: false };
      });
    });
  };

  const handleSave = async ({ id, title }) => {
    try {
      // 向後端發送請求, 使後端儲存編輯後的資料, 並從後端拿資料
      const data = await todoController.patchTodo({ id, title });

      // 在前端顯示編輯後儲存的資料
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title: data.title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // 向後端發送請求, 使後端刪除資料
      await todoController.deleteTodo(id);

      // 在前端顯示刪除後的資料
      setTodos((preVTodos) => {
        return preVTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 使用 React Hook: useEffect 工具, 其可在每次畫面渲染時, 向後端拿資料
  // 在串接 API 的情境中，往往是在「畫面渲染」已經完成之後才發送 API 拿資料
  // 拿到 API 回傳的資料後, 使用 useState 的 set 方法替換資料
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
  }, []);

  return (
    <div>
      TodoPage
      <Header username={currentMember?.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
