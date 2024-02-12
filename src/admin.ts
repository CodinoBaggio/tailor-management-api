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

function getUsers() {
  const content = {
    status: 'success',
    message: '',
    payload: {
      users: [userSample1, userSample2, userSample3],
    },
  };
  return content;
}

function getUser() {
  const content = {
    status: 'success',
    message: '',
    payload: {
      user: userSample2,
    },
  };
  return content;
}

function createUser(user: UserType) {
  const content = {
    status: 'success',
    message: '',
    payload: {
      user,
    },
  };
  return content;
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
