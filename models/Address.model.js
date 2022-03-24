const { Schema, model } = require("mongoose");

const addressSchema = new Schema(
    {
        neighborhood:{
            type: String,
            required: [true, "the neighborhood is required"]
        },
        description:{
            type: String,
            required: [true, "the description is required"]
        },
        active: {
            type: Boolean,
            default: true
        },
        cp:{
            type:Number,
            required: [true, "the cp is required"]
        },
        _user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Address = model("Address", addressSchema);
module.exports = Address;