const mongose = require('mongoose');

const DestinationModel = mongose.model(
    "HurghadaBDDV0",
    {
        name: {
            type: String
        },
        name_country: {
            type: String
        },
        url_img: {
            type: String
        },
        activity: [{ _id: Object }],
        hotel : [{ _id: Object }]
    },
    "Destination"
)

module.exports = {DestinationModel};