/**
 * Created by wangyu on 2017/4/1.
 */
export default function(obj) {
    let keys =arguments[1] instanceof Array ? arguments[1] :   Array.prototype.slice.call(arguments, 1);
    let result = {};

    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            if(keys.indexOf(key) < 0) {
                result[key] = obj[key];
            }
        }
    }
    //keys.forEach(function(key) {
    //    delete obj[key];
    //});
    return result;
};