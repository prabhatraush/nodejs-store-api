const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Users = require("./models/users");
const Orders = require("./models/order");

var url = "mongodb+srv://prabhatraushan:Ssq8CgcSFya7qBfG@mongodbeah-wq8qy.mongodb.net/store?retryWrites=true&w=majority";

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
  };

mongoose.connect(url,mongooseOptions);

const connection = mongoose.connection;
connection
  .once("open", () => { console.log("MongoDB database connection established successfully")})
  .on("error", error => { console.log("Error", error)});

let avgBillbyUser={};

app.get('/avgBill', async(req, res) => {
    let userSubtotal = [];
    let users = await Users.find({});
   // console.log(users);
    for(let i = 0 ; i< users.length ; i++ )
    {
      
      let ordersOfuser = await Orders.find({userId: users[i].userId});
     // console.log(ordersOfuser);
      let sum = 0;
      for(let j = 0; j<ordersOfuser.length; j++)
      {
        sum = sum +  ordersOfuser[j].subtotal;
      }

      let avgBill = sum/ordersOfuser.length;
      let userTotal = {
        userId : users[i].userId,
        name : users[i].name,
        noOfOrders: ordersOfuser.length,
        averageBillValue: avgBill
      }

      userSubtotal.push(userTotal);
    } 
     avgBillbyUser = userSubtotal;
    res.send(userSubtotal);
  });

  app.get('/updateOrders', async(req, res) => {
   // console.log(avgBillbyUser);
    let updated = false;
    for(let i = 0 ; i< avgBillbyUser.length; i++)
    {
      let updateNoofOrders = await Users.update({userId:avgBillbyUser[i].userId},{noOfOrders:avgBillbyUser[i].noOfOrders})
      if(updateNoofOrders)
        updated = true;
    }
    if(updated)
      res.send({success: true, message : "Successfully updated"});
    else
      res.send({success: false, message:"Error during update"});
    
  });
    
  
  app.listen(4000 , () =>
    console.log('Server ready at http://localhost:4000')
  );

  
