const incrementSeq = {
  nextUserSeq: (conn: GoogleAppsScript.JDBC.JdbcConnection): string => {
    const results = dbUtils.executeQuery(
      conn,
      `select seq, userSeq from m_seq`
    );
    let ret = '';
    while (results.next()) {
      const seq = results.getInt('seq');
      const userSeq = results.getInt('userSeq');
      dbUtils.executeUpdate(
        conn,
        `update m_seq set userSeq = ${userSeq + 1} where seq = ${seq}`
      );
      ret = userSeq.toString().padStart(5, '0');
    }
    return ret;
  },
};
