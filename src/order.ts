function GetOrders(roleId: string, shopId: string) {
  const content = {
    status: 'success',
    message: '',
    payload: {
      orders: [
        {
          orderId: '123456789',
          seq: 1,
          orderStatus: 'ordered',
          inuputDate: '2024-01-01',
          orderDateTime: '2024-01-01 12:00:00',
          shipDate: '2024-01-04',
          customerName: '箱根　太郎様',
          inputUserId: 10000,
          inputUserName: '東　顕正',
          jaket: {
            jaketOrderId: '123',
            totalHeight: 80,
            jaketHeight: 75,
          },
          pants: {
            pantsOrderId: '456',
            west: 100,
            hip: 120,
          },
          vest: { vestOrderId: '789', backLength: 70, bust: 86 },
        },
        {
          orderId: '987654321',
          seq: 1,
          orderStatus: 'ordered',
          inuputDate: '2024-01-01',
          orderDateTime: '2024-01-01 12:00:00',
          shipDate: '2024-01-04',
          customerName: '箱根　次郎様',
          inputUserId: 10000,
          inputUserName: '東　顕正',
          jaket: {
            jaketOrderId: '987',
            totalHeight: 80,
            jaketHeight: 75,
          },
          pants: {
            pantsOrderId: '654',
            west: 100,
            hip: 120,
          },
          vest: { vestOrderId: '321', backLength: 70, bust: 86 },
        },
      ],
    },
  };
  return content;
}

function GetOrder(orderId: string) {
  if (orderId === '123456789') {
    return {
      status: 'success',
      message: '',
      payload: {
        order: {
          orderId: '123456789',
          seq: 1,
          orderStatus: 'ordered',
          inuputDate: '2024-01-01',
          orderDateTime: '2024-01-01 12:00:00',
          shipDate: '2024-01-04',
          customerName: '箱根　太郎様',
          inputUserId: 10000,
          inputUserName: '東　顕正',
          jaket: {
            jaketOrderId: '123',
            totalHeight: 80,
            jaketHeight: 75,
          },
          pants: {
            pantsOrderId: '456',
            west: 100,
            hip: 120,
          },
          vest: { vestOrderId: '789', backLength: 70, bust: 86 },
        },
      },
    };
  } else if (orderId === '987654321') {
    return {
      status: 'success',
      message: '',
      payload: {
        order: {
          orderId: '987654321',
          seq: 1,
          orderStatus: 'ordered',
          inuputDate: '2024-01-01',
          orderDateTime: '2024-01-01 12:00:00',
          shipDate: '2024-01-04',
          customerName: '箱根　次郎様',
          inputUserId: 10000,
          inputUserName: '東　顕正',
          jaket: {
            jaketOrderId: '987',
            totalHeight: 80,
            jaketHeight: 75,
          },
          pants: {
            pantsOrderId: '654',
            west: 100,
            hip: 120,
          },
          vest: { vestOrderId: '321', backLength: 70, bust: 86 },
        },
      },
    };
  }
}
