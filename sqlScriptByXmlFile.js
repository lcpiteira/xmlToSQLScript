'use strict'


var xmlToJson = require('./util/xmlTojson')
var sqlScriptBuilder = require('./util/sqlScriptBuilder')
var sqlScriptTemplate = require('./sqlScriptTemplate')()


xmlToJson('e.XML')
    .then((result) => {

        var object = result.document.placeholders
        
        sqlScriptBuilder(object,63,sqlScriptTemplate)

        sqlScriptTemplate.setEndOfScript()   

    }).catch((err) => {
        console.log(err);
    });
