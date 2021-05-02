const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/test", (req, res) => {
  let inp = req.body;
  let op = inp["payload"];
  let temp = JSON.stringify(op);

  for (i in inp["referenceData"]) {
    if (temp.includes(`{${i}}`)) {
      var reg = new RegExp(`{${i}}`, "g");
      temp = temp.replace(reg, inp["referenceData"][i]);
    }
  }
  let fin = JSON.parse(temp);
  res.json(fin);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
