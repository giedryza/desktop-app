const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TvserieSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    imdbId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Tvserie = mongoose.model('tvseries', TvserieSchema);
