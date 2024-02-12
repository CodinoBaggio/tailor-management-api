function getOrders(roleId: string, shopId: string) {
  // sampleOrder1を25件、sampleOrder2を25件返す
  const sample1s = Array(25).fill(sampleOrder1);
  const sample2s = Array(25).fill(sampleOrder2);
  const content = {
    status: 'success',
    message: '',
    payload: {
      orders: [...sample1s, ...sample2s],
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

function updateOrder(order: OrderBasisType) {
  let status = 'success';
  let message = '保存しました。';
  if (order.jaket.selectPattern1 === '') {
    status = 'error';
    message = 'ジャケットのセレクトパターンを選択してください。';
  }

  return {
    status: status,
    message: message,
    payload: {
      orderId: order.orderId,
    },
  };
}
