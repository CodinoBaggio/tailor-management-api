/*
 * DB関連のユーティリティ
 */
const seq = (conn: GoogleAppsScript.JDBC.JdbcConnection, seqColumn: string): number => {
  const results = dbUtils.executeQuery(
    conn,
    `select seq, ${seqColumn} from m_seq`
  );
  let ret = 1;
  while (results.next()) {
    const seq = results.getInt('seq');
    const targetSeq = results.getInt(seqColumn) + 1;
    dbUtils.executeUpdate(
      conn,
      `update m_seq set ${seqColumn} = ${targetSeq} where seq = ${seq}`
    );
    ret = targetSeq;
    break;
  }
  return ret;
}

const nextSeq = {
  userSeq: (conn: GoogleAppsScript.JDBC.JdbcConnection): string => {
    const userSeq = seq(conn, 'userSeq');
    return userSeq.toString().padStart(5, '0');
  },
  chargePersonSeq: (conn: GoogleAppsScript.JDBC.JdbcConnection): number => {
    return seq(conn, 'chargePersonSeq');
  },
  orderSeq: (conn: GoogleAppsScript.JDBC.JdbcConnection): number => {
    return seq(conn, 'orderSeq');
  },
  orderJaketSeq: (conn: GoogleAppsScript.JDBC.JdbcConnection): number => {
    return seq(conn, 'orderJaketSeq');
  },
  orderPantsSeq: (conn: GoogleAppsScript.JDBC.JdbcConnection): number => {
    return seq(conn, 'orderPantsSeq');
  },
  orderVestSeq: (conn: GoogleAppsScript.JDBC.JdbcConnection): number => {
    return seq(conn, 'orderVestSeq');
  },
};

/*
 * JWT関連
 */
const createJwt = ({
  privateKey,
  expiresInHours,
  data = {},
}: {
  privateKey: string;
  expiresInHours: number;
  data: { [key: string]: any };
}) => {
  // Sign token using HMAC with SHA-256 algorithm
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Date.now();
  const expires = new Date(now);
  expires.setHours(expires.getHours() + expiresInHours);

  // iat = issued time, exp = expiration time
  const payload: { [key: string]: any } = {
    exp: Math.round(expires.getTime() / 1000),
    iat: Math.round(now / 1000),
  };

  // add user payload
  Object.keys(data).forEach(function (key) {
    payload[key] = data[key];
  });

  const base64Encode = (text: any, json = true) => {
    const data = json ? JSON.stringify(text) : text;
    return Utilities.base64EncodeWebSafe(data).replace(/=+$/, '');
  };

  const toSign = `${base64Encode(header)}.${base64Encode(payload)}`;
  const signatureBytes = Utilities.computeHmacSha256Signature(
    toSign,
    privateKey
  );
  const signature = base64Encode(signatureBytes, false);
  return `${toSign}.${signature}`;
};

const generateAccessToken = (userId: string, privateKey: string) => {
  const accessToken = createJwt({
    privateKey,
    expiresInHours: 6, // expires in 6 hours
    data: {
      userId: userId,
    },
  });
  return accessToken;
};

const parseJwt = (jsonWebToken: string, privateKey: string) => {
  const [header, payload, signature] = jsonWebToken.split('.');
  const signatureBytes = Utilities.computeHmacSha256Signature(
    `${header}.${payload}`,
    privateKey
  );
  const validSignature = Utilities.base64EncodeWebSafe(signatureBytes);
  if (signature === validSignature.replace(/=+$/, '')) {
    const blob = Utilities.newBlob(
      Utilities.base64Decode(payload)
    ).getDataAsString();
    const { exp, ...data } = JSON.parse(blob);
    if (new Date(exp * 1000) < new Date()) {
      throw new Error('トークンの期限が切れています');
    }
    return data;
  } else {
    throw new Error('不正なトークンです');
  }
};
