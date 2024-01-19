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

function createOrder(order: OrderBasisType) {
  let status = 'success';
  let message = '登録が完了しました。';
  if (order.jaket.selectPattern1 === '') {
    status = 'error';
    message = 'ジャケットのセレクトパターンを選択してください。';
  }

  return {
    status: status,
    message: message,
    payload: {
      orderId: 'ok google',
    },
  };
}
