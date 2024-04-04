function test_login() {
  const content = login('a', 'a');
  return content;
}

function test_verifyToken() {
  const content = verifyToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTIyMDcyMTMsImlhdCI6MTcxMjE4NTYxMywidXNlcklkIjoiYSJ9.59HOJoV4GQHIs5qux8IUe18a-tyRwVoVEpld0mspQRE'
  );
  return content;
}
