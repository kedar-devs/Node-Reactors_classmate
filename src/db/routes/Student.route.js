const router = require("express").Router();
let User = require("../model/Student.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const saltRound = 8;
//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
const nodemailer = require("nodemailer");

const crypto = require("crypto");
let multer = require("multer"),
  uuidv4 = require("uuidv4");
const DIR = "./Notes/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4 + "-" + filename);
  },
});
var upload = multer({
  storage: storage,
});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "savishkargec@gmail.com",
    pass: "for@*web",
  },
});

const keys = process.env.MONGODB_URL;
router.route("/").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error:" + err));
});
//Working Verified
router.route("/add").post((req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log(err);
      }
      if (!user) {
        console.log(req.body);
        if (req.body == null) {
          return;
        }
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const resume = " ";
        const resetToken = " ";
        const expiresToken = " ";
        const newUser = new User({
          firstname,
          lastname,
          email,
          password,
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
              res.status(200).send({ token, user });
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
      } else if (user) {
        res.status(401).send("User Already exists");
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Some Internal error Occured" });
  }
});
router.get("/user/:id", (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(404).send("user not found");
      });
  } catch (err) {
    console.log(err);
    return res.status(500).message({ message: "Some error Occured" });
  }
});
//Working Verified
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
    return res.status(500).send({ message: "Error Occured" });
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json("Deleted successfully"))
      .catch((err) => res.status(400).json("Error:" + err));
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error Occured" });
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
    return res.status(500).send({ message: "Error Occured" });
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
    return res.status(500).send({ message: "Error Occured" });
  }
});
router.post("/AddResume", upload.single("resume"), (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");

    User.findOneAndUpdate({ _id: req.body.id }).then((user) => {
      user.resume = url + "/Notes/" + req.file.filename;
      user
        .save()
        .then((result) => res.status(200).send({ result }))
        .catch((err) => res.status(400).json("Error:" + err));
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error Occured" });
  }
});
router.post("/ApplyJob", (req, res) => {
  try {
    User.findOne({ _id: req.body.id }, (err, user) => {
      if (err) {
        console.log(err);
      }
      console.log(user.resume.replace("http://localhost:5000", ""));
      const mailpath = user.resume.replace("http://localhost:5000", "");
      console.log(mailpath);
      transporter.sendMail(
        {
          to: req.body.empemail,
          from: "savishkargec@gmail.com",
          subject: "Job Applicant",
          html: `
            <p>Hi, ${
              user.firstname + " " + user.lastname
            } seems to be intreseted in working in your company . you can contact him at
            email:${user.email}<br />
            you can take a look at his resume attached, Thank you have a Grt day
            </p>
            `,
          attachments: [
            {
              filename: "Resume.pdf",
              path: path.join(__dirname, "./../../" + mailpath),
              contentType: "application/pdf",
            },
          ],
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
    }).catch((err) => res.status(500).send({ error }));
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "An Error Occured" });
  }
});
module.exports = router;
