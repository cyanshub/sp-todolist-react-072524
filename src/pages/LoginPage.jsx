import { ACLogoIcon } from '@/assets/images';
import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from '@/components/commons/auth.styled';
import { AuthInput } from '@/components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { handleClick } from '../handlers/LoginPageHandlers';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 掛載 AuthContext
  const { login } = useAuth();

  // 掛載 handlers: 定義 onClick 觸發的 handler
  const onClick = () => handleClick(username, password, login);
  

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
      <AuthButton onClick={onClick}>登入</AuthButton>

      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
