const mongose = require('mongoose');

const ActivityModel = mongose.model(
    "",
    {
        name: {
            type: String
        },
        images: [
            {
                _id: { type: Object }
            }
        ],
        type: {
            type: String
        },
        apropos: [
            {
                icone: { type: String },
                description: { type: String }
            }
        ],
        defaut_pointfort: [
            {
                str: {
                    type: String
                }
            }
        ],
        dispo: [
            {
                prix: {
                    type: Number
                },
                nombre: {
                    type: Number
                },
                date_start: {
                    type: Date
                }
            }
        ],
        inclus: [
            {
                str: {
                    type: String
                }
            }
        ],
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        },
        updated_at: {
        type: Date
        }
    },
    "Activity"
)

module.exports = {ActivityModel};