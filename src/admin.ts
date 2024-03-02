function getShops() {
  const content = {
    status: 'success',
    message: '',
    payload: {
      shops: [
        {
          ...shopSample1,
          chargePersons: [chargePersonSample1, chargePersonSample2],
        },
        { ...shopSample2, chargePersons: [chargePersonSample3] },
        {
          ...shopSample1,
          chargePersons: [chargePersonSample1, chargePersonSample2],
          shopId: '1',
        },
        { ...shopSample2, chargePersons: [chargePersonSample3], shopId: '2' },
        {
          ...shopSample1,
          chargePersons: [chargePersonSample1, chargePersonSample2],
          shopId: '3',
        },
        { ...shopSample2, chargePersons: [chargePersonSample3], shopId: '4' },
      ],
    },
  };
  return content;
}

function getShop(shopId: string) {
  const content = {
    status: 'success',
    message: '',
    payload: {
      shop: shopSample1,
    },
  };
  return content;
}

function createShop(shop: ShopType) {
  const content = {
    status: 'success',
    message: '',
    payload: {
      shop,
    },
  };
  return content;
}

function updateShop(shop: ShopType) {
  const content = {
    status: 'success',
    message: '',
    payload: {
      shop,
    },
  };
  return content;
}

function deleteShop(shopId: string) {
  const content = {
    status: 'success',
    message: '',
    payload: {
      shopId: shopId,
    },
  };
  return content;
}

function getUsers(): {
  status: string;
  message: string;
  payload: { users: UserType[] | null };
} {
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
        on m_chargePerson.shopId = m_shop.shopId`
    );
    const numCols = results.getMetaData().getColumnCount();
    const users: UserType[] = [];
    while (results.next()) {
      users.push({
        userId: results.getString('userId'),
        password: results.getString('password'),
        userName: results.getString('userName'),
        userNameKana: results.getString('userNameKana'),
        allowLogin: Boolean(results.getInt('allowLogin')),
        roleId: results.getString('roleId'),
        commonItem: {
          isDelete: Boolean(results.getString('isDelete')),
          createDateTime: results.getDate('createDateTime'),
          createUserId: results.getString('createUserId'),
          updateDateTime: results.getDate('updateDateTime'),
          updateUserId: results.getString('updateUserId'),
        },
        shop: {
          shopId: results.getString('shopId'),
          shopName: results.getString('shopName'),
          shopGroup: results.getString('shopGroup'),
          shopNo: results.getString('shopNo'),
          postalCode: results.getString('postalCode'),
          prefecture: results.getString('prefecture'),
          city: results.getString('city'),
          address: results.getString('address'),
          building: results.getString('building'),
          isOwn: Boolean(results.getInt('isOwn')),
          commonItem: {
            isDelete: Boolean(results.getString('shopIsDelete')),
            createDateTime: results.getDate('shopCreateDateTime'),
            createUserId: results.getString('shopCreateUserId'),
            updateDateTime: results.getDate('shopUpdateDateTime'),
            updateUserId: results.getString('shopUpdateUserId'),
          },
        },
      });
    }

    return {
      status: 'success',
      message: '',
      payload: { users },
    };
  } catch (e: any) {
    return {
      status: 'error',
      message: e.toString(),
      payload: { users: null },
    };
  }
}

function getUser(userId: string): {
  status: string;
  message: string;
  payload: { user: UserType | null };
} {
  const conn = jdbcConnection();
  try {
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

    results.next();

    return {
      status: 'success',
      message: '',
      payload: {
        user: {
          userId: results.getString('userId'),
          password: results.getString('password'),
          userName: results.getString('userName'),
          userNameKana: results.getString('userNameKana'),
          allowLogin: Boolean(results.getInt('allowLogin')),
          roleId: results.getString('roleId'),
          commonItem: {
            isDelete: Boolean(results.getString('isDelete')),
            createDateTime: results.getDate('createDateTime'),
            createUserId: results.getString('createUserId'),
            updateDateTime: results.getDate('updateDateTime'),
            updateUserId: results.getString('updateUserId'),
          },
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

function createUser(user: UserType): {
  status: string;
  message: string;
  payload: UserType | null;
} {
  const conn = jdbcConnection();
  const contents = {};

  try {
    const results = dbUtils.executeQuery(
      conn,
      `select * from m_user where userId = "${user.userId}"`
    );
    if (0 < dbUtils.rowsCount(results)) {
      return {
        status: 'error',
        message: 'ユーザIDが重複しています',
        payload: null,
      };
    }

    dbUtils.executeUpdate(
      conn,
      `insert into m_user 
      (userId, password, userName, userNameKana, allowLogin, roleId, isDelete, createDateTime, createUserId, updateDateTime, updateUserId) 
      values (
        "${user.userId}", 
        "${user.password}", 
        "${user.userName}", 
        "${user.userNameKana}", 
        ${user.allowLogin ? 1 : 0}, 
        "${user.roleId}", 
        ${user.commonItem!.isDelete ? 1 : 0}, 
        "${new Date()}", 
        "${user.commonItem!.createUserId}", 
        "${new Date()}", 
        "${user.commonItem!.updateUserId}")`
    );

    return {
      status: 'success',
      message: '',
      payload: user,
    };
  } catch (e: any) {
    return {
      status: 'error',
      message: e.toString(),
      payload: null,
    };
  }
}

function updateUser(user: ShopType) {
  const content = {
    status: 'success',
    message: '',
    payload: {
      user,
    },
  };
  return content;
}

function deleteUser(userId: ShopType) {
  const content = {
    status: 'success',
    message: '',
    payload: {
      userId: userId,
    },
  };
  return content;
}
