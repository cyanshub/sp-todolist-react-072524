import { todoController } from '../../apis/todo-controller';

export const handleDelete = async (id, setTodos) => {
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
