const express = require('express');
let app = express();
var bodyParser = require('body-parser');
const axios = require('axios');
/* --------REMOVE-------*/
// const config = require('../config.js');

// auth
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("./auth/register");
const validateLoginInput = require("./auth/login");
const validateEmailInput = require("./auth/email");
const validateKeyInput = require("./auth/key");
const verifyJWT = require("./auth/verifyJWT");
const encrypt = require("./auth/dataEncryption.js").encrypt;
const secretOrKey = process.env.secretOrKey || config.secretOrKey;
const slushKey = process.env.slushKey

// const secretOrKey = config.secretOrKey;
// console.log('secretOrKeys: ', secretOrKey)

const sendEmail = require('../lib/sendEmail.js').sendEmail;

// database calls
const saveUser = require('../database/index.js').saveUser;
const fetchAllUsers = require('../database/index.js').fetchAllUsers;
const fetchUser = require('../database/index.js').fetchUser;
const fetchUserByID = require('../database/index.js').fetchUserByID;
const updateUserByID = require('../database/index.js').updateUserByID;
const saveToken = require('../database/index.js').saveToken;
const fetchToken = require('../database/index.js').fetchToken;
const deleteToken = require('../database/index.js').deleteToken;
const fetchMetrics = require('../database/index.js').fetchMetrics;


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', express.static(__dirname + '/../client/dist'));

// get requests
app.get('/fetchBTC', verifyJWT, (req, res) => {
  console.log('inside fetchBTC route');
  fetchUserByID(req.user.id)
  .then(user => {
    let json = {
      totalBTC: user.totalBTC,
      distributions: user.distributions,
      distributionsUSD: user.distributionsUSD,
      key: user.key,
    }
    res.json(json);
  })
  .catch(err => {
    console.log(err);
  })
})

app.get('/fetchMetrics', (req, res) => {
  console.log('inside fetchMetrics route');
  fetchMetrics()
  .then(metrics => {
    console.log(metrics[0]);
    res.send(metrics[0]);
  })
  .catch(err => {
    console.log(err);
  })
})

app.get('/fetchUser', verifyJWT, (req, res) => {
  console.log('inside fetchUser route');
  fetchUserByID(req.user.id)
  .then(user => {
    let json = {
      email: user.email,
      key: user.key
    }
    res.json(json);
  })
  .catch(err => {
    console.log(err);
  })
})

app.get('/fetchPoolStats', (req, res) => {
  axios.get('https://slushpool.com/accounts/profile/json/btc/', {
    headers: {
      "SlushPool-Auth-Token": slushKey,
    }
  })
  .then(stats => {
    console.log('slush pool data: ', stats.data.btc);
    res.send(stats.data.btc);
  })
  .catch(err => {
    console.log(err);
  })
})

app.post('/fetchWallet', (req, res) => {
  let key = req.body.key;
  console.log('wallet: ', key);
  axios.get(`https://bitcoinexplorer.org/api/address/${key}`)
  .then(data => {
    console.log('wallet data: ', data.data.txHistory);
    res.send(data.data.txHistory);
  })
  .catch(err => {
    console.log(err);
  })
})

app.get('*', (req, res) => {
  res.redirect('/');
});

// post requests
// accounts
app.post('/register', (req, res) => {
  // Form validation
  // console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  fetchUser(email)
  .then(user => {
    // console.log('user: ', user);
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      console.log('user not found, creating account')
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          console.log('hashedPassword: ', hashedPassword);
          saveUser(email, hashedPassword);
        });
      });
    }
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    res.redirect('/');
  })
});

app.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  // console.log('req.body: ', req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  fetchUser(email)
  .then(user => {
    // Check if user exists
    if (!user.email) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    // console.log('user: ', user);
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        console.log('isMatch');
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
        };
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: 2419200 // 4 weeks in seconds
          },
          (err, token) => {
            console.log('token: ', token);
            res.json({ success: true, token: "Bearer " + token, message: 'Successfully Logged In', messageType: 'success'}).redirect('/');
          }
        );
      } else {
        console.log('isNotMatch');
        res.json({ error: true, message: 'Incorrect Email or Password', messageType: 'danger' });
      }
    });
  })
  .catch(err => {
    res.json({ error: true, message: 'Incorrect Email or Password', messageType: 'danger' });
    console.log(err);
  })
});

app.post('/forgotPassword', (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  fetchUser(email)
  .then(user => {
    if (!user) {
      console.log("user with given email does not exist");
      res.json({message: "User Does Not Exist", messageType: "danger"});
    } else {
      fetchToken(user)
      .then(userToken => {
        if (!userToken) {
          var userID = user._id;
          var token = crypto.randomBytes(32).toString("hex");
          saveToken(userID, token);

          console.log('inside server just before sendEmail')
          let msg = `User ID: ${userID}\nToken: ${token}\n\nIf you did not initiate this password reset, please email us at untetheredmining@gmail.com`;
          sendEmail(email, "Password Reset", msg)
          .then(() => {
            console.log('password reset sent to email');
            res.send({message: "Email Sent", messageType: "success"});
          })
          .catch(err => console.log(err))
        } else {
          console.log('token already exists for this user');
          res.json({message: "Token Already Sent To User", messageType: "danger"});
        }
      })
      .catch(err => {
        console.log(err);
        res.json({message: "Error", messageType: "danger"});
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.json({message: "Error", messageType: "danger"});
  })
})

app.post('/password-reset', (req, res) => {
  console.log(req.body);
  if (req.body.userID){
    let userID = req.body.userID;
    let token = req.body.token;
    let password = req.body.password;
    fetchUserByID(userID)
    .then(user => {
      if (!user) {
        console.log('(1) invalid link or expired - unable to fetch user');
        res.json({message: "Invalid User ID", messageType: "danger"});
      } else {
        fetchToken(userID, token)
        .then(fetchedToken => {
          if (!fetchedToken) {
            console.log('(2) invalid link or expired - unable to fetch token')
            res.json({message: "Invalid User ID", messageType: "danger"});
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hashedPassword) => {
                console.log('hashedPassword: ', hashedPassword);
                user.password = hashedPassword
                updateUserByID(user)
                .then(() => {
                  console.log('successfully updated password');
                  deleteToken(userID)
                  .then(() => {
                    let msg = 'Your password was successfully reset!\n\nIf you did not submit this password reset, please email us at untetheredmining@gmail.com';
                    sendEmail(user.email, "Password Successfully Reset", msg)
                    .then(() => {
                      res.json({message: "Successfully Updated Password", messageType: "success"});
                    })
                    .catch(err => {
                      console.log(err);
                      res.json({message: "Error", messageType: "danger"});
                    })
                  })
                })
                .catch(err => {
                  console.log(err);
                  res.json({message: "Error", messageType: "danger"});
                })
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.json({message: "Error", messageType: "danger"});
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.json({message: "Error", messageType: "danger"});
    })
  }
})

app.post('/updateKey', verifyJWT, (req, res) => {
  // Form validation
  // console.log(req.body);
  const { errors, isValid } = validateKeyInput(req.body);
  // Check validation
  if (!isValid) {
    return res.json({message: "Invalid Public Key", messageType: "danger"});
  } else {
    const key = req.body.key;
    let email;
    fetchUserByID(req.user.id)
    .then(user => {
      console.log('user: ', user);
      email = user.email;
      user.key = key;
      updateUserByID(user)
    })
    .catch(err => {
      console.log(err);
    })
    .then(() => {
      console.log('successfully updated user!');
      let msg = `Your public key was successfully updated to ${key}\n\nIf you did not submit this public key update, please email us at untetheredmining@gmail.com`;
      sendEmail(email, "Public Key Updated Successfully", msg)
      .then(() => {
        res.json({message: "Successfully Updated Public Key", messageType: "success"});
      })
      .catch(err => {
        console.log(err);
        res.json({message: "Error", messageType: "danger"});
      })
    })
  }
});

app.post('/updateEmail', verifyJWT, (req, res) => {
  // Form validation
  // console.log(req.body);
  const { errors, isValid } = validateEmailInput(req.body);
  // Check validation
  if (!isValid) {
    res.json({message: "Invalid Email", messageType: "danger"});
  } else {
    const email = req.body.email;

    fetchUserByID(req.user.id)
    .then(user => {
      console.log('user: ', user);
      if (user.email === email) {return res.json({message: "Account Already Exists With This Email", messageType: "danger"})}
      else {
        let msg = `Your email was successfully updated to ${email}!\n\nIf you did not submit this email update, please email us at untetheredmining@gmail.com`;
        sendEmail(user.email, "Email Updated Successfully", msg)
        .then(() => {
          user.email = email;
          updateUserByID(user);
        })
        .catch(err => {
          console.log(err);
          res.json({message: "Error", messageType: "danger"});
        })

      }
    })
    .catch(err => {
      console.log(err);
      res.json({message: "Error", messageType: "danger"});
    })
    .then(() => {
      console.log('successfully updated user!');
      res.json({message: "Successfully Updated Email", messageType: "success"});
    })
  }
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
