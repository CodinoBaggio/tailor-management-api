function test_createUser() {
  const user = {
    userId: '(新規)',
    password: 'password',
    userName: '東　顕正',
    userNameKana: 'ひがし　けんしょう',
    allowLogin: true,
    roleId: '00',
    commonItem: {
      isDelete: false,
      createDateTime: new Date(),
      createUserId: 'admin',
      updateDateTime: new Date(),
      updateUserId: 'admin',
    },
  };

  const content = createUser(user);
  return content;
}

function test_getUsers() {
  const content = getUsers();
  return content;
}
