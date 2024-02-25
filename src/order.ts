function getOrders(roleId: string, shopId: string) {
  // sampleOrder1を25件、sampleOrder2を25件返す
  const sample1s = Array(25).fill(sampleOrder1);
  const sample2s = Array(25).fill(sampleOrder2);
  const content = {
    status: 'success',
    message: '',
    payload: {
      orders: [...sample2s, ...sample1s],
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

function upsertOrder(order: OrderBasisType) {
  let status = 'success';
  let message = '登録しました。';

  return {
    status: status,
    message: message,
    payload: {
      order: order,
    },
  };
}

function deleteOrder(orderId: string) {
  let status = 'success';
  let message = '削除しました。';

  return {
    status: status,
    message: message,
    payload: {
      orderId: orderId,
    },
  };
}
