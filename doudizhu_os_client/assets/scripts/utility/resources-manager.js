const ResourcesManager = function () {
    let that = {};

    that.resources = {};
    const load = function (resPath, cb) {
        cc.loader.loadRes(resPath,function (err, res) {
            if (err){
                console.log('err = ' + err);
            }
            if (cb){
                cb(resPath,res);
            }
        })
    };

    that.loadList = function (resList, cb) {
        let loadCount = 0;
        const loadCb = function (resPath, res) {

            that.resources[resPath] = res;

            loadCount ++;
            if (loadCount  === resList.length){
                console.log('资源加载完毕');
                if (cb){
                    cb();
                }
            }
        };
        for (let i = 0 ; i < resList.length ; i ++){
            load(resList[i], loadCb);
        }
    };
    return that;
};
export default ResourcesManager;