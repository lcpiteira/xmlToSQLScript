'use strict'

const { initial } = require('lodash')
const sqlScriptBuilder = require('../util/sqlScriptBuilder')


module.exports = function sqlScriptRunner(object,initialNumber,sqlScriptTemplate){

    var script = ``

    var result = sqlScriptBuilder(object, initialNumber, sqlScriptTemplate)

    

    var resultMapped = 
        Array.from({length: result.array.length}, (v, i) => i + initialNumber)
            .map(num => {
                var obj = result.array[parseInt(num)-parseInt(initialNumber)] 
                return {
                    'key': obj.key,
                    'type': obj.type,
                    'number': num
                }
            })

    console.log(resultMapped)
            



    /** 
     * BEGIN
     */
    script += sqlScriptTemplate.createHeader(initialNumber,result.array.length)


    /**
     * SYSTEM CONFIGURATION
     */
     script += sqlScriptTemplate.systemConfiguration('BDOC','SYS.00001')




    /**
     * ATTRIBUTES
     */
     script += sqlScriptTemplate.createAttributes(resultMapped)

    
    /**
     * MAPPINGS
     */
     script += sqlScriptTemplate.createMappings(resultMapped)



    /**
     * END
     */
     script += sqlScriptTemplate.setEndOfScript()

     return script

}






