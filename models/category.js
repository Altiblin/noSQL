const uniqueValidator = require("mongoose-unique-validator");
const { Schema, model } = require("mongoose");

const CategorySchema = new Schema (
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description:{
            type: String,
            required: true,
            unique: true,
        },
        image: String,
    },
    { timestamps: true }
);

CategorySchema.plugin(uniqueValidator);
module.exports = model("Category", CategorySchema);