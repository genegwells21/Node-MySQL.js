var mysql = requre("mysql");
var inquirer = ("inquirer");
var table = require("cli-table2");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "BamazonTrue",
    port: 3306
})
connection.connect(function(err)    {
    if(err) {
        console.log("error conenction: " + err.stack);
    }
    loadProducts();
});
function loadProducts() {
    connection.query("SELECT * FROM products", function (err, res)  {
        console.table(res);

        promptCustomerForItem(res);
    });
    }
    function promptCustomerForItem(inventory)   {
        inquirer.prompt([
            {
                type: "input",
                name: "choice",
                message: "what is the Id of your desired product?",
                validate: function(val) {
                    return !isNaN(val) || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function(val) {

            checkIfShouldExit(val.choice);
            var choiceId = parseInt(val.choice);
            var product = checkInventory(choiceId, inventory);

            if (product)    {
                promptCustomerForQuantity(product);
            }
            else{
                console.log("\nLooks like were out of stock.");
                loadProducts();
            }
        });
    }
    function promptCustomerForQuantity(product) {
        inquirer.prompt([
            {
                type: "input",
                name: "quantity",
                message: "Select Quantity Amount, Please!",
                validate: function(val) {
                    return val > 0 || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function(val) {
            checkIfShouldExit(val.quantity);
            var quantity = parseInt(val.quantity);

            if(quantity > product.stock_quantity)   {
                console.log("\nSorry, we're outta stock");
                loadProdcuts();
            }
            else{

                makePurchase(product, quantity);
            }
        });
    }

    function makePurchase(product, quantity)    {
        connection.query(
            "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
            [quantity, product.item_id],
            function(err, res)  {

                console.log("\nOrder Placed!" + quantity + "" + product.product_name + "'s!");
                loadProducts();
            }
        );
    }
    
    function checkInventory(choiceId, inventory)    {
        for (var i = 0; i < inventory.length; i++)  {
            if (inventory[i].item_id === chocieId)  {

                return inventory[i];

            }
        }

        function checkIfShouldExit(choice)  {
            if (choice.toLowerCase() === "q")   {

                console.log("Thank you!");
                process.exit(0);
        }
    }
    
 