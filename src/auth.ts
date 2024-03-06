function login(userId: string, password: string) {
  const conn = jdbcConnection();
  const results = dbUtils.executeQuery(
    conn,
    `select password from \`tailor-db\`.m_user where userId = '${userId}' and isDelete = false and allowLogin = true`
  );

  // ユーザーIDチェック
  if (dbUtils.rowsCount(results) === 0) {
    return {
      status: 'error',
      message: '未登録のユーザーIDです',
      payload: {},
    };
  }

  // パスワードチェック
  results.next();
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
      `select
        m_user.userId,
        m_user.password,
        m_user.userName,
        m_user.userNameKana,
        m_user.allowLogin,
        m_user.roleId,
        m_user.isDelete,
        m_user.createDateTime,
        m_user.createUserId,
        m_user.updateDateTime,
        m_user.updateUserId,
        m_shop.shopId,
        m_shop.shopName,
        m_shop.shopGroup,
        m_shop.shopNo,
        m_shop.postalCode,
        m_shop.prefecture,
        m_shop.city,
        m_shop.address,
        m_shop.building,
        m_shop.isOwn,
        m_shop.isDelete as shopIsDelete,
        m_shop.createDateTime as shopCreateDateTime,
        m_shop.createUserId as shopCreateUserId,
        m_shop.updateDateTime as shopUpdateDateTime,
        m_shop.updateUserId as shopUpdateUserId
      from
        \`tailor-db\`.m_user
        left join \`tailor-db\`.m_chargePerson
        on m_user.userId = m_chargePerson.userId
        left join \`tailor-db\`.m_shop
        on m_chargePerson.shopId = m_shop.shopId
      where
        userId = "${userId}" and isDelete = 0 and allowLogin = 1`
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
  const results = dbUtils.executeQuery(
    conn,
    `select * from m_user where userId = "${userId}" and isDelete = 0`
  );
  if (dbUtils.rowsCount(results) === 0) {
    return {
      status: 'error',
      message: 'ユーザが登録されていません',
      payload: { user: null },
    };
  }

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
