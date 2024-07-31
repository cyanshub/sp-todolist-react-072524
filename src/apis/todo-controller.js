import axios from 'axios';

// 定義運行伺服器的網域位置
const baseUrl = 'https://todo-list.alphacamp.io/api';

// 建立物件實例, 設定通用配置
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// 使用 axios 提供的 Interceptors 方法, 直接在 request請 求設定所要攜帶的 token
axiosInstance.interceptors.request.use(
  // 用 config 進行設定
  (config) => {
    // 從瀏覽器 localStorage 取出 token
    const token = localStorage.getItem('authToken');

    // 若 token 存在, 則在 config 設定 headers, 攜帶 Authorization
    if (token) {
      // 記得 token type 和 token 中間須保持空白
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  // 用 error 處理錯誤狀況
  (error) => console.error(error),
);

export const todoController = {
  getTodos: async () => {
    try {
      // 向後端拿資料
      const res = await axiosInstance.get(`/todos`);

      return res.data.data; // 拿到後端資料回傳給前端頁面
    } catch (error) {
      console.error('[Get Todos failed]:', error);
    }
  },
  createTodo: async (payload) => {
    // 從 payload 拿取打包資料
    const { title, isDone } = payload;

    try {
      // 向後端拿資料
      const res = await axiosInstance.post(`/todos`, {
        title,
        isDone,
      });

      return res.data; // 拿到後端資料回傳給前端頁面
    } catch (error) {
      console.error('[Create Todo failed]:', error);
    }
  },
  patchTodo: async (payload) => {
    // 從 payload 拿取打包資料
    const { id, title, isDone } = payload;

    try {
      // 向後端拿資料
      const res = await axiosInstance.patch(`/todos/${id}`, {
        title,
        isDone,
      });

      return res.data; // 拿到後端資料回傳給前端頁面
    } catch (error) {
      console.error('[Patch Todo failed]:', error);
    }
  },
  deleteTodo: async (id) => {
    try {
      // 向後端拿資料
      const res = await axiosInstance.delete(`/todos/${id}`);

      return res.data; // 拿到後端資料回傳給前端頁面
    } catch (error) {
      console.error('[Delete Todo failed]:', error);
    }
  },
};
