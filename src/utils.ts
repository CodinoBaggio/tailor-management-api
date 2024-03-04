/*
 * DB関連のユーティリティ
 */
const nextSeq = {
  userSeq: (conn: GoogleAppsScript.JDBC.JdbcConnection): string => {
    const results = dbUtils.executeQuery(
      conn,
      `select seq, userSeq from m_seq`
    );
    let ret = '00000';
    while (results.next()) {
      const seq = results.getInt('seq');
      const userSeq = results.getInt('userSeq') + 1;
      dbUtils.executeUpdate(
        conn,
        `update m_seq set userSeq = ${userSeq} where seq = ${seq}`
      );
      ret = userSeq.toString().padStart(5, '0');
      break;
    }
    return ret;
  },
  chargePersonSeq: (conn: GoogleAppsScript.JDBC.JdbcConnection): number => {
    const results = dbUtils.executeQuery(
      conn,
      `select seq, chargePersonSeq from m_seq`
    );
    let ret = 1;
    while (results.next()) {
      const seq = results.getInt('seq');
      const chargePersonSeq = results.getInt('chargePersonSeq') + 1;
      dbUtils.executeUpdate(
        conn,
        `update m_seq set chargePersonSeq = ${chargePersonSeq} where seq = ${seq}`
      );
      ret = chargePersonSeq;
      break;
    }
    return ret;
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
