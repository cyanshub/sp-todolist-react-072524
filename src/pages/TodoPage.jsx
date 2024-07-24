import { Footer, Header, TodoCollection, TodoInput } from '@/components';
import { useState } from 'react';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(dummyTodos);

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
      <TodoCollection todos={todos} onToggleDone = { handleToggleDone } />
      <Footer />
    </div>
  );
};

export default TodoPage;
