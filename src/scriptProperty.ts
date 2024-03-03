const scriptProperty = (() => {
  // @ts-ignore
  const scriptProp = PropertiesService.getScriptProperties();
  return {
    dbUserName: scriptProp.getProperty('dbUserName')!,
    dbPassword: scriptProp.getProperty('dbPassword')!,
    connectionName: scriptProp.getProperty('connectionName')!,
    db: scriptProp.getProperty('db')!,
    ip: scriptProp.getProperty('ip')!,
    privateKey: scriptProp.getProperty('privateKey')!,
  };
})();
