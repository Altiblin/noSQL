const { Schema, model } = require("mongoose");

const VideoSchema = new Schema (
    {
        videoId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = model("Video", VideoSchema);