const mongose = require('mongoose');




console.log("demarrage conexion db");


module.exports = {
  url: "mongodb+srv://Dbhurghada:Hurghada93@cluster0.f44uz.mongodb.net/",
  database: "HurghadaBDDV0",
  imgBucket: "photos",
};

mongose.connect(
    "mongodb+srv://Dbhurghada:Hurghada93@cluster0.f44uz.mongodb.net/HurghadaBDDV0",
    { useNewUrlParser: true, useUnifiedTopology: false },
    (err) => {
        if (!err) {
            console.log("Mongodb connected !!");
            //initial();
        } 
        else console.log("connection erro :: " + err);

    }
)

