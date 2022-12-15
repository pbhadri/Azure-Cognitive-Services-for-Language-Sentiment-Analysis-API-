const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config();

app.get('/sentimentanalysis', function (req, response) {
    var keyword="";
    if(req.query.keyword !== undefined)
    {
         keyword = req.query.keyword
    }
    else
    {
         keyword = ""
    }
    

    var http = require("https");
    var options = {
        "method": "POST",
        "hostname": "itis6177-pbhadri.cognitiveservices.azure.com",
        "port": null,
        "path": "//text/analytics/v3.0/sentiment",
        "headers": {
            "ocp-apim-subscription-key": process.env.token,
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "62d58367-07c9-89b0-9b47-b90a2a9b3192"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);

            response.send(body.toString());
        });
    });

    req.write(JSON.stringify({
        documents: [{
            language: 'en',
            id: '1',
            text: keyword
        }]
    }));
    req.end();

});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
