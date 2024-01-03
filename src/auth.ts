function Login(loginId: string, password: string) {
  return {
    status: 'success',
    message: '',
    payload: {
      token: '1234567890',
    },
  };
}

function VerifyToken(token: string) {
  return {
    status: 'success',
    message: '',
    payload: {
      user: {
        loginId: '10000',
        userName: '東　顕正',
        shopId: '10000',
        shopName: 'テーラー池田',
        roleId: '0',
      },
    },
  };
}
