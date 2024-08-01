import { todoController } from '../../apis/todo-controller';

export const handleSave = async ({ id, title }, setTodos) => {
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
