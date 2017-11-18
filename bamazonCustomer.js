var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table2");

//create connection information to sql database 
var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"H8passwords!",
	database:"bamazon"

});

//connect to mysql server and sql database 
connection.connect(function(err){
	if(err) throw err;
	//run start function after the connection is made to prompt the user
	start();
}); 



//function which prompts user w two messages
/*ask them the ID of the prod they want to buy
then ask how many units of the pdt they want */
function start(){
	//query the database for all items for sale
	connection.query("SELECT * FROM products", function(err, results){
		if(err)throw err;

		var table = new Table({
			head:["item_id", "product_name", "price"],
			colWidths: [100,200,100]
		});
		console.log(table.toString());
	
		//once have all the items, prompt user for what they'd like to buy
		inquirer
		.prompt([
		{
			name:"itemID",
			type:"input",
			message:"What is the ID of the item you want to purchase?",
			validate: function(value){
				if(isNaN(value)=== false){
					return true;
				}
				return false;
			}
		},
		{
			name:"units",
			type:"input",
			message:"How many units would you like to purchase?",
			validate: function(value){
				if(isNaN(value)=== false){
					return true;
				}
				return false;
			}
		}
		])
		.then(function(answer){
		//based on answer, check database (run checkDatabase) if store has enough of item from input	
		connection.query(
			"SELECT products.itemID, products.stock_quantity FROM products", function(err, results){
				if(err) throw err;
			})
		
		//if not enough, log insufficient quantity and prevent order
		//if enough, fulfill order by calling placeOrder fn
		})
	});
}

// function checkDatabase(){
// 	connection
// 	.query("SELECT * FROM products", function(err, results){

// 	}
	// var chosenItem;
	// 	for(var i=0; i < results.length;i++){
	// 	if(results[i].itemID === answer)	
	// 	}
// }

// function placeOrder (){

// }