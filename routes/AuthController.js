var mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt'),
UserModel = require('../models/UserModel');
const express = require("express");

module.exports = {

  Register: function (req, res) {
    console.log("Register")
    var newUser = new UserModel(req.body);
    console.log(req.body)
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });     
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    });
  },

  Loggin: function (req, res) {
    console.log("Loggin")
      UserModel.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id, Isadmin: user.Isadmin }, 'RESTFULAPIs') });
    });
  },
  loginRequired: function(req, res, next) {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized user!!' });
    }
  },
  adminlogginRequired: function (req, res, next) {
    if (req.user && req.user.Isadmin) {
      next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!!' });
    }
  },

  profile: function(req, res, next) {
    if (req.user) {
      res.send(req.user);
      next();
    } 
    else {
    return res.status(401).json({ message: 'Invalid token' });
    }
  }

}

