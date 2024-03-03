function login(userId: string, password: string) {
  const conn = jdbcConnection();

  const results = dbUtils.executeQuery(
    conn,
    `select password from m_user where userId = '${userId}' and isDelete = false and allowLogin = true`
  );

  // ユーザーIDチェック
  if (dbUtils.rowsCount(results) === 0) {
    return {
      status: 'error',
      message: 'ユーザーIDが違います',
      payload: {},
    };
  }

  // パスワードチェック
  results.next();
  const dbPassword = results.getString('password');
  if (password === dbPassword) {
    return {
      status: 'error',
      message: 'パスワードが違います',
      payload: {},
    };
  }

  // トークン発行
  const token = generateAccessToken(userId, scriptProperty.privateKey);

  return {
    status: 'success',
    message: '',
    payload: {
      token: token,
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
