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
import { handleClick } from '../handlers/SignUpPageHandlers';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 掛載 AuthContext
  const { register } = useAuth();

  // 掛載 handlers: 定義 onClick 觸發的 handler
  const onClick = () => handleClick(username, email, password, register);

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
      <AuthButton onClick={onClick}>註冊</AuthButton>

      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
