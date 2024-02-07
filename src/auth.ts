function login(userId: string, password: string) {
  return {
    status: 'success',
    message: '',
    payload: {
      token: '1234567890',
    },
  };
}

function verifyToken(token: string) {
  return {
    status: 'success',
    message: '',
    payload: {
      user: {
        userId: '10000',
        userName: '東　顕正',
        shopId: '10000',
        shopName: 'テーラー池田',
        roleId: '00',
        shopGroup: 'JY',
        shopNo: '777',
      },
    },
  };
}
