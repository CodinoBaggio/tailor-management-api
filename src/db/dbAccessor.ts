const jdbcConnection = () => {
  /* Cloud SQL接続情報 */
  const dbUrl = `jdbc:google:mysql://${scriptProperty.connectionName}/${scriptProperty.db}`;
  const conn = Jdbc.getCloudSqlConnection(
    dbUrl,
    scriptProperty.dbUserName,
    scriptProperty.dbPassword
  );
  conn.setAutoCommit(false);
  return conn;
};

const dbUtils = {
  executeQuery: (conn: GoogleAppsScript.JDBC.JdbcConnection, sql: string) => {
    const stmt = conn.createStatement();
    return stmt.executeQuery(sql);
  },
  executeUpdate: (conn: GoogleAppsScript.JDBC.JdbcConnection, sql: string) => {
    const stmt = conn.createStatement();
    return stmt.executeUpdate(sql);
  },
  rowsCount: (results: GoogleAppsScript.JDBC.JdbcResultSet) => {
    results.last(); //取得レコードの最後の行に移動
    const rowsCount = results.getRow();
    results.beforeFirst(); //最初の行に戻る
    return rowsCount;
  },
};
