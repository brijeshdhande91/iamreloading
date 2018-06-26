var mysql = require('mysql');

//need to create schema iamreloadingdb manually

var mysql_connection = mysql.createPool({
        connectionLimit : 100,
        waitForConnections : true,
        queueLimit :0,
        host     : 'mysql://mysql:3306/',
        user     : 'dbiamreloading',
        password : 'iamreloading',
        database : 'iamreloadingdb',
        /*debug    :  true,*/
        wait_timeout : 28800,
        connect_timeout :10
});

mysql_connection.getConnection(function(err, connection) {
  if(err){
    console.log(" mysql connection error: "+err);
  }else{
      connection.query("SELECT 1 FROM iamreloadingdb.users LIMIT 1", function(error, results, fields) {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            connection.release();
            console.log('connected!');
        }else {
            console.log('insert');
            connection.query('CREATE TABLE iamreloadingdb.users (' + 
                       'id INT NOT NULL AUTO_INCREMENT, ' + 
                       'name CHAR( 50 ) NOT NULL, ' +
                       'email CHAR( 50 ) NOT NULL, ' + 
                       'organisation CHAR( 50 ) , ' +
                       'phone CHAR( 10 ) NOT NULL, ' + 
                       'password VARCHAR( 10 ) NOT NULL, ' + 
                       'updated_by CHAR( 50 ) NOT NULL, ' + 
                       'updated_on DATE,'+
                       'country_code CHAR(2), PRIMARY KEY (id), UNIQUE (email)' +
                       ')',
                function(err, res){ 
                  connection.release();
                  if(err){
                    console.log(err);
                  }else{
                    console.log(res);
                  }
                }
            );
          }
      });
  }
});
            
mysql_connection.on('error', function (err) {
  if (err) { 
    console.log("check database server" + err);
  }
}); 

mysql_connection.on('close', function (err) {
  console.log('mysqldb conn close');
});

exports.adddata = function adddata(request, callback) {
  if(request.email == null || request.email == ""){
    console.log("please check the input values");
  }else{
    mysql_connection.getConnection(function(err, connection) {
      if(err){
        console.log(" mysql connection error: "+err);
        var database = [{email:'database'}];
        callback("",database);
      }else{
          connection.query('SELECT * FROM iamreloadingdb.users WHERE ' + 
            'email ="'+ request.email+'"',
          function(err, res){
              var respo = res;
              if(err){
                console.log(err);
                var database = [{email:'database'}];
                callback("",database);
              }
              else if(res == 'null' || res == '' || res == null){
                connection.query('INSERT INTO  iamreloadingdb.users (' + 
                'name, email, organisation, country_code, phone, password, updated_by, updated_on)' + 
                'VALUES ("'+request.name+'","'+request.email+'","'+request.organisation+'","'+request.country_code+'","'+request.phone+'","'+request.password+'","'+request.updated_by+'",sysdate());', 
                function(res) {
                  var email_res = [{email:'inserted'}];
                  console.log("got response" + email_res[0].email);
                  connection.release();
                  callback("", email_res);
                }); 
              }else{
                connection.release();
                callback("", res); 
              }   
          });
        }  
    });  
  }
}

exports.findData = function findData(request, callback) {  
    if (request.email) {
      mysql_connection.getConnection(function(err, connection) {
        if(err){
          console.log("mysql connection error: "+err);
          callback("",'database');
        }else{
            connection.query('SELECT * FROM iamreloadingdb.users WHERE ' + 
                'email ="'+ request.email+'"', function(err,res) {
                    if(err){
                      console.log("database error" + err);
                      callback("",'database');
                    } 
                    else if(res == 'null' || res == '' || res == null){
                        console.log("n data");
                         callback("",'null');
                    }else{
                          console.log('%s: %s \n', res[0].email, res[0].password);
                          callback("",res[0]); 
                    }
            });
          connection.release();  
        }           
      }); 
    }
}
