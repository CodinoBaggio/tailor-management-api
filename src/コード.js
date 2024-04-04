function doPost(e) {
  try {
    const param = JSON.parse(e.postData.contents);
    const endpoint = param.endpoint;
    const endpointParams = param.endpointParams;

    let content = {};
    switch (endpoint) {
      // #region Auth
      case 'login':
        content = login(endpointParams.userId, endpointParams.password);
        break;
      case 'verify-token':
        content = verifyToken(endpointParams.token);
        break;
      // #endregion

      // #region Order
      case 'orders':
        content = getOrders(endpointParams.roleId, endpointParams.shopId);
        break;
      case 'order':
        content = getOrder(endpointParams.orderId);
        break;
      case 'upsert-order':
        content = upsertOrder(endpointParams.order);
        break;
      case 'delete-order':
        content = deleteOrder(endpointParams.orderId);
        break;
      // #endregion

      // #region Shop
      case 'shops':
        content = getShops();
        break;
      case 'shop':
        content = getShop(endpointParams.shopId);
        break;
      case 'create-shop':
        content = createShop(endpointParams.shop);
        break;
      case 'update-shop':
        content = updateShop(endpointParams.shop);
        break;
      case 'delete-shop':
        content = deleteShop(endpointParams.shopId);
        break;
      // #endregion

      // #region User
      case 'users':
        content = getUsers();
        break;
      case 'user':
        content = getUser(endpointParams.userId);
        break;
      case 'create-user':
        content = createUser(endpointParams.user);
        break;
      case 'update-user':
        content = updateUser(endpointParams.user);
        break;
      case 'delete-user':
        content = deleteUser(endpointParams.userId);
        break;
      // #endregion

      // #region Master
      case 'select-pattern':
        content = getSelectPatterns();
        break;
      case 'fabric-product-nos':
        content = getFabricProductNos(endpointParams.productName, endpointParams.searchPattern);
        break;
      case 'body-size':
        content = getBodySize(endpointParams);
        break;
      case 'lining':
        content = getLinings(endpointParams);
        break;
      case 'button-productno':
        content = getButtonProductNos(endpointParams);
        break;
      case 'order-price':
        content = getPrice(endpointParams);
        break;
      // #endregion

      default:
        content = {
          status: 'error',
          message: 'unknowon endpoint',
        };
    }

    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify(content));
    return output;
  } catch (error) {
    Logger.log(error);
    const content = {
      status: 'error',
      message: error.message,
    };
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify(content));
    return output;
  }
}

function test_doPost() {
  const e = {
    postData: {
      contents: JSON.stringify({
        endpoint: 'orders',
        endpointParams: {
          roleId: '00',
          shopId: '1',
        },
      }),
    },
  };
  const ret = doPost(e);
}
