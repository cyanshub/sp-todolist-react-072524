import { Footer, Header, TodoCollection, TodoInput } from '@/components';
import { useEffect, useState } from 'react';
import { todoController } from '../apis/todo';


const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = () => {
    // 檢查 inputValue
    if (inputValue.length === 0) {
      return;
    }

    // 儲存 todo 資料
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });

    // 完成後清空 inputValue
    setInputValue('');
  };

  const handleKeyDown = () => {
    // 當按下 Enter 鍵時, 要新增資料, 所以可以直接參考 handleAddTodo
    // 檢查 inputValue
    if (inputValue.length === 0) {
      return;
    }

    // 儲存 todo 資料
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });

    // 完成後清空 inputValue
    setInputValue('');
  };

  const handleToggleDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
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

  const handleSave = ({ id, title }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            isEdit: false,
          };
        }
        return todo;
      });
    });
  };

  const handleDelete = (id) => {
    setTodos((preVTodos) => {
      return preVTodos.filter((todo) => todo.id !== id);
    });
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
      <Header />
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
