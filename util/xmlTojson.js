'use strict'

const xml2js = require('./../node_modules/xml2js');
    const fs = require('fs');  

    function cleanOutput (value, name) {
        if (name === 'xmlns:xsi') {
            return undefined
        }
        return value
    }

module.exports = function xmlFileToJson(xmlFileName){
    return xml2js.parseStringPromise(
        fs.readFileSync(`./xml/${xmlFileName}`), { 
        normalizeTags: true,
        mergeAttrs: true,
        explicitRoot: false,
        explicitArray: false,
        attrValueProcessors: [cleanOutput],
        valueProcessors: [cleanOutput]
    })

}


