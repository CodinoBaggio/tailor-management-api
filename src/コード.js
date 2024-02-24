function doPost(e) {
  try {
    const param = JSON.parse(e.postData.contents);
    const endpoint = param.endpoint;
    const endpointParams = param.endpointParams;
    // Logger.log(endpoint);

    let content = {};
    switch (endpoint) {
      case 'login':
        content = login(endpointParams.loginId, endpointParams.password);
        break;
      case 'verify-token':
        content = verifyToken(endpointParams.token);
        break;
      case 'orders':
        content = getOrders(endpointParams.roleId, endpointParams.shopId);
        break;
      case 'order':
        content = getOrder(endpointParams.orderId);
        break;
      case 'order-resources':
        content = getOrderResources();
        break;
      case 'fabric-product-no':
        content = getFabricProductNos(
          endpointParams.productName,
          endpointParams.searchPattern
        );
        break;
      case 'create-order':
        content = createOrder(endpointParams.order);
        break;
      case 'update-order':
        content = updateOrder(endpointParams.order);
        break;
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
      case 'body-size':
        content = getBodySize(endpointParams);
        break;
      case 'lining':
        content = getLinings(endpointParams);
        break;
      case 'button-productno':
        content = getLinings(endpointParams);
        break;
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
