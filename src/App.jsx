import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';
import { AuthProvider } from './contexts/AuthContext';
import { Authenticated, LoginAuthenticated } from './middlewares/Auth';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/signup"
              element={<LoginAuthenticated element={<SignUpPage />} />}
            />
            <Route
              path="/login"
              element={<LoginAuthenticated element={<LoginPage />} />}
            />
            <Route
              path="/todos"
              element={<Authenticated element={<TodoPage />} />}
            />
            <Route
              path="*"
              element={<Authenticated element={<HomePage />} />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
