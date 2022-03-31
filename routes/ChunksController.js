const express = require("express");

const { ChunksModel } = require('../models/ChunksModel');

module.exports = {

    getimage: function (req, res) {
        ChunksModel.findById({ _id: req.body._id }, function (err, doc) {
            console.log(doc)
        })
    }

}