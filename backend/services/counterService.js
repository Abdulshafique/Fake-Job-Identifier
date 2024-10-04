const {Counter} = require('../models/post');

async function getNextSequenceValue(sequenceName) {
    const result = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return result.sequence_value;
}

module.exports = { getNextSequenceValue };