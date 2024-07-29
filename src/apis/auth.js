import axios from 'axios';

// 定義運行伺服器的網域位置
const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const authController = {
  login: async ({ username, password }) => {
    try {
      // 透過 axios 向後端發送請求, 並利用解構賦值拿取資料
      const { data } = await axios.post(`${authURL}/login`, {
        username,
        password,
      });

      // 若登入成功會取得 token, 回傳成功訊息, 並夾帶後端的資料
      const { authToken } = data;
      if (authToken) {
        return { success: true, ...data };
      }

      return data;
    } catch (error) {
      console.error('[Login Failed]:', error);
    }
  },
};
