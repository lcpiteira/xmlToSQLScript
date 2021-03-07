'use strict'

var fs = require('fs')
var xmlToJson = require('./util/xmlTojson')
var sqlScriptRunner = require('./util/sqlScriptRunner')
var sqlScriptTemplate = require('./sqlScriptTemplate')()

var filename = 'e'

xmlToJson(`${filename}.XML`)
    .then((result) => {

        var object = result.document.placeholders
        
        var script = sqlScriptRunner(object,63,sqlScriptTemplate)

        fs.writeFile(`./sql/${filename}.SQL`, script, (err)=>{
            if (err) return console.log(err);
        })

    }).catch((err) => {
        console.log(err);
    });
