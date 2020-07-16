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
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
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
            ref: 'User'
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

// add virtual to get total count of user's friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.replies.length +1, 0);
});

const User = model('User', UserSchema);

module.exports = User;
