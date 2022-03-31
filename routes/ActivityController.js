const express = require("express");
const upload = require("../middleware/upload");


const { ActivityModel } = require('../models/ActivityModel');
const { DestinationModel } = require('../models/DestinationModel');
const ChunksModel = require('../models/ChunksModel');
const DispoModel = require('../models/DispoModel')




const DestinationController = require("./DestinationController");
const { now } = require("mongoose");

module.exports = {

    addactivity: function (req, res) {
        const activity = new ActivityModel({
            name: req.body.name,
            type: req.body.type,
            apropos: req.body.apropos,
            defaut_pointfort: req.body.defaut_pointfort,
            dispo: req.body.dispo
        })
        activity.save(function (err, docs) {
            if (err) {
                res.status(400).json({"err": err})
            } else {
                DestinationModel.findOneAndUpdate({ _id: req.body.idDestination }, { $push: { "activity": {_id : docs._id}}}, function (err, docDestination) {
                    
                    if (err) {
                         res.status(400).json({"err": err})
                    } else {
                        if (docDestination == undefined || docDestination == null) {
                             res.status(400).json({"err": "Error pas de destination trouver"})
                        }
                        else {
                            res.status(200).json({"destination": docDestination , "activity" : docs})
                        }
                    }
                 })
            }
        })
    },

    getallactivityfromdestination: function (req, res) {

        DestinationModel.findOne({ _id: req.body._id }, function (err, docs) {
            console.log(docs);
            if (docs == undefined || docs == null) {
                res.status(400).json({"error" : "pas de document trouver"})
            } else {
                const ids = docs.activity
                ActivityModel.find().where('_id').in(ids).exec((err, activitis) => {
                    res.status(200).json(activitis)
                });
                //
            }
        })
    },



    addimagetoactivity: async function (req, res) {
         console.log("add image");
          try {
            await upload(req, res);
            console.log(req.file);
            if (req.file == undefined) {
            return res.send({
                message: "You must select a file.",
            });
            }
              ActivityModel.findOneAndUpdate({ _id: req.body._id }, { $push: { "images": { _id: req.file.id } } }, function (err, doc) {
                  console.log("req.file" + req.file.id)
                  console.log("docs" + doc)
                  console.log("err" + err)
                 return res.send({
                    message: "File has been uploaded and add to activity.",
                });
            })
            /*;*/
        } catch (error) {
            console.log(error);
            return res.send({
            message: "Error when trying upload image: ${error}",
            });
        }
    },
    getallimageactivity: function (req, res) {
        console.log("test" + req.body._id)
        ActivityModel.findOne({ _id: req.body._id }, function (err, doc) {
            if (err == undefined || err == null) {
                if (doc == null || doc == undefined) {
                    res.status(400).send({"err" : "pas de document trouver"})
                } else {
                    //res.status(200).send(doc.images)
                    console.log(doc.images)
                    console.log(ChunksModel)
                    //console.log(ActivityModel)
                    ChunksModel.find({files_id: doc.images}, function (err, img) {
                        console.log(img)
                        res.status(200).json(img)
                    })
                }
                
            } else {
               res.status(400).send({"err" : err})
            }
        })
    },

    adddispotoactivity: function (req, res) {
        //dispo = req.body.dispo
        console.log(req.body)
        console.log(new Date(req.body.date))
        console.log(new Date())
        console.log(new Date(req.body.date) > new Date())
        if (false ) {
            res.status(300).json({ "err": "vous avez pas le droit d'ajouter une dispo dans le passé" })
        }
        
        ActivityModel.find({'dispo.date_start': new Date(req.body.date)}, function (err, doc) {
            console.log(doc)
            console.log(err)
            if (doc.length >= 1) {
                 res.status(300).json({ "err": "cette dispo existe deja" })
            } else {
                    console.log("debut update")
                    ActivityModel.findOneAndUpdate({ _id: req.body._id },
                    {
                        $push: {
                            "dispo": {
                                "prix": req.body.prix,
                                "nombre": req.body.nombre,
                                "date_start": req.body.date
                            }
                        }   
                    },
                    function (err, doc) {
                        if (err == undefined || err == null) {
                            if (doc == undefined || doc == null) {
                                res.status(302).json({"err" : "pas de document trouver"})
                            } else {
                                res.status(200).json({doc})
                            }
                        } else {
                            res.status(400).json({ "err": err })
                        }
                    }) 
                }
        })
        
    },

    getalldispofromactivity: function (req, res) {
        ActivityModel.findById({ _id: req.body._id }, function (err, doc) {
            if (err == undefined && err == null) {
                if (doc != null || doc != undefined) {
                    res.status(200).json(doc.dispo)
                } else {
                    res.status(302).json({"err" : "pas de document trouver"})
                }
            } else {
                res.status(400).json({"err" : err})
            }
        })
    },

    addpointfort: function (req, res) {
        //ajouter point fort attention supprimer point fort avant de ajouter
        ActivityModel.updateOne({_id: req.body._id}, { $set: { "defaut_pointfort": [] } }, { multi: true }, function (err, doc) {
            console.log(doc)
            if (doc != null) {
                ActivityModel.updateOne({ _id: req.body._id }, { $set: { "defaut_pointfort": req.body.defaut_pointfort } }, function (err, doc) {
                    console.log(doc)
                    if (doc != null) {
                        res.status(200).json({"success" : "ajout reussis"})
                    }
                 })
             }

        })
    },

    addapropos: function (req, res) {
        //ajouter a propos emojis + text toujours tous supprimer avant de ajouter
         ActivityModel.updateOne({_id: req.body._id}, { $set: { "apropos": [] } }, { multi: true }, function (err, doc) {
             console.log(doc)
             if (doc != null) {
                ActivityModel.updateOne({ _id: req.body._id }, { $set: { "apropos": req.body.apropos } }, function (err, doc) {
                    console.log(err)
                    if (doc != null) {
                        res.status(200).json({"success" : "ajout reussis"})
                    }
                 })
             }
             
        })
    }, 

    addinclus: function (req, res) {
        //ajouter inclus tableau de text a supprimer l'ancien tab et a ajouter le nouveau 
         ActivityModel.updateOne({_id: req.body._id}, { $set: { "inclus": [] } }, { multi: true }, function (err, doc) {
             console.log(doc)
             if (doc != null) {
                ActivityModel.updateOne({ _id: req.body._id }, { $set: { "inclus": req.body.inclus } }, function (err, doc) {
                    console.log(err)
                    if (doc != null) {
                        res.status(200).json({"success" : "ajout reussis"})
                    }
                 })
             }
        })
    }


}




/*for (let i = 0; i < Object.keys(doc.dispo).length; i++) { 
                    console.log("ICI")
                    if ((new Date(req.body.date_in) > doc.dispo[i].date_in && new Date(req.body.date_in) < doc.dispo[i].date_out)
                 || (new Date(req.body.date_out) > doc.dispo[i].date_in && new Date(req.body.date_out) < doc.dispo[i].date_out)
                 || (new Date(req.body.date_in) < doc.dispo[i].date_in && new Date(req.body.date_out) > doc.dispo[i].date_out)
                    ) {
                        checkdate = false
                }
                }*/

           /* for (let i = 0; i < Object.keys(doc.dispo).length; i++){
                
                


            }*/