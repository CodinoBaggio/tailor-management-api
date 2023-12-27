function doPost(e) {
  const param = JSON.parse(e.postData.contents);
  const year = param.year;
  
  // CSVデータを作成
  const csv = createCsv(year);

  // レスポンスを作成
  var res = ContentService.createTextOutput();

  //Mime TypeをJSONに設定
  res.setMimeType(ContentService.MimeType.JSON);

  //テキストをセットする
  res.setContent(csv);

  return res;
}
