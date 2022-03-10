const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'the username is required'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'the email is required'],
      unique: true
    },
    phone: {
      type: Number,
    },
    birthday:{
      type: Date,
    },
    bio: {
      type: String,
    },
    password: {
        type: String,
        required: [true, 'the password is required']
    },
    image_url: {
        type: String,
        default: 'https://pbs.twimg.com/profile_images/515658522034311168/T6z7LpeE_400x400.jpeg'
    },
    google: {
        type: Boolean,
        default: false
    },
    idGoogle: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: true
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min : [1, "Rating must be at least 1"],
      max : [5, "Rating must be at most 5"],
      default : 2
    },
    _posts:
      [
        {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
    _favorites:
      [
        {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
    _following:
      [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    _followers:
      [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
  },
  {
    timestamps: true,
  }
);


module.exports = model("User", userSchema);
