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
          content = getFabricProductNos(endpointParams.productName, endpointParams.searchPattern);
          break;
        case 'create-order':
        content = createOrder(endpointParams.order);
        break;
      case 'save-order':
        content = saveOrder(endpointParams.order);
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
