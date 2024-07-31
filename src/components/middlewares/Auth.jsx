import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// 在各個頁面檢查登入許可
const Authenticated = ({ element }) => {
  const { isAuthenticated } = useAuth();

  // 當 isAuthenticated 通過後端的驗證時, 此行會略過
  if (isAuthenticated === null) {
    return null; // 不顯示任何內容，因為 isAuthenticated 可能還在驗證中
  }

  // 若通過驗證就前往原本要去的頁面, 否則導回登入頁面位置
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// 用於登入或註冊頁面檢查登入許可, 若取得許可則導向首頁
const LoginAuthenticated = ({ element }) => {
  const { isAuthenticated } = useAuth();

  // 當 isAuthenticated 通過後端的驗證時, 此行會略過
  if (isAuthenticated === null) {
    return null; // 不顯示任何內容，因為 isAuthenticated 可能還在驗證中
  }

  // 若通過驗證就前往原本要去的頁面, 否則導回登入頁面位置
  return isAuthenticated ? <Navigate to="/todos" /> : element;
};

export { Authenticated, LoginAuthenticated };
