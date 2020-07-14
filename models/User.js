const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String,
        },
        // add thoughts
        thoughts: [],
        // add friends
        friends: []
    },
);

const User = model('User', UserSchema);

// add virtual - friendCount

module.exports = User;
