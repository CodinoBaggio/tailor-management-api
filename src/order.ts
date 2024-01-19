function getOrders(roleId: string, shopId: string) {
  const content = {
    status: 'success',
    message: '',
    payload: {
      orders: [sampleOrder1, sampleOrder2],
    },
  };
  return content;
}

function getOrder(orderId: string) {
  if (orderId === '123456789') {
    return {
      status: 'success',
      message: '',
      payload: {
        order: sampleOrder1,
      },
    };
  } else if (orderId === '987654321') {
    return {
      status: 'success',
      message: '',
      payload: {
        order: sampleOrder2,
      },
    };
  }
}

function createOrder(order: any) {
  return {
    status: 'success',
    message: '',
    payload: {
      orderId: '123456789',
    },
  };
}
