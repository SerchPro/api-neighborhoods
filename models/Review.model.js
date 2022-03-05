const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            min: [2, "Title must be at least 2 characters"],
            max: [50, "Title must be at most 50 characters"],
        },
        comment: {
            type: String,
            required: [true, "Comment is required"],
            min: [4, "Comment must be at least 4 characters"],
            max: [2000, "Comment must be at most 2000 characters"],
        },
        _user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        _post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    },
    {
        timestamps: true,
    }
);

const Review = model("Review", reviewSchema);
module.exports = Review;