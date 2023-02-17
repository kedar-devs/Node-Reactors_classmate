const router = require("express").Router();
let User = require("../model/BankSt.model");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",

  auth: {
    user: "savishkargec@gmail.com",
    pass: "for@*web",
  },
});
let cron = require("node-cron");

cron.schedule("2-4 58 0 1-31 * *", (req, res) => {
  console.log("running a task every minute");
  User.find().then((user) => {
    for (var i = 0; i < user.length; i++) {
      transporter.sendMail(
        {
          to: user.useremail,
          from: "savishkargec@gmail.com",
          subject: "Mothly Expendediture",
          html: `
            <p>Hi here is your Monthly expenditure:${user.expenses}
            thaml you
            </p>
            `,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
          }
          transporter.close();
        }
      );
    }
  });
});
router.post("/add/:id", async(req, res) => {
  try {
    console.log(req.body);
    const userid = req.params.id;
    const record = {
      reasons: req.body.reason,
      Amount: req.body.amount,
      date: Date(),
    };
    
    const totalexpenses = req.body.amount;
    const useremail = req.body.useremail;
    const newUser = new User({ userid, totalexpenses, record, useremail });
    newUser
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User registered successfully!",
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: "Error has Occured" });
  }
});
router.post("/addExpenses/:id", (req, res) => {
  try {
    User.findOneAndUpdate(
      { userid: req.params.id },
      {
        $push: {
          record: {
            reasons: req.body.reason,
            Amount: req.body.amount,
            date: Date(),
          },
        },
      }
    )
      .then((user) => {
        console.log(user);
        res.status(201).json({
          message: "User registered successfully!",
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: "Error has Occured" });
  }
});
router.get("/calculateExpense/:id", (req, res) => {
  try {
    User.findOneAndUpdate({ userid: req.params.id })
      .then((user) => {
        if (user == undefined) {
          res.status(404).send("No such user");
        } else {
          console.log(user);
          console.log(user.record);
          for (let i = 0; i < user.record.length; i++) {
            user.totalexpenses = user.totalexpenses + user.record[i].Amount;
          }
          console.log(user);
          user
            .save()
            .then((result) => {
              return res.status(200).send(result);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: "Error has Occured" });
  }
});
router.get("/getExpenses/:id", (req, res) => {
  try {
    User.find({ userid: req.params.id })
      .then((user) => res.status(200).send({ user }))
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: "Error has Occured" });
  }
});
module.exports = router;
