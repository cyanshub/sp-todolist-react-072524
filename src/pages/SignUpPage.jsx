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
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 掛載 AuthContext
  const { isAuthenticated, register } = useAuth();

  // 定義 onClick 觸發的 handler
  const handleClick = async () => {
    // 驗證輸入框的輸入
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      return;
    }

    // 向後端發送請求, 執行登入功能, 把輸入資訊裝在 payload 裡面, 並拿到後端回傳資料
    const success = await register({
      username,
      email,
      password,
    });

    // 設計登入成功時的行為
    if (success) {
      // 成功提示訊息
      Swal.fire({
        title: '註冊成功!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        position: 'top',
      });

      return;
    }

    // 失敗提示訊息
    Swal.fire({
      title: '註冊失敗!',
      icon: 'error',
      showConfirmButton: false,
      timer: 1000,
      position: 'top',
    });
  };

  // 使用 React Hook: useEffect 工具, 其可在每次畫面渲染時觸發
  useEffect(() => {
    // 用 isAuthenticated 判斷身分狀態，然後根據頁面需求，導引到 /todos
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={username}
          onChange={(nameInputValue) => {
            setUsername(nameInputValue);
          }}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="Email"
          placeholder="請輸入 email"
          value={email}
          onChange={(emailInputValue) => {
            setEmail(emailInputValue);
          }}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          placeholder="請輸入密碼"
          type="password"
          value={password}
          onChange={(passwordInputValue) => {
            setPassword(passwordInputValue);
          }}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>

      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
