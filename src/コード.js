function doPost(e) {
  try {
    const param = JSON.parse(e.postData.contents);
    const endpoint = param.endpoint;
    const endpointParams = param.endpointParams;
    Logger.log(endpoint);

    let content = {};
    switch (endpoint) {
      case 'login':
        content = Login(endpointParams.loginId, endpointParams.password);
        break;
      case 'verify-token':
        content = VerifyToken(endpointParams.token);
        break;
      case 'orders':
        content = GetOrders(endpointParams.roleId, endpointParams.shopId);
        break;
      case 'order':
        content = GetOrder(endpointParams.orderId);
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
