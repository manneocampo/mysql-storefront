var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

//create connection information to sql database 
var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"H8passwords1!",
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
			colWidths: [20,20,20]
		});
		
		for (var i=0; i<results.length; i++) {
			table.push([results[i].item_id, results[i].product_name, results[i].price]);
		}
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
			`SELECT stock_quantity, price FROM products WHERE item_id = ${answer.itemID}`, function(err, results){
				if(err) throw err;

				if(parseInt(answer.units) <= results[0].stock_quantity){
					placeOrder(results[0].stock_quantity, parseInt(answer.units), answer.itemID, results[0].price);
				}else {
					console.log("Insufficient Quantity");
					
				start();

				}
			})
		})
	});
}


function placeOrder (currentStock, orderSize, itemID, price) {
	var newStockCount = currentStock - orderSize;
	connection.query(`UPDATE products SET stock_quantity=${newStockCount} WHERE item_id=${itemID}`, function(err, results) {
		if (err) throw err;
		console.log(`Total cost is: ${price*orderSize}`)
		start();
	})
}