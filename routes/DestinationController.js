const express = require("express");



const { DestinationModel } = require('../models/DestinationModel');


module.exports = {


    getalldestination: function (req, res) {
        DestinationModel.find((err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log("error :" + err);
            // AJOUTER STATUS RETOUR ERROR 
        })
    },


    addonedestination: function (req, res) {
        const destination = new DestinationModel({
            name: req.body.name,
            name_country: req.body.name_country,
            url_img: req.body.url_img
        });
        destination.save()

        // AJOUTER RETOUR & STATUS 
    },

    getonedestination: function (req, res) {
        
        DestinationModel.findOne({ _id: req.body._id }, function (err, docs) {
            console.log(docs);
            if (docs == undefined || docs == null) {
                res.status(400).json({"error" : "pas de document trouver"})
            } else {
                res.status(200).json(docs)
            }
        })
    },

    deletedestination: function (req, res) {
        DestinationModel.findByIdAndRemove({ _id: req.body._id }, function (err, docs) {
            if (err == null) {
                if (docs == undefined || docs == null) {
                res.status(400).json({"error" : "pas de document trouver"})
            } else {
                res.status(200).json(docs)
            }
            } else {
                res.status(400).json({"error" : err})
            }
        })
    }, 


    
}


