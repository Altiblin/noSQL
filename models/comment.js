const { Schema, model } = require("mongoose");
const CommentSchema = new Schema (
    {
        text: {
            type: String,
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

    },
    { timestamps: true }
);

module.exports = model("Comment", CommentSchema);