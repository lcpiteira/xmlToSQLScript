'use strict'

module.exports = function sqlScriptBuilder(obj, parent, sqlScriptTemplate) {
 
    const result = {
        res : {},
        array : []
    }
    var sqlScriptTemplate = sqlScriptTemplate
    function recurse(obj, current) {

        for (const key in obj) {
            let value = obj[key];
            if(value != undefined) {
                if(value && Array.isArray(value)){

                    let arr = result.array
                    arr.push({
                        'key': key,
                        'type': 'Object'
                    })
                    result.array = arr
                    //colocar List 

                }
                if (value && typeof value === 'object' ) {
                    
                    var keyList = Object.keys(obj[key])

                    if(Number.isInteger(parseInt(key))){
                        
                        //do nothing
                    }
                    else if (Array.isArray(obj[key][keyList])){
                        var newObj = {
                            'key': key,
                            'type': 'List'
                        }
                        
                        var keyNames = result.array.map(obj => obj.key)

                        if(!keyNames.includes(key)){
                            result.array.push(newObj)
                        }
                    }
                    else{
                        var newObj = {
                            'key': key,
                            'type': 'Object'
                        }
                        
                        var keyNames = result.array.map(obj => obj.key)

                        if(!keyNames.includes(key)){
                            result.array.push(newObj)
                        }
                    }

                    var number = parent++
                    
                    result.res[key] = value;
                    recurse(value, key, parent++);
                } else {

                    let child = parent++

                    var newObj = {
                        'key': key,
                        'type': 'String'
                    }

                    var keyNames = result.array.map(obj => obj.key)

                    if(!keyNames.includes(key)){
                        result.array.push(newObj)
                    }

                    result.res[key] = value;
                }
            }
        }
    }
    recurse(obj, parent);
    return result;
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

