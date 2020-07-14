const { Schema, model } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = newSchema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280 
        },
        createdAt: {
            type: Date,
            default: Data.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reactions'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const Thought = model('Thought', ThoughtSchema);

// add virtual to get total count of reactions to the thought
ThoughtSchema.virtual('reactionsCount').get(function() {
    return this.reactions.length;
});

module.exports = Thought;
