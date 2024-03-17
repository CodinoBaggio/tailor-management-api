function test_getLinings() {
  const ret = getLinings({ fabricProductNo: 'ATJ1547', searchPattern: 'FF' });
  return ret;
}

function test_getFabricProductNos() {
  const ret = getFabricProductNos('', 'ATJ');
  return ret;
}
