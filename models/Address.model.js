const { Schema, model } = require("mongoose");

const neighborhoodSchema = new Schema(
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

const Review = model("Neighborhood", neighborhoodSchema);
module.exports = Review;