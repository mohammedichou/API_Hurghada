const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    activityId: {type: String, required: true},
    nombre: { type : Number, required: true},
    amount: { type: Number, required: true },
    date_start: { type: Date },
    transport: { type: Boolean, required: true, default: false },
    hotel : {type : String, required: false},
    status: { type: String, default: "pending" },
    updated_at: {type: Date}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);