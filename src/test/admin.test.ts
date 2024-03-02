function test_createUser() {
  const user = {
    userId: '00000',
    password: 'password',
    userName: 'user1',
    userNameKana: 'user1',
    allowLogin: true,
    roleId: 'admin',
    isDelete: false,
    createDateTime: '2021-01-01',
    createUserId: 'user1',
    updateDateTime: '2021-01-01',
    updateUserId: 'user1',
  };

  const content = createUser(user);
  return content;
}

function test_getUsers() {
  const content = getUsers();
  return content;
}