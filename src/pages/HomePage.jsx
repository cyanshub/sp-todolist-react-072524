import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  // 啟用轉址功能
  const navigate = useNavigate();

  // 將驗證工作交由 middlewares/Authenticated 元件執行
  // 故這邊不用掛載AuthContext

  // 使用 React Hook: useEffect 工具, 其可在每次畫面渲染時觸發
  useEffect(() => {
    // 故這邊不用判斷 isAuthenticated, 直接導向真首頁即可
    navigate('/todos');
  }, [navigate]);
};

export default HomePage;
