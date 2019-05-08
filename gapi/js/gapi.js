function handleClientLoad() {
  // EXAMPLE ONE
  gapi.load("client", function() {
    gapi.client
      .init({
        apiKey: "AIzaSyA1ol27C1FVv-F6940xNXY-VImb5ZCE3JE"
      })
      .then(function() {
        var SPREADSHEET_ID = "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk";
        // var SPREADSHEET_ID = "12_yhWuslrui9_kW57-HwySPk9kv1Mp2VlAYHUo5QWO8";

        return gapi.client.request({
          // Sheet must be shared
          path:
            "https://sheets.googleapis.com/v4/spreadsheets/" +
            SPREADSHEET_ID +
            "/values/'Triple Burden Map'!A:Z"
          // path:
          //   "https://sheets.googleapis.com/v4/spreadsheets/" +
          //   SPREADSHEET_ID +
          //   "/values/'Budget'!A:Z"
        });
      })
      .then(response => {
        console.log(response);
      });
  });

  // EXAMPLE TWO
  gapi.load("client", function() {
    var SPREADSHEET_ID = "1AKM59m3iaOSSQgVsIoDcSWxjcpX781JIuBwB9YdDgFs";

    gapi.client
      .init({
        apiKey: "AIzaSyA1ol27C1FVv-F6940xNXY-VImb5ZCE3JE",
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4"
        ]
      })
      .then(function() {
        var request = {
          spreadsheetId: SPREADSHEET_ID,
          range: "A:Z"
        };

        gapi.client.sheets.spreadsheets
          .get({
            spreadsheetId: SPREADSHEET_ID
          })
          .then(function(response) {
            console.log(response.result.properties);
            console.log(response.result.sheets);
          });

        gapi.client.sheets.spreadsheets.values
          .get(request)
          .then(function(response) {
            console.log(response.result.values);
          });
      });
  });
}
