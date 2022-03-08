const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'the name is required'],
            unique: true
        },
        state: {
            type: Boolean,
            default: true,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

/*categoriaSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();
    return data;
}*/

module.exports = model('Category', categorySchema)