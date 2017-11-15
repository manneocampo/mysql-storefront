var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table2");

//create connection information to sql database 
var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"H8passwords!",
	database:"bamazon",

});

//connect to mysql server and sql database 
connection.connect(function(err){
	if(err) throw err;
	//run start function after the connection is made to prompt the user
	start();
}); 

//display table of all items available  with id, name, prices


//function which prompts user w two messages
/*ask them the ID of the prod they wnat to buy
then ask how many units of the pdt they want */
function start(){
	inquirer
	.prompt([
	{
		name:"itemID",
		type:"input",
		message:"What is the ID of the item you want to purchase?"
	},
	{
		name:"units",
		type:"input",
		message:"How many units would you like to purchase?"
	}
	])
	.then(function(answer){
		
	})
}