function login(userId: string, password: string) {
  const conn = jdbcConnection();
  const results = dbUtils.executeQuery(
    conn,
    `
    select 
      password,
      allowLogin
    from 
      \`tailor-db\`.m_user 
    where 
      userId = '${userId}' 
      and isDelete = 0 
      #and allowLogin = 1
    `
  );

  // ユーザーIDチェック
  if (dbUtils.rowsCount(results) === 0) {
    return {
      status: 'error',
      message: '未登録のユーザーIDです',
      payload: {},
    };
  }

  // ログイン許可チェック
  results.next();
  const allowLogin = Boolean(results.getString('allowLogin'));
  if (!allowLogin) {
    return {
      status: 'error',
      message: 'ログインが許可されていません',
      payload: {},
    };
  }
  
  // パスワードチェック
  const dbPassword = results.getString('password');
  if (password !== dbPassword) {
    return {
      status: 'error',
      message: 'パスワードが異なります',
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
  const data = parseJwt(token, scriptProperty.privateKey);
  const userId = data.userId;
  const conn = jdbcConnection();
  try {
    const results = dbUtils.executeQuery(
      conn,
      `
      select
        m_user.userId,
        m_user.userName,
        m_user.roleId,
        m_shop.shopId,
        m_shop.shopName,
        m_shop.shopGroup,
        m_shop.shopNo
      from
        \`tailor-db\`.m_user
        left join \`tailor-db\`.m_chargePerson
        on m_user.userId = m_chargePerson.userId
        left join \`tailor-db\`.m_shop
        on m_chargePerson.shopId = m_shop.shopId
      where
        m_user.userId = "${userId}" 
        and m_user.isDelete = 0 
        and m_user.allowLogin = 1
      `
    );
    if (dbUtils.rowsCount(results) === 0) {
      return {
        status: 'error',
        message: 'ユーザが登録されていません',
        payload: { user: null },
      };
    }

    results.next();

    return {
      status: 'success',
      message: '',
      payload: {
        user: {
          userId: results.getString('userId'),
          userName: results.getString('userName'),
          roleId: results.getString('roleId'),
          shopId: results.getString('shopId'),
          shopName: results.getString('shopName'),
          shopGroup: results.getString('shopGroup'),
          shopNo: results.getString('shopNo'),
        },
      },
    };
  } catch (e: any) {
    return {
      status: 'error',
      message: e.toString(),
      payload: { user: null },
    };
  }
}
