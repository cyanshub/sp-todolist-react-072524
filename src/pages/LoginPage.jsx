import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from '@/components/common/auth.styled';
import { ACLogoIcon } from '@/assets/images';
import { AuthInput } from '@/components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authController } from '../apis/auth';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 定義 onClick 觸發的 handler
  const handleClick = async () => {
    // 驗證輸入框的輸入
    if (username.length === 0) {
      return;
    }

    if (password.length === 0) {
      return;
    }

    // 向後端發送請求, 執行登入功能, 把輸入資訊裝在 payload 裡面, 並拿到後端回傳資料
    const { success, authToken } = await authController.login({
      username,
      password,
    });

    // 設計登入成功時的行為: 呼叫 localStorage 方法, 儲存 authToken
    if (success) {
      localStorage.setItem('authToken', authToken);

      // 成功提示訊息
      Swal.fire({
        title: '登入成功!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        position: 'top',
      });

      // 登入成功後, 將頁面跳轉至指定位置
      navigate('/todos');
      return;
    }

    // 失敗提示訊息
    Swal.fire({
      title: '登入失敗!',
      icon: 'error',
      showConfirmButton: false,
      timer: 1000,
      position: 'top',
    });
  };


  // 使用 React Hook: useEffect 工具, 其可在每次畫面渲染時, 向後端發送請求
  useEffect(() => {
    // 建立函數: 確認憑證是否有效
    const checkTokenIsValid = async () => {
      try {
        // 從瀏覽器的 localStorage 拿取 authToken
        const authToken = localStorage.getItem('authToken');

        // 假設 token 不存在: 代表未驗證
        if (!authToken) {
          // 登入頁面: 直接停留在當前頁面
          return 
        }

        // 假設 token 存在, 則呼叫 authController.checkPermission
        const result = await authController.checkPermission(authToken);
        
        // 若驗證通過, 應該要導向 todos 頁面
        if (result) {
          navigate('/todos');
        }
      } catch (error) {
        console.error(error);
      }
    };

    // 執行函數: 確認憑證是否有效
    checkTokenIsValid();
  }, [navigate]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={username}
          onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          placeholder="請輸入密碼"
          type="password"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>

      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
