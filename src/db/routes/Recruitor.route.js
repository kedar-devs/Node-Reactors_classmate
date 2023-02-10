const router = require("express").Router();
let User = require("../model/Recruitor.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRound = 8;
//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
const nodemailer = require("nodemailer");

const crypto = require("crypto");
const { request } = require("http");

const transporter = nodemailer.createTransport({
  service: "Gmail",

  auth: {
    user: "savishkargec@gmail.com",
    pass: "for@*web",
  },
});

const keys = process.env.MONGODB_URL;

router.route("/GetJob").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error:" + err));
});
router.route("/add").post((req, res) => {
  try {
    console.log("company signin route called");
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const CompanyName = req.body.CompanyName;
    const CompanyLoc = req.body.CompanyLoc;
    const numberemp = req.body.numberemp;
    const description = req.body.description;
    const type = req.body.type;
    const tag = req.body.tag;
    const resetToken = " ";
    const expiresToken = " ";
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      CompanyName,
      CompanyLoc,
      numberemp,
      description,
      type,
      tag,
      resetToken,
      expiresToken,
    });
    bcrypt.hash(newUser.password, saltRound, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save((err, user) => {
        if (err) {
          console.log(err);
        } else {
          let payload = { subject: user.email };
          let token = jwt.sign(payload, process.env.SECRET_KEY);
          res.status(200).send({ token });
        }
      });
    });

    /*.then(res=>{
                 console.log(res.email)
                 let payload={subject:res.email}
                 let token=jwt.sign(payload,process.env.SECRET_KEY)
                 res.status(200).send({token})
             })
             .catch(err=> res.status(400).json('Error:'+err))*/
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: "Error has Occured" });
  }
});
router.post("/login", (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          res.status(401).send("invalid Email");
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (isMatch) {
              let payload = { subject: user._id };
              let token = jwt.sign(payload, process.env.SECRET_KEY);

              res.status(200).send({ user, token });
            } else {
              res.status(401).send("invalid Password");
            }
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: "Error has Occured" });
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json("Deleted successfully"))
      .catch((err) => res.status(400).json("Error:" + err));
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: "Error has Occured" });
  }
});
router.post("/forgot-password", (req, res) => {
  try {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
      } else {
        const token = buffer.toString("hex");
        User.findOne({ email: req.body.email }, (err, user) => {
          if (err || !user) {
            res.status(422).send("No user with this email id available");
          } else {
            user.resetToken = token;
            user.expiresToken = Date.now() + 3600000;
            user
              .save()
              .then((user) => {
                console.log("hello");
                transporter.sendMail(
                  {
                    to: user.email,
                    from: "savishkargec@gmail.com",
                    subject: "password reset",
                    html: `
                        <p>Hi ${user.firstname}, forgot your password.<br/> Don't worry we got you covered</p>
                        <h5><a href="https://savishkar-webapp.herokuapp.com/update-password/${token}">click here</a></h5>
                        <p>link expires in one hour, thank you</p>
                        `,
                  },
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.send("success");
                    }
                    transporter.close();
                  }
                );

                res.send({
                  message:
                    "An email has been sent to the provided email with further instructions.",
                });
              })
              .catch((err) => res.status(400).json("Error:" + err));
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: "Error has Occured" });
  }
});
router.post("/new-password", (req, res) => {
  try {
    console.log(req.body);
    const password = req.body.password;
    const sentToken = req.body.token;
    console.log(sentToken);
    User.findOneAndUpdate({ resetToken: req.body.token })
      .then((user) => {
        console.log("in here");
        bcrypt.hash(password, saltRound, (err, hash) => {
          if (err) throw err;
          console.log(hash);
          user.password = hash;
          user.resetToken = " ";
          user.expiresToken = " ";
          user
            .save()
            .then((result) => res.status(200).json("success"))
            .catch((err) => {
              console.log(err);
              res.status(400).json("Error:" + err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("oopsy doopsy sorry" + err);
      });
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: "Error has Occured" });
  }
});

module.exports = router;
