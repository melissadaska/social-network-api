const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        // add thoughts
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // add friends
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Friend'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

const User = model('User', UserSchema);

// add virtual to get total count of user's friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = User;
