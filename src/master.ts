function getSelectPatterns() {
  return {
    status: 'success',
    message: '',
    payload: {
      selectPattern: {
        selectPattern1: [
          { selectPattern1: 'TR1', parts: 'jaket' },
          { selectPattern1: 'TR1P', parts: 'pants' },
          { selectPattern1: 'TR1V', parts: 'vest' },
        ],
        selectPattern2: [
          { selectPattern2: 'SY', selectPattern1: 'TR1' },
          { selectPattern2: 'A', selectPattern1: 'TR1' },
          { selectPattern2: 'AB', selectPattern1: 'TR1' },
          { selectPattern2: 'BE', selectPattern1: 'TR1' },
          { selectPattern2: 'JY', selectPattern1: 'TR1' },
          { selectPattern2: 'YA', selectPattern1: 'TR1' },
          { selectPattern2: 'SY', selectPattern1: 'TR1P' },
          { selectPattern2: 'A', selectPattern1: 'TR1P' },
          { selectPattern2: 'AB', selectPattern1: 'TR1P' },
          { selectPattern2: 'BE', selectPattern1: 'TR1P' },
          { selectPattern2: 'JY', selectPattern1: 'TR1P' },
          { selectPattern2: 'YA', selectPattern1: 'TR1P' },
          { selectPattern2: 'SY', selectPattern1: 'TR1V' },
          { selectPattern2: 'A', selectPattern1: 'TR1V' },
          { selectPattern2: 'AB', selectPattern1: 'TR1V' },
          { selectPattern2: 'BE', selectPattern1: 'TR1V' },
          { selectPattern2: 'JY', selectPattern1: 'TR1V' },
          { selectPattern2: 'YA', selectPattern1: 'TR1V' },
        ],
        selectPattern3: [
          { selectPattern3: 'SY3', selectPattern2: 'SY' },
          { selectPattern3: 'SY4', selectPattern2: 'SY' },
          { selectPattern3: 'SY5', selectPattern2: 'SY' },
          { selectPattern3: 'SY6', selectPattern2: 'SY' },
          { selectPattern3: 'SY7', selectPattern2: 'SY' },
          { selectPattern3: 'SY8', selectPattern2: 'SY' },
          { selectPattern3: 'SY9', selectPattern2: 'SY' },
          { selectPattern3: 'SY10', selectPattern2: 'SY' },
          { selectPattern3: 'SY11', selectPattern2: 'SY' },
          { selectPattern3: 'SY12', selectPattern2: 'SY' },
          { selectPattern3: 'SY13', selectPattern2: 'SY' },
          { selectPattern3: 'SY14', selectPattern2: 'SY' },
          { selectPattern3: 'SY15', selectPattern2: 'SY' },
          { selectPattern3: 'SY16', selectPattern2: 'SY' },
          { selectPattern3: 'SY17', selectPattern2: 'SY' },
          { selectPattern3: 'SY18', selectPattern2: 'SY' },
          { selectPattern3: 'A3', selectPattern2: 'A' },
          { selectPattern3: 'A4', selectPattern2: 'A' },
          { selectPattern3: 'A5', selectPattern2: 'A' },
          { selectPattern3: 'A6', selectPattern2: 'A' },
          { selectPattern3: 'A7', selectPattern2: 'A' },
          { selectPattern3: 'A8', selectPattern2: 'A' },
          { selectPattern3: 'AB3', selectPattern2: 'AB' },
          { selectPattern3: 'AB4', selectPattern2: 'AB' },
          { selectPattern3: 'AB5', selectPattern2: 'AB' },
          { selectPattern3: 'AB6', selectPattern2: 'AB' },
          { selectPattern3: 'AB7', selectPattern2: 'AB' },
          { selectPattern3: 'AB8', selectPattern2: 'AB' },
          { selectPattern3: 'BE3', selectPattern2: 'BE' },
          { selectPattern3: 'BE4', selectPattern2: 'BE' },
          { selectPattern3: 'BE5', selectPattern2: 'BE' },
          { selectPattern3: 'BE6', selectPattern2: 'BE' },
          { selectPattern3: 'BE7', selectPattern2: 'BE' },
          { selectPattern3: 'BE8', selectPattern2: 'BE' },
          { selectPattern3: 'JY3', selectPattern2: 'JY' },
          { selectPattern3: 'JY4', selectPattern2: 'JY' },
          { selectPattern3: 'JY5', selectPattern2: 'JY' },
          { selectPattern3: 'JY6', selectPattern2: 'JY' },
          { selectPattern3: 'JY7', selectPattern2: 'JY' },
          { selectPattern3: 'JY8', selectPattern2: 'JY' },
          { selectPattern3: 'YA3', selectPattern2: 'YA' },
          { selectPattern3: 'YA4', selectPattern2: 'YA' },
          { selectPattern3: 'YA5', selectPattern2: 'YA' },
          { selectPattern3: 'YA6', selectPattern2: 'YA' },
          { selectPattern3: 'YA7', selectPattern2: 'YA' },
          { selectPattern3: 'YA8', selectPattern2: 'YA' },
        ],
      },
    },
  };
}

function getFabricProductNos(productName: string, searchPattern: string) {
  const conn = jdbcConnection();
  try {
    const sql = `
      select 
        fabricProductNo
      from 
        \`tailor_db\`.m_fabric_product_no 
      where 
        fabricProductNo like (CONCAT('%', ?, '%')) 
    `;
    const st = conn.prepareStatement(sql);
    st.setObject(1, searchPattern);
    const results = st.executeQuery();
    const productNos: string[] = [];
    while (results.next()) {
      productNos.push(results.getString('fabricProductNo'));
    }
    if (productNos.length > 0) {
      return {
        status: 'success',
        message: '',
        payload: {
          productNos: productNos,
        },
      };
    } else {
      return {
        status: 'error',
        message: '生地品番が見つかりません',
        payload: { productNos: null },
      };
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: error.toString(),
      payload: { productNos: null },
    };
  }
}

function getBodySize(param: any) {
  const jaketSelectPattern2 = param.jaket.selectPattern2;
  const jaketSelectPattern3 = param.jaket.selectPattern3;
  const pantsSelectPattern2 = param.pants.selectPattern2;
  const pantsSelectPattern3 = param.pants.selectPattern3;
  const vestSelectPattern2 = param.vest.selectPattern2;
  const vestSelectPattern3 = param.vest.selectPattern3;
  const conn = jdbcConnection();

  try {
    const sql = `
      select 
        shoulderWidth,
        jaketLength
      from 
        \`tailor_db\`.m_size
      where 
        parts = 'jaket'
        and selectPattern2 = ?
        and selectPattern3 = ?
    `;
    const st = conn.prepareStatement(sql);
    st.setObject(1, jaketSelectPattern2);
    st.setObject(2, jaketSelectPattern3);
    const results = st.executeQuery();
    const sizes: { shoulderWidth: number; jaketLength: number }[] = [];
    while (results.next()) {
      sizes.push({
        shoulderWidth: results.getShort('shoulderWidth'),
        jaketLength: results.getShort('jaketLength'),
      });
    }
    if (sizes.length > 0) {
      return {
        status: 'success',
        message: '',
        payload: {
          jaket: {
            shoulderWidth: sizes[0].shoulderWidth,
            jaketLength: sizes[0].jaketLength,
          },
          pants: null,
          vest: null,
        },
      };
    } else {
      return {
        status: 'error',
        message: '寸法が見つかりません',
        payload: null,
      };
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: error.toString(),
      payload: null,
    };
  }
}

function getLinings(param: any) {
  const fabricProductNo = param.fabricProductNo;
  const searchPattern = param.searchPattern;
  const specificFabricProductNos = [
    'ATJ1546',
    'ATJ1547',
    'ATJ1548',
    'ATJ1549',
    'ATJ1828',
    'ATJ1522',
    'ATJ1523',
    'ATJ1524',
    'ATJ1528',
    'ATJ1529',
    'ATJ1738',
    'ATJ1740',
    'ATJ1741',
    'ATJ1742',
    'ATJ1802',
    'ATJ1804',
    'ATJ1805',
    'ATJ1806',
    'ATJ1807',
    'ATJ1809',
    'ATJ1826',
    'ATJ1827',
    'ATJ1829',
    'ATJ1830',
    'ATJ1865',
    'ATJ1873',
    'ATJ1874',
    'ATJ1875',
    'ATJ2006',
    'ATJ2007',
    'ATJ2008',
    'ATJ2015',
    'ATJ2016',
    'ATJ2037',
    'ATJ2038',
    'ATJ2040',
    'ATJ2041',
    'ATJ2042',
    'ATJ2043',
    'ZE500',
    'ZE502',
    'ZE503',
    'ZE504',
    'ZE508',
    'ZE511',
    'ZE512',
    'ZE513',
    'ZE514',
    'ZE515',
    'ZE516',
    'ZE517',
    'ZK518',
    'ZK519',
    'ZK520',
    'ZK521',
    'ZK522',
    'ZK523',
    'ZK524',
    'ZK525',
    'ZK526',
    'ZK527',
    'ZE532',
    'ZE533',
    'ZE534',
    'ZE535',
    'ZE536',
    'ZE537',
    'ZE538',
    'ZE539',
    'ZE540',
    'ZE541',
    'ZE542',
    'ZE543',
    'ZE544',
    'ATJ1530',
    'ATJ1543',
    'ATJ1544',
  ];
  const specificLings = specificFabricProductNos.includes(fabricProductNo)
    ? ['FF10', 'FF20', 'FF00']
    : ['XXX', 'YYY', 'ZZZ'];
  const content = {
    status: 'success',
    message: '',
    payload: {
      linings: specificLings.filter((item) => item.includes(searchPattern)),
    },
  };
  return content;
}

function getButtonProductNos(param: any) {
  const fabricProductNo = param.fabricProductNo;
  const specificFabricProductNos = [
    'ATJ1546',
    'ATJ1547',
    'ATJ1548',
    'ATJ1549',
    'ATJ1828',
    'ATJ1522',
    'ATJ1523',
    'ATJ1524',
    'ATJ1528',
    'ATJ1529',
    'ATJ1738',
    'ATJ1740',
    'ATJ1741',
    'ATJ1742',
    'ATJ1802',
    'ATJ1804',
    'ATJ1805',
    'ATJ1806',
    'ATJ1807',
    'ATJ1809',
    'ATJ1826',
    'ATJ1827',
    'ATJ1829',
    'ATJ1830',
    'ATJ1865',
    'ATJ1873',
    'ATJ1874',
    'ATJ1875',
    'ATJ2006',
    'ATJ2007',
    'ATJ2008',
    'ATJ2015',
    'ATJ2016',
    'ATJ2037',
    'ATJ2038',
    'ATJ2040',
    'ATJ2041',
    'ATJ2042',
    'ATJ2043',
    'ZE500',
    'ZE502',
    'ZE503',
    'ZE504',
    'ZE508',
    'ZE511',
    'ZE512',
    'ZE513',
    'ZE514',
    'ZE515',
    'ZE516',
    'ZE517',
    'ZK518',
    'ZK519',
    'ZK520',
    'ZK521',
    'ZK522',
    'ZK523',
    'ZK524',
    'ZK525',
    'ZK526',
    'ZK527',
    'ZE532',
    'ZE533',
    'ZE534',
    'ZE535',
    'ZE536',
    'ZE537',
    'ZE538',
    'ZE539',
    'ZE540',
    'ZE541',
    'ZE542',
    'ZE543',
    'ZE544',
    'ATJ1530',
    'ATJ1543',
    'ATJ1544',
  ];
  const specificLings = specificFabricProductNos.includes(fabricProductNo)
    ? ['FF10', 'FF20', 'FF00']
    : ['XXX', 'YYY', 'ZZZ'];
  const content = {
    status: 'success',
    message: '',
    payload: {
      linings: specificLings,
    },
  };
  return content;
}

function getPrice(param: any) {
  const shopNo = param.shopNo;
  const shopGroup = param.shopGroup;
  const conn = jdbcConnection();
  const price = { fabricPrice: 0, wages: 0, customPrice: 0, totalPrice: 0 };

  try {
    // 生地価格を取得
    price.fabricPrice = getFabricPrice(
      conn,
      shopNo,
      shopGroup,
      param.fabricProductNo
    );

    // 工賃を取得
    price.wages = getWages(conn, shopGroup, param.productName);

    // 仕様変更価格を取得
    price.customPrice = 0;

    // ボタン裏地価格を取得
    const buttonPrice = 0;
    price.customPrice += buttonPrice;

    // スタブ
    price.fabricPrice = 3000000;
    price.wages = 2000000;
    price.customPrice = 1000000;

    // 合計金額を計算
    price.totalPrice = price.fabricPrice + price.wages + price.customPrice;

    return {
      status: 'success',
      message: '',
      payload: {
        price: price,
      },
    };
  } catch (error: any) {
    return {
      status: 'error',
      message: error.toString(),
      payload: { price: null },
    };
  }
}

function getFabricPrice(
  conn: GoogleAppsScript.JDBC.JdbcConnection,
  shopNo: string,
  shopGroup: string,
  fabricProductNo: string
) {
  // 生地価格を取得
  const sql = `
      select 
        * 
      from 
        \`tailor_db\`.m_fabric_price 
      where 
        shopNo = ? 
        and shopGroup = ?
        and fabricProductNo = ?
    `;
  const st = conn.prepareStatement(sql);
  st.setObject(1, shopNo);
  st.setObject(2, shopGroup);
  st.setObject(3, fabricProductNo);
  const results = st.executeQuery();
  return results.next() ? results.getFloat('price') : 0;
}

function getWages(
  conn: GoogleAppsScript.JDBC.JdbcConnection,
  shopGroup: string,
  productName: string
) {
  // 生地価格を取得
  const sql = `
      select 
        * 
      from 
        \`tailor_db\`.m_wages 
      where 
        shopGroup = ?
        and productName = ?
    `;
  const st = conn.prepareStatement(sql);
  st.setObject(1, shopGroup);
  st.setObject(2, productName);
  const results = st.executeQuery();
  return results.next() ? results.getFloat('wages') : 0;
}
