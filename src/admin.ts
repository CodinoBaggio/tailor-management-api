function getShops() {
  const conn = jdbcConnection();
  try {
    const results = dbUtils.executeQuery(
      conn,
      `
      select
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
        m_shop.updateUserId as shopUpdateUserId,
        m_chargePerson.chargePersonId,
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
        m_user.updateUserId
      from
        \`tailor-db\`.m_shop
        left join \`tailor-db\`.m_chargePerson
        on m_shop.shopId = m_chargePerson.shopId
        left join \`tailor-db\`.m_user
        on m_chargePerson.userId = m_user.userId
      `
    );
    const items: any[] = [];
    while (results.next()) {
      items.push({
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
        chargePersonId: results.getString('chargePersonId'),
        userId: results.getString('userId'),
        userName: results.getString('userName'),
        userNameKana: results.getString('userNameKana'),
        allowLogin: Boolean(results.getInt('allowLogin')),
        roleId: results.getString('roleId'),
      });
    }
    
    // @ts-ignore
    const _ = LodashGS.load();
    const shops: ShopType[] = [];
    const grouped = _.groupBy(items, 'shopId')
    _.forEach(grouped, (value: any, key: string) => {
      const shop = {
        shopId: key,
        shopName: value[0].shopName,
        shopGroup: value[0].shopGroup,
        shopNo: value[0].shopNo,
        postalCode: value[0].postalCode,
        prefecture: value[0].prefecture,
        city: value[0].city,
        address: value[0].address,
        building: value[0].building,
        isOwn: value[0].isOwn,
        commonItem: {
          isDelete: value[0].isDelete,
          createDateTime: value[0].createDateTime,
          createUserId: value[0].createUserId,
          updateDateTime: value[0].updateDateTime,
          updateUserId: value[0].updateUserId,
        },
        chargePersons: value.map((item: any) => {
          return {
            chargePersonId: item.chargePersonId,
            user: {
              userId: item.userId,
              userName: item.userName,
              userNameKana: item.userNameKana,
              allowLogin: item.allowLogin,
              roleId: item.roleId,
            },
          };
        }),
      };
      shops.push(shop);
    });
    // while (results.next()) {
    //   shops.push({
    //     shopId: results.getString('shopId'),
    //     shopName: results.getString('shopName'),
    //     shopGroup: results.getString('shopGroup'),
    //     shopNo: results.getString('shopNo'),
    //     postalCode: results.getString('postalCode'),
    //     prefecture: results.getString('prefecture'),
    //     city: results.getString('city'),
    //     address: results.getString('address'),
    //     building: results.getString('building'),
    //     isOwn: Boolean(results.getInt('isOwn')),
    //     commonItem: {
    //       isDelete: Boolean(results.getString('shopIsDelete')),
    //       createDateTime: results.getDate('shopCreateDateTime'),
    //       createUserId: results.getString('shopCreateUserId'),
    //       updateDateTime: results.getDate('shopUpdateDateTime'),
    //       updateUserId: results.getString('shopUpdateUserId'),
    //     },
    //     chargePersons: [
    //       {
    //         chargePersonId: results.getString('chargePersonId'),
    //         user: {
    //           userId: results.getString('userId'),
    //           password: results.getString('password'),
    //           userName: results.getString('userName'),
    //           userNameKana: results.getString('userNameKana'),
    //           allowLogin: Boolean(results.getInt('allowLogin')),
    //           roleId: results.getString('roleId'),
    //           commonItem: {
    //             isDelete: Boolean(results.getString('isDelete')),
    //             createDateTime: results.getDate('createDateTime'),
    //             createUserId: results.getString('createUserId'),
    //             updateDateTime: results.getDate('updateDateTime'),
    //             updateUserId: results.getString('updateUserId'),
    //           },
    //         },
    //       },
    //     ],
    //   });
    // }

    return {
      status: 'success',
      message: '',
      payload: { shops },
    };
  } catch (e: any) {
    return {
      status: 'error',
      message: e.toString(),
      payload: { shops: null },
    };
  }
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
      `
      select
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
      `
    );
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
      `
      select 
        * 
      from 
        m_user 
      where 
        userId = "${userId}" 
        and isDelete = 0`
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
  try {
    const results = dbUtils.executeQuery(
      conn,
      `
      select 
        * 
      from 
        m_user 
      where 
        userId = "${user.userId}"`
    );
    if (0 < dbUtils.rowsCount(results)) {
      return {
        status: 'error',
        message: 'すでに登録済みのユーザIDです',
        payload: null,
      };
    } else {
      user.userId = nextSeq.userSeq(conn);
    }

    // m_userに登録
    dbUtils.executeUpdate(
      conn,
      `
      insert into m_user 
      (userId, password, userName, userNameKana, allowLogin, roleId, isDelete, createDateTime, createUserId, updateDateTime, updateUserId) 
      values (
        "${user.userId}", 
        "${user.password}", 
        "${user.userName}", 
        "${user.userNameKana}", 
        ${user.allowLogin ? 1 : 0}, 
        "${user.roleId}", 
        ${user.commonItem!.isDelete ? 1 : 0}, 
        "${user.commonItem!.createDateTime}", 
        "${user.commonItem!.createUserId}", 
        "${user.commonItem!.updateDateTime}", 
        "${user.commonItem!.updateUserId}")
      `
    );

    if (user.shop && user.shop.shopId) {
      // m_chargePersonに登録
      dbUtils.executeUpdate(
        conn,
        `
        insert into m_chargePerson 
        (chargePersonId, userId, shopId, isDelete, createDateTime, createUserId, updateDateTime, updateUserId) 
        values (
          "${nextSeq.chargePersonSeq(conn)}", 
          "${user.userId}", 
          "${user.shop.shopId}", 
          0, 
          "${user.shop.commonItem!.createDateTime}", 
          "${user.commonItem!.createUserId}", 
          "${user.shop.commonItem!.updateDateTime}", 
          "${user.commonItem!.updateUserId}")
        `
      );
    }

    // コミット
    conn.commit();

    return {
      status: 'success',
      message: '',
      payload: user,
    };
  } catch (e: any) {
    // ロールバック
    conn.rollback();

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
