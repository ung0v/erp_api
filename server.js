const express = require('express');
const app = express();
const { google } = require("googleapis");
const port = process.env.PORT || 3000;

app.use(express.json());

const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
});




app.get("/", (req,res) => {
  res.send("Hello world");
})

app.get("/nhansu", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });
 //Auth client Object
  const authClientObject = await auth.getClient();
  //Google sheets instance
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
  const spreadsheetId = "1QqZOCR23w6cGpC3Msi8yyg_4oNHmRSKiS-NSZJ5WZSY";
   //Read front the spreadsheet
    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: "Sheet1!A2:17", //range of cells to read from.
    })

    //send the data reae with the response
  res.send(readData.data)
})

app.listen(port, () => {
  console.log(`App listening port ${port}`);
})
