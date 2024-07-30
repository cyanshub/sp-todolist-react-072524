import { createContext, useState } from 'react';
import { authController } from '../apis/auth';
import { jwtDecode } from 'jwt-decode';

// 定義想共享的狀態與方法之預設值
const defaultAuthContext = {
  isAuthenticated: false, // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  currentMember: null, // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  register: null, // 註冊方法
  login: null, // 登入方法
  logout: null, // 登出方法
};

// 參照defaultAuthContext, 用 createContext 方法建立 Context 元件
const AuthContext = createContext(defaultAuthContext);

// 建立 Provider, 用來管理與 Context 元件有關狀態的操作
export const AuthProvider = ({ children }) => {
  // 定義狀態
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  return (
    <AuthContext.Provider
      // 對應共享狀態的內容值
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: async (data) => {
          try {
            //  向後端發送請求, 執行註冊功能, 把輸入資訊裝在 payload 裡面, 並拿到後端回傳資料
            const { success, authToken } = await authController.register({
              username: data.username,
              email: data.email,
              password: data.password,
            });

            // 解析回傳的 authToken, 取得驗證使用者資料
            const tempPayload = jwtDecode(authToken);

            // 若 tempPayload 存在: 表示成功註冊
            // 則將此解析後的 payload 儲存起來, 並設定驗證登入狀態為 true, 呼叫 localStorage 方法, 儲存 authToken
            if (tempPayload) {
              setPayload(tempPayload);
              setIsAuthenticated(true);
              localStorage.setItem('authToken', authToken);
            } else {
              setPayload(null);
              setIsAuthenticated(false);
            }

            // 回傳是否成功的提示訊息(suceess為 true 或 false)
            return success;
          } catch (error) {
            console.error(error);
          }
        },
        login: async (data) => {
          try {
            //  向後端發送請求, 執行登入功能, 把輸入資訊裝在 payload 裡面, 並拿到後端回傳資料
            const { success, authToken } = await authController.login({
              username: data.username,
              password: data.password,
            });

            // 解析回傳的 authToken, 取得驗證使用者資料
            const tempPayload = jwtDecode(authToken);

            // 若 tempPayload 存在: 表示成功登入
            // 則將此解析後的 payload 儲存起來, 並設定驗證登入狀態為 true, 呼叫 localStorage 方法, 儲存 authToken
            if (tempPayload) {
              setPayload(tempPayload);
              setIsAuthenticated(true);
              localStorage.setItem('authToken', authToken);
            } else {
              setPayload(null);
              setIsAuthenticated(false);
            }

            // 回傳是否成功的提示訊息(suceess為 true 或 false)
            return success;
          } catch (error) {
            console.error(error);
          }
        },
        logout: () => {
          // 移除 token, 從 localStorage 去除使用者拿到的憑證
          localStorage.removeItem('authToken');

          // 移除經解析的 payload
          setPayload(null);

          // 調回登入驗證狀態 setIsAuthenticated
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
