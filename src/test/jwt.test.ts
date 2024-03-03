function test_generateAccessToken() {
  // Your super secret private key
  const privateKey = 'EN-ARQ';
  const ret = generateAccessToken('00001', privateKey);
  console.log(ret);
}

function test_parseJwt() {
  const privateKey = 'EN-ARQ';
  const ret = generateAccessToken('00001', privateKey);
  parseJwt(ret, privateKey);
}
