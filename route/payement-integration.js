const User = require("../models/register.model");
const SSLCommerzPayment = require("sslcommerz-lts");
var ObjectId = require('mongodb').ObjectId;
require("dotenv").config();

const STORE_ID = process.env.STORE_ID;
const STORE_PASSWORD = process.env.STORE_PASSWORD;

const is_live = false;

// console.log(STORE_ID)
const payment = async (req, res) => {
  const email = req.params.userMail;
  console.log(email);
  const orderData = await User.findOne({ email }).then((order) => {
    return order;
  });

  // pricing
//   let amount;
//   if (orderData.level === "level-A") {
//     amount = 2500;
//   }
//  else if (orderData.level === "level-B") {
//     amount = 5000;
//   }
//   else{
//     amount = 7500;
//   }
  // splittin email for user name
  const extractNameFromEmail=(email)=> {
    const parts = email.split("@");

    if (parts.length === 2) {
      return parts[0];
    } else {
      return null;
    }
  }

  // for Tranjaction Id
  const tran_id=new ObjectId().toString();
  const username = extractNameFromEmail(email); 
  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id,
    success_url: "http://localhost:5000/success",
    fail_url: "http://localhost:5000/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:5000/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: `${orderData.email}`,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: username,
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(STORE_ID, STORE_PASSWORD, is_live);
  sslcz.init(data).then((apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.status(200).send({url:GatewayPageURL});
    console.log("Redirecting to: ", GatewayPageURL);
  });
};

module.exports = payment;
