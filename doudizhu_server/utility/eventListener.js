exports.EventListener  = function (obj) {
    let Register = {};
    obj.on = function (type, method) {
        console.log('on = ' + type);
        if (Register.hasOwnProperty(type)){
            Register[type].push(method);
        }else {
            Register[type] = [method];
        }
    };
    obj.fire = function (type) {
        // arguments = [type,type1,type2];
        console.log('fire = ' + type)
        if (Register.hasOwnProperty(type)){
            let handlerList = Register[type];
            for (let i = 0 ; i < handlerList.length ; i ++){
                let handler = handlerList[i];
                let args = [];
                for (let i = 1 ; arguments.length ; i ++){
                    args.push(arguments[i]);
                }
                handler.apply(this, args);
            }
        }
    };
    obj.removeListener = function () {

    };
    obj.removeAllListeners = function () {

    };
    return obj;
};
