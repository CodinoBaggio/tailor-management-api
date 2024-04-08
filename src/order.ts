function getOrders(roleId: string, shopId: string) {
  const conn = jdbcConnection();
  try {
    const adminSql = `
      select
        *
      from
        \`tailor-db\`.t_order
      where
        isDelete = 0
      order by
        cast(orderId AS SIGNED) desc
    `;
    const sql = `
      select
        *
      from
        \`tailor-db\`.t_order
      where
        shopId = '${shopId}'
        and isDelete = 0
      order by
        cast(orderId AS SIGNED) desc
    `;
    const results = dbUtils.executeQuery(conn, (roleId = '00' ? adminSql : sql));
    const orders: OrderBasisShortType[] = [];
    while (results.next()) {
      const orderId = results.getString('orderId');
      const order: OrderBasisShortType = {
        orderId: results.getString('t_order.orderId'),
        // shopId: results.getString('t_order.shopId'),
        // seq: results.getInt('t_order.seq'),
        orderStatus: results.getString('t_order.orderStatus'),
        inputDate: results.getString('t_order.inputDate'),
        orderDateTime: results.getString('t_order.orderDateTime'),
        shipDate: results.getString('t_order.shipDate'),
        customerName: results.getString('t_order.customerName'),
        productName: results.getString('t_order.productName'),
        fabricMaker: results.getString('t_order.fabricMaker'),
        fabricProductNo: results.getString('t_order.fabricProductNo'),
        // yield: results.getInt('t_order.yield'),
        // blendRateFabric1: results.getString('t_order.blendRateFabric1'),
        // blendRate1: results.getFloat('t_order.blendRate1'),
        // blendRateFabric2: results.getString('t_order.blendRateFabric2'),
        // blendRate2: results.getFloat('t_order.blendRate2'),
        // blendRateFabric3: results.getString('t_order.blendRateFabric3'),
        // blendRate3: results.getFloat('t_order.blendRate3'),
        // blendRateFabric4: results.getString('t_order.blendRateFabric4'),
        // blendRate4: results.getFloat('t_order.blendRate4'),
        // inputUserId: results.getString('t_order.inputUserId'),
        // remark: results.getString('t_order.remark'),
        // isDelete: results.getString('t_order.isDelete'),
        // createDateTime: results.getString('t_order.createDateTime'),
        // createUserId: results.getString('t_order.createUserId'),
        // updateDateTime: results.getString('t_order.updateDateTime'),
        // updateUserId: results.getString('t_order.updateUserId'),
        // jaket: {
        //   jaketOrderId: results.getString('t_order_jaket.jaketOrderId'),
        //   orderId: results.getString('t_order_jaket.orderId'),
        //   selectPattern1: results.getString('t_order_jaket.selectPattern1'),
        //   selectPattern2: results.getString('t_order_jaket.selectPattern2'),
        //   selectPattern3: results.getString('t_order_jaket.selectPattern3'),
        //   totalLength: results.getFloat('t_order_jaket.totalLength'),
        //   jaketLength: results.getFloat('t_order_jaket.jaketLength'),
        //   shoulderWidth: results.getFloat('t_order_jaket.shoulderWidth'),
        //   sleeveLengthLeft: results.getFloat('t_order_jaket.sleeveLengthLeft'),
        //   sleeveLengthRight: results.getFloat(
        //     't_order_jaket.sleeveLengthRight'
        //   ),
        //   bust: results.getFloat('t_order_jaket.bust'),
        //   waist: results.getFloat('t_order_jaket.waist'),
        //   bustTop: results.getFloat('t_order_jaket.bustTop'),
        //   waistTop: results.getFloat('t_order_jaket.waistTop'),
        //   canvas: results.getString('t_order_jaket.canvas'),
        //   shoulderType: results.getString('t_order_jaket.shoulderType'),
        //   collarType: results.getString('t_order_jaket.collarType'),
        //   frontButton: results.getString('t_order_jaket.frontButton'),
        //   collarWidth: results.getString('t_order_jaket.collarWidth'),
        //   sleeveButton: results.getString('t_order_jaket.sleeveButton'),
        //   sleeveOpening: results.getString('t_order_jaket.sleeveOpening'),
        //   chestPocket: results.getString('t_order_jaket.chestPocket'),
        //   sewingMethod: results.getString('t_order_jaket.sewingMethod'),
        //   frontCut: results.getString('t_order_jaket.frontCut'),
        //   labelSatinFabric: results.getString('t_order_jaket.labelSatinFabric'),
        //   stitch: results.getString('t_order_jaket.stitch'),
        //   stitchLocation: results.getString('t_order_jaket.stitchLocation'),
        //   pinpointStitch: results.getString('t_order_jaket.pinpointStitch'),
        //   pinpointStitchThreadColor: results.getString(
        //     't_order_jaket.pinpointStitchThreadColor'
        //   ),
        //   chestBoxSatinFabric: results.getString(
        //     't_order_jaket.chestBoxSatinFabric'
        //   ),
        //   waistPocket: results.getString('t_order_jaket.waistPocket'),
        //   flapWidth: results.getFloat('t_order_jaket.flapWidth'),
        //   changePocket: results.getString('t_order_jaket.changePocket'),
        //   secretPocket: results.getString('t_order_jaket.secretPocket'),
        //   backSpec: results.getString('t_order_jaket.backSpec'),
        //   daiba: results.getString('t_order_jaket.daiba'),
        //   insidePocket: results.getString('t_order_jaket.insidePocket'),
        //   penPocket: results.getString('t_order_jaket.penPocket'),
        //   ticketPocket: results.getString('t_order_jaket.ticketPocket'),
        //   pat: results.getString('t_order_jaket.pat'),
        //   lining: results.getString('t_order_jaket.lining'),
        //   collarBack: results.getString('t_order_jaket.collarBack'),
        //   vents: results.getString('t_order_jaket.vents'),
        //   inName: results.getString('t_order_jaket.inName'),
        //   nameFont: results.getString('t_order_jaket.nameFont'),
        //   namePosition: results.getString('t_order_jaket.namePosition'),
        //   nameColor: results.getString('t_order_jaket.nameColor'),
        //   name: results.getString('t_order_jaket.name'),
        //   labelHole: results.getString('t_order_jaket.labelHole'),
        //   stitchThreadColor: results.getString(
        //     't_order_jaket.stitchThreadColor'
        //   ),
        //   labelThreadColor: results.getString('t_order_jaket.labelThreadColor'),
        //   frontButtonThreadColor: results.getString(
        //     't_order_jaket.frontButtonThreadColor'
        //   ),
        //   sleeveButtonThreadColor: results.getString(
        //     't_order_jaket.sleeveButtonThreadColor'
        //   ),
        //   brandName: results.getString('t_order_jaket.brandName'),
        //   fabricMark: results.getString('t_order_jaket.fabricMark'),
        //   buttonProductNo: results.getString('t_order_jaket.buttonProductNo'),
        //   sleeveOpeningTape: results.getString(
        //     't_order_jaket.sleeveOpeningTape'
        //   ),
        //   sleeveElbowPatch: results.getString('t_order_jaket.sleeveElbowPatch'),
        //   hole: results.getString('t_order_jaket.hole'),
        //   sleeveButtonHoleColor: results.getString(
        //     't_order_jaket.sleeveButtonHoleColor'
        //   ),
        //   uchiai: results.getFloat('t_order_jaket.uchiai'),
        //   hanmi: results.getFloat('t_order_jaket.hanmi'),
        //   kutsumi: results.getFloat('t_order_jaket.kutsumi'),
        //   squareShoulderLeft: results.getFloat(
        //     't_order_jaket.squareShoulderLeft'
        //   ),
        //   squareShoulderRight: results.getFloat(
        //     't_order_jaket.squareShoulderRight'
        //   ),
        //   slopingShoulderLeft: results.getFloat(
        //     't_order_jaket.slopingShoulderLeft'
        //   ),
        //   slopingShoulderRight: results.getFloat(
        //     't_order_jaket.slopingShoulderRight'
        //   ),
        //   totsuRyo: results.getFloat('t_order_jaket.totsuRyo'),
        //   hip: results.getFloat('t_order_jaket.hip'),
        //   frontLength: results.getFloat('t_order_jaket.frontLength'),
        //   frontSleeveHem: results.getFloat('t_order_jaket.frontSleeveHem'),
        //   ahFrontOpening: results.getFloat('t_order_jaket.ahFrontOpening'),
        //   sleeveOpeningWidth: results.getFloat(
        //     't_order_jaket.sleeveOpeningWidth'
        //   ),
        //   collarMitsu: results.getFloat('t_order_jaket.collarMitsu'),
        //   collarShift: results.getFloat('t_order_jaket.collarShift'),
        //   buttonPosition: results.getFloat('t_order_jaket.buttonPosition'),
        //   backCurve: results.getFloat('t_order_jaket.backCurve'),
        //   sickleRaising: results.getFloat('t_order_jaket.sickleRaising'),
        //   sleeveWidth: results.getFloat('t_order_jaket.sleeveWidth'),
        //   backWidth: results.getFloat('t_order_jaket.backWidth'),
        //   sleeveBack: results.getString('t_order_jaket.sleeveBack'),
        //   remark: results.getString('t_order_jaket.remark'),
        //   isDelete: results.getString('t_order_jaket.isDelete'),
        //   createDateTime: results.getString('t_order_jaket.createDateTime'),
        //   createUserId: results.getString('t_order_jaket.createUserId'),
        //   updateDateTime: results.getString('t_order_jaket.updateDateTime'),
        //   updateUserId: results.getString('t_order_jaket.updateUserId'),
        // },
        // pants: {
        //   pantsOrderId: results.getString('t_order_pants.pantsOrderId'),
        //   orderId: results.getString('t_order_pants.orderId'),
        //   selectPattern1: results.getString('t_order_pants.selectPattern1'),
        //   selectPattern2: results.getString('t_order_pants.selectPattern2'),
        //   selectPattern3: results.getString('t_order_pants.selectPattern3'),
        //   waist: results.getFloat('t_order_pants.waist'),
        //   hip: results.getFloat('t_order_pants.hip'),
        //   hipTop: results.getFloat('t_order_pants.hipTop'),
        //   rise: results.getFloat('t_order_pants.rise'),
        //   inseamLeft: results.getFloat('t_order_pants.inseamLeft'),
        //   inseamRight: results.getFloat('t_order_pants.inseamRight'),
        //   crossingWidth: results.getFloat('t_order_pants.crossingWidth'),
        //   kneeWidth: results.getFloat('t_order_pants.kneeWidth'),
        //   hemOpening: results.getFloat('t_order_pants.hemOpening'),
        //   tack: results.getString('t_order_pants.tack'),
        //   sidePocket: results.getString('t_order_pants.sidePocket'),
        //   foldedHem: results.getString('t_order_pants.foldedHem'),
        //   secretPocket: results.getString('t_order_pants.secretPocket'),
        //   kneeBack: results.getString('t_order_pants.kneeBack'),
        //   holeThreadColor: results.getString('t_order_pants.holeThreadColor'),
        //   amfStitch: results.getString('t_order_pants.amfStitch'),
        //   sideAmf: results.getString('t_order_pants.sideAmf'),
        //   stitchThreadColor: results.getString(
        //     't_order_pants.stitchThreadColor'
        //   ),
        //   kneepadColor: results.getString('t_order_pants.kneepadColor'),
        //   tackSpec: results.getString('t_order_pants.tackSpec'),
        //   sideSatinFabric: results.getString('t_order_pants.sideSatinFabric'),
        //   pisPocketJadeGreen: results.getString(
        //     't_order_pants.pisPocketJadeGreen'
        //   ),
        //   pisPocket: results.getString('t_order_pants.pisPocket'),
        //   plaket: results.getString('t_order_pants.plaket'),
        //   buttocks: results.getFloat('t_order_pants.buttocks'),
        //   flatButt: results.getFloat('t_order_pants.flatButt'),
        //   frontRise: results.getFloat('t_order_pants.frontRise'),
        //   backRise: results.getFloat('t_order_pants.backRise'),
        //   wedgie: results.getFloat('t_order_pants.wedgie'),
        //   pancherina: results.getString('t_order_pants.pancherina'),
        //   loopCount: results.getString('t_order_pants.loopCount'),
        //   qiLoop: results.getString('t_order_pants.qiLoop'),
        //   hole: results.getString('t_order_pants.hole'),
        //   chic: results.getString('t_order_pants.chic'),
        //   loopAdd: results.getString('t_order_pants.loopAdd'),
        //   plushLoop: results.getString('t_order_pants.plushLoop'),
        //   setFinishing: results.getString('t_order_pants.setFinishing'),
        //   creaseWire: results.getString('t_order_pants.creaseWire'),
        //   buttholeTape: results.getString('t_order_pants.buttholeTape'),
        //   remark: results.getString('t_order_pants.remark'),
        //   isDelete: results.getString('t_order_pants.isDelete'),
        //   createDateTime: results.getString('t_order_pants.createDateTime'),
        //   createUserId: results.getString('t_order_pants.createUserId'),
        //   updateDateTime: results.getString('t_order_pants.updateDateTime'),
        //   updateUserId: results.getString('t_order_pants.updateUserId'),
        // },
        // vest: {
        //   vestOrderId: results.getString('t_order_vest.vestOrderId'),
        //   orderId: results.getString('t_order_vest.orderId'),
        //   selectPattern1: results.getString('t_order_vest.selectPattern1'),
        //   selectPattern2: results.getString('t_order_vest.selectPattern2'),
        //   selectPattern3: results.getString('t_order_vest.selectPattern3'),
        //   backLength: results.getFloat('t_order_vest.backLength'),
        //   bustTop: results.getFloat('t_order_vest.bustTop'),
        //   waistTop: results.getFloat('t_order_vest.waistTop'),
        //   collar: results.getString('t_order_vest.collar'),
        //   chestPocket: results.getString('t_order_vest.chestPocket'),
        //   frontButton: results.getString('t_order_vest.frontButton'),
        //   frontButtonHolePosition: results.getString(
        //     't_order_vest.frontButtonHolePosition'
        //   ),
        //   waistPocket: results.getString('t_order_vest.waistPocket'),
        //   backSide: results.getString('t_order_vest.backSide'),
        //   buckle: results.getString('t_order_vest.buckle'),
        //   holeThreadColor: results.getString('t_order_vest.holeThreadColor'),
        //   stitch: results.getString('t_order_vest.stitch'),
        //   hole: results.getString('t_order_vest.hole'),
        //   uchiai: results.getFloat('t_order_vest.uchiai'),
        //   hanmi: results.getFloat('t_order_vest.hanmi'),
        //   kutsumi: results.getFloat('t_order_vest.kutsumi'),
        //   squareShoulderLeft: results.getFloat(
        //     't_order_vest.squareShoulderLeft'
        //   ),
        //   squareShoulderRight: results.getFloat(
        //     't_order_vest.squareShoulderRight'
        //   ),
        //   slopingShoulderLeft: results.getFloat(
        //     't_order_vest.slopingShoulderLeft'
        //   ),
        //   slopingShoulderRight: results.getFloat(
        //     't_order_vest.slopingShoulderRight'
        //   ),
        //   sickleRaising: results.getFloat('t_order_vest.sickleRaising'),
        //   shoulderWidth: results.getFloat('t_order_vest.shoulderWidth'),
        //   buttonPosition: results.getFloat('t_order_vest.buttonPosition'),
        //   frontLength: results.getFloat('t_order_vest.frontLength'),
        //   remark: results.getString('t_order_vest.remark'),
        //   isDelete: results.getString('t_order_vest.isDelete'),
        //   createDateTime: results.getString('t_order_vest.createDateTime'),
        //   createUserId: results.getString('t_order_vest.createUserId'),
        //   updateDateTime: results.getString('t_order_vest.updateDateTime'),
        //   updateUserId: results.getString('t_order_vest.updateUserId'),
        // },
      };
      orders.push(order);
    }

    return {
      status: 'success',
      message: '',
      payload: {
        orders: orders,
      },
    };
  } catch (e: any) {
    return {
      status: 'error',
      message: e.toString(),
      payload: { orders: null },
    };
  }
  // sampleOrder1を25件、sampleOrder2を25件返す
  const sample1s = Array(25).fill(sampleOrder1);
  const sample2s = Array(25).fill(sampleOrder2);
  const content = {
    status: 'success',
    message: '',
    payload: {
      orders: [...sample2s, ...sample1s],
    },
  };
  return content;
}

function getOrder(orderId: string) {
  const conn = jdbcConnection();
  try {
    const results = dbUtils.executeQuery(
      conn,
      `
      select
        t_order.*,
        t_order_jaket.*, 
        t_order_pants.*,
        t_order_vest.*
      from
        \`tailor-db\`.t_order
        left join \`tailor-db\`.t_order_jaket
        on t_order.orderId = t_order_jaket.orderId
        left join \`tailor-db\`.t_order_pants
        on t_order.orderId = t_order_pants.orderId
        left join \`tailor-db\`.t_order_vest
        on t_order.orderId = t_order_vest.orderId
      where
        t_order.orderId = '${orderId}'
        and t_order.isDelete = 0
      `
    );
    if (dbUtils.rowsCount(results) === 0) {
      return {
        status: 'error',
        message: 'データが見つかりません',
        payload: { order: null },
      };
    } else {
      results.next();
      const order: OrderBasisType = {
        orderId: results.getString('t_order.orderId'),
        shopId: results.getString('t_order.shopId'),
        seq: results.getInt('t_order.seq'),
        orderStatus: results.getString('t_order.orderStatus'),
        inputDate: results.getString('t_order.inputDate'),
        orderDateTime: results.getString('t_order.orderDateTime'),
        shipDate: results.getString('t_order.shipDate'),
        customerName: results.getString('t_order.customerName'),
        productName: results.getString('t_order.productName'),
        fabricMaker: results.getString('t_order.fabricMaker'),
        fabricProductNo: results.getString('t_order.fabricProductNo'),
        yield: results.getInt('t_order.yield'),
        blendRateFabric1: results.getString('t_order.blendRateFabric1'),
        blendRate1: results.getFloat('t_order.blendRate1'),
        blendRateFabric2: results.getString('t_order.blendRateFabric2'),
        blendRate2: results.getFloat('t_order.blendRate2'),
        blendRateFabric3: results.getString('t_order.blendRateFabric3'),
        blendRate3: results.getFloat('t_order.blendRate3'),
        blendRateFabric4: results.getString('t_order.blendRateFabric4'),
        blendRate4: results.getFloat('t_order.blendRate4'),
        inputUserId: results.getString('t_order.inputUserId'),
        remark: results.getString('t_order.remark'),
        isDelete: results.getString('t_order.isDelete'),
        createDateTime: results.getString('t_order.createDateTime'),
        createUserId: results.getString('t_order.createUserId'),
        updateDateTime: results.getString('t_order.updateDateTime'),
        updateUserId: results.getString('t_order.updateUserId'),
        jaket: {
          jaketOrderId: results.getString('t_order_jaket.jaketOrderId'),
          orderId: results.getString('t_order_jaket.orderId'),
          selectPattern1: results.getString('t_order_jaket.selectPattern1'),
          selectPattern2: results.getString('t_order_jaket.selectPattern2'),
          selectPattern3: results.getString('t_order_jaket.selectPattern3'),
          totalLength: results.getFloat('t_order_jaket.totalLength'),
          jaketLength: results.getFloat('t_order_jaket.jaketLength'),
          shoulderWidth: results.getFloat('t_order_jaket.shoulderWidth'),
          sleeveLengthLeft: results.getFloat('t_order_jaket.sleeveLengthLeft'),
          sleeveLengthRight: results.getFloat('t_order_jaket.sleeveLengthRight'),
          bust: results.getFloat('t_order_jaket.bust'),
          waist: results.getFloat('t_order_jaket.waist'),
          bustTop: results.getFloat('t_order_jaket.bustTop'),
          waistTop: results.getFloat('t_order_jaket.waistTop'),
          canvas: results.getString('t_order_jaket.canvas'),
          shoulderType: results.getString('t_order_jaket.shoulderType'),
          collarType: results.getString('t_order_jaket.collarType'),
          frontButton: results.getString('t_order_jaket.frontButton'),
          collarWidth: results.getString('t_order_jaket.collarWidth'),
          sleeveButton: results.getString('t_order_jaket.sleeveButton'),
          sleeveOpening: results.getString('t_order_jaket.sleeveOpening'),
          chestPocket: results.getString('t_order_jaket.chestPocket'),
          sewingMethod: results.getString('t_order_jaket.sewingMethod'),
          frontCut: results.getString('t_order_jaket.frontCut'),
          labelSatinFabric: results.getString('t_order_jaket.labelSatinFabric'),
          stitch: results.getString('t_order_jaket.stitch'),
          stitchLocation: results.getString('t_order_jaket.stitchLocation'),
          pinpointStitch: results.getString('t_order_jaket.pinpointStitch'),
          pinpointStitchThreadColor: results.getString('t_order_jaket.pinpointStitchThreadColor'),
          chestBoxSatinFabric: results.getString('t_order_jaket.chestBoxSatinFabric'),
          waistPocket: results.getString('t_order_jaket.waistPocket'),
          flapWidth: results.getFloat('t_order_jaket.flapWidth'),
          changePocket: results.getString('t_order_jaket.changePocket'),
          secretPocket: results.getString('t_order_jaket.secretPocket'),
          backSpec: results.getString('t_order_jaket.backSpec'),
          daiba: results.getString('t_order_jaket.daiba'),
          insidePocket: results.getString('t_order_jaket.insidePocket'),
          penPocket: results.getString('t_order_jaket.penPocket'),
          ticketPocket: results.getString('t_order_jaket.ticketPocket'),
          pat: results.getString('t_order_jaket.pat'),
          lining: results.getString('t_order_jaket.lining'),
          collarBack: results.getString('t_order_jaket.collarBack'),
          vents: results.getString('t_order_jaket.vents'),
          inName: results.getString('t_order_jaket.inName'),
          nameFont: results.getString('t_order_jaket.nameFont'),
          namePosition: results.getString('t_order_jaket.namePosition'),
          nameColor: results.getString('t_order_jaket.nameColor'),
          name: results.getString('t_order_jaket.name'),
          labelHole: results.getString('t_order_jaket.labelHole'),
          stitchThreadColor: results.getString('t_order_jaket.stitchThreadColor'),
          labelThreadColor: results.getString('t_order_jaket.labelThreadColor'),
          frontButtonThreadColor: results.getString('t_order_jaket.frontButtonThreadColor'),
          sleeveButtonThreadColor: results.getString('t_order_jaket.sleeveButtonThreadColor'),
          brandName: results.getString('t_order_jaket.brandName'),
          fabricMark: results.getString('t_order_jaket.fabricMark'),
          buttonProductNo: results.getString('t_order_jaket.buttonProductNo'),
          sleeveOpeningTape: results.getString('t_order_jaket.sleeveOpeningTape'),
          sleeveElbowPatch: results.getString('t_order_jaket.sleeveElbowPatch'),
          hole: results.getString('t_order_jaket.hole'),
          sleeveButtonHoleColor: results.getString('t_order_jaket.sleeveButtonHoleColor'),
          uchiai: results.getFloat('t_order_jaket.uchiai'),
          hanmi: results.getFloat('t_order_jaket.hanmi'),
          kutsumi: results.getFloat('t_order_jaket.kutsumi'),
          squareShoulderLeft: results.getFloat('t_order_jaket.squareShoulderLeft'),
          squareShoulderRight: results.getFloat('t_order_jaket.squareShoulderRight'),
          slopingShoulderLeft: results.getFloat('t_order_jaket.slopingShoulderLeft'),
          slopingShoulderRight: results.getFloat('t_order_jaket.slopingShoulderRight'),
          totsuRyo: results.getFloat('t_order_jaket.totsuRyo'),
          hip: results.getFloat('t_order_jaket.hip'),
          frontLength: results.getFloat('t_order_jaket.frontLength'),
          frontSleeveHem: results.getFloat('t_order_jaket.frontSleeveHem'),
          ahFrontOpening: results.getFloat('t_order_jaket.ahFrontOpening'),
          sleeveOpeningWidth: results.getFloat('t_order_jaket.sleeveOpeningWidth'),
          collarMitsu: results.getFloat('t_order_jaket.collarMitsu'),
          collarShift: results.getFloat('t_order_jaket.collarShift'),
          buttonPosition: results.getFloat('t_order_jaket.buttonPosition'),
          backCurve: results.getFloat('t_order_jaket.backCurve'),
          sickleRaising: results.getFloat('t_order_jaket.sickleRaising'),
          sleeveWidth: results.getFloat('t_order_jaket.sleeveWidth'),
          backWidth: results.getFloat('t_order_jaket.backWidth'),
          sleeveBack: results.getString('t_order_jaket.sleeveBack'),
          remark: results.getString('t_order_jaket.remark'),
          isDelete: results.getString('t_order_jaket.isDelete'),
          createDateTime: results.getString('t_order_jaket.createDateTime'),
          createUserId: results.getString('t_order_jaket.createUserId'),
          updateDateTime: results.getString('t_order_jaket.updateDateTime'),
          updateUserId: results.getString('t_order_jaket.updateUserId'),
        },
        pants: {
          pantsOrderId: results.getString('t_order_pants.pantsOrderId'),
          orderId: results.getString('t_order_pants.orderId'),
          selectPattern1: results.getString('t_order_pants.selectPattern1'),
          selectPattern2: results.getString('t_order_pants.selectPattern2'),
          selectPattern3: results.getString('t_order_pants.selectPattern3'),
          waist: results.getFloat('t_order_pants.waist'),
          hip: results.getFloat('t_order_pants.hip'),
          hipTop: results.getFloat('t_order_pants.hipTop'),
          rise: results.getFloat('t_order_pants.rise'),
          inseamLeft: results.getFloat('t_order_pants.inseamLeft'),
          inseamRight: results.getFloat('t_order_pants.inseamRight'),
          crossingWidth: results.getFloat('t_order_pants.crossingWidth'),
          kneeWidth: results.getFloat('t_order_pants.kneeWidth'),
          hemOpening: results.getFloat('t_order_pants.hemOpening'),
          tack: results.getString('t_order_pants.tack'),
          sidePocket: results.getString('t_order_pants.sidePocket'),
          foldedHem: results.getString('t_order_pants.foldedHem'),
          secretPocket: results.getString('t_order_pants.secretPocket'),
          kneeBack: results.getString('t_order_pants.kneeBack'),
          holeThreadColor: results.getString('t_order_pants.holeThreadColor'),
          amfStitch: results.getString('t_order_pants.amfStitch'),
          sideAmf: results.getString('t_order_pants.sideAmf'),
          stitchThreadColor: results.getString('t_order_pants.stitchThreadColor'),
          kneepadColor: results.getString('t_order_pants.kneepadColor'),
          tackSpec: results.getString('t_order_pants.tackSpec'),
          sideSatinFabric: results.getString('t_order_pants.sideSatinFabric'),
          pisPocketJadeGreen: results.getString('t_order_pants.pisPocketJadeGreen'),
          pisPocket: results.getString('t_order_pants.pisPocket'),
          plaket: results.getString('t_order_pants.plaket'),
          buttocks: results.getFloat('t_order_pants.buttocks'),
          flatButt: results.getFloat('t_order_pants.flatButt'),
          frontRise: results.getFloat('t_order_pants.frontRise'),
          backRise: results.getFloat('t_order_pants.backRise'),
          wedgie: results.getFloat('t_order_pants.wedgie'),
          pancherina: results.getString('t_order_pants.pancherina'),
          loopCount: results.getString('t_order_pants.loopCount'),
          qiLoop: results.getString('t_order_pants.qiLoop'),
          hole: results.getString('t_order_pants.hole'),
          chic: results.getString('t_order_pants.chic'),
          loopAdd: results.getString('t_order_pants.loopAdd'),
          plushLoop: results.getString('t_order_pants.plushLoop'),
          setFinishing: results.getString('t_order_pants.setFinishing'),
          creaseWire: results.getString('t_order_pants.creaseWire'),
          buttholeTape: results.getString('t_order_pants.buttholeTape'),
          remark: results.getString('t_order_pants.remark'),
          isDelete: results.getString('t_order_pants.isDelete'),
          createDateTime: results.getString('t_order_pants.createDateTime'),
          createUserId: results.getString('t_order_pants.createUserId'),
          updateDateTime: results.getString('t_order_pants.updateDateTime'),
          updateUserId: results.getString('t_order_pants.updateUserId'),
        },
        vest: {
          vestOrderId: results.getString('t_order_vest.vestOrderId'),
          orderId: results.getString('t_order_vest.orderId'),
          selectPattern1: results.getString('t_order_vest.selectPattern1'),
          selectPattern2: results.getString('t_order_vest.selectPattern2'),
          selectPattern3: results.getString('t_order_vest.selectPattern3'),
          backLength: results.getFloat('t_order_vest.backLength'),
          bustTop: results.getFloat('t_order_vest.bustTop'),
          waistTop: results.getFloat('t_order_vest.waistTop'),
          collar: results.getString('t_order_vest.collar'),
          chestPocket: results.getString('t_order_vest.chestPocket'),
          frontButton: results.getString('t_order_vest.frontButton'),
          frontButtonHolePosition: results.getString('t_order_vest.frontButtonHolePosition'),
          waistPocket: results.getString('t_order_vest.waistPocket'),
          backSide: results.getString('t_order_vest.backSide'),
          buckle: results.getString('t_order_vest.buckle'),
          holeThreadColor: results.getString('t_order_vest.holeThreadColor'),
          stitch: results.getString('t_order_vest.stitch'),
          hole: results.getString('t_order_vest.hole'),
          uchiai: results.getFloat('t_order_vest.uchiai'),
          hanmi: results.getFloat('t_order_vest.hanmi'),
          kutsumi: results.getFloat('t_order_vest.kutsumi'),
          squareShoulderLeft: results.getFloat('t_order_vest.squareShoulderLeft'),
          squareShoulderRight: results.getFloat('t_order_vest.squareShoulderRight'),
          slopingShoulderLeft: results.getFloat('t_order_vest.slopingShoulderLeft'),
          slopingShoulderRight: results.getFloat('t_order_vest.slopingShoulderRight'),
          sickleRaising: results.getFloat('t_order_vest.sickleRaising'),
          shoulderWidth: results.getFloat('t_order_vest.shoulderWidth'),
          buttonPosition: results.getFloat('t_order_vest.buttonPosition'),
          frontLength: results.getFloat('t_order_vest.frontLength'),
          remark: results.getString('t_order_vest.remark'),
          isDelete: results.getString('t_order_vest.isDelete'),
          createDateTime: results.getString('t_order_vest.createDateTime'),
          createUserId: results.getString('t_order_vest.createUserId'),
          updateDateTime: results.getString('t_order_vest.updateDateTime'),
          updateUserId: results.getString('t_order_vest.updateUserId'),
        },
      };
      return {
        status: 'success',
        message: '',
        payload: {
          order: order,
        },
      };
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: error.toString(),
      payload: { order: null },
    };
  }
}

function upsertOrder(order: OrderBasisType) {
  const conn = jdbcConnection();
  try {
    // insert or update
    const count = dbUtils.executeQuery(
      conn,
      `select * from \`tailor-db\`.t_order where orderId = '${order.orderId}' and isDelete = 0`
    );
    const isNew = dbUtils.rowsCount(count) === 0;
    if (isNew) {
      // 新規登録の場合、orderIdとseqを採番
      order.orderId = nextSeq.orderSeq(conn).toString();
      const results = dbUtils.executeQuery(
        conn,
        `select ifnull(max(seq), 0) as seq from \`tailor-db\`.t_order where shopId = '${order.shopId}'`
      );
      results.next();
      order.seq = results.getInt('seq') + 1;
    }

    // t_orderに登録
    upsertOrderBasis(conn, order);

    // t_order_jaketに登録
    if (order.jaket) {
      if (isNew) {
        order.jaket.orderId = order.orderId;
        order.jaket.jaketOrderId = nextSeq.orderJaketSeq(conn).toString();
      }
      upsertOrderJaket(conn, order.jaket);
    }

    // t_order_pantsに登録
    if (order.pants) {
      if (isNew) {
        order.pants.orderId = order.orderId;
        order.pants.pantsOrderId = nextSeq.orderPantsSeq(conn).toString();
      }
      upsertOrderPants(conn, order.pants);
    }

    // t_order_vestに登録
    if (order.vest) {
      if (isNew) {
        order.vest.orderId = order.orderId;
        order.vest.vestOrderId = nextSeq.orderVestSeq(conn).toString();
      }
      upsertOrderVest(conn, order.vest);
    }

    conn.commit();

    return {
      status: 'success',
      message: '登録しました',
      payload: {
        order: order,
      },
    };
  } catch (e: any) {
    conn.rollback();
    return {
      status: 'error',
      message: e.toString(),
      payload: { order: null },
    };
  }
}

function upsertOrderBasis(conn: GoogleAppsScript.JDBC.JdbcConnection, order: OrderBasisType) {
  const sql = `
    insert into \`tailor-db\`.t_order 
      (
        orderId, shopId, seq, orderStatus, inputDate, 
        orderDateTime, shipDate, customerName, productName, fabricMaker, 
        fabricProductNo, yield, blendRateFabric1, blendRate1, blendRateFabric2, 
        blendRate2, blendRateFabric3, blendRate3, blendRateFabric4, blendRate4, 
        inputUserId, remark, isDelete, createDateTime, createUserId, 
        updateDateTime, updateUserId) 
    values 
      (
        ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?,
        ?, ?)
    AS new
    on duplicate key 
    update 
      shopId = new.shopId,
      seq = new.seq,
      orderStatus = new.orderStatus,
      inputDate = new.inputDate,
      orderDateTime = new.orderDateTime,
      shipDate = new.shipDate,
      customerName = new.customerName,
      productName = new.productName,
      fabricMaker = new.fabricMaker,
      fabricProductNo = new.fabricProductNo,
      yield = new.yield,
      blendRateFabric1 = new.blendRateFabric1,
      blendRate1 = new.blendRate1,
      blendRateFabric2 = new.blendRateFabric2,
      blendRate2 = new.blendRate2,
      blendRateFabric3 = new.blendRateFabric3,
      blendRate3 = new.blendRate3,
      blendRateFabric4 = new.blendRateFabric4,
      blendRate4 = new.blendRate4,
      inputUserId = new.inputUserId,
      remark = new.remark,
      isDelete = new.isDelete,
      createDateTime = new.createDateTime,
      createUserId = new.createUserId,
      updateDateTime = new.updateDateTime,
      updateUserId = new.updateUserId    
  `;
  const st = conn.prepareStatement(sql);
  st.setObject(1, order.orderId);
  st.setObject(2, order.shopId);
  st.setObject(3, order.seq);
  st.setObject(4, order.orderStatus);
  st.setObject(5, order.inputDate);
  st.setObject(6, order.orderDateTime);
  st.setObject(7, order.shipDate);
  st.setObject(8, order.customerName);
  st.setObject(9, order.productName);
  st.setObject(10, order.fabricMaker);
  st.setObject(11, order.fabricProductNo);
  st.setObject(12, order.yield);
  st.setObject(13, order.blendRateFabric1);
  st.setObject(14, order.blendRate1);
  st.setObject(15, order.blendRateFabric2);
  st.setObject(16, order.blendRate2);
  st.setObject(17, order.blendRateFabric3);
  st.setObject(18, order.blendRate3);
  st.setObject(19, order.blendRateFabric4);
  st.setObject(20, order.blendRate4);
  st.setObject(21, order.inputUserId);
  st.setObject(22, order.remark);
  st.setObject(23, order.isDelete);
  st.setObject(24, order.createDateTime);
  st.setObject(25, order.createUserId);
  st.setObject(26, order.updateDateTime);
  st.setObject(27, order.updateUserId);
  const result = st.executeUpdate();
}

function upsertOrderJaket(conn: GoogleAppsScript.JDBC.JdbcConnection, order: OrderJaketType) {
  const sql = `
    insert into \`tailor-db\`.t_order_jaket
      (
        jaketOrderId,
        orderId,
        selectPattern1,
        selectPattern2,
        selectPattern3,
        totalLength,
        jaketLength,
        shoulderWidth,
        sleeveLengthLeft,
        sleeveLengthRight,
        bust,
        waist,
        bustTop,
        waistTop,
        canvas,
        shoulderType,
        collarType,
        frontButton,
        collarWidth,
        sleeveButton,
        sleeveOpening,
        chestPocket,
        sewingMethod,
        frontCut,
        labelSatinFabric,
        stitch,
        stitchLocation,
        pinpointStitch,
        pinpointStitchThreadColor,
        chestBoxSatinFabric,
        waistPocket,
        flapWidth,
        changePocket,
        secretPocket,
        backSpec,
        daiba,
        insidePocket,
        penPocket,
        ticketPocket,
        pat,
        lining,
        collarBack,
        vents,
        inName,
        nameFont,
        namePosition,
        nameColor,
        name,
        labelHole,
        stitchThreadColor,
        labelThreadColor,
        frontButtonThreadColor,
        sleeveButtonThreadColor,
        brandName,
        fabricMark,
        buttonProductNo,
        sleeveOpeningTape,
        sleeveElbowPatch,
        hole,
        sleeveButtonHoleColor,
        uchiai,
        hanmi,
        kutsumi,
        squareShoulderLeft,
        squareShoulderRight,
        slopingShoulderLeft,
        slopingShoulderRight,
        totsuRyo,
        hip,
        frontLength,
        frontSleeveHem,
        ahFrontOpening,
        sleeveOpeningWidth,
        collarMitsu,
        collarShift,
        buttonPosition,
        backCurve,
        sickleRaising,
        sleeveWidth,
        backWidth,
        sleeveBack,
        remark,
        isDelete,
        createDateTime,
        createUserId,
        updateDateTime,
        updateUserId
      )
    values 
      (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?
      )
    AS new
    on duplicate key 
    update 
      orderId = new.orderId,
      selectPattern1 = new.selectPattern1,
      selectPattern2 = new.selectPattern2,
      selectPattern3 = new.selectPattern3,
      totalLength = new.totalLength,
      jaketLength = new.jaketLength,
      shoulderWidth = new.shoulderWidth,
      sleeveLengthLeft = new.sleeveLengthLeft,
      sleeveLengthRight = new.sleeveLengthRight,
      bust = new.bust,
      waist = new.waist,
      bustTop = new.bustTop,
      waistTop = new.waistTop,
      canvas = new.canvas,
      shoulderType = new.shoulderType,
      collarType = new.collarType,
      frontButton = new.frontButton,
      collarWidth = new.collarWidth,
      sleeveButton = new.sleeveButton,
      sleeveOpening = new.sleeveOpening,
      chestPocket = new.chestPocket,
      sewingMethod = new.sewingMethod,
      frontCut = new.frontCut,
      labelSatinFabric = new.labelSatinFabric,
      stitch = new.stitch,
      stitchLocation = new.stitchLocation,
      pinpointStitch = new.pinpointStitch,
      pinpointStitchThreadColor = new.pinpointStitchThreadColor,
      chestBoxSatinFabric = new.chestBoxSatinFabric,
      waistPocket = new.waistPocket,
      flapWidth = new.flapWidth,
      changePocket = new.changePocket,
      secretPocket = new.secretPocket,
      backSpec = new.backSpec,
      daiba = new.daiba,
      insidePocket = new.insidePocket,
      penPocket = new.penPocket,
      ticketPocket = new.ticketPocket,
      pat = new.pat,
      lining = new.lining,
      collarBack = new.collarBack,
      vents = new.vents,
      inName = new.inName,
      nameFont = new.nameFont,
      namePosition = new.namePosition,
      nameColor = new.nameColor,
      name = new.name,
      labelHole = new.labelHole,
      stitchThreadColor = new.stitchThreadColor,
      labelThreadColor = new.labelThreadColor,
      frontButtonThreadColor = new.frontButtonThreadColor,
      sleeveButtonThreadColor = new.sleeveButtonThreadColor,
      brandName = new.brandName,
      fabricMark = new.fabricMark,
      buttonProductNo = new.buttonProductNo,
      sleeveOpeningTape = new.sleeveOpeningTape,
      sleeveElbowPatch = new.sleeveElbowPatch,
      hole = new.hole,
      sleeveButtonHoleColor = new.sleeveButtonHoleColor,
      uchiai = new.uchiai,
      hanmi = new.hanmi,
      kutsumi = new.kutsumi,
      squareShoulderLeft = new.squareShoulderLeft,
      squareShoulderRight = new.squareShoulderRight,
      slopingShoulderLeft = new.slopingShoulderLeft,
      slopingShoulderRight = new.slopingShoulderRight,
      totsuRyo = new.totsuRyo,
      hip = new.hip,
      frontLength = new.frontLength,
      frontSleeveHem = new.frontSleeveHem,
      ahFrontOpening = new.ahFrontOpening,
      sleeveOpeningWidth = new.sleeveOpeningWidth,
      collarMitsu = new.collarMitsu,
      collarShift = new.collarShift,
      buttonPosition = new.buttonPosition,
      backCurve = new.backCurve,
      sickleRaising = new.sickleRaising,
      sleeveWidth = new.sleeveWidth,
      backWidth = new.backWidth,
      sleeveBack = new.sleeveBack,
      remark = new.remark,
      isDelete = new.isDelete,
      createDateTime = new.createDateTime,
      createUserId = new.createUserId,
      updateDateTime = new.updateDateTime,
      updateUserId = new.updateUserId
  `;
  const st = conn.prepareStatement(sql);
  st.setObject(1, order.jaketOrderId);
  st.setObject(2, order.orderId);
  st.setObject(3, order.selectPattern1);
  st.setObject(4, order.selectPattern2);
  st.setObject(5, order.selectPattern3);
  st.setObject(6, order.totalLength);
  st.setObject(7, order.jaketLength);
  st.setObject(8, order.shoulderWidth);
  st.setObject(9, order.sleeveLengthLeft);
  st.setObject(10, order.sleeveLengthRight);
  st.setObject(11, order.bust);
  st.setObject(12, order.waist);
  st.setObject(13, order.bustTop);
  st.setObject(14, order.waistTop);
  st.setObject(15, order.canvas);
  st.setObject(16, order.shoulderType);
  st.setObject(17, order.collarType);
  st.setObject(18, order.frontButton);
  st.setObject(19, order.collarWidth);
  st.setObject(20, order.sleeveButton);
  st.setObject(21, order.sleeveOpening);
  st.setObject(22, order.chestPocket);
  st.setObject(23, order.sewingMethod);
  st.setObject(24, order.frontCut);
  st.setObject(25, order.labelSatinFabric);
  st.setObject(26, order.stitch);
  st.setObject(27, order.stitchLocation);
  st.setObject(28, order.pinpointStitch);
  st.setObject(29, order.pinpointStitchThreadColor);
  st.setObject(30, order.chestBoxSatinFabric);
  st.setObject(31, order.waistPocket);
  st.setObject(32, order.flapWidth);
  st.setObject(33, order.changePocket);
  st.setObject(34, order.secretPocket);
  st.setObject(35, order.backSpec);
  st.setObject(36, order.daiba);
  st.setObject(37, order.insidePocket);
  st.setObject(38, order.penPocket);
  st.setObject(39, order.ticketPocket);
  st.setObject(40, order.pat);
  st.setObject(41, order.lining);
  st.setObject(42, order.collarBack);
  st.setObject(43, order.vents);
  st.setObject(44, order.inName);
  st.setObject(45, order.nameFont);
  st.setObject(46, order.namePosition);
  st.setObject(47, order.nameColor);
  st.setObject(48, order.name);
  st.setObject(49, order.labelHole);
  st.setObject(50, order.stitchThreadColor);
  st.setObject(51, order.labelThreadColor);
  st.setObject(52, order.frontButtonThreadColor);
  st.setObject(53, order.sleeveButtonThreadColor);
  st.setObject(54, order.brandName);
  st.setObject(55, order.fabricMark);
  st.setObject(56, order.buttonProductNo);
  st.setObject(57, order.sleeveOpeningTape);
  st.setObject(58, order.sleeveElbowPatch);
  st.setObject(59, order.hole);
  st.setObject(60, order.sleeveButtonHoleColor);
  st.setObject(61, order.uchiai);
  st.setObject(62, order.hanmi);
  st.setObject(63, order.kutsumi);
  st.setObject(64, order.squareShoulderLeft);
  st.setObject(65, order.squareShoulderRight);
  st.setObject(66, order.slopingShoulderLeft);
  st.setObject(67, order.slopingShoulderRight);
  st.setObject(68, order.totsuRyo);
  st.setObject(69, order.hip);
  st.setObject(70, order.frontLength);
  st.setObject(71, order.frontSleeveHem);
  st.setObject(72, order.ahFrontOpening);
  st.setObject(73, order.sleeveOpeningWidth);
  st.setObject(74, order.collarMitsu);
  st.setObject(75, order.collarShift);
  st.setObject(76, order.buttonPosition);
  st.setObject(77, order.backCurve);
  st.setObject(78, order.sickleRaising);
  st.setObject(79, order.sleeveWidth);
  st.setObject(80, order.backWidth);
  st.setObject(81, order.sleeveBack);
  st.setObject(82, order.remark);
  st.setObject(83, order.isDelete);
  st.setObject(84, order.createDateTime);
  st.setObject(85, order.createUserId);
  st.setObject(86, order.updateDateTime);
  st.setObject(87, order.updateUserId);
  const result = st.executeUpdate();
}

function upsertOrderPants(conn: GoogleAppsScript.JDBC.JdbcConnection, order: OrderPantsType) {
  const sql = `
    insert into \`tailor-db\`.t_order_pants
      (
        pantsOrderId,
        orderId,
        selectPattern1,
        selectPattern2,
        selectPattern3,
        waist,
        hip,
        hipTop,
        rise,
        inseamLeft,
        inseamRight,
        crossingWidth,
        kneeWidth,
        hemOpening,
        tack,
        sidePocket,
        foldedHem,
        secretPocket,
        kneeBack,
        holeThreadColor,
        amfStitch,
        sideAmf,
        stitchThreadColor,
        kneepadColor,
        tackSpec,
        sideSatinFabric,
        pisPocketJadeGreen,
        pisPocket,
        plaket,
        buttocks,
        flatButt,
        frontRise,
        backRise,
        wedgie,
        pancherina,
        loopCount,
        qiLoop,
        hole,
        chic,
        loopAdd,
        plushLoop,
        setFinishing,
        creaseWire,
        buttholeTape,
        remark,
        isDelete,
        createDateTime,
        createUserId,
        updateDateTime,
        updateUserId
      ) 
    values 
      (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    AS new
    on duplicate key 
    update 
      orderId = new.orderId,
      selectPattern1 = new.selectPattern1,
      selectPattern2 = new.selectPattern2,
      selectPattern3 = new.selectPattern3,
      waist = new.waist,
      hip = new.hip,
      hipTop = new.hipTop,
      rise = new.rise,
      inseamLeft = new.inseamLeft,
      inseamRight = new.inseamRight,
      crossingWidth = new.crossingWidth,
      kneeWidth = new.kneeWidth,
      hemOpening = new.hemOpening,
      tack = new.tack,
      sidePocket = new.sidePocket,
      foldedHem = new.foldedHem,
      secretPocket = new.secretPocket,
      kneeBack = new.kneeBack,
      holeThreadColor = new.holeThreadColor,
      amfStitch = new.amfStitch,
      sideAmf = new.sideAmf,
      stitchThreadColor = new.stitchThreadColor,
      kneepadColor = new.kneepadColor,
      tackSpec = new.tackSpec,
      sideSatinFabric = new.sideSatinFabric,
      pisPocketJadeGreen = new.pisPocketJadeGreen,
      pisPocket = new.pisPocket,
      plaket = new.plaket,
      buttocks = new.buttocks,
      flatButt = new.flatButt,
      frontRise = new.frontRise,
      backRise = new.backRise,
      wedgie = new.wedgie,
      pancherina = new.pancherina,
      loopCount = new.loopCount,
      qiLoop = new.qiLoop,
      hole = new.hole,
      chic = new.chic,
      loopAdd = new.loopAdd,
      plushLoop = new.plushLoop,
      setFinishing = new.setFinishing,
      creaseWire = new.creaseWire,
      buttholeTape = new.buttholeTape,
      remark = new.remark,
      isDelete = new.isDelete,
      createDateTime = new.createDateTime,
      createUserId = new.createUserId,
      updateDateTime = new.updateDateTime,
      updateUserId = new.updateUserId
  `;
  const st = conn.prepareStatement(sql);
  st.setObject(1, order.pantsOrderId);
  st.setObject(2, order.orderId);
  st.setObject(3, order.selectPattern1);
  st.setObject(4, order.selectPattern2);
  st.setObject(5, order.selectPattern3);
  st.setObject(6, order.waist);
  st.setObject(7, order.hip);
  st.setObject(8, order.hipTop);
  st.setObject(9, order.rise);
  st.setObject(10, order.inseamLeft);
  st.setObject(11, order.inseamRight);
  st.setObject(12, order.crossingWidth);
  st.setObject(13, order.kneeWidth);
  st.setObject(14, order.hemOpening);
  st.setObject(15, order.tack);
  st.setObject(16, order.sidePocket);
  st.setObject(17, order.foldedHem);
  st.setObject(18, order.secretPocket);
  st.setObject(19, order.kneeBack);
  st.setObject(20, order.holeThreadColor);
  st.setObject(21, order.amfStitch);
  st.setObject(22, order.sideAmf);
  st.setObject(23, order.stitchThreadColor);
  st.setObject(24, order.kneepadColor);
  st.setObject(25, order.tackSpec);
  st.setObject(26, order.sideSatinFabric);
  st.setObject(27, order.pisPocketJadeGreen);
  st.setObject(28, order.pisPocket);
  st.setObject(29, order.plaket);
  st.setObject(30, order.buttocks);
  st.setObject(31, order.flatButt);
  st.setObject(32, order.frontRise);
  st.setObject(33, order.backRise);
  st.setObject(34, order.wedgie);
  st.setObject(35, order.pancherina);
  st.setObject(36, order.loopCount);
  st.setObject(37, order.qiLoop);
  st.setObject(38, order.hole);
  st.setObject(39, order.chic);
  st.setObject(40, order.loopAdd);
  st.setObject(41, order.plushLoop);
  st.setObject(42, order.setFinishing);
  st.setObject(43, order.creaseWire);
  st.setObject(44, order.buttholeTape);
  st.setObject(45, order.remark);
  st.setObject(46, order.isDelete);
  st.setObject(47, order.createDateTime);
  st.setObject(48, order.createUserId);
  st.setObject(49, order.updateDateTime);
  st.setObject(50, order.updateUserId);
  const result = st.executeUpdate();
}

function upsertOrderVest(conn: GoogleAppsScript.JDBC.JdbcConnection, order: OrderVestType) {
  const sql = `
    insert into \`tailor-db\`.t_order_vest
      (
        vestOrderId,
        orderId,
        selectPattern1,
        selectPattern2,
        selectPattern3,
        backLength,
        bustTop,
        waistTop,
        collar,
        chestPocket,
        frontButton,
        frontButtonHolePosition,
        waistPocket,
        backSide,
        buckle,
        holeThreadColor,
        stitch,
        hole,
        uchiai,
        hanmi,
        kutsumi,
        squareShoulderLeft,
        squareShoulderRight,
        slopingShoulderLeft,
        slopingShoulderRight,
        sickleRaising,
        shoulderWidth,
        buttonPosition,
        frontLength,
        remark,
        isDelete,
        createDateTime,
        createUserId,
        updateDateTime,
        updateUserId
      ) 
    values 
      (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?
      )
    AS new
    on duplicate key 
    update 
    vestOrderId = new.vestOrderId,
    orderId = new.orderId,
    selectPattern1 = new.selectPattern1,
    selectPattern2 = new.selectPattern2,
    selectPattern3 = new.selectPattern3,
    backLength = new.backLength,
    bustTop = new.bustTop,
    waistTop = new.waistTop,
    collar = new.collar,
    chestPocket = new.chestPocket,
    frontButton = new.frontButton,
    frontButtonHolePosition = new.frontButtonHolePosition,
    waistPocket = new.waistPocket,
    backSide = new.backSide,
    buckle = new.buckle,
    holeThreadColor = new.holeThreadColor,
    stitch = new.stitch,
    hole = new.hole,
    uchiai = new.uchiai,
    hanmi = new.hanmi,
    kutsumi = new.kutsumi,
    squareShoulderLeft = new.squareShoulderLeft,
    squareShoulderRight = new.squareShoulderRight,
    slopingShoulderLeft = new.slopingShoulderLeft,
    slopingShoulderRight = new.slopingShoulderRight,
    sickleRaising = new.sickleRaising,
    shoulderWidth = new.shoulderWidth,
    buttonPosition = new.buttonPosition,
    frontLength = new.frontLength,
    remark = new.remark,
    isDelete = new.isDelete,
    createDateTime = new.createDateTime,
    createUserId = new.createUserId,
    updateDateTime = new.updateDateTime,
    updateUserId = new.updateUserId
  `;
  const st = conn.prepareStatement(sql);
  st.setObject(1, order.vestOrderId);
  st.setObject(2, order.orderId);
  st.setObject(3, order.selectPattern1);
  st.setObject(4, order.selectPattern2);
  st.setObject(5, order.selectPattern3);
  st.setObject(6, order.backLength);
  st.setObject(7, order.bustTop);
  st.setObject(8, order.waistTop);
  st.setObject(9, order.collar);
  st.setObject(10, order.chestPocket);
  st.setObject(11, order.frontButton);
  st.setObject(12, order.frontButtonHolePosition);
  st.setObject(13, order.waistPocket);
  st.setObject(14, order.backSide);
  st.setObject(15, order.buckle);
  st.setObject(16, order.holeThreadColor);
  st.setObject(17, order.stitch);
  st.setObject(18, order.hole);
  st.setObject(19, order.uchiai);
  st.setObject(20, order.hanmi);
  st.setObject(21, order.kutsumi);
  st.setObject(22, order.squareShoulderLeft);
  st.setObject(23, order.squareShoulderRight);
  st.setObject(24, order.slopingShoulderLeft);
  st.setObject(25, order.slopingShoulderRight);
  st.setObject(26, order.sickleRaising);
  st.setObject(27, order.shoulderWidth);
  st.setObject(28, order.buttonPosition);
  st.setObject(29, order.frontLength);
  st.setObject(30, order.remark);
  st.setObject(31, order.isDelete);
  st.setObject(32, order.createDateTime);
  st.setObject(33, order.createUserId);
  st.setObject(34, order.updateDateTime);
  st.setObject(35, order.updateUserId);
  const result = st.executeUpdate();
}

function deleteOrder(orderId: string) {
  const conn = jdbcConnection();
  try {
    const results = dbUtils.executeUpdate(
      conn,
      `update \`tailor-db\`.t_order set isDelete = 1 where orderId = '${orderId}'`
    );
    conn.commit();
    return {
      status: 'success',
      message: '削除しました',
      payload: { orderId: orderId },
    };
  } catch (error: any) {
    conn.rollback();
    return {
      status: 'error',
      message: error.toString(),
      payload: { orderId: orderId },
    };
  }
}
