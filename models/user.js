const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing"  // assuming your listing model is named "Listing"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;
