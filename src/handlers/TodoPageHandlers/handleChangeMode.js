export const handleChangeMode = ({ id, isEdit }, setTodos) => {
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
