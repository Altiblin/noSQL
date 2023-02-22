const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PostSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    description: String,
    content: String,
    image: String,
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
    }],
    comments: [{
        text: String,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
},
    { timestamps: true }
);
PostSchema.plugin(uniqueValidator);
module.exports = model('Post', PostSchema);