const bcrypt = require('bcrypt')
const { Schema, model } = require("mongoose");

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        // image: {
        //     type: String,
        //     default: "no-image.png",
        // },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        password: {
            type: String,
            required: true,
        },
        posts: [{
            type: Schema.Types.ObjectId,
            ref: "Post",
        }],
        // verificationCode: {
        //     type: Number,
        // },
        // isEmailVerified: {
        //     type: Boolean,
        //     default: false,
        // },
        // passwordResetCode: {
        //     type: String,
        // }
    },
    { timestamps: true }
);
UserSchema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted
        next()
    })
})
module.exports = model('User', UserSchema)