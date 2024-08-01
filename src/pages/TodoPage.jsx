import { Footer, Header, TodoCollection, TodoInput } from '@/components';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  handleAddTodo,
  handleChange,
  handleChangeMode,
  handleDelete,
  handleKeyDown,
  handleSave,
  handleToggleDone,
} from '../handlers/TodoPageHandlers';
import { useGetTodos } from '../hooks';

const TodoPage = () => {
  // React Hook
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  // 掛載 Context: AuthContext
  const { currentMember } = useAuth();

  // 掛載 handlers
  const onChange = (value) => handleChange(value, setInputValue);
  const onAddTodo = () => handleAddTodo(inputValue, setTodos, setInputValue);
  const onKeyDown = () => handleKeyDown(inputValue, setTodos, setInputValue);
  const onToggleDone = (id) => handleToggleDone(id, todos, setTodos);
  const onChangeMode = ({ id, isEdit }) => handleChangeMode({ id, isEdit }, setTodos);
  const onSave = ({ id, title }) => handleSave({ id, title }, setTodos);
  const onDelete = (id) => handleDelete(id, setTodos);

  // 掛載 Reack Hooks: useEffect (每次更新頁面時拿資料)
  useGetTodos(setTodos);

  return (
    <div>
      TodoPage
      <Header username={currentMember?.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={onChange}
        onAddTodo={onAddTodo}
        onKeyDown={onKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={onToggleDone}
        onChangeMode={onChangeMode}
        onSave={onSave}
        onDelete={onDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
