const mysql = require('mysql');
let client = undefined;
const query = function (sql, cb) {
    console.log('query = ' + sql);
    client.getConnection(function (err, connection) {
        if (err) {
            console.log('connection mysql err = ' + err);
            cb(err);
            throw err;
        } else {
            connection.query(sql, function (connerr, result, fileds) {
                if (connerr) {
                    console.log('query err = ' + connerr);
                    cb(connerr);
                } else {
                    cb(null, result);
                }
                connection.release();
            })
        }
    });
};
const insertSql = function (table, data) {
    let sql = 'insert into ' + table;
    // (123,1234,345,36)l
    let valuesStr = 'values(';
    let keyStr = ' (';
    for (let i in data){
        keyStr += i + ',';
        if((typeof data[i]).indexOf('string') === 0){
            valuesStr += "'" + data[i] + "'"+ ',';

        }else {
            valuesStr += data[i] + ',';
        }
    }
    keyStr = keyStr.substring(0, keyStr.length - 1);
    keyStr += ') ';
    valuesStr = valuesStr.substring(0, valuesStr.length - 1) ;
    valuesStr += ") ";
    sql += keyStr + valuesStr;
    return sql;
};
const updateSql = function (tabel,mainKey, mainValue, data) {
    let sql = 'update ' + tabel + ' set ';
    for (let i in data){
        if ((typeof data[i]).indexOf('string') === 0){
            sql += i + '=' + "'" + data[i] +"'" + ',';

        }else {
            sql += i + '=' + data[i]  + ',';
        }
    }
    sql = sql.substring(0, sql.length - 1);
    if ((typeof mainValue).indexOf('string') === 0){
        sql += ' where ' + mainKey + '= ' + "'" + mainValue + "'" + ';';

    }else {
        sql += ' where ' + mainKey + '= ' + mainValue + ';';
    }
    return sql;
};


exports.checkPlayer = function (uniqueID, cb) {
    //查找玩家数据
    let sql = 'select * from t_playerinfo where  unique_id = ' + uniqueID + ';';
    query(sql, function (err, data) {
        if (err){
            console.log('err = ' + err);
        }
        console.log('check player = ' + JSON.stringify(data));
        cb(err, data);
    });

};
exports.insertPlayerInfo = function (data) {
    //插入玩家数据
    let sql = insertSql('t_playerinfo', data);
    console.log('sql = ' + sql);
    // INSERT INTO tbl_name (col1,col2) VALUES(15,col1*2);
    // let sql = 'insert into t_playerinfo (unique_id, uid, nick_name, avatar_url, house_card_count) values(' + data.uniqueID + ',' + data.uid + ')'
    query(sql, function (err, res) {
        if (err ){
            console.log('insert player info err =  ' + err);
        }else {
            console.log('res = ' + JSON.stringify(res));
        }
    })
};
exports.updatePlayerInfo = function (mainKey,mainValue,data) {
    //更新玩家数据
    let  sql = updateSql('t_playerinfo', mainKey,mainValue,data);
    query(sql, function (err, data) {
        if (err){
            console.log('update player info =' + err);
        }else {
            console.log('update player info success = ' + JSON.stringify(data));
        }
    })
};


exports.connect = function (config) {
    client = mysql.createPool(config);
};
