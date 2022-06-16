const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/fetcher'
const options = {
  useNewUrlParser: true,
};

mongoose.connect(mongoURI, options);

let userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  key: {
    type: String,
  },
  totalBTC: {
    type: Number,
    default: 0.0,
  },
  distributions: {
    type: [Number]
  },
  distributionsUSD: {
    type: [Number]
  },
});

let User = mongoose.model('User', userSchema);

let saveUser = (email, password) => {
  console.log('saving user: ', email)
  var userInstance = new User({
    email: email,
    password: password
  })
  userInstance.save()
  .then(data => {
    console.log('saved user!');
    return data;
  })
}

let fetchAllUsers = () => {
  console.log('fetchin all users');
  return User.find().exec();
}

let fetchUser = (email) => {
  console.log('fetching user: ', email);
  return User.findOne({"email": email}).exec();
}

let fetchUserByID = (id) => {
  console.log('fetching user by id: ', id);
  return User.findOne({"_id": id}).exec();
}

let updateUserByID = (user) => {
  console.log('updating user by id: ', user.id);
  return User.findOneAndUpdate({"_id": user.id}, user, {setDefaultOnInsert: false}).exec();
}

// Token store
let tokenSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,// this is the expiry time in seconds
  },
});

let Token = mongoose.model("Token", tokenSchema);

let saveToken = (userID, token) => {
  console.log('saving token for userID: ', userID)
  var tokenInstance = new Token({
    userID: userID,
    token: token
  })
  tokenInstance.save()
  .then(data => {
    console.log('saved token!');
    return data;
  })
}

let fetchToken = (userID, token) => {
  return Token.findOne({"userID": userID, "token": token}).exec();
}

let deleteToken = (userID) => {
  console.log('deleting token for userID: ', userID);
  return Token.deleteMany({"userID": userID}).exec();
}

// Metric store
let metricSchema = new mongoose.Schema({
  totalBTCHoldings: {
    type: [Number]
  },
  casaWallet: {
    type: [Number]
  },
  coldWallet: {
    type: [Number]
  },
  asicFund: {
    type: [Number]
  },
  taxFund: {
    type: [Number]
  },
  numberOfAsics: {
    type: [Number]
  },
});

let Metric = mongoose.model("Metric", metricSchema);

let fetchMetrics = () => {
  console.log('fetching metrics');
  return Metric.find().exec();
}

module.exports.saveUser = saveUser;
module.exports.fetchAllUsers = fetchAllUsers;
module.exports.fetchUser = fetchUser;
module.exports.fetchUserByID = fetchUserByID;
module.exports.updateUserByID = updateUserByID;
module.exports.saveToken = saveToken;
module.exports.fetchToken = fetchToken;
module.exports.deleteToken = deleteToken;
module.exports.fetchMetrics = fetchMetrics;
module.exports.User = User;

