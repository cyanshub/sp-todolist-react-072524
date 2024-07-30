import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const HomePage = () => {
  // 掛載 AuthContext
  const { isAuthenticated } = useAuth();

  // 啟用轉址功能
  const navigate = useNavigate();

  // 使用 React Hook: useEffect 工具, 其可在每次畫面渲染時觸發
  useEffect(() => {
    // 用 isAuthenticated 判斷身分狀態，然後根據頁面需求轉向適當的位置
    if (isAuthenticated) {
      // 若有驗證則導向 TodoPage
      navigate('/todos');
    } else {
      // 若沒驗證則導向 LoginPage
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);
};

export default HomePage;
