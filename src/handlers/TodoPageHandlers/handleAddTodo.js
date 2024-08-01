import { todoController } from '../../apis/todo-controller';

export const handleAddTodo = async (inputValue, setTodos, setInputValue) => {
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
