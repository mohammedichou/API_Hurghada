const express = require("express");


module.exports = {
      test: function (req, res) {
          return res.status(200).json("server OK")
      }
}