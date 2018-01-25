var mysql = require("mysql");
var express = require("express");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "12345678",
	database: "mail"
});

con.connect(function(err){
	if(err){
		console.log("Error connecting to database");
		return;
	}
	console.log("Connection to databases established");
});

exports.getByID = function getByID(id,callback){
	con.query("SELECT email, name FROM mail.mail Where id =" + id,function(err,rows){
		callback(null, rows);
	});
}

exports.getByEmail = function getByID(email,callback){
	con.query("SELECT id, name FROM mail.mail Where email =" + email,function(err,rows){
		callback(null, rows);
	});
}
