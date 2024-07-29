import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 0 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({ todos }) => {
  // 實裝頁面跳轉 useNavigate
  const navigate = useNavigate();

  // 設計 click 登出按鈕的 handler
  const handleClick = () => {
    // 移除 token, 從 localStorage 去除使用者拿到的憑證
    localStorage.removeItem('authToken');

    // 登出後轉址
    navigate('/login');
  };

  return (
    <StyledFooter>
      <p>剩餘項目數： {todos.length}</p>
      <StyledButton onClick={handleClick}>登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
