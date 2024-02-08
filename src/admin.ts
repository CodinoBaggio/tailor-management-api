function getShops() {
  const content = {
    status: 'success',
    message: '',
    payload: {
      shops: [
        shopSample1,
        shopSample2,
        shopSample1,
        shopSample2,
        shopSample1,
        shopSample2,
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
