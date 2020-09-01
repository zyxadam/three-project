const mysql=require('mysql');
function query(sql,parm,fn){
    const conn=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        port:3306,
        database:'shop'
    });
    conn.connect();
    conn.query(sql,parm,fn);
    conn.end();
}
module.exports = {query:query};