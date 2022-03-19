const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        comment: {
            type: String,
            required: [true, "Comment is required"],
            min: [4, "Comment must be at least 4 characters"],
            max: [2000, "Comment must be at most 2000 characters"],
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
        _post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Review = model("Review", reviewSchema);
module.exports = Review;