const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title:{
            type: String,
            required: [true, 'the title is required'],
        },
        description:{
            type: String,
            required: [true, 'the description is required'],
        },
        links:[{
            type: String
        }],
        images:[{
            type: String
        }],
        _user: {
            type:Schema.Types.ObjectId,
            ref: 'User'
        },
        _favorites:
            [
                {
                    type:Schema.Types.ObjectId,
                ref: 'User'
                }
            ],
        _reviews:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Post = model("New", postSchema);
module.exports = Post;