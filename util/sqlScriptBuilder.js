'use strict'

module.exports = function sqlScriptBuilder(obj, parent, sqlScriptTemplate) {

    /**
     * HEADER OF SCRIPT
     */

    var objectLength = getLengthOfNestedObject(obj).length
    console.log(sqlScriptTemplate.createHeader(parent, objectLength));
     
    

    /**
     * SYSTEM CONFIGURATION
     */
    sqlScriptTemplate.systemConfiguration('BDOC','SYS.00001')


    const res = {};
    var sqlScriptTemplate = sqlScriptTemplate
    function recurse(obj, current) {
        for (const key in obj) {
            let value = obj[key];
            if(value != undefined) {
                if (value && typeof value === 'object') {

                    var number = parent++
                    sqlScriptTemplate.createObject(key,number)
                    sqlScriptTemplate.createMappings(number,key)
                    
                    
                    res[key] = value;
                    recurse(value, key, parent++);
                } else {

                    let child = parent++

                    sqlScriptTemplate.createString(key,child)
                    sqlScriptTemplate.createMappings(child,key)
                    

                    res[key] = value;
                }
            }
        }
    }
    recurse(obj, parent);
    return res;


     
}


function getLengthOfNestedObject(object) {
    function iter(o, p) {
        if (Array.isArray(o)) { return; }
        if (o && typeof o === 'object') {
            var keys = Object.keys(o);
            if (keys.length) {
                keys.forEach(function (k) { iter(o[k], p.concat(k)); });
            }
            return;
        }
        result.push(p.join('.'));
    }
    var result = [];
    iter(object, []);

    return [... new Set(result.flatMap(str => str.split('.')))];
}

