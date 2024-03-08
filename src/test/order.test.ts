function test_getOrders() {
  const ret = getOrders('00', '1');
  return ret;
}

function test_upsertOrder() {
  const order = sampleOrder1;
  const ret = upsertOrder(order);
  return ret;
}

function test_getOrder() {
  const ret = getOrder('1');
  return ret;
}
