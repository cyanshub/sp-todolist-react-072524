import { todoController } from '../../apis/todo-controller';

export const handleToggleDone = async (id, todos, setTodos) => {
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
