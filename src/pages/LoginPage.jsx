import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from '@/components/common/auth.styled';
import { ACLogoIcon } from '@/assets/images';
import { AuthInput } from '@/components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authController } from '../apis/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    }
  };

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
