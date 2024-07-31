import axios from 'axios';

// 定義運行伺服器的網域位置
const baseUrl = 'http://localhost:3004';

export const todoController = {
  getTodos: async () => {
    try {
      // 向後端拿資料
      const res = await axios.get(`${baseUrl}/todos`);

      return res.data; // 回傳資料給前端
    } catch (error) {
      console.error('[Get Todos failed]:', error);
    }
  },
  createTodo: async (payload) => {
    // 從 payload 拿取打包資料
    const { title, isDone } = payload;

    try {
      // 向後端拿資料
      const res = await axios.post(`${baseUrl}/todos`, {
        title,
        isDone,
      });

      return res.data; // 回傳資料給前端
    } catch (error) {
      console.error('[Create Todo failed]:', error);
    }
  },
  patchTodo: async (payload) => {
    // 從 payload 拿取打包資料
    const { id, title, isDone } = payload;

    try {
      // 向後端拿資料
      const res = await axios.patch(`${baseUrl}/todos/${id}`, {
        title,
        isDone,
      });

      return res.data; // 回傳資料給前端
    } catch (error) {
      console.error('[Patch Todo failed]:', error);
    }
  },
  deleteTodo: async (id) => {
    try {
      // 向後端拿資料
      const res = await axios.delete(`${baseUrl}/todos/${id}`);

      return res.data; // 回傳資料給前端
    } catch (error) {
      console.error('[Delete Todo failed]:', error);
    }
  },
};
