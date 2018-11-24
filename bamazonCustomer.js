var mysql = require("mysql");
var inquirer = require("inquirer");

// the initial connection with the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazondata"
});

// connect to server and database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function
  start();
});

// starting function
function start() {
  inquirer
    .prompt({
      name: "sellOrBuy",
      type: "rawlist",
      message: "Would you like to [SELL] an item or [BUY] an item?",
      choices: ["SELL", "BUY"]
    })
    .then(function(answer) {
      // based on their answer, either call the sell or the buy functions
      if (answer.sellOrBuy.toUpperCase() === "BUY") {
        sellItem();
      }
      else {
        buyItem();
      }
    });
}

// function to handle posting new items to sell
function sellItem() {
  // prompt for info about the item 
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to sell?"
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place your item in?"
      },
      {
        name: "price",
        type: "input",
        message: "What's the price of this item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
     }, {
            name: "stock",
            type: "input",
            message: "How many items are you selling?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              },
           },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.category,
          price: answer.price,
          stock_quantity: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("Your item was posted successfully!");
          // re-prompt the user to continue
          start();
        }
      );
    });
}

function buyItem() {
  // accesing the db to see the items being sold
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to buy
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item would you like to buy today?"
        },
        {
          name: "selectItem",
          type: "list",
          choices: [choiceArray]
        },
        // Here we ask the user to confirm.
    {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true
      }
      ])
      .then(function(inquirerResponse) {
        // If the inquirerResponse confirms, we let them know they bought the item, otherwise ask them to return later
        if (inquirerResponse.confirm) {
          console.log("\nCongratulations! ");
          console.log("Your are the owner of a brand new" + inquirerResponse.choiceArray + "\n");
        }
        else {
          console.log("\nThat's okay, come again when you are more sure.\n");
        }
      });
  });
}
