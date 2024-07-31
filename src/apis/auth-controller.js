import axios from 'axios';

// 定義運行伺服器的網域位置
const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const authController = {
  login: async (payload) => {
    try {
      // 從 payload 拿取資料
      const { username, password } = payload;

      // 透過 axios 向後端發送請求, 並利用解構賦值拿取資料
      const { data } = await axios.post(`${authURL}/login`, {
        username,
        password,
      });

      console.log('拿取後端回傳資料:', data);

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
  register: async (payload) => {
    try {
      // 從 payload 拿取資料
      const { username, email, password } = payload;

      // 透過 axios 向後端發送請求, 並利用解構賦值拿取資料
      const { data } = await axios.post(`${authURL}/register`, {
        username,
        email,
        password,
      });

      console.log('拿取後端回傳資料:', data);

      // 若登入成功會取得 token, 回傳成功訊息, 並夾帶後端的資料
      const { authToken } = data;
      if (authToken) {
        return { success: true, ...data };
      }

      return data;
    } catch (error) {
      console.error('[Register Failed]:', error);
    }
  },
  checkPermission: async (authToken) => {
    try {
      // 提交 authToken 給後端進行驗證
      const res = await axios.get(`${authURL}/test-token`, {
        // 放入 authToken 資訊
        headers: {
          Authorization: 'Bearer' + ' ' + authToken, // 必須加空格
        },
      });

      // 若驗證成功, 回拿到 success: true, 可當作是否通過檢驗的依據
      return res.data.success;
    } catch (error) {
      console.error('[Check Permission Failer]:', error);
    }
  },
};
