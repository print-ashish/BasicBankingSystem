const express = require("express");
const app = express();
const PORT = process.env.port || 8000;
const router = express.Router();
const path = require("path");
require("./models/user");
require("./models/history");
const mongoose = require("mongoose");
const CUSTOMERS = mongoose.model("CUSTOMERS");
const HISTORY = mongoose.model("HISTORY");
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL



const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));



require("./models/user");

// const cors = require("cors");
// require("./models/model")

app.use(express.json());
app.use(router);

mongoose.connect(
  MONGO_URL
);

mongoose.connection.on("connected", () => {
  console.log("databse connected");
});
mongoose.connection.on("error", () => {
  console.log("error connecting to database ");
});

router.get("/showcustomers", (req, res) => {
  CUSTOMERS.find().then((data) => {
    res.json(data);
  });
});
router.get("/showhistory", (req, res) => {
  HISTORY.find().then((data) => {
    res.json(data);
  });
});
router.post("/findcustomer", (req, res) => {
  CUSTOMERS.find({ accountno: req.body.accountno }).then((data) => {
    res.json(data);
  });
});
router.post("/transfermoney", (req, res) => {
  console.log("transferring amount");
  CUSTOMERS.find({ accountno: req.body.senderacno }).then((senderdata) => {
    console.log(senderdata);
    console.log("reciver account no ", req.body.receiveracno);
    CUSTOMERS.find({ accountno: req.body.receiveracno }).then(
      (receiverdata) => {
        console.log(receiverdata)
        if (!receiverdata[0]) {
          console.log("receiver not found");
          res.json({ errormsg: "Receiver Not found" });
          
        } else {
            console.log("sender balance ",senderdata[0].balance)
            console.log("amount sending ", Number(req.body.amount))
          
            if(senderdata[0].balance < Number(req.body.amount))
            {
                console.log("insufficient balance");
                res.json({ errormsg: "Insufficient balance" });
            }
            CUSTOMERS.findOneAndUpdate(
            { accountno: req.body.senderacno}, // Filter: Find a document with the name "John"
            { $set: { balance: senderdata[0].balance - Number(req.body.amount)} }
          ).then((senderupdate)=>
          {
            CUSTOMERS.findOneAndUpdate(
            { accountno: req.body.receiveracno}, // Filter: Find a document with the name "John"
            { $set: { balance: receiverdata[0].balance + Number(req.body.amount)} }
          ).then((receiverupdate)=>
          {
                //adding history
                const history = new HISTORY({
                  sender: senderdata[0].username,
                  amount: req.body.amount,
                  receiver: receiverdata[0].username,
                  datetime: new Date().toLocaleString('en-IN')
                  // accountno: req.body.accountno,
                });
              
                history
                  .save()
                  .then((data) => {
                    console.log("account created");
                    res.json({ message: "saves success" });
                  })
                  .catch((err) => {
                    error: "error saving data";
                  });



                //
            res.json({successmsg: 'transferred successfullyy'})
          })

            // res.json(senderupdate)
            // console.log(senderupdate)
          })

          // res.json(receiverdata)
        }
      }
    );
    // res.json(senderdata)
  });
});
router.post("/adddata", (req, res) => {
  console.log(req.body);
  console.log(typeof req.body.response);
  console.log("saving new user account");
  const user = new CUSTOMERS({
    username: req.body.username,
    email: req.body.email,
    balance: req.body.balance,
    accountno: req.body.accountno,
  });

  user
    .save()
    .then((data) => {
      console.log("account created");
      res.json({ message: "saves success" });
    })
    .catch((err) => {
      error: "error saving data";
    });
});
router.post("/addhistory", (req, res) => {
  console.log(req.body);
  console.log(typeof req.body.response);
  console.log("saving new user account");
  const history = new HISTORY({
    sender: req.body.sender,
    amount: req.body.amount,
    receiver: req.body.receiver,
    datetime: new Date().toLocaleString('en-IN')
    // accountno: req.body.accountno,
  });

  history
    .save()
    .then((data) => {
      console.log("account created");
      res.json({ message: "saves success" });
    })
    .catch((err) => {
      error: "error saving data";
    });
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server started at + ${PORT}`);
});
