var mysql = requre("mysql");
var inquirer = ("inquirer");
var table = require("cli-table2");
var connection = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "BamazonTrue",
    port: 3306
})
connection.connect();

var display = function()    {
    connection.query ("SELECT * FROM products", function(err, res)  {
    if (err) throw err;
    console.log("----------------------")
    console.log("       Bamazon        ");
    console.log("----------------------");
    console.log("")
    console.log("Product List")
    console.log("")
    });
var table = new Table({
    head: ['TH 1 label', 'TH 2 label'],
    colWidths: [12, 50, 8],
    colAligns: ["center", "left","right"],
    style:    {
    head: ["aqua"],
    compact: true
}
});
    for (var i=0; i< res.length; i++){
        table.push([res[i].id, res[i].products_name, res[i].price]);
    
}
console.log(table.toString());
console.log("");
shopping();
};

var shopping = function (){
    inquirer.prompt({
    name: "PurchasingProduct",
    type: "input",
    message: "What is the product you wish to purchase?"
})
.then(function(answer1) {
    var selection = answer1.PurchasingProduct;
    connection.query("SELECT * FROM products WHERE Id=?", selection, function(err, res) {
if (err) throw err;
if (res.length === 0)   {
console.log("That Product doesnt appear to be available, our apologies")

shopping();
    } else {
        inquirer.prompt({
            name: "quantity",
            type: "input",
            message: "Please enter quantity amount here"
})
.then(function(answer2) {
    var quantity = answer2.quantity;
    if (quantity > res[0].stock_quantity)   {
console.log("Only" + res[0].stock_quantity + "Left")
};
    shopping();
    
}   else {
    console.log("");
    console.log(res[0].products_name + "purchased");
    console.log(quantity + "qty @ $" + res[0].price);
}

var newQuantity = res[0].stock_quantity - quantity;
connection.query( "UPDATE products SET stock_quantity = " + newQuantity + "WHERE id = " + res[0].id, function(err, resUpdate)   {
    if(err) throw err;
    console.log("");
    console.log("Your Order Has Been Placed");
    console.log("");
    connection.end();
}
};
}
});
}
});
});
};

display();
