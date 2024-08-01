import Swal from 'sweetalert2';

// 定義 onClick 觸發的 handler
export const handleClick = async (username, email, password, register) => {
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
