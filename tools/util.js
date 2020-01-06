/**
 * 时间格式
 */
function changedate(time, format) {
    var t = new Date(time);
    var tf = function (i) { return (i < 10 ? '0' : '') + i };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}

function AmtFormat(val) {
    var n = val.toString();
    if (/\./.test(n) && n.split('.')[1].length > 2) {
        return val.toFixed(2);
    }
    return val;
}

module.exports = {
    changedate,
    AmtFormat
}